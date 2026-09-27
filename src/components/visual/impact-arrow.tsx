"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

type Curve = {
  width: number;
  height: number;
  d: string;
  head: string;
};

function relativeRect(el: Element, root: DOMRect) {
  const box = el.getBoundingClientRect();
  return {
    left: box.left - root.left,
    right: box.right - root.left,
    top: box.top - root.top,
    bottom: box.bottom - root.top,
    width: box.width,
    height: box.height,
  };
}

function n(value: number) {
  return value.toFixed(1);
}

/**
 * One cubic Bézier that leaves the hero CTAs heading right, sweeps out over
 * the scene, and comes back in to land beside the reach figure.
 */
function buildCurve(root: HTMLElement): Curve | null {
  const from = root.querySelector("[data-arrow-from]");
  const to = root.querySelector("[data-arrow-to]");
  if (!from || !to) return null;

  const wrap = root.getBoundingClientRect();
  const startBox = relativeRect(from, wrap);
  const endBox = relativeRect(to, wrap);

  const sx = startBox.right + 24;
  const sy = startBox.top + startBox.height / 2;
  const ex = endBox.right + 20;
  const ey = endBox.top + endBox.height * 0.4;

  const dy = ey - sy;
  if (dy < 16) return null;

  const reach = Math.min(wrap.width - 48, Math.max(sx + 180, wrap.width * 0.72));
  const c1x = reach;
  const c1y = sy + dy * 0.18;
  const c2x = Math.min(wrap.width - 48, ex + Math.max(160, (reach - ex) * 0.7));
  const c2y = ey - dy * 0.12;

  const d = `M ${n(sx)} ${n(sy)} C ${n(c1x)} ${n(c1y)}, ${n(c2x)} ${n(c2y)}, ${n(ex)} ${n(ey)}`;

  const angle = Math.atan2(ey - c2y, ex - c2x);
  const length = 7;
  const half = 3.1;
  const bx = ex - Math.cos(angle) * length;
  const by = ey - Math.sin(angle) * length;
  const lx = bx + Math.cos(angle + Math.PI / 2) * half;
  const ly = by + Math.sin(angle + Math.PI / 2) * half;
  const rx = bx + Math.cos(angle - Math.PI / 2) * half;
  const ry = by + Math.sin(angle - Math.PI / 2) * half;
  const head = `M ${n(ex)} ${n(ey)} L ${n(lx)} ${n(ly)} L ${n(rx)} ${n(ry)} Z`;

  return { width: wrap.width, height: wrap.height, d, head };
}

function ArrowOverlay({ root }: { root: HTMLElement | null }) {
  const reduced = usePrefersReducedMotion();
  const [curve, setCurve] = useState<Curve | null>(null);

  useLayoutEffect(() => {
    if (!root) return;

    let frame = 0;
    const measure = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setCurve(buildCurve(root)));
    };

    measure();
    const later = [120, 450, 900].map((ms) => window.setTimeout(measure, ms));
    const observer = new ResizeObserver(measure);
    observer.observe(root);
    window.addEventListener("resize", measure);
    void document.fonts?.ready.then(measure);

    return () => {
      cancelAnimationFrame(frame);
      later.forEach(clearTimeout);
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [root]);

  if (!curve) return null;

  return (
    <svg
      aria-hidden="true"
      width={curve.width}
      height={curve.height}
      viewBox={`0 0 ${curve.width} ${curve.height}`}
      className="pointer-events-none absolute inset-0 z-10 hidden overflow-visible text-amber-400 lg:block"
    >
      <path
        d={curve.d}
        pathLength={1}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        className={reduced ? "opacity-75" : "impact-arrow-stroke opacity-75"}
      />
      <path
        d={curve.head}
        fill="currentColor"
        stroke="none"
        className={reduced ? "opacity-75" : "impact-arrow-head"}
      />
    </svg>
  );
}

/**
 * The first stretch of the route: from the hero's invitation to the figure
 * that proves it, 27 countries.
 */
export function ImpactArrow({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [root, setRoot] = useState<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    setRoot(ref.current);
  }, []);

  return (
    <div ref={ref} className="relative">
      {children}
      <ArrowOverlay root={root} />
    </div>
  );
}

"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

type Point = { x: number; y: number };

type Sketch = {
  id: number;
  d: string;
  head: string;
};

function n(value: number) {
  return value.toFixed(1);
}

function canUseHover() {
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

function relativePoint(el: Element, root: DOMRect, x: number, y: number): Point {
  const box = el.getBoundingClientRect();
  return { x: box.left - root.left + x, y: box.top - root.top + y };
}

const HEAD_SIZE = 5.5;
const NUMBER_GAP = 8;

function sketchCurve(start: Point, end: Point, seed: number): Sketch {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const dist = Math.hypot(dx, dy) || 1;
  let nx = -dy / dist;
  let ny = dx / dist;
  if (ny > 0) {
    nx = -nx;
    ny = -ny;
  }

  const bow = Math.min(13, Math.max(7, dist * 0.3));
  const jitter = (seed - 0.5) * 3.5;

  const c1x = start.x + dx * 0.32 + nx * bow * 0.85 + jitter;
  const c1y = start.y + dy * 0.32 + ny * bow * 0.85;
  const c2x = start.x + dx * 0.68 + nx * bow - jitter * 0.4;
  const c2y = start.y + dy * 0.68 + ny * bow;

  const d = `M ${n(start.x)} ${n(start.y)} C ${n(c1x)} ${n(c1y)}, ${n(c2x)} ${n(c2y)}, ${n(end.x)} ${n(end.y)}`;

  const angle = Math.atan2(end.y - c2y, end.x - c2x);
  const spread = 0.7;
  const hx1 = end.x - Math.cos(angle - spread) * HEAD_SIZE;
  const hy1 = end.y - Math.sin(angle - spread) * HEAD_SIZE;
  const hx2 = end.x - Math.cos(angle + spread) * HEAD_SIZE;
  const hy2 = end.y - Math.sin(angle + spread) * HEAD_SIZE;
  const head = `M ${n(hx1)} ${n(hy1)} L ${n(end.x)} ${n(end.y)} L ${n(hx2)} ${n(hy2)}`;

  return { id: Date.now() + seed * 1000, d, head };
}

function measureSketch(
  root: HTMLElement,
  from: HTMLElement,
  to: HTMLElement,
): Sketch | null {
  const wrap = root.getBoundingClientRect();
  const icon = from.getBoundingClientRect();
  const index = to.getBoundingClientRect();

  const start = relativePoint(from, wrap, icon.width + 2, icon.height / 2);
  const end = relativePoint(to, wrap, -NUMBER_GAP, index.height / 2);

  if (end.x - start.x < 10) return null;

  return sketchCurve(start, end, Math.random());
}

export function IndexSketchArrow({
  active,
  containerRef,
  fromRef,
  toRef,
}: {
  active: boolean;
  containerRef: RefObject<HTMLElement | null>;
  fromRef: RefObject<HTMLElement | null>;
  toRef: RefObject<HTMLElement | null>;
}) {
  const reduced = usePrefersReducedMotion();
  const [sketch, setSketch] = useState<Sketch | null>(null);
  const [phase, setPhase] = useState<"in" | "out">("out");
  const fadeTimer = useRef<number>(0);

  useEffect(() => {
    const root = containerRef.current;
    const from = fromRef.current;
    const to = toRef.current;
    if (!root || !from || !to) return;

    window.clearTimeout(fadeTimer.current);

    if (active) {
      const next = measureSketch(root, from, to);
      if (!next) return;
      setSketch(next);
      setPhase("in");
      return;
    }

    setPhase("out");
    fadeTimer.current = window.setTimeout(() => setSketch(null), 220);

    return () => window.clearTimeout(fadeTimer.current);
  }, [active, containerRef, fromRef, toRef]);

  useEffect(() => {
    if (!active) return;

    const redraw = () => {
      const root = containerRef.current;
      const from = fromRef.current;
      const to = toRef.current;
      if (!root || !from || !to) return;
      const next = measureSketch(root, from, to);
      if (next) setSketch(next);
    };

    window.addEventListener("resize", redraw);
    return () => window.removeEventListener("resize", redraw);
  }, [active, containerRef, fromRef, toRef]);

  if (!sketch) return null;

  return (
    <svg
      key={sketch.id}
      aria-hidden="true"
      data-phase={phase}
      data-reduced={reduced ? "" : undefined}
      className="index-sketch pointer-events-none absolute inset-0 z-0 size-full overflow-visible text-amber-400"
    >
      <path
        d={sketch.d}
        pathLength={1}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.85"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="index-sketch-stroke"
      />
      <path
        d={sketch.head}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.85"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="index-sketch-head"
      />
    </svg>
  );
}

export { canUseHover };

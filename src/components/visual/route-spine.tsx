"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

type Geometry = {
  width: number;
  height: number;
  curve: string | null;
  head: string | null;
  spineX: number;
  top: number;
  bottom: number;
  stops: { x: number; y: number }[];
};

function n(value: number) {
  return value.toFixed(1);
}

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

/**
 * Opening curve: one cubic Bézier from the last hero commitment, through the
 * space above Workshops, ending beside the evidence coordinate.
 */
function buildCurve(root: HTMLElement, wrap: DOMRect) {
  const from = root.querySelector("[data-arrow-from]");
  const to = root.querySelector("[data-arrow-to]");
  const well = root.querySelector("[data-arrow-well]");
  if (!from || !to) return null;

  const startBox = relativeRect(from, wrap);
  const endBox = relativeRect(to, wrap);
  const wellBox = well ? relativeRect(well, wrap) : null;

  const sx = startBox.left + startBox.width * 0.28;
  const sy = startBox.bottom + 8;
  const ex = endBox.right + 16;
  const ey = endBox.top + endBox.height / 2;
  if (ey - sy < 16) return null;

  const wellX = wellBox ? wellBox.left + wellBox.width * 0.55 : sx + 48;
  const wellY = wellBox ? (sy + wellBox.top) / 2 : sy + Math.max(72, (ey - sy) * 0.55);
  const c2x = ex + Math.max(72, (wellX - ex) * 0.22);

  const curve = `M ${n(sx)} ${n(sy)} C ${n(wellX)} ${n(wellY)}, ${n(c2x)} ${n(ey)}, ${n(ex)} ${n(ey)}`;

  const angle = Math.atan2(0, ex - c2x);
  const bx = ex - Math.cos(angle) * 7;
  const by = ey - Math.sin(angle) * 7;
  const lx = bx + Math.cos(angle + Math.PI / 2) * 3.1;
  const ly = by + Math.sin(angle + Math.PI / 2) * 3.1;
  const rx = bx + Math.cos(angle - Math.PI / 2) * 3.1;
  const ry = by + Math.sin(angle - Math.PI / 2) * 3.1;
  const head = `M ${n(ex)} ${n(ey)} L ${n(lx)} ${n(ly)} L ${n(rx)} ${n(ry)} Z`;

  return { curve, head };
}

function measure(root: HTMLElement): Geometry | null {
  const wrap = root.getBoundingClientRect();
  const opening = buildCurve(root, wrap);

  const stops = Array.from(root.querySelectorAll("[data-route-stop]"))
    .map((el) => el.querySelector(".route-coord__tick") ?? el)
    .map((el) => {
      const box = relativeRect(el, wrap);
      return { x: box.left, y: box.top + box.height / 2 };
    });

  if (stops.length < 2) {
    return opening
      ? { width: wrap.width, height: wrap.height, ...opening, spineX: 0, top: 0, bottom: 0, stops: [] }
      : null;
  }

  const spineX = Math.min(...stops.map((stop) => stop.x)) - 28;

  return {
    width: wrap.width,
    height: wrap.height,
    curve: opening?.curve ?? null,
    head: opening?.head ?? null,
    spineX,
    top: stops[0].y,
    bottom: stops[stops.length - 1].y,
    stops,
  };
}

function SpineOverlay({ root }: { root: HTMLElement | null }) {
  const reduced = usePrefersReducedMotion();
  const [geometry, setGeometry] = useState<Geometry | null>(null);
  const fillRef = useRef<SVGPathElement>(null);
  const stationsRef = useRef<SVGGElement>(null);

  useLayoutEffect(() => {
    if (!root) return;

    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setGeometry(measure(root)));
    };

    update();
    const later = [150, 600].map((ms) => window.setTimeout(update, ms));
    const observer = new ResizeObserver(update);
    observer.observe(root);
    void document.fonts?.ready.then(update);

    return () => {
      cancelAnimationFrame(frame);
      later.forEach(clearTimeout);
      observer.disconnect();
    };
  }, [root]);

  useLayoutEffect(() => {
    if (!root || !geometry || geometry.stops.length < 2) return;
    const fill = fillRef.current;
    const stations = stationsRef.current;
    if (!fill || !stations) return;

    const span = geometry.bottom - geometry.top;
    const nodes = Array.from(stations.children) as SVGElement[];

    const paint = () => {
      const rootTop = root.getBoundingClientRect().top;
      const reach = reduced ? Infinity : window.innerHeight * 0.62 - rootTop;
      const progress = Math.min(1, Math.max(0, (reach - geometry.top) / span));
      fill.style.strokeDashoffset = String(1 - progress);
      geometry.stops.forEach((stop, index) => {
        nodes[index]?.toggleAttribute("data-reached", reach >= stop.y);
      });
    };

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(paint);
    };

    paint();
    if (reduced) return;
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [root, geometry, reduced]);

  if (!geometry) return null;

  const { spineX, top, bottom, stops } = geometry;
  const spine = stops.length > 1 ? `M ${n(spineX)} ${n(top)} V ${n(bottom)}` : null;

  return (
    <svg
      aria-hidden="true"
      width={geometry.width}
      height={geometry.height}
      viewBox={`0 0 ${geometry.width} ${geometry.height}`}
      className="route-spine pointer-events-none absolute inset-0 z-10 hidden overflow-visible lg:block"
    >
      {geometry.curve ? (
        <>
          <path
            d={geometry.curve}
            pathLength={1}
            className={reduced ? "route-spine__curve" : "route-spine__curve impact-arrow-stroke"}
          />
          {geometry.head ? (
            <path
              d={geometry.head}
              className={reduced ? "route-spine__head" : "route-spine__head impact-arrow-head"}
            />
          ) : null}
        </>
      ) : null}

      {spine ? (
        <>
          <path d={spine} className="route-spine__track" />
          <path ref={fillRef} d={spine} pathLength={1} className="route-spine__fill" />
          <g ref={stationsRef}>
            {stops.map((stop, index) => (
              <g key={index} className="route-spine__station">
                <line x1={spineX} x2={stop.x} y1={stop.y} y2={stop.y} />
                <circle cx={spineX} cy={stop.y} r={3.5} />
              </g>
            ))}
          </g>
        </>
      ) : null}
    </svg>
  );
}

/**
 * The homepage route: the opening curve from the hero into the evidence
 * plate, then a gutter line that fills in as each section's coordinate
 * scrolls past. Desktop only; below `lg` the coordinates carry the tick.
 */
export function RouteSpine({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [root, setRoot] = useState<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    setRoot(ref.current);
  }, []);

  return (
    <div ref={ref} className="relative">
      {children}
      <SpineOverlay root={root} />
    </div>
  );
}

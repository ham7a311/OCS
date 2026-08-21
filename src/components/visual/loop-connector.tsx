"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

type Point = { x: number; y: number };

type Sketch = { d: string; head: string };

function n(value: number) {
  return value.toFixed(1);
}

function sketchCurve(start: Point, end: Point, seed: number): Sketch {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const dist = Math.hypot(dx, dy) || 1;
  const nx = -dy / dist;
  const ny = dx / dist;
  const bow = Math.min(18, Math.max(8, dist * 0.22));
  const jitter = (seed - 0.5) * 4;

  const c1x = start.x + dx * 0.32 + nx * bow + jitter;
  const c1y = start.y + dy * 0.32 + ny * bow;
  const c2x = start.x + dx * 0.68 + nx * bow * 0.6 - jitter * 0.4;
  const c2y = start.y + dy * 0.68 + ny * bow * 0.6;

  const d = `M ${n(start.x)} ${n(start.y)} C ${n(c1x)} ${n(c1y)}, ${n(c2x)} ${n(c2y)}, ${n(end.x)} ${n(end.y)}`;
  const angle = Math.atan2(end.y - c2y, end.x - c2x);
  const spread = 0.7;
  const size = 6;
  const hx1 = end.x - Math.cos(angle - spread) * size;
  const hy1 = end.y - Math.sin(angle - spread) * size;
  const hx2 = end.x - Math.cos(angle + spread) * size;
  const hy2 = end.y - Math.sin(angle + spread) * size;
  const head = `M ${n(hx1)} ${n(hy1)} L ${n(end.x)} ${n(end.y)} L ${n(hx2)} ${n(hy2)}`;

  return { d, head };
}

function LoopArrow({
  from,
  to,
  label,
  seed,
  showLabel,
}: {
  from: Point;
  to: Point;
  label: string;
  seed: number;
  showLabel: boolean;
}) {
  const sketch = sketchCurve(from, to, seed);
  const mid = { x: (from.x + to.x) / 2, y: (from.y + to.y) / 2 - 10 };

  return (
    <>
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
      {showLabel ? (
        <text
          x={mid.x}
          y={mid.y}
          textAnchor="middle"
          className="fill-amber-300 font-mono text-[0.625rem] uppercase tracking-[0.09em]"
        >
          {label}
        </text>
      ) : null}
    </>
  );
}

export function LoopConnector({
  left,
  right,
}: {
  left: ReactNode;
  right: ReactNode;
}) {
  const reduced = usePrefersReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const [wide, setWide] = useState(false);
  const [points, setPoints] = useState<{
    feeds: { from: Point; to: Point };
    proves: { from: Point; to: Point };
  } | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const a = leftRef.current;
    const b = rightRef.current;
    if (!wrap || !a || !b) return;

    const measure = () => {
      const sideBySide = window.matchMedia("(min-width: 1024px)").matches;
      setWide(sideBySide);
      const root = wrap.getBoundingClientRect();
      const leftBox = a.getBoundingClientRect();
      const rightBox = b.getBoundingClientRect();

      if (sideBySide) {
        setPoints({
          feeds: {
            from: { x: leftBox.right - root.left, y: leftBox.top - root.top + leftBox.height * 0.38 },
            to: { x: rightBox.left - root.left, y: rightBox.top - root.top + rightBox.height * 0.38 },
          },
          proves: {
            from: { x: rightBox.left - root.left, y: rightBox.top - root.top + rightBox.height * 0.68 },
            to: { x: leftBox.right - root.left, y: leftBox.top - root.top + leftBox.height * 0.68 },
          },
        });
        return;
      }

      setPoints({
        feeds: {
          from: { x: leftBox.left - root.left + leftBox.width / 2, y: leftBox.bottom - root.top },
          to: { x: rightBox.left - root.left + rightBox.width / 2, y: rightBox.top - root.top },
        },
        proves: {
          from: { x: rightBox.left - root.left + rightBox.width * 0.68, y: rightBox.top - root.top },
          to: { x: leftBox.left - root.left + leftBox.width * 0.68, y: leftBox.bottom - root.top },
        },
      });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(wrap);
    observer.observe(a);
    observer.observe(b);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <div ref={wrapRef} className="relative">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div ref={leftRef}>{left}</div>
        <div ref={rightRef}>{right}</div>
      </div>
      {points ? (
        <svg
          aria-hidden="true"
          data-phase="in"
          data-reduced={reduced ? "" : undefined}
          className="index-sketch pointer-events-none absolute inset-0 z-10 size-full overflow-visible text-amber-400"
        >
          <LoopArrow
            from={points.feeds.from}
            to={points.feeds.to}
            label="feeds"
            seed={0.32}
            showLabel={wide}
          />
          {wide ? (
            <LoopArrow
              from={points.proves.from}
              to={points.proves.to}
              label="proves"
              seed={0.71}
              showLabel
            />
          ) : null}
        </svg>
      ) : null}
      {!wide ? (
        <p className="pointer-events-none absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-line bg-canvas px-2.5 py-1 font-mono text-[0.625rem] tracking-[0.09em] text-amber-300 uppercase">
          feeds
        </p>
      ) : null}
    </div>
  );
}

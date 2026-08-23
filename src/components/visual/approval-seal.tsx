"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { Check } from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const CX = 80;
const CY = 80;
const CIRCLE_R = 58;
const TICK_COUNT = 12;
const TICK_INNER = 63;
const TICK_LEN = 9;

const JITTERS = [1.8, -1.15, 2.1, -0.75, 1.45, -1.7, 1.05, -1.25] as const;

function n(value: number) {
  return value.toFixed(2);
}

/** Slightly uneven closed loop with a small overlap where the stamp stroke meets. */
function wobbleCirclePath() {
  const count = JITTERS.length;
  const handle = (4 / 3) * Math.tan(Math.PI / (2 * count));
  const points = JITTERS.map((jitter, index) => {
    const angle = (index / count) * Math.PI * 2;
    const radius = CIRCLE_R + jitter;
    return {
      angle,
      radius,
      x: CX + Math.cos(angle) * radius,
      y: CY + Math.sin(angle) * radius,
    };
  });

  const overlap = {
    x: CX + Math.cos(0.14) * (CIRCLE_R + 2.2),
    y: CY + Math.sin(0.14) * (CIRCLE_R + 2.2),
    angle: 0.14,
    radius: CIRCLE_R + 2.2,
  };

  const cubic = (
    from: (typeof points)[number],
    to: { x: number; y: number; angle: number; radius: number },
  ) => {
    const c1x = from.x + -Math.sin(from.angle) * handle * from.radius;
    const c1y = from.y + Math.cos(from.angle) * handle * from.radius;
    const c2x = to.x - -Math.sin(to.angle) * handle * to.radius;
    const c2y = to.y - Math.cos(to.angle) * handle * to.radius;
    return `C ${n(c1x)} ${n(c1y)}, ${n(c2x)} ${n(c2y)}, ${n(to.x)} ${n(to.y)}`;
  };

  let d = `M ${n(points[0].x)} ${n(points[0].y)}`;
  for (let i = 0; i < count - 1; i += 1) {
    d += ` ${cubic(points[i], points[i + 1])}`;
  }
  d += ` ${cubic(points[count - 1], { ...points[0], angle: Math.PI * 2 })}`;
  d += ` ${cubic({ ...points[0], angle: 0 }, overlap)}`;
  return d;
}

const SEAL_PATH = wobbleCirclePath();

const TICKS = Array.from({ length: TICK_COUNT }, (_, index) => {
  const angle = (index / TICK_COUNT) * Math.PI * 2 - Math.PI / 2 + ((index % 3) - 1) * 0.03;
  const inner = TICK_INNER + (index % 2) * 0.6;
  const outer = inner + TICK_LEN + (index % 3) * 0.8;
  return {
    x1: CX + Math.cos(angle) * inner,
    y1: CY + Math.sin(angle) * inner,
    x2: CX + Math.cos(angle) * outer,
    y2: CY + Math.sin(angle) * outer,
  };
});

export function ApprovalSeal() {
  const reduced = usePrefersReducedMotion();
  const [drawn, setDrawn] = useState(reduced);

  useEffect(() => {
    if (reduced) {
      setDrawn(true);
      return;
    }
    const timer = window.setTimeout(() => setDrawn(true), 140);
    return () => window.clearTimeout(timer);
  }, [reduced]);

  return (
    <div
      className="approval-seal"
      data-phase={drawn ? "in" : undefined}
      data-reduced={reduced ? "" : undefined}
      aria-hidden="true"
    >
      <svg viewBox="0 0 160 160" className="approval-seal-svg">
        <g className="approval-seal-press">
          <path
            d={SEAL_PATH}
            pathLength={1}
            fill="none"
            stroke="currentColor"
            strokeWidth="2.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="approval-seal-circle"
          />
          {TICKS.map((tick, index) => (
            <line
              key={index}
              x1={tick.x1}
              y1={tick.y1}
              x2={tick.x2}
              y2={tick.y2}
              pathLength={1}
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="approval-seal-tick"
              style={{ "--tick-i": index } as CSSProperties}
            />
          ))}
        </g>
      </svg>
      <span className="approval-seal-mark">
        <Check className="size-5" strokeWidth={2.25} />
      </span>
    </div>
  );
}

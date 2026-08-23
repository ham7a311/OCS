"use client";

import { useEffect, useState } from "react";
import { Check, Minus } from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const CX = 80;
const CY = 80;
const CIRCLE_R = 58;
const TICK_INNER = 63;

const JITTERS = [1.8, -1.15, 2.1, -0.75, 1.45, -1.7, 1.05, -1.25] as const;

export type SealVariant = "outlined-gold" | "filled-gold" | "outlined-muted";

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

function makeTicks(count: number, length: number) {
  return Array.from({ length: count }, (_, index) => {
    const angle = (index / count) * Math.PI * 2 - Math.PI / 2 + ((index % 3) - 1) * 0.03;
    const inner = TICK_INNER + (index % 2) * 0.6;
    const outer = inner + length + (index % 3) * 0.8;
    return {
      x1: n(CX + Math.cos(angle) * inner),
      y1: n(CY + Math.sin(angle) * inner),
      x2: n(CX + Math.cos(angle) * outer),
      y2: n(CY + Math.sin(angle) * outer),
    };
  });
}

const TICKS_PENDING = makeTicks(12, 9);
const TICKS_ACCEPTED = makeTicks(12, 11);

const SPARKLES = [
  { d: "M16.4 2.8 L16.8 12.6 M15.6 19.2 L15.1 29.4 M3.6 14.8 L13.4 15.9 M19.2 15.2 L29.1 16.6 M6.8 6.1 L13.7 13.4 M18.9 18.4 L26.8 27.1", className: "approval-seal-sparkle-tr" },
  { d: "M15.7 3.4 L16.1 13.2 M16.6 18.6 L17.2 28.8 M3.4 16.4 L13.2 15.5 M18.8 16.8 L28.6 15.4 M7.4 7.6 L13.9 13.8 M18.2 18.1 L25.6 26.2", className: "approval-seal-sparkle-bl" },
  { d: "M16.1 3.1 L16.4 12.4 M16.2 19.0 L15.8 28.6 M4.0 15.6 L13.6 16.0 M19.0 15.8 L28.4 16.2 M7.0 6.8 L13.8 13.5 M18.6 18.2 L26.2 26.4", className: "approval-seal-sparkle-tl" },
] as const;

export function ApprovalSeal({
  variant = "outlined-gold",
  celebrate = false,
}: {
  variant?: SealVariant;
  celebrate?: boolean;
}) {
  const reduced = usePrefersReducedMotion();
  const [drawn, setDrawn] = useState(false);
  const ticks = variant === "filled-gold" ? TICKS_ACCEPTED : variant === "outlined-gold" ? TICKS_PENDING : [];
  const tickWidth = variant === "filled-gold" ? "2.35" : "2";

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
      data-variant={variant}
      data-phase={drawn ? "in" : undefined}
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
          {ticks.map((tick, index) => (
            <line
              key={index}
              x1={tick.x1}
              y1={tick.y1}
              x2={tick.x2}
              y2={tick.y2}
              stroke="currentColor"
              strokeWidth={tickWidth}
              strokeLinecap="round"
              className="approval-seal-tick"
            />
          ))}
        </g>
      </svg>
      {celebrate
        ? SPARKLES.map((sparkle) => (
            <svg
              key={sparkle.className}
              viewBox="0 0 32 32"
              className={`approval-seal-sparkle ${sparkle.className}`}
            >
              <path
                d={sparkle.d}
                pathLength={1}
                fill="none"
                stroke="currentColor"
                strokeWidth="2.1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="approval-seal-sparkle-stroke"
              />
            </svg>
          ))
        : null}
      <span className="approval-seal-mark">
        {variant === "outlined-muted" ? (
          <Minus className="size-5" strokeWidth={2.5} />
        ) : (
          <Check className={variant === "filled-gold" ? "size-6" : "size-5"} strokeWidth={variant === "filled-gold" ? 2.75 : 2.25} />
        )}
      </span>
    </div>
  );
}

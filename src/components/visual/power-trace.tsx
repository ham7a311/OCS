"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

const TRACES = {
  "top-right": {
    d: "M60 3 L60 17 L22 17 L22 39",
    pad: { cx: 22, cy: 39 },
  },
  "bottom-left": {
    d: "M4 41 L4 27 L42 27 L42 5",
    pad: { cx: 42, cy: 5 },
  },
} as const;

type TraceSide = keyof typeof TRACES;

function PowerTrace({
  side,
  armed,
  reduced,
}: {
  side: TraceSide;
  armed: boolean;
  reduced: boolean;
}) {
  const [powered, setPowered] = useState(false);
  const trace = TRACES[side];

  useEffect(() => {
    if (!armed) return;
    if (reduced) {
      setPowered(true);
      return;
    }
    const delay = side === "top-right" ? 600 : 690;
    const id = window.setTimeout(() => setPowered(true), delay);
    return () => window.clearTimeout(id);
  }, [armed, reduced, side]);

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 64 44"
      data-phase={armed ? "in" : undefined}
      data-powered={powered ? "" : undefined}
      data-reduced={reduced ? "" : undefined}
      className={cn(
        "power-trace pointer-events-none absolute h-11 w-16 overflow-visible",
        side === "top-right" && "power-trace-top-right -top-9 right-1",
        side === "bottom-left" && "power-trace-bottom-left -bottom-9 left-1",
      )}
    >
      <path
        d={trace.d}
        pathLength={1}
        fill="none"
        strokeWidth="1.75"
        strokeLinecap="square"
        strokeLinejoin="miter"
        className="power-trace-line"
      />
      <circle
        cx={trace.pad.cx}
        cy={trace.pad.cy}
        r="3.5"
        className="power-trace-pad"
      />
    </svg>
  );
}

export function PowerTraceCta({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [armed, setArmed] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const node = wrapRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setArmed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className="relative w-[min(100%,20.5rem)] overflow-visible">
      <PowerTrace side="top-right" armed={armed} reduced={reduced} />
      <Button href={href} size="lg" className="relative z-[1] h-14 w-full px-8 text-[1.05rem]">
        {children}
      </Button>
      <PowerTrace side="bottom-left" armed={armed} reduced={reduced} />
    </div>
  );
}

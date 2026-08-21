"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

const SEALS = {
  "top-right": {
    d: "M50 10 A 22 22 0 1 0 14 44",
    pad: { cx: 14, cy: 44 },
  },
  "bottom-left": {
    d: "M6 46 A 22 22 0 1 0 42 12",
    pad: { cx: 42, cy: 12 },
  },
} as const;

type SealSide = keyof typeof SEALS;

function SealArc({
  side,
  armed,
  reduced,
}: {
  side: SealSide;
  armed: boolean;
  reduced: boolean;
}) {
  const [powered, setPowered] = useState(false);
  const seal = SEALS[side];

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
      viewBox="0 0 56 56"
      data-phase={armed ? "in" : undefined}
      data-powered={powered ? "" : undefined}
      data-reduced={reduced ? "" : undefined}
      className={cn(
        "seal-arc pointer-events-none absolute size-14 overflow-visible sm:size-[3.5rem]",
        side === "top-right" && "seal-arc-top-right -top-10 right-0",
        side === "bottom-left" && "seal-arc-bottom-left -bottom-10 left-0",
      )}
    >
      <path
        d={seal.d}
        pathLength={1}
        fill="none"
        strokeWidth="1.75"
        strokeLinecap="round"
        className="seal-arc-line"
      />
      <circle cx={seal.pad.cx} cy={seal.pad.cy} r="4" className="seal-arc-pad" />
    </svg>
  );
}

export function SealCta({
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
      <SealArc side="top-right" armed={armed} reduced={reduced} />
      <Button href={href} size="lg" className="relative z-[1] h-14 w-full px-8 text-[1.05rem]">
        {children}
      </Button>
      <SealArc side="bottom-left" armed={armed} reduced={reduced} />
    </div>
  );
}

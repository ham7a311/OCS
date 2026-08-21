"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

/**
 * Six-ray asterisks with uneven lengths and a slightly off-center hub so they
 * read as a quick scribble, not a geometric star.
 */
const SPARKLE_TOP =
  "M16.4 2.8 L16.8 12.6 M15.6 19.2 L15.1 29.4 M3.6 14.8 L13.4 15.9 M19.2 15.2 L29.1 16.6 M6.8 6.1 L13.7 13.4 M18.9 18.4 L26.8 27.1";
const SPARKLE_BOTTOM =
  "M15.7 3.4 L16.1 13.2 M16.6 18.6 L17.2 28.8 M3.4 16.4 L13.2 15.5 M18.8 16.8 L28.6 15.4 M7.4 7.6 L13.9 13.8 M18.2 18.1 L25.6 26.2";

function SparkleMark({
  position,
  drawn,
  reduced,
}: {
  position: "top-right" | "bottom-left";
  drawn: boolean;
  reduced: boolean;
}) {
  const phase = drawn ? "in" : undefined;

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 32 32"
      data-phase={phase}
      data-reduced={reduced ? "" : undefined}
      className={cn(
        "sparkle-accent index-sketch pointer-events-none absolute size-7 overflow-visible text-amber-400 sm:size-8",
        position === "top-right" && "-top-5 -right-5 sm:-top-6 sm:-right-6",
        position === "bottom-left" && "-bottom-5 -left-5 sm:-bottom-6 sm:-left-6",
      )}
    >
      <path
        d={position === "top-right" ? SPARKLE_TOP : SPARKLE_BOTTOM}
        pathLength={1}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="index-sketch-stroke"
      />
    </svg>
  );
}

export function MemberSparkleCta({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [drawn, setDrawn] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const node = wrapRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDrawn(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className="relative w-[min(100%,20.5rem)]">
      <SparkleMark position="top-right" drawn={drawn} reduced={reduced} />
      <Button href={href} size="lg" className="h-14 w-full px-8 text-[1.05rem]">
        {children}
      </Button>
      <SparkleMark position="bottom-left" drawn={drawn} reduced={reduced} />
    </div>
  );
}

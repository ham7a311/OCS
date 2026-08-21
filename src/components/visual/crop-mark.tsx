"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

/** Printer's crop marks — two strokes that don't quite meet at the corner. */
const MARK_TL = "M4 18 L4 5 M5 4 L18 4";
const MARK_BR = "M28 14 L28 27 M27 28 L14 28";

function CropMark({
  corner,
  drawn,
  reduced,
}: {
  corner: "top-left" | "bottom-right";
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
        "crop-mark index-sketch pointer-events-none absolute size-6 overflow-visible text-amber-400 sm:size-7",
        corner === "top-left" && "crop-mark-tl -top-3.5 -left-3.5 sm:-top-4 sm:-left-4",
        corner === "bottom-right" && "crop-mark-br -bottom-3.5 -right-3.5 sm:-bottom-4 sm:-right-4",
      )}
    >
      <path
        d={corner === "top-left" ? MARK_TL : MARK_BR}
        pathLength={1}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="square"
        className="index-sketch-stroke"
      />
    </svg>
  );
}

export function CropMarkCta({
  href,
  secondary,
  children,
}: {
  href: string;
  secondary?: { href: string; label: string };
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
    <div className="flex w-full flex-col items-center gap-4 text-center">
      {secondary ? (
        <a
          href={secondary.href}
          className="font-mono text-[0.6875rem] tracking-[0.09em] text-ink-muted uppercase transition-colors duration-200 ease-ui hover:text-ink"
        >
          {secondary.label}
        </a>
      ) : null}
      <div ref={wrapRef} className="relative w-[min(100%,20.5rem)]">
        <CropMark corner="top-left" drawn={drawn} reduced={reduced} />
        <Button href={href} size="lg" className="h-14 w-full px-8 text-[1.05rem]">
          {children}
        </Button>
        <CropMark corner="bottom-right" drawn={drawn} reduced={reduced} />
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

/**
 * Counts a figure up the first time it approaches the viewport.
 *
 * The final value is what renders on the server and before the animation arms,
 * so the real number is present even if scripting or animation never runs
 * (SRS NFR-031). Counting starts a little before the figure is on screen, so
 * the reset to zero happens out of sight.
 */
export function useCountUp(target: number, durationMs = 1400) {
  const reduced = usePrefersReducedMotion();
  const [animated, setAnimated] = useState<number | null>(null);
  const ref = useRef<HTMLSpanElement | null>(null);
  const frame = useRef(0);

  useEffect(() => {
    if (reduced) return;

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const start = performance.now();

        const tick = (now: number) => {
          const progress = Math.min((now - start) / durationMs, 1);
          // Mirrors the entrance easing so counting feels like arriving.
          const eased = 1 - Math.pow(1 - progress, 4);
          setAnimated(Math.round(target * eased));
          if (progress < 1) frame.current = requestAnimationFrame(tick);
        };

        frame.current = requestAnimationFrame(tick);
      },
      // Fires roughly 240px before the figure enters view.
      { rootMargin: "0px 0px 240px 0px", threshold: 0 },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame.current);
    };
  }, [target, durationMs, reduced]);

  return { ref, value: animated ?? target };
}

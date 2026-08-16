import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "canvas" | "raised" | "elevated";

const tones: Record<Tone, string> = {
  canvas: "bg-transparent",
  raised: "bg-surface-1",
  elevated: "bg-surface-2",
};

/**
 * Every section on the page is one of these. Tones sit only a few percent
 * apart and a fading hairline marks the seam, so sections read as movements
 * within one environment rather than as separate pages stacked together.
 */
export function Section({
  id,
  tone = "canvas",
  divider = true,
  labelledBy,
  className,
  children,
}: {
  id?: string;
  tone?: Tone;
  divider?: boolean;
  labelledBy?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn("relative isolate section-y scroll-mt-[var(--ocs-nav-clearance)]", tones[tone], className)}
    >
      {divider ? (
        <div aria-hidden="true" className="absolute inset-x-0 top-0 rule-fade" />
      ) : null}
      {children}
    </section>
  );
}

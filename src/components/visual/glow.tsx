import { cn } from "@/lib/utils";

type GlowProps = {
  /** Diameter as a CSS length. Wide and low-opacity, never a tight blob. */
  size?: string;
  opacity?: number;
  className?: string;
};

/**
 * A single wide bloom used to lift a focal area off the background. Soft and
 * very low opacity by design, so it reads as light rather than as an object.
 * `--ocs-glow-gain` raises the same bloom on paper so it does not disappear.
 */
export function Glow({ size = "44rem", opacity = 0.06, className }: GlowProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute rounded-full", className)}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, rgb(232 162 74 / calc(${opacity} * var(--ocs-glow-gain))) 0%, rgb(232 162 74 / calc(${opacity * 0.35} * var(--ocs-glow-gain))) 35%, transparent 70%)`,
      }}
    />
  );
}

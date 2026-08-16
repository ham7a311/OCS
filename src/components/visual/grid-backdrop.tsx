import { cn } from "@/lib/utils";

type GridBackdropProps = {
  /** Cell size in pixels. Larger reads calmer. */
  size?: number;
  /** Line opacity. Kept far below the content contrast at every level. */
  intensity?: "faint" | "low" | "medium";
  /** Slow vertical drift. Hero and Join only. */
  drift?: boolean;
  /** Where the grid dissolves into the background. */
  fade?: "bottom" | "radial" | "top";
  className?: string;
};

const intensities = {
  faint: 0.018,
  low: 0.028,
  medium: 0.04,
} as const;

const fades = {
  bottom: "linear-gradient(to bottom, black 0%, black 45%, transparent 100%)",
  top: "linear-gradient(to bottom, transparent 0%, black 40%, black 100%)",
  radial: "radial-gradient(ellipse 80% 60% at 50% 40%, black 0%, transparent 100%)",
} as const;

/**
 * The structural motif carried across the page: a precise measured grid,
 * always present, never loud. Purely decorative, so it is hidden from
 * assistive technology (SRS NFR-013).
 */
export function GridBackdrop({
  size = 64,
  intensity = "faint",
  drift = false,
  fade = "bottom",
  className,
}: GridBackdropProps) {
  const line = `rgba(var(--ocs-grid-line), calc(${intensities[intensity]} * var(--ocs-grid-gain)))`;
  const mask = fades[fade];

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      style={{ maskImage: mask, WebkitMaskImage: mask }}
    >
      <div
        className="absolute inset-x-0 -top-16 bottom-0"
        style={
          {
            "--grid-size": `${size}px`,
            backgroundImage: `linear-gradient(to right, ${line} 1px, transparent 1px), linear-gradient(to bottom, ${line} 1px, transparent 1px)`,
            backgroundSize: `${size}px ${size}px`,
            animation: drift ? "ocs-grid-drift 24s linear infinite" : undefined,
            willChange: drift ? "transform" : undefined,
          } as React.CSSProperties
        }
      />
    </div>
  );
}

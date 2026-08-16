import { cn } from "@/lib/utils";

/**
 * The OCS mark: a precise ring with a single notch, set in a squared frame.
 * Geometric rather than illustrative, so it belongs to the grid motif that
 * runs through the rest of the page.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "grid size-8 shrink-0 place-items-center rounded-sm border border-line bg-surface-2",
        className,
      )}
    >
      <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true" fill="none">
        <circle
          cx="12"
          cy="12"
          r="7.5"
          stroke="var(--color-ink-muted)"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeDasharray="35 12"
          transform="rotate(-45 12 12)"
        />
        <circle cx="12" cy="12" r="2" fill="var(--color-amber-500)" />
      </svg>
    </span>
  );
}

import type { ReactNode } from "react";
import type { EventStatus } from "@/data/events";
import { cn } from "@/lib/utils";

/**
 * Two badge shapes only: a squared chip for categories, a pill with a dot for
 * status. Colour carries meaning here and nowhere else in the system.
 */

export function CategoryBadge({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm border border-amber-500/25 bg-amber-500/[0.08]",
        "px-2.5 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.09em] text-amber-300",
        className,
      )}
    >
      {children}
    </span>
  );
}

const statusStyles: Record<EventStatus, { chip: string; dot: string }> = {
  upcoming: {
    chip: "border-amber-500/30 bg-amber-500/[0.1] text-amber-300",
    dot: "bg-amber-400",
  },
  "registration-open": {
    chip: "border-signal-success/30 bg-signal-success/[0.1] text-signal-success",
    dot: "bg-signal-success",
  },
  completed: {
    chip: "border-line bg-surface-3 text-ink-muted",
    dot: "bg-ink-faint",
  },
  cancelled: {
    chip: "border-signal-error/30 bg-signal-error/[0.1] text-signal-error",
    dot: "bg-signal-error",
  },
};

export function StatusBadge({
  status,
  label,
  className,
}: {
  status: EventStatus;
  label: string;
  className?: string;
}) {
  const style = statusStyles[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1",
        "font-mono text-[0.6875rem] uppercase tracking-[0.09em]",
        style.chip,
        className,
      )}
    >
      <span className={cn("size-1.5 rounded-full", style.dot)} aria-hidden="true" />
      {label}
    </span>
  );
}

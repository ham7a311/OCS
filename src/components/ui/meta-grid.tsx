import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type MetaItem = {
  label: string;
  value: ReactNode;
};

/**
 * Shared label/value band used for stats footnotes and event metadata.
 * Hairline seams come from 1px gaps, not per-cell borders.
 */
export function MetaGrid({
  items,
  className,
  columns,
}: {
  items: MetaItem[];
  className?: string;
  columns?: 2 | 3 | 4;
}) {
  const cols =
    columns === 2
      ? "grid-cols-2"
      : columns === 3
        ? "grid-cols-2 sm:grid-cols-3"
        : "grid-cols-2 lg:grid-cols-4";

  return (
    <dl className={cn("grid gap-px bg-line-subtle", cols, className)}>
      {items.map((item) => (
        <div key={item.label} className="bg-surface-1 px-6 py-5 sm:px-8">
          <dt className="font-mono text-[0.6875rem] tracking-[0.09em] text-ink-muted uppercase">
            {item.label}
          </dt>
          <dd className="mt-2 text-[0.9375rem] text-ink">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function PagerButton({
  label,
  onClick,
  children,
  className,
}: {
  label: string;
  onClick: () => void;
  children: ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn(
        "inline-flex size-11 shrink-0 items-center justify-center rounded-md border border-line text-ink",
        "transition-colors duration-200 ease-ui hover:border-line-strong hover:bg-surface-2/80",
        className,
      )}
    >
      {children}
    </button>
  );
}

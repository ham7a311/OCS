import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function ChoiceChip({
  selected,
  children,
  className,
  disabled,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  selected?: boolean;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      disabled={disabled}
      className={cn(
        "inline-flex min-h-11 items-center rounded-full border px-3.5 py-2",
        "font-mono text-[0.6875rem] uppercase tracking-[0.08em]",
        "transition-colors duration-200 ease-ui",
        selected
          ? "border-amber-500 bg-amber-500 text-on-accent"
          : "border-line bg-transparent text-ink-muted hover:border-line-strong hover:text-ink",
        disabled && "cursor-not-allowed opacity-45 hover:border-line hover:text-ink-muted",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

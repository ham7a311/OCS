import type { ReactNode } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function Checkbox({
  id,
  checked,
  onChange,
  children,
  disabled,
}: {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  children: ReactNode;
  disabled?: boolean;
}) {
  return (
    <label
      htmlFor={id}
      className={cn(
        "flex min-h-11 cursor-pointer items-start gap-3",
        disabled && "cursor-not-allowed opacity-45",
      )}
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(event) => onChange(event.target.checked)}
        className="peer sr-only"
      />
      <span
        aria-hidden="true"
        className={cn(
          "relative mt-0.5 grid size-5 shrink-0 place-items-center rounded-sm border transition-colors duration-200 ease-ui",
          "peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-amber-400",
          checked ? "border-amber-500 bg-amber-500" : "border-line bg-transparent",
        )}
      >
        <Check
          className={cn(
            "size-3 text-on-accent transition-opacity duration-200 ease-ui",
            checked ? "opacity-100" : "opacity-0",
          )}
          strokeWidth={2.5}
        />
      </span>
      <span className="pt-px text-sm leading-relaxed text-ink-muted">{children}</span>
    </label>
  );
}

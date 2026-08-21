import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const controlClass =
  "w-full rounded-md border bg-surface-1 px-3.5 text-[0.9375rem] text-ink " +
  "placeholder:text-ink-faint transition-[border-color,background-color] duration-200 ease-ui " +
  "focus-visible:border-amber-400 focus-visible:outline-none";

export function Field({
  label,
  htmlFor,
  helper,
  error,
  required,
  children,
}: {
  label: string;
  htmlFor?: string;
  helper?: ReactNode;
  error?: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={htmlFor}
        className="font-mono text-[0.6875rem] tracking-[0.09em] text-ink-muted uppercase"
      >
        {label}
        {required ? (
          <span className="text-signal-error" aria-hidden="true">
            {" "}
            *
          </span>
        ) : null}
      </label>
      {children}
      {error ? <p className="text-sm text-signal-error">{error}</p> : null}
      {helper ? (
        <p className="text-[0.8125rem] leading-snug text-ink-faint">{helper}</p>
      ) : null}
    </div>
  );
}

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  invalid?: boolean;
};

export function TextInput({ invalid, className, readOnly, ...props }: TextInputProps) {
  return (
    <input
      {...props}
      readOnly={readOnly}
      aria-invalid={invalid || undefined}
      className={cn(
        controlClass,
        "h-11",
        readOnly && "pointer-events-none cursor-default border-line-subtle bg-surface-2 text-ink-muted",
        props.disabled && "cursor-not-allowed opacity-45",
        !readOnly && (invalid ? "border-signal-error" : "border-line"),
        className,
      )}
    />
  );
}

type SelectFieldProps = SelectHTMLAttributes<HTMLSelectElement> & {
  invalid?: boolean;
};

export function SelectField({ invalid, className, children, ...props }: SelectFieldProps) {
  return (
    <div className="relative">
      <select
        {...props}
        aria-invalid={invalid || undefined}
        className={cn(
          controlClass,
          "h-11 appearance-none pr-10",
          invalid ? "border-signal-error" : "border-line",
          className,
        )}
      >
        {children}
      </select>
      <ChevronDown
        className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-ink-faint"
        aria-hidden="true"
      />
    </div>
  );
}

type TextareaFieldProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  invalid?: boolean;
};

export function TextareaField({ invalid, className, ...props }: TextareaFieldProps) {
  return (
    <textarea
      {...props}
      aria-invalid={invalid || undefined}
      className={cn(
        controlClass,
        "min-h-[9.5rem] resize-y py-3",
        invalid ? "border-signal-error" : "border-line",
        className,
      )}
    />
  );
}

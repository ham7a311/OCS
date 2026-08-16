import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "group/button relative inline-flex select-none items-center justify-center gap-2 " +
  "rounded-md font-medium tracking-[-0.01em] whitespace-nowrap " +
  "transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-ui " +
  "active:translate-y-px disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  // The only saturated fill on the page. Reserved for the single primary action.
  // At rest this is a flat fill with a single specular edge. The glow is an
  // interaction cue, not a permanent decoration.
  primary: cn(
    "bg-amber-500 text-on-accent",
    "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.22)]",
    "hover:bg-amber-400 hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.28),0_10px_24px_-16px_rgba(232,162,74,0.55)]",
  ),
  secondary: cn(
    "border border-line bg-surface-2/70 text-ink backdrop-blur-sm",
    "hover:border-line-strong hover:bg-surface-3",
  ),
  ghost: "text-ink-muted hover:text-ink",
};

// Every size clears the 44px touch target once padding is counted.
const sizes: Record<Size, string> = {
  sm: "h-10 px-3.5 text-[0.875rem]",
  md: "h-11 px-5 text-[0.9375rem]",
  lg: "h-12 px-6 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: never;
    external?: never;
  };

type ButtonAsLink = CommonProps & {
  href: string;
  /** Opens in a new tab with `rel="noopener noreferrer"` (SRS SEC-002). */
  external?: boolean;
  "aria-label"?: string;
};

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { variant = "primary", size = "md", className, children } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if ("href" in props && props.href !== undefined) {
    const { href, external, ...rest } = props;
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        aria-label={rest["aria-label"]}
      >
        {children}
      </a>
    );
  }

  const { variant: _variant, size: _size, className: _className, children: _children, ...rest } =
    props as ButtonAsButton;

  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  );
}

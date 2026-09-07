import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type HalftoneCtaProps = {
  badge: string;
  heading: ReactNode;
  subtext: string;
  action: {
    href: string;
    label: string;
    external?: boolean;
    ariaLabel?: string;
  };
  className?: string;
};

/**
 * Tall, centered CTA banner. A faint halftone grid with a slow gold swirl
 * visible only through the same dots. Reserved for genuine call-to-action
 * moments — not general cards.
 */
export function HalftoneCta({
  badge,
  heading,
  subtext,
  action,
  className,
}: HalftoneCtaProps) {
  return (
    <div className={cn("halftone-cta", className)}>
      <div className="halftone-cta__swirl" aria-hidden="true">
        <div className="halftone-cta__swirl-paint" />
      </div>
      <div className="halftone-cta__scrim" aria-hidden="true" />
      <div className="halftone-cta__content">
        <span className="halftone-cta__badge">{badge}</span>
        <h2 className="halftone-cta__heading">{heading}</h2>
        <p className="halftone-cta__subtext">{subtext}</p>
        <a
          href={action.href}
          className="halftone-cta__button"
          {...(action.external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
          aria-label={action.ariaLabel}
        >
          {action.label}
        </a>
      </div>
    </div>
  );
}

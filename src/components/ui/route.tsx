import type { ElementType, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Coordinate plate: `OCS / 01 / ABOUT`. The first segment carries the gold
 * tick; `stop` marks the plate as a station on the homepage route spine.
 */
export function Coord({
  parts,
  stop,
  className,
  as: Tag = "p",
}: {
  parts: readonly string[];
  stop?: boolean;
  className?: string;
  as?: ElementType;
}) {
  return (
    <Tag className={cn("route-coord", className)} data-route-stop={stop ? "" : undefined}>
      <span className="route-coord__tick" aria-hidden="true" />
      {parts.map((part, index) => (
        <span key={`${part}-${index}`} className="route-coord__part">
          {index > 0 ? (
            <span className="route-coord__sep" aria-hidden="true">
              /
            </span>
          ) : null}
          {part}
        </span>
      ))}
    </Tag>
  );
}

/** Hairline with a gold origin node. Separates movements inside a section. */
export function RouteRule({ label, className }: { label?: string; className?: string }) {
  return (
    <div className={cn("route-rule", className)} role={label ? undefined : "presentation"}>
      <span className="route-rule__node" aria-hidden="true" />
      {label ? <span className="route-rule__label">{label}</span> : null}
      <span className="route-rule__line" aria-hidden="true" />
    </div>
  );
}

/**
 * Section lockup: coordinate, one large headline, and a lead set in the
 * opposite column so every section opens on the same asymmetric grid.
 */
export function DisplayLockup({
  coord,
  id,
  title,
  lead,
  aside,
  className,
  as: Heading = "h2",
}: {
  coord: readonly string[];
  id?: string;
  title: ReactNode;
  lead?: ReactNode;
  aside?: ReactNode;
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <header className={cn("grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-10", className)}>
      <div className="lg:col-span-7">
        <Coord parts={coord} stop />
        <Heading id={id} className="mt-6 max-w-[18ch] text-lockup text-ink">
          {title}
        </Heading>
      </div>
      {lead || aside ? (
        <div className="lg:col-span-5 lg:pb-1">
          {lead ? <p className="max-w-[46ch] text-lead text-ink-muted">{lead}</p> : null}
          {aside}
        </div>
      ) : null}
    </header>
  );
}

/**
 * One entry in an editorial index: marker, title, body. Rows share a
 * hairline and a gold underline that draws on hover or focus.
 */
export function IndexRow({
  marker,
  title,
  meta,
  children,
  href,
  external,
  id,
  className,
  titleAs: Title = "h3",
}: {
  marker: string;
  title: ReactNode;
  meta?: ReactNode;
  children?: ReactNode;
  href?: string;
  external?: boolean;
  id?: string;
  className?: string;
  titleAs?: ElementType;
}) {
  const body = (
    <>
      <span className="route-row__marker">{marker}</span>
      <div className="route-row__head">
        <Title className="route-row__title">
          {title}
          {href ? (
            <ArrowUpRight className="route-row__arrow" aria-hidden="true" strokeWidth={1.5} />
          ) : null}
        </Title>
        {meta ? <div className="route-row__meta">{meta}</div> : null}
      </div>
      {children ? <div className="route-row__body">{children}</div> : null}
    </>
  );

  if (href) {
    return (
      <a
        id={id}
        href={href}
        className={cn("route-row route-row--link", className)}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {body}
        {external ? <span className="sr-only"> (opens in a new tab)</span> : null}
      </a>
    );
  }

  return (
    <article id={id} className={cn("route-row", className)}>
      {body}
    </article>
  );
}

/** Mono text link with an arrow. The quiet alternative to a button. */
export function RouteLink({
  href,
  children,
  external,
  className,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={cn("route-link", className)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
      <ArrowUpRight className="size-3.5" aria-hidden="true" />
      {external ? <span className="sr-only"> (opens in a new tab)</span> : null}
    </a>
  );
}

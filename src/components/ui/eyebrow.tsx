import { cn } from "@/lib/utils";

/**
 * The section marker used above every heading. The two-digit index and
 * hairline are what make the page read as one engineered document rather than
 * a stack of unrelated blocks.
 */
export function Eyebrow({
  index,
  children,
  className,
}: {
  index?: string;
  children: string;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 font-mono text-label uppercase text-ink-faint",
        className,
      )}
    >
      {index ? (
        <>
          <span className="text-amber-300">{index}</span>
          <span className="h-px w-6 bg-line-strong" aria-hidden="true" />
        </>
      ) : (
        <span className="h-px w-6 bg-line-strong" aria-hidden="true" />
      )}
      <span>{children}</span>
    </p>
  );
}

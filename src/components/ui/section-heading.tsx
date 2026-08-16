import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/lib/utils";

/**
 * The typographic signature: a serif italic phrase set inside an otherwise
 * sans headline. Used once per heading, never twice.
 */
export function Em({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <em className={cn("font-serif font-normal italic tracking-[0.005em]", className)}>
      {children}
    </em>
  );
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  align = "start",
  className,
  id,
}: {
  index?: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "start" | "center";
  className?: string;
  id?: string;
}) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        centered && "items-center text-center",
        className,
      )}
    >
      <Eyebrow index={index}>{eyebrow}</Eyebrow>
      <h2 id={id} className="max-w-[20ch] text-h2 text-ink">
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "max-w-[52ch] text-lead text-ink-muted",
            centered && "mx-auto",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

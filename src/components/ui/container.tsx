import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ContainerProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  /** Full-bleed measure for hero and event panels. */
  wide?: boolean;
};

export function Container({ as: Tag = "div", children, className, wide }: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full px-5 sm:px-8 lg:px-12",
        wide ? "max-w-[84rem]" : "max-w-page",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

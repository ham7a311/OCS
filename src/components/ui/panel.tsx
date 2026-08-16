import { cn } from "@/lib/utils";

type PanelProps = React.ComponentProps<"div"> & {
  /** `raised` is for the one focal panel per page region. */
  tone?: "default" | "raised";
  interactive?: boolean;
};

/**
 * The single card language for the whole site: hairline border, barely-there
 * surface lift, 10px radius. Nothing here gets its own colour or gradient.
 */
export function Panel({
  tone = "default",
  interactive = false,
  className,
  ...props
}: PanelProps) {
  return (
    <div
      className={cn(
        "relative rounded-lg border border-line-subtle",
        tone === "default" ? "bg-surface-2/60" : "bg-surface-2",
        interactive &&
          "transition-colors duration-200 ease-ui hover:border-line hover:bg-surface-3/70",
        className,
      )}
      {...props}
    />
  );
}

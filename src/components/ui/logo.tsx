import Image from "next/image";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  /** Compact for the navbar, larger for the footer identity. */
  size?: "nav" | "footer";
};

/**
 * Official OCS lockup — transparent PNG, no plate or fill behind it.
 */
export function Logo({ className, size = "nav" }: LogoProps) {
  const footer = size === "footer";

  return (
    <Image
      src="/ocs-logo.png"
      alt="Oman Computing Society"
      width={912}
      height={651}
      priority={size === "nav"}
      unoptimized
      className={cn(
        "w-auto max-w-full shrink-0 object-contain",
        footer ? "h-[7.5rem] sm:h-36" : "h-11",
        className,
      )}
    />
  );
}

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
        "h-auto w-auto object-contain",
        footer
          ? "h-[6.5rem] max-w-full sm:h-36"
          : "h-9 max-w-[8.75rem] sm:h-11 sm:max-w-[11rem]",
        className,
      )}
    />
  );
}

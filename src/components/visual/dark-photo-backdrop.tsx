"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";

type PhotoId = "muttrah-corniche";
type Variant = "signin-panel";

const FILES = {
  "muttrah-corniche": {
    desktop: {
      webp: "/images/bg-muttrah-corniche.webp",
      jpeg: "/images/bg-muttrah-corniche.jpg",
    },
    mobile: {
      webp: "/images/bg-muttrah-corniche-800.webp",
      jpeg: "/images/bg-muttrah-corniche-800.jpg",
    },
  },
} as const;

const SIGNIN_DAY = {
  webp: "/images/bg-muttrah-corniche-day.webp",
  jpeg: "/images/bg-muttrah-corniche-day.jpg",
} as const;

function webpSupported() {
  return CSS.supports(
    "background-image",
    'url("data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=")',
  );
}

function pickUrl(photo: PhotoId, variant: Variant, theme: "light" | "dark") {
  // Sign-in left panel is `hidden` below md — do not download either photo.
  if (variant === "signin-panel" && window.matchMedia("(max-width: 767px)").matches) {
    return null;
  }

  const files = theme === "light" ? SIGNIN_DAY : FILES[photo].desktop;
  return webpSupported() ? files.webp : files.jpeg;
}

/**
 * Decorative section photograph. Night photos stay dark-mode-only except
 * the sign-in panel, which loads a daytime companion in light mode.
 * JPEG is used when WebP is unavailable. Mobile never downloads the
 * sign-in panel asset.
 */
export function DarkPhotoBackdrop({
  photo,
  variant,
  className,
}: {
  photo: PhotoId;
  variant: Variant;
  className?: string;
}) {
  const { theme } = useTheme();
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    const sync = () => setUrl(pickUrl(photo, variant, theme));
    sync();

    const queries = [window.matchMedia("(max-width: 767px)")];
    queries.forEach((query) => query.addEventListener("change", sync));
    return () => queries.forEach((query) => query.removeEventListener("change", sync));
  }, [theme, photo, variant]);

  if (!url) return null;

  return (
    <div
      aria-hidden="true"
      className={cn("dark-photo-backdrop", `dark-photo-backdrop--${variant}`, className)}
      style={{ ["--dark-photo" as string]: `url("${url}")` }}
    />
  );
}

"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";

type PhotoId = "opera-house" | "muttrah-corniche" | "grand-mosque";
type Variant = "closing-cta" | "signin-panel" | "money-section";

const FILES = {
  "opera-house": {
    desktop: {
      webp: "/images/bg-opera-house.webp",
      jpeg: "/images/bg-opera-house.jpg",
    },
    mobile: {
      webp: "/images/bg-opera-house-800.webp",
      jpeg: "/images/bg-opera-house-800.jpg",
    },
  },
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
  "grand-mosque": {
    desktop: {
      webp: "/images/bg-grand-mosque.webp",
      jpeg: "/images/bg-grand-mosque.jpg",
    },
    mobile: {
      webp: "/images/bg-grand-mosque-800.webp",
      jpeg: "/images/bg-grand-mosque-800.jpg",
    },
  },
} as const;

function webpSupported() {
  return CSS.supports(
    "background-image",
    'url("data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=")',
  );
}

function pickUrl(photo: PhotoId, variant: Variant) {
  if (
    (variant === "closing-cta" || variant === "money-section") &&
    window.matchMedia("(max-width: 479px)").matches
  ) {
    return null;
  }

  // Sign-in left panel is `hidden` below md — do not download the photo.
  if (variant === "signin-panel" && window.matchMedia("(max-width: 767px)").matches) {
    return null;
  }

  const mobile = window.matchMedia("(max-width: 767px)").matches;
  const files = FILES[photo][mobile ? "mobile" : "desktop"];
  return webpSupported() ? files.webp : files.jpeg;
}

/**
 * Decorative night photograph, mounted only in dark mode so light-theme
 * visitors never download it. JPEG is used when WebP is unavailable.
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
    if (theme !== "dark") {
      setUrl(null);
      return;
    }

    const sync = () => setUrl(pickUrl(photo, variant));
    sync();

    const queries = [
      window.matchMedia("(max-width: 479px)"),
      window.matchMedia("(max-width: 767px)"),
    ];
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

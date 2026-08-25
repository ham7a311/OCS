"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/hooks/use-theme";

const FILES = {
  desktop: {
    webp: "/images/join-courtyard-dark.webp",
    jpeg: "/images/join-courtyard-dark.jpg",
  },
  mobile: {
    webp: "/images/join-courtyard-dark-800.webp",
    jpeg: "/images/join-courtyard-dark-800.jpg",
  },
} as const;

function webpSupported() {
  return CSS.supports(
    "background-image",
    'url("data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=")',
  );
}

/**
 * Painterly courtyard illustration for Join / closing-CTA — dark mode only.
 * Light mode uses the site canvas with no raster. JPEG is the fallback when WebP is unavailable.
 */
export function JoinCourtyardBackdrop() {
  const { theme } = useTheme();
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    if (theme !== "dark") {
      setUrl(null);
      return;
    }

    const sync = () => {
      const mobile = window.matchMedia("(max-width: 767px)").matches;
      const files = FILES[mobile ? "mobile" : "desktop"];
      setUrl(webpSupported() ? files.webp : files.jpeg);
    };
    sync();

    const query = window.matchMedia("(max-width: 767px)");
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, [theme]);

  if (!url) return null;

  return (
    <div
      key={url}
      aria-hidden="true"
      className="join-courtyard-backdrop"
      style={{ ["--join-courtyard" as string]: `url("${url}")` }}
    />
  );
}

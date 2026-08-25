"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/hooks/use-theme";

const FILES = {
  dark: {
    webp: "/images/two-loops-dark.webp",
    png: "/images/two-loops-dark.png",
  },
  light: {
    webp: "/images/two-loops-light.webp",
    png: "/images/two-loops-light.png",
  },
} as const;

/**
 * Painterly two-loops ink-wash for the Model intro. Separate light/dark
 * rasters (not a CSS recolor). Desktop only — hidden below the lg breakpoint,
 * same pattern as Guarded Core. Out of flow so it never grows the section.
 */
export function TwoLoopsArtwork() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const files = FILES[theme];

  return (
    <picture className="model-intro-artwork-wrap">
      <source type="image/webp" srcSet={files.webp} />
      <img
        src={files.png}
        alt=""
        aria-hidden="true"
        className="model-intro-artwork"
        decoding="async"
        fetchPriority="low"
      />
    </picture>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/hooks/use-theme";

const FILES = {
  dark: {
    webp: "/images/circuit-roots-dark.webp",
    png: "/images/circuit-roots-dark.png",
  },
  light: {
    webp: "/images/circuit-roots-light.webp",
    png: "/images/circuit-roots-light.png",
  },
} as const;

/**
 * Tall circuit-to-roots ink-wash for Programs. Separate light/dark rasters
 * (not a CSS recolor). Desktop-wide only — hidden where the content column
 * eats the right gutter. Out of flow so it never grows the section.
 */
export function CircuitRootsArtwork() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const files = FILES[theme];

  return (
    <picture key={files.webp} className="programs-artwork-wrap">
      <source type="image/webp" srcSet={files.webp} />
      <img
        src={files.png}
        alt=""
        aria-hidden="true"
        className="programs-artwork"
        decoding="async"
        fetchPriority="low"
      />
    </picture>
  );
}

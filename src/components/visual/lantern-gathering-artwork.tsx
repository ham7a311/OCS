"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/hooks/use-theme";

const FILES = {
  dark: {
    webp: "/images/lantern-gathering-dark.webp",
    png: "/images/lantern-gathering-dark.png",
  },
  light: {
    webp: "/images/lantern-gathering-light.webp",
    png: "/images/lantern-gathering-light.png",
  },
} as const;

/**
 * Painterly lantern-and-moths illustration for Events. Separate light/dark
 * rasters with feathered alpha (not a CSS recolor). Desktop only — richer
 * and larger than the fine-line accents. Out of flow so it never grows
 * the section. Blend modes live in CSS and are a tested edge-softener.
 */
export function LanternGatheringArtwork() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const files = FILES[theme];

  return (
    <picture key={files.webp} className="events-artwork-wrap">
      <source type="image/webp" srcSet={files.webp} />
      <img
        src={files.png}
        alt=""
        aria-hidden="true"
        className="events-artwork"
        decoding="async"
        fetchPriority="low"
      />
    </picture>
  );
}

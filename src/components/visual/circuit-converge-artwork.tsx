"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/hooks/use-theme";

const FILES = {
  dark: {
    webp: "/images/circuit-converge-dark.webp",
    png: "/images/circuit-converge-dark.png",
  },
  light: {
    webp: "/images/circuit-converge-light.webp",
    png: "/images/circuit-converge-light.png",
  },
} as const;

/**
 * Painterly circuit-converge ink-wash for Build Squads. Separate light/dark
 * rasters (not a CSS recolor). Desktop only — same pattern as Two Loops.
 * Out of flow so it never grows the section.
 */
export function CircuitConvergeArtwork() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const files = FILES[theme];

  return (
    <picture key={files.webp} className="build-squads-artwork-wrap">
      <source type="image/webp" srcSet={files.webp} />
      <img
        src={files.png}
        alt=""
        aria-hidden="true"
        className="build-squads-artwork"
        decoding="async"
        fetchPriority="low"
      />
    </picture>
  );
}

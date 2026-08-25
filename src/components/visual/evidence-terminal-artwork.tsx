"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/hooks/use-theme";

const FILES = {
  dark: {
    webp: "/images/evidence-terminal-dark.webp",
    png: "/images/evidence-terminal-dark.png",
  },
  light: {
    webp: "/images/evidence-terminal-light.webp",
    png: "/images/evidence-terminal-light.png",
  },
} as const;

/**
 * Painterly terminal/circuit ink-wash for Evidence. Separate light/dark
 * rasters (not a CSS recolor). Desktop only — same pattern as Two Loops
 * and Circuit Converge. Out of flow so it never grows the section.
 */
export function EvidenceTerminalArtwork() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const files = FILES[theme];

  return (
    <picture key={files.webp} className="evidence-artwork-wrap">
      <source type="image/webp" srcSet={files.webp} />
      <img
        src={files.png}
        alt=""
        aria-hidden="true"
        className="evidence-artwork"
        decoding="async"
        fetchPriority="low"
      />
    </picture>
  );
}

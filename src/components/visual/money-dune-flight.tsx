"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/hooks/use-theme";

const FILES = {
  dark: {
    webp: "/images/money-dune-flight-dark.webp",
    jpeg: "/images/money-dune-flight-dark.jpg",
  },
  light: {
    webp: "/images/money-dune-flight-light.webp",
    jpeg: "/images/money-dune-flight-light.jpg",
  },
} as const;

/**
 * Painterly dune/flight illustration for the Money section. Two
 * purpose-generated rasters (gold in light, charcoal/ochre in dark) —
 * not a recolor. Only the active theme's file is downloaded.
 */
export function MoneyDuneFlight() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const files = FILES[theme];

  return (
    <picture className="money-section-artwork-wrap">
      <source type="image/webp" srcSet={files.webp} />
      <img
        src={files.jpeg}
        alt=""
        aria-hidden="true"
        className="money-section-artwork"
        decoding="async"
        fetchPriority="low"
      />
    </picture>
  );
}

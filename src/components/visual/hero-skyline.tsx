"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/hooks/use-theme";

const FILES = {
  dark: {
    desktop: {
      webp: "/images/hero-muscat-skyline.webp",
      png: "/images/hero-muscat-skyline.png",
    },
    mobile: {
      webp: "/images/hero-muscat-skyline-1280.webp",
      png: "/images/hero-muscat-skyline-1280.png",
    },
  },
  light: {
    desktop: {
      webp: "/images/hero-muscat-skyline-light.webp",
      png: "/images/hero-muscat-skyline-light.png",
    },
    mobile: {
      webp: "/images/hero-muscat-skyline-light-1280.webp",
      png: "/images/hero-muscat-skyline-light-1280.png",
    },
  },
} as const;

type SkylineFiles = { webp: string; png: string };

/**
 * Muscat skyline horizon strip. Gold linework in dark mode, charcoal
 * linework in light mode. Only the active theme's asset is downloaded.
 */
export function HeroSkyline() {
  const { theme } = useTheme();
  const [files, setFiles] = useState<SkylineFiles | null>(null);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 767px)");
    const sync = () => {
      const set = FILES[theme];
      setFiles(set[query.matches ? "mobile" : "desktop"]);
    };
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, [theme]);

  if (!files) return null;

  return (
    <picture className="hero-skyline-wrap">
      <source type="image/webp" srcSet={files.webp} />
      <img
        src={files.png}
        alt=""
        aria-hidden="true"
        className="hero-skyline"
        decoding="async"
        fetchPriority="low"
      />
    </picture>
  );
}

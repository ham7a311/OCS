"use client";

import { useEffect, useState } from "react";

/**
 * Tracks which section owns the viewport so the navbar can indicate position.
 * The top margin accounts for the floating navbar, so a section only becomes
 * active once it is genuinely the thing being read.
 */
export function useActiveSection(ids: readonly string[]) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => node !== null);

    if (sections.length === 0) return;

    const visible = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.set(entry.target.id, entry.intersectionRatio);
          } else {
            visible.delete(entry.target.id);
          }
        }

        if (visible.size === 0) {
          setActiveId(window.scrollY < 160 ? ids[0] ?? null : null);
          return;
        }

        const [topmost] = [...visible.entries()].sort((a, b) => b[1] - a[1]);
        setActiveId(topmost[0]);
      },
      {
        rootMargin: "-116px 0px -55% 0px",
        threshold: [0, 0.15, 0.35, 0.6, 1],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { readNavClearance } from "@/hooks/use-nav-clearance";

/**
 * Tracks which section owns the band just below the sticky header.
 * `activate` pins a target immediately on click so the underline does not
 * wait for smooth-scroll to finish.
 */
export function useActiveSection(ids: readonly string[]) {
  const [activeId, setActiveId] = useState<string | null>(ids[0] ?? null);
  const pinnedRef = useRef<string | null>(null);
  const unpinTimer = useRef<number>(0);

  const activate = useCallback((id: string) => {
    pinnedRef.current = id;
    setActiveId(id);
    window.clearTimeout(unpinTimer.current);

    const unpin = () => {
      pinnedRef.current = null;
    };

    window.addEventListener("scrollend", unpin, { once: true });
    unpinTimer.current = window.setTimeout(unpin, 900);
  }, []);

  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    if (hash && ids.some((id) => id === hash)) setActiveId(hash);
  }, [ids]);

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => node !== null);

    if (sections.length === 0) return;

    let observer: IntersectionObserver | null = null;

    const connect = () => {
      observer?.disconnect();

      const clearance = readNavClearance();
      const bottom = Math.max(window.innerHeight - clearance - 1, 0);
      const visible = new Set<string>();

      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) visible.add(entry.target.id);
            else visible.delete(entry.target.id);
          }

          if (pinnedRef.current) return;

          if (visible.size > 0) {
            const next = ids.find((id) => visible.has(id));
            if (next) setActiveId(next);
            return;
          }

          const lastId = ids[ids.length - 1];
          const last = lastId ? document.getElementById(lastId) : null;
          if (last && last.getBoundingClientRect().bottom <= readNavClearance() + 1) {
            setActiveId(null);
            return;
          }

          if (window.scrollY < 48) setActiveId(ids[0] ?? null);
        },
        {
          rootMargin: `-${clearance}px 0px -${bottom}px 0px`,
          threshold: 0,
        },
      );

      sections.forEach((section) => observer?.observe(section));
    };

    connect();
    window.addEventListener("resize", connect);

    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", connect);
      window.clearTimeout(unpinTimer.current);
    };
  }, [ids]);

  return { activeId, activate };
}

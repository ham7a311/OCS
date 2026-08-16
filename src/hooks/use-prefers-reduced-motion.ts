"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const mediaQuery = window.matchMedia(QUERY);
  mediaQuery.addEventListener("change", onChange);
  return () => mediaQuery.removeEventListener("change", onChange);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

/** The server cannot know the preference, so it assumes motion is allowed. */
function getServerSnapshot() {
  return false;
}

/**
 * Single reduced-motion gate for the app (SRS FR-059, NFR-012).
 *
 * Reads the media query as an external store rather than mirroring it into
 * state, so there is no render-then-correct pass on mount.
 */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

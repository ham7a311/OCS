"use client";

import { useLayoutEffect } from "react";

const HEADER = "[data-ocs-nav]";

function applyNavClearance(header: Element) {
  const height = Math.round(header.getBoundingClientRect().height);
  if (height < 1) return;
  document.documentElement.style.setProperty("--ocs-nav-clearance", `${height}px`);
}

export function readNavClearance() {
  const header = document.querySelector(HEADER);
  if (header instanceof HTMLElement) {
    const height = Math.round(header.getBoundingClientRect().height);
    if (height > 0) return height;
  }

  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue("--ocs-nav-clearance")
    .trim();
  const value = parseFloat(raw);
  if (!Number.isFinite(value)) return 84;
  return raw.endsWith("rem") ? value * 16 : value;
}

/**
 * Keeps `--ocs-nav-clearance` equal to the rendered sticky header height so
 * scroll-margin and the active-section observer cannot drift apart.
 */
export function useNavClearance() {
  useLayoutEffect(() => {
    const header = document.querySelector(HEADER);
    if (!header) return;

    const apply = () => applyNavClearance(header);
    apply();

    const observer = new ResizeObserver(apply);
    observer.observe(header);
    window.addEventListener("resize", apply);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", apply);
    };
  }, []);
}

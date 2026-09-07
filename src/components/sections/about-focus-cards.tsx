"use client";

import type { PointerEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { focusAreas, type FocusAtmosphere } from "@/data/about";

const WAVE_PATHS: Record<FocusAtmosphere, string[]> = {
  violet: [
    "M-60 168 C 20 12, 110 236, 198 64 S 318 228, 428 48 C 488 8, 540 120, 580 86",
    "M-48 42 C 70 188, 168 -28, 268 132 S 412 8, 540 154",
    "M-36 214 C 88 96, 176 248, 274 78 S 404 236, 560 118",
    "M 40 -20 C 120 80, 90 160, 210 190 S 360 40, 480 210",
  ],
  cyan: [
    "M-70 36 C 40 58, 150 22, 250 48 S 430 18, 560 52",
    "M-70 88 C 55 118, 165 72, 270 102 S 445 70, 570 108",
    "M-70 142 C 48 168, 160 128, 268 154 S 438 126, 565 160",
    "M-70 196 C 62 214, 172 178, 282 204 S 458 176, 575 212",
  ],
  teal: [
    "M-50 190 C 90 10, 210 230, 360 46 S 520 200, 610 90",
    "M 560 206 C 390 -10, 210 240, -40 72",
    "M-40 118 C 130 176, 250 28, 520 148",
    "M 80 240 C 160 40, 300 220, 470 -10",
  ],
};

function setFocusPoint(event: PointerEvent<HTMLAnchorElement>) {
  const node = event.currentTarget;
  const rect = node.getBoundingClientRect();
  const nx = (event.clientX - rect.left) / rect.width;
  const ny = (event.clientY - rect.top) / rect.height;
  node.style.setProperty("--focus-nx", nx.toFixed(3));
  node.style.setProperty("--focus-ny", ny.toFixed(3));
}

function clearFocusPoint(event: PointerEvent<HTMLAnchorElement>) {
  event.currentTarget.style.removeProperty("--focus-nx");
  event.currentTarget.style.removeProperty("--focus-ny");
}

function FocusWaves({ variant }: { variant: FocusAtmosphere }) {
  return (
    <svg
      className="about-focus-waves"
      viewBox="0 0 400 220"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {WAVE_PATHS[variant].map((d, index) => (
        <path
          key={d}
          className={`about-focus-wave about-focus-wave--${index + 1}`}
          d={d}
        />
      ))}
    </svg>
  );
}

export function AboutFocusCards() {
  return (
    <ul className="mt-14 grid gap-px overflow-hidden rounded-lg border border-line-subtle bg-line-subtle sm:grid-cols-3 lg:mt-16">
      {focusAreas.map((area) => {
        const Icon = area.icon;

        return (
          <li key={area.id} className="min-w-0">
            <a
              href={area.href}
              className={`about-focus-card about-focus-card--${area.atmosphere} group relative isolate flex h-full gap-4 overflow-hidden p-5 sm:p-6`}
              onPointerMove={setFocusPoint}
              onPointerLeave={clearFocusPoint}
            >
              <span className="about-focus-atmosphere" aria-hidden="true" />
              <span className="about-focus-bloom" aria-hidden="true" />
              <span className="about-focus-field" aria-hidden="true">
                <FocusWaves variant={area.atmosphere} />
              </span>
              <span className="about-focus-quiet" aria-hidden="true" />
              <span className="about-focus-presence" aria-hidden="true" />
              <span
                aria-hidden="true"
                className="about-focus-icon relative z-10 grid size-10 shrink-0 place-items-center rounded-md border border-line text-ink-muted transition-[border-color,color,box-shadow] duration-200 ease-ui"
              >
                <Icon className="size-4" strokeWidth={1.5} />
              </span>
              <span className="relative z-10">
                <span className="flex items-center gap-2 text-[0.9375rem] font-medium text-ink">
                  {area.label}
                  <ArrowUpRight
                    className="size-3.5 text-ink-faint opacity-0 transition-opacity duration-200 ease-ui group-hover:opacity-100"
                    aria-hidden="true"
                  />
                </span>
                <span className="mt-1.5 block max-w-[32ch] text-sm leading-relaxed text-ink-faint">
                  {area.description}
                </span>
              </span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}

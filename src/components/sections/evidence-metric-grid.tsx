"use client";

import type { PointerEvent } from "react";
import { CategoryBadge } from "@/components/ui/badge";
import {
  evidenceMetrics,
  type EvidenceAtmosphere,
} from "@/data/model";
import { cn } from "@/lib/utils";

const WAVE_PATHS: Record<EvidenceAtmosphere, string[]> = {
  sage: [
    "M-50 190 C 40 40, 160 210, 280 70 S 420 200, 540 90",
    "M-30 50 C 90 140, 200 10, 340 120 S 480 30, 580 110",
  ],
  steel: [
    "M-60 70 C 50 40, 170 96, 280 58 S 430 88, 560 50",
    "M-50 160 C 70 130, 190 186, 310 148 S 460 178, 580 140",
  ],
  indigo: [
    "M-40 40 C 80 180, 160 -10, 270 140 S 400 20, 540 160",
    "M-20 210 C 100 80, 220 230, 360 90 S 500 220, 590 100",
  ],
  teal: [
    "M-50 180 C 90 20, 200 210, 340 50 S 480 190, 600 80",
    "M 560 200 C 400 10, 220 230, -30 80",
  ],
  amber: [
    "M-40 210 C 80 90, 180 230, 300 80 S 440 210, 560 100",
    "M-30 60 C 110 150, 230 20, 360 130 S 500 40, 590 150",
  ],
  north: [
    "M-70 200 C 30 20, 150 230, 270 40 S 410 210, 560 60 C 620 10, 680 140, 720 90",
    "M-40 30 C 90 170, 200 -20, 320 150 S 470 10, 620 130",
    "M-50 140 C 80 40, 190 190, 310 70 S 450 180, 600 90",
    "M 40 230 C 140 70, 260 210, 400 50 S 540 200, 680 80",
  ],
};

function setPanelPoint(event: PointerEvent<HTMLDivElement>) {
  const node = event.currentTarget;
  const rect = node.getBoundingClientRect();
  const nx = (event.clientX - rect.left) / rect.width;
  const ny = (event.clientY - rect.top) / rect.height;
  node.style.setProperty("--metric-nx", nx.toFixed(3));
  node.style.setProperty("--metric-ny", ny.toFixed(3));
}

function clearPanelPoint(event: PointerEvent<HTMLDivElement>) {
  event.currentTarget.style.removeProperty("--metric-nx");
  event.currentTarget.style.removeProperty("--metric-ny");
}

function MetricWaves({ variant }: { variant: EvidenceAtmosphere }) {
  return (
    <svg
      className="metric-panel-waves"
      viewBox="0 0 400 220"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {WAVE_PATHS[variant].map((d, index) => (
        <path
          key={d}
          className={`metric-panel-wave metric-panel-wave--${index + 1}`}
          d={d}
        />
      ))}
    </svg>
  );
}

export function EvidenceMetricGrid() {
  return (
    <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden border-y border-line-subtle bg-line-subtle sm:grid-cols-2 lg:grid-cols-3">
      {evidenceMetrics.map((metric) => {
        const northStar = "northStar" in metric && metric.northStar;

        return (
          <div
            key={metric.id}
            className={cn(
              "metric-panel relative isolate flex flex-col gap-3 overflow-hidden px-5 py-7 sm:px-6 sm:py-8",
              `metric-panel--${metric.atmosphere}`,
            )}
            onPointerMove={setPanelPoint}
            onPointerLeave={clearPanelPoint}
          >
            <span className="metric-panel-atmosphere" aria-hidden="true" />
            <span className="metric-panel-bloom" aria-hidden="true" />
            <span className="metric-panel-field" aria-hidden="true">
              <MetricWaves variant={metric.atmosphere} />
            </span>
            <span className="metric-panel-quiet" aria-hidden="true" />
            <span className="metric-panel-presence" aria-hidden="true" />
            <div className="relative z-10 flex flex-wrap items-center gap-2.5">
              <p
                className={cn(
                  "font-mono text-[0.6875rem] uppercase",
                  northStar
                    ? "tracking-[0.11em] text-amber-300"
                    : "tracking-[0.09em] text-ink-muted",
                )}
              >
                {metric.label}
              </p>
              {northStar ? (
                <CategoryBadge className="metric-north-pill px-2.5 py-px text-[0.625rem]">
                  North star
                </CategoryBadge>
              ) : null}
            </div>
            <p className="relative z-10 text-sm leading-relaxed text-ink-faint">
              {metric.note}
            </p>
          </div>
        );
      })}
    </div>
  );
}

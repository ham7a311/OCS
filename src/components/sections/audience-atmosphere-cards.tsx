"use client";

import type { PointerEvent } from "react";
import { Panel } from "@/components/ui/panel";

type SprayDot = {
  cx: number;
  cy: number;
  r: number;
  extra?: boolean;
};

const STUDENT_SPRAY: SprayDot[] = [
  { cx: 18, cy: 158, r: 2.4 },
  { cx: 32, cy: 171, r: 1.1 },
  { cx: 44, cy: 149, r: 1.7 },
  { cx: 12, cy: 136, r: 0.9 },
  { cx: 58, cy: 168, r: 1.3 },
  { cx: 71, cy: 154, r: 2.1 },
  { cx: 27, cy: 122, r: 0.8 },
  { cx: 86, cy: 172, r: 1.4 },
  { cx: 8, cy: 172, r: 1.6 },
  { cx: 96, cy: 141, r: 0.9 },
  { cx: 52, cy: 128, r: 1.2 },
  { cx: 118, cy: 166, r: 1.8 },
  { cx: 134, cy: 152, r: 0.7 },
  { cx: 148, cy: 174, r: 1.5 },
  { cx: 166, cy: 159, r: 1 },
  { cx: 188, cy: 170, r: 2 },
  { cx: 204, cy: 148, r: 0.8 },
  { cx: 226, cy: 166, r: 1.3 },
  { cx: 248, cy: 154, r: 0.9 },
  { cx: 268, cy: 172, r: 1.6 },
  { cx: 292, cy: 24, r: 2.2 },
  { cx: 306, cy: 14, r: 1.4 },
  { cx: 278, cy: 8, r: 1.1 },
  { cx: 312, cy: 38, r: 1.8 },
  { cx: 264, cy: 22, r: 0.8 },
  { cx: 298, cy: 52, r: 1.2 },
  { cx: 248, cy: 12, r: 1.5 },
  { cx: 228, cy: 28, r: 0.7 },
  { cx: 310, cy: 68, r: 1 },
  { cx: 274, cy: 44, r: 2 },
  { cx: 256, cy: 62, r: 0.9 },
  { cx: 302, cy: 86, r: 1.3 },
  { cx: 284, cy: 104, r: 0.8 },
  { cx: 318, cy: 112, r: 1.1 },
  { cx: 22, cy: 18, r: 0.7 },
  { cx: 308, cy: 168, r: 1.4 },
  { cx: 40, cy: 108, r: 0.6, extra: true },
  { cx: 78, cy: 118, r: 1.1, extra: true },
  { cx: 102, cy: 156, r: 0.8, extra: true },
  { cx: 160, cy: 144, r: 1.6, extra: true },
  { cx: 176, cy: 176, r: 0.9, extra: true },
  { cx: 214, cy: 158, r: 1.2, extra: true },
  { cx: 238, cy: 138, r: 0.7, extra: true },
  { cx: 258, cy: 176, r: 1.9, extra: true },
  { cx: 286, cy: 158, r: 0.8, extra: true },
  { cx: 240, cy: 42, r: 1.1, extra: true },
  { cx: 268, cy: 72, r: 1.5, extra: true },
  { cx: 292, cy: 96, r: 0.7, extra: true },
  { cx: 220, cy: 8, r: 1, extra: true },
  { cx: 314, cy: 128, r: 1.3, extra: true },
  { cx: 6, cy: 148, r: 1.2, extra: true },
  { cx: 64, cy: 140, r: 0.7, extra: true },
  { cx: 128, cy: 176, r: 1, extra: true },
  { cx: 198, cy: 132, r: 0.6, extra: true },
  { cx: 276, cy: 30, r: 0.9, extra: true },
];

function setAudiencePoint(event: PointerEvent<HTMLDivElement>) {
  const node = event.currentTarget;
  const rect = node.getBoundingClientRect();
  node.style.setProperty("--audience-nx", ((event.clientX - rect.left) / rect.width).toFixed(3));
  node.style.setProperty("--audience-ny", ((event.clientY - rect.top) / rect.height).toFixed(3));
}

function clearAudiencePoint(event: PointerEvent<HTMLDivElement>) {
  event.currentTarget.style.removeProperty("--audience-nx");
  event.currentTarget.style.removeProperty("--audience-ny");
}

function StudentSpray() {
  return (
    <svg
      className="audience-spray"
      viewBox="0 0 320 180"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {STUDENT_SPRAY.map((dot) => (
        <circle
          key={`${dot.cx}-${dot.cy}-${dot.r}`}
          className={dot.extra ? "audience-spray-dot audience-spray-dot--extra" : "audience-spray-dot"}
          cx={dot.cx}
          cy={dot.cy}
          r={dot.r}
        />
      ))}
    </svg>
  );
}

function AudienceCard({
  variant,
  kicker,
  body,
}: {
  variant: "students" | "business";
  kicker: string;
  body: string;
}) {
  return (
    <Panel
      className={`audience-card audience-card--${variant} relative isolate overflow-hidden px-6 py-6 sm:px-8`}
      onPointerMove={setAudiencePoint}
      onPointerLeave={clearAudiencePoint}
    >
      <span className="audience-wash" aria-hidden="true" />
      <span className="audience-mark" aria-hidden="true">
        {variant === "students" ? <StudentSpray /> : <span className="audience-lattice" />}
      </span>
      <span className="audience-quiet" aria-hidden="true" />
      <p className="relative z-10 font-mono text-[0.6875rem] tracking-[0.09em] text-amber-300 uppercase">
        {kicker}
      </p>
      <p className="relative z-10 mt-3 text-sm leading-relaxed text-ink-muted">{body}</p>
    </Panel>
  );
}

export function AudienceAtmosphereCards({
  students,
  businesses,
}: {
  students: string;
  businesses: string;
}) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <AudienceCard variant="students" kicker="For students" body={students} />
      <AudienceCard variant="business" kicker="For businesses" body={businesses} />
    </div>
  );
}

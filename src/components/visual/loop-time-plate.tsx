"use client";

import type { PointerEvent } from "react";
import { MetaGrid } from "@/components/ui/meta-grid";
import { Panel } from "@/components/ui/panel";
import { fastLoop, slowLoop } from "@/data/model";

const RING_CX = 178;
const RING_CY = 22;
const RING_R = 82;

function monthTicks() {
  return Array.from({ length: 12 }, (_, index) => {
    const angle = (index / 12) * Math.PI * 2 - Math.PI / 2;
    const inner = RING_R - 5;
    const outer = RING_R + 5;
    const x1 = RING_CX + Math.cos(angle) * inner;
    const y1 = RING_CY + Math.sin(angle) * inner;
    const x2 = RING_CX + Math.cos(angle) * outer;
    const y2 = RING_CY + Math.sin(angle) * outer;
    return `M ${x1.toFixed(2)} ${y1.toFixed(2)} L ${x2.toFixed(2)} ${y2.toFixed(2)}`;
  });
}

const MONTH_TICKS = monthTicks();

const STAVE_HEIGHTS = [18, 11, 22, 14, 19, 10, 24, 16, 13, 20];

function setPlatePoint(event: PointerEvent<HTMLDivElement>) {
  const node = event.currentTarget;
  const rect = node.getBoundingClientRect();
  node.style.setProperty("--loop-nx", ((event.clientX - rect.left) / rect.width).toFixed(3));
  node.style.setProperty("--loop-ny", ((event.clientY - rect.top) / rect.height).toFixed(3));
}

function clearPlatePoint(event: PointerEvent<HTMLDivElement>) {
  event.currentTarget.style.removeProperty("--loop-nx");
  event.currentTarget.style.removeProperty("--loop-ny");
}

function SlowMonthPlate() {
  return (
    <svg
      className="loop-plate loop-plate--slow"
      viewBox="0 0 240 140"
      preserveAspectRatio="xMaxYMin slice"
      fill="none"
      aria-hidden="true"
    >
      <g className="loop-plate-ticks">
        {MONTH_TICKS.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
      <g className="loop-plate-ring">
        <circle
          className="loop-plate-orbit"
          cx={RING_CX}
          cy={RING_CY}
          r={RING_R}
          pathLength={100}
        />
      </g>
    </svg>
  );
}

function FastStavePlate() {
  return (
    <svg
      className="loop-plate loop-plate--fast"
      viewBox="0 0 320 40"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
    >
      {STAVE_HEIGHTS.map((height, index) => {
        const x = 16 + index * 30;
        return (
          <line
            key={x}
            className={`loop-plate-mark loop-plate-mark--${index + 1}`}
            x1={x}
            y1={36 - height}
            x2={x}
            y2={36}
          />
        );
      })}
      <g className="loop-plate-index-walk">
        <line className="loop-plate-index" x1="16" y1="8" x2="16" y2="36" />
      </g>
    </svg>
  );
}

export function LoopCard({
  kicker,
  pace,
  loop,
}: {
  kicker: string;
  pace: "slow" | "fast";
  loop: typeof slowLoop | typeof fastLoop;
}) {
  return (
    <Panel
      className={`loop-card loop-card--${pace} relative isolate flex h-full flex-col overflow-hidden`}
      onPointerMove={setPlatePoint}
      onPointerLeave={clearPlatePoint}
    >
      {pace === "slow" ? <SlowMonthPlate /> : null}
      <div className="loop-card-copy relative z-10 px-6 py-6 sm:px-8">
        <p className="font-mono text-[0.6875rem] tracking-[0.09em] text-amber-300 uppercase">
          {kicker}
        </p>
        <h3 className="mt-3 text-h3 text-ink">{loop.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted">{loop.subtitle}</p>
        {pace === "fast" ? <FastStavePlate /> : null}
      </div>
      <MetaGrid
        items={[...loop.fields]}
        columns={2}
        className="relative z-10 mt-auto border-t border-line-subtle"
      />
    </Panel>
  );
}

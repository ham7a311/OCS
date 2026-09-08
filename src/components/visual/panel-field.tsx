"use client";

export type PanelFieldVariant = "awaiting" | "online" | "room";

type Dot = { cx: number; cy: number; r: number; extra?: boolean };

const AWAITING_DOTS: Dot[] = [
  { cx: 268, cy: 118, r: 2.1 },
  { cx: 286, cy: 132, r: 1.2 },
  { cx: 304, cy: 108, r: 1.6 },
  { cx: 248, cy: 142, r: 0.9 },
  { cx: 322, cy: 124, r: 1.8 },
  { cx: 338, cy: 148, r: 1.1 },
  { cx: 356, cy: 116, r: 2.4 },
  { cx: 294, cy: 156, r: 0.8 },
  { cx: 372, cy: 138, r: 1.4 },
  { cx: 348, cy: 168, r: 1 },
  { cx: 312, cy: 172, r: 1.5, extra: true },
  { cx: 262, cy: 164, r: 0.7, extra: true },
  { cx: 380, cy: 162, r: 1.2, extra: true },
];

const ONLINE_CURRENTS = [
  "M 42 38 C 118 28, 196 46, 278 34 S 430 22, 520 40",
  "M 28 72 C 110 86, 188 64, 270 78 S 418 92, 534 70",
  "M 54 108 C 132 98, 210 118, 292 104 S 448 88, 548 112",
  "M 18 144 C 98 132, 176 154, 258 140 S 402 126, 512 148",
];

function AwaitingDots() {
  return (
    <svg className="panel-field-motif" viewBox="0 0 400 180" preserveAspectRatio="xMaxYMax slice">
      {AWAITING_DOTS.map((dot) => (
        <circle
          key={`${dot.cx}-${dot.cy}`}
          className={dot.extra ? "panel-field-dot panel-field-dot--extra" : "panel-field-dot"}
          cx={dot.cx}
          cy={dot.cy}
          r={dot.r}
        />
      ))}
    </svg>
  );
}

function OnlineCurrents() {
  return (
    <svg className="panel-field-motif" viewBox="0 0 400 180" preserveAspectRatio="xMaxYMid slice" fill="none">
      {ONLINE_CURRENTS.map((d, index) => (
        <path
          key={d}
          className={`panel-field-current panel-field-current--${index + 1}`}
          d={d}
          pathLength={100}
        />
      ))}
    </svg>
  );
}

function RoomLattice() {
  const majors = [0, 1, 2, 3, 4, 5, 6, 7].map((i) => 24 + i * 22);
  const extras = [8, 9].map((i) => 24 + i * 22);

  return (
    <svg className="panel-field-motif" viewBox="0 0 400 180" preserveAspectRatio="xMaxYMid slice" fill="none">
      <g transform="rotate(-12 280 90)">
        {majors.map((x) => (
          <line key={`v-${x}`} className="panel-field-lattice" x1={x + 160} y1={-20} x2={x + 160} y2={210} />
        ))}
        {extras.map((x) => (
          <line
            key={`vx-${x}`}
            className="panel-field-lattice panel-field-lattice--extra"
            x1={x + 160}
            y1={-20}
            x2={x + 160}
            y2={210}
          />
        ))}
        {[18, 48, 78, 108, 138, 168].map((y) => (
          <line key={`h-${y}`} className="panel-field-lattice" x1={150} y1={y} x2={420} y2={y} />
        ))}
        <line className="panel-field-lattice panel-field-lattice--extra" x1={150} y1={198} x2={420} y2={198} />
      </g>
    </svg>
  );
}

export function PanelField({ variant }: { variant: PanelFieldVariant }) {
  return (
    <div className={`panel-field panel-field--${variant}`} aria-hidden="true">
      <span className="panel-field-atmosphere" />
      <span className="panel-field-bloom" />
      {variant === "awaiting" ? <AwaitingDots /> : null}
      {variant === "online" ? <OnlineCurrents /> : null}
      {variant === "room" ? <RoomLattice /> : null}
      <span className="panel-field-quiet" />
    </div>
  );
}

"use client";

import { useId } from "react";

const WAVE_PRIMARY =
  "M 336 96 C 402 124 462 184 474 258 C 480 310 440 354 348 368";
const WAVE_MID =
  "M 306 62 C 398 90 498 176 518 274 C 528 334 474 388 350 404";
const WAVE_OUTER =
  "M 282 32 C 402 54 536 168 556 286 C 568 362 502 434 336 450";

/**
 * Transmission field for webinar cards.
 * A small source and open wavefronts leaving it — not an orbital mass.
 */
export function EventHaloSignal() {
  const uid = useId().replace(/:/g, "");
  const wrap = `halo-wrap-${uid}`;
  const limb = `halo-limb-${uid}`;
  const limbLight = `halo-limb-light-${uid}`;
  const grain = `halo-grain-${uid}`;
  const glow = `halo-glow-${uid}`;

  return (
    <div className="event-halo" aria-hidden="true">
      <div className="event-halo-atmosphere" />

      <svg
        className="event-halo-field"
        viewBox="0 0 640 400"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <defs>
          <radialGradient id={wrap} cx="58%" cy="38%" r="62%">
            <stop offset="0%" stopColor="#e8c98a" stopOpacity="0.28" />
            <stop offset="28%" stopColor="#d4a05a" stopOpacity="0.12" />
            <stop offset="58%" stopColor="#8a6e5c" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#0c0b0a" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={limb} cx="72%" cy="68%" r="78%">
            <stop offset="0%" stopColor="#14110e" stopOpacity="0" />
            <stop offset="52%" stopColor="#14110e" stopOpacity="0.12" />
            <stop offset="78%" stopColor="#e6d3b0" stopOpacity="0.72" />
            <stop offset="100%" stopColor="#14110e" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={limbLight} x1="18%" y1="12%" x2="92%" y2="88%">
            <stop offset="0%" stopColor="#1a1512" stopOpacity="0" />
            <stop offset="58%" stopColor="#1a1512" stopOpacity="0" />
            <stop offset="78%" stopColor="#8a5a22" stopOpacity="0.55" />
            <stop offset="90%" stopColor="#c48a3c" stopOpacity="1" />
            <stop offset="100%" stopColor="#1a1512" stopOpacity="0" />
          </linearGradient>
          <filter id={glow} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="2.4" />
          </filter>
          <filter id={grain} x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.72"
              numOctaves="2"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer>
              <feFuncA type="table" tableValues="0 0.035" />
            </feComponentTransfer>
          </filter>
        </defs>

        <ellipse
          className="event-halo-wrap"
          cx="388"
          cy="176"
          rx="148"
          ry="136"
          transform="rotate(-16 388 176)"
          fill={`url(#${wrap})`}
        />

        <g className="event-halo-grain" filter={`url(#${grain})`}>
          <rect x="180" y="0" width="460" height="400" fill="#e8c98a" />
        </g>

        <path
          className="event-halo-wave event-halo-wave--outer event-halo-wave--extra"
          d={WAVE_OUTER}
          pathLength={100}
          strokeDasharray="18 14 10 58"
          strokeDashoffset="-8"
        />
        <path
          className="event-halo-wave event-halo-wave--mid"
          d={WAVE_MID}
          pathLength={100}
          strokeDasharray="28 12 16 44"
          strokeDashoffset="6"
        />
        <path
          className="event-halo-wave event-halo-wave--primary"
          d={WAVE_PRIMARY}
          pathLength={100}
          strokeDasharray="58 8 16 18"
          strokeDashoffset="2"
        />

        <ellipse
          className="event-halo-source-core"
          cx="318"
          cy="86"
          rx="16"
          ry="13"
          transform="rotate(-22 318 86)"
        />
        <ellipse
          className="event-halo-source-limb"
          cx="318"
          cy="86"
          rx="17.2"
          ry="14.1"
          transform="rotate(-22 318 86)"
          fill={`url(#${limb})`}
        />
        <ellipse
          className="event-halo-source-limb-light"
          cx="318"
          cy="86"
          rx="16.6"
          ry="13.6"
          transform="rotate(-22 318 86)"
          fill={`url(#${limbLight})`}
        />

        <g className="event-halo-signal-group">
          <path
            className="event-halo-signal event-halo-signal--bloom"
            d={WAVE_PRIMARY}
            pathLength={100}
            filter={`url(#${glow})`}
          />
          <path className="event-halo-signal" d={WAVE_PRIMARY} pathLength={100} />
        </g>
      </svg>

      <div className="event-halo-quiet" />
    </div>
  );
}

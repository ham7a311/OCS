"use client";

import { useId } from "react";

/**
 * Oversized orbital-eclipse artwork for the upcoming event card.
 * Decorative only — clipped by the card, never part of the reading order.
 */
export function EventOrbitalEclipse() {
  const uid = useId().replace(/:/g, "");
  const glow = `eclipse-glow-${uid}`;
  const grain = `eclipse-grain-${uid}`;
  const veil = `eclipse-veil-${uid}`;
  const wrap = `eclipse-wrap-${uid}`;
  const limb = `eclipse-limb-${uid}`;
  const limbLight = `eclipse-limb-light-${uid}`;

  return (
    <div className="event-eclipse" aria-hidden="true">
      <div className="event-eclipse-atmosphere" />
      <div className="event-eclipse-bloom" />

      <svg
        className="event-eclipse-field"
        viewBox="0 0 640 400"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <defs>
          <radialGradient id={wrap} cx="72%" cy="38%" r="62%">
            <stop offset="0%" stopColor="#e8a24a" stopOpacity="var(--eclipse-wrap-gold-op)" />
            <stop offset="22%" stopColor="#c4783a" stopOpacity="var(--eclipse-wrap-copper-op)" />
            <stop offset="48%" stopColor="#8a6e7c" stopOpacity="var(--eclipse-wrap-rose-op)" />
            <stop offset="100%" stopColor="#0c0b0a" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={limb} cx="32%" cy="58%" r="68%">
            <stop offset="0%" stopColor="var(--eclipse-limb-void)" stopOpacity="0" />
            <stop offset="58%" stopColor="var(--eclipse-limb-void)" stopOpacity="var(--eclipse-limb-void-mid)" />
            <stop offset="78%" stopColor="var(--eclipse-limb-gold)" stopOpacity="var(--eclipse-limb-gold-op)" />
            <stop offset="100%" stopColor="var(--eclipse-limb-void)" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={limbLight} x1="18%" y1="82%" x2="92%" y2="8%">
            <stop offset="0%" stopColor="#1a1512" stopOpacity="0" />
            <stop offset="68%" stopColor="#1a1512" stopOpacity="0" />
            <stop offset="80%" stopColor="#c07818" stopOpacity="0.35" />
            <stop offset="90%" stopColor="#e8a24a" stopOpacity="1" />
            <stop offset="97%" stopColor="#f3b45f" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#1a1512" stopOpacity="0" />
          </linearGradient>
          <radialGradient id={veil} cx="46%" cy="48%" r="54%">
            <stop offset="0%" stopColor="#080706" stopOpacity="1" />
            <stop offset="70%" stopColor="#080706" stopOpacity="0.94" />
            <stop offset="100%" stopColor="#080706" stopOpacity="0" />
          </radialGradient>
          <filter id={glow} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="2.8" />
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
          className="event-eclipse-wrap"
          cx="352"
          cy="204"
          rx="268"
          ry="228"
          transform="rotate(-11 352 204)"
          fill={`url(#${wrap})`}
        />

        <g className="event-eclipse-grain" filter={`url(#${grain})`}>
          <rect x="180" y="0" width="460" height="400" fill="#e8a24a" />
        </g>

        <g className="event-eclipse-drift event-eclipse-drift--a">
          <ellipse
            className="event-eclipse-ring"
            cx="354"
            cy="202"
            rx="132"
            ry="118"
            transform="rotate(-9 354 202)"
            pathLength={100}
            strokeDasharray="94 6"
          />
          <ellipse
            className="event-eclipse-ring event-eclipse-ring--soft"
            cx="346"
            cy="210"
            rx="162"
            ry="136"
            transform="rotate(-17 346 210)"
            pathLength={100}
            strokeDasharray="36 16 20 28"
          />
        </g>

        <g className="event-eclipse-back">
          <ellipse
            className="event-eclipse-arc event-eclipse-arc--dim"
            cx="338"
            cy="192"
            rx="196"
            ry="160"
            transform="rotate(8 338 192)"
            pathLength={100}
            strokeDasharray="34 66"
            strokeDashoffset="12"
          />
          <ellipse
            className="event-eclipse-arc event-eclipse-arc--copper"
            cx="366"
            cy="218"
            rx="222"
            ry="172"
            transform="rotate(-21 366 218)"
            pathLength={100}
            strokeDasharray="18 12 9 61"
            strokeDashoffset="-8"
          />
          <path
            className="event-eclipse-arc event-eclipse-arc--organic event-eclipse-arc--extra"
            d="M 168 98 C 248 34 398 52 458 134 C 502 192 492 274 412 324"
          />
        </g>

        <ellipse
          className="event-eclipse-core-halo"
          cx="352"
          cy="204"
          rx="128"
          ry="114"
          transform="rotate(-11 352 204)"
          fill={`url(#${veil})`}
        />
        <ellipse
          className="event-eclipse-core"
          cx="352"
          cy="204"
          rx="104"
          ry="92"
          transform="rotate(-11 352 204)"
        />
        <ellipse
          className="event-eclipse-limb"
          cx="352"
          cy="204"
          rx="106"
          ry="94"
          transform="rotate(-11 352 204)"
          fill={`url(#${limb})`}
        />
        <ellipse
          className="event-eclipse-limb-light"
          cx="352"
          cy="204"
          rx="105"
          ry="93"
          transform="rotate(-11 352 204)"
          fill={`url(#${limbLight})`}
        />

        <g className="event-eclipse-drift event-eclipse-drift--b">
          <ellipse
            className="event-eclipse-arc event-eclipse-arc--hot"
            cx="358"
            cy="198"
            rx="178"
            ry="148"
            transform="rotate(-14 358 198)"
            pathLength={100}
            strokeDasharray="24 10 16 50"
            strokeDashoffset="4"
          />
          <ellipse
            className="event-eclipse-arc event-eclipse-arc--outer event-eclipse-arc--extra"
            cx="372"
            cy="212"
            rx="248"
            ry="198"
            transform="rotate(13 372 212)"
            pathLength={100}
            strokeDasharray="22 16 11 51"
            strokeDashoffset="28"
          />
          <ellipse
            className="event-eclipse-arc event-eclipse-arc--spectral event-eclipse-arc--extra"
            cx="330"
            cy="186"
            rx="278"
            ry="214"
            transform="rotate(-6 330 186)"
            pathLength={100}
            strokeDasharray="14 86"
            strokeDashoffset="-22"
          />
        </g>

        <g className="event-eclipse-signal-group">
          <ellipse
            className="event-eclipse-signal event-eclipse-signal--bloom"
            cx="358"
            cy="198"
            rx="178"
            ry="148"
            transform="rotate(-14 358 198)"
            pathLength={100}
            filter={`url(#${glow})`}
          />
          <ellipse
            className="event-eclipse-signal"
            cx="358"
            cy="198"
            rx="178"
            ry="148"
            transform="rotate(-14 358 198)"
            pathLength={100}
          />
        </g>
      </svg>

      <div className="event-eclipse-quiet" />
    </div>
  );
}

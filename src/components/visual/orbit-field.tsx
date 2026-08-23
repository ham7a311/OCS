"use client";

import type { CSSProperties } from "react";

const ORBITS = [
  { radius: 40, duration: 14, size: 5, rest: "12%", delay: "-1.68s" },
  { radius: 65, duration: 20, size: 6, rest: "41%", delay: "-8.2s" },
  { radius: 90, duration: 27, size: 5, rest: "68%", delay: "-18.36s" },
  { radius: 115, duration: 33, size: 4, rest: "87%", delay: "-28.71s" },
] as const;

/**
 * Ambient “held core” for the Your data section. Desktop only.
 * Same offset-path mechanic as the team marquee, always running, no hover.
 */
export function GuardedCoreVisual() {
  return (
    <div className="orbit-field orbit-field-ambient" aria-hidden="true">
      <div className="orbit-field-core">
        <span className="orbit-field-node" />
      </div>
      {ORBITS.map((orbit) => (
        <div
          key={orbit.radius}
          className="orbit-field-ring"
          style={
            {
              width: orbit.radius * 2,
              height: orbit.radius * 2,
              "--orbit-duration": `${orbit.duration}s`,
              "--orbit-delay": orbit.delay,
            } as CSSProperties
          }
        >
          <span
            className="orbit-field-dot"
            style={
              {
                width: orbit.size,
                height: orbit.size,
                "--orbit-duration": `${orbit.duration}s`,
                "--orbit-delay": orbit.delay,
                "--orbit-rest": orbit.rest,
              } as CSSProperties
            }
          />
        </div>
      ))}
    </div>
  );
}

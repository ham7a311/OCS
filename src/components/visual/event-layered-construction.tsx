"use client";

import { useEffect, useId, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

/**
 * Layered construction field for workshop cards.
 * Vellum sheets with occlusion — not ghost outlines.
 */
export function EventLayeredConstruction() {
  const uid = useId().replace(/:/g, "");
  const fillBack = `construct-fill-back-${uid}`;
  const fillMid = `construct-fill-mid-${uid}`;
  const fillFront = `construct-fill-front-${uid}`;
  const wash = `construct-wash-${uid}`;
  const reduced = usePrefersReducedMotion();
  const root = useRef<HTMLDivElement>(null);
  const [settled, setSettled] = useState(reduced);

  useEffect(() => {
    if (reduced) {
      setSettled(true);
      return;
    }

    const node = root.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        setSettled(true);
      },
      { threshold: 0.12, rootMargin: "80px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [reduced]);

  return (
    <div
      ref={root}
      className="event-construct"
      data-settled={settled ? "" : undefined}
      data-reduced={reduced ? "" : undefined}
      aria-hidden="true"
    >
      <div className="event-construct-atmosphere" />
      <div className="event-construct-shade" />
      <div className="event-construct-quiet" />

      <svg
        className="event-construct-field"
        viewBox="0 0 640 400"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <defs>
          <linearGradient id={wash} x1="58%" y1="4%" x2="98%" y2="90%">
            <stop offset="0%" stopColor="#7a9e96" stopOpacity="0.2" />
            <stop offset="55%" stopColor="#1c3d3a" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#0c0b0a" stopOpacity="0" />
          </linearGradient>
          <linearGradient id={fillBack} x1="12%" y1="8%" x2="88%" y2="94%">
            <stop offset="0%" stopColor="#1a3330" stopOpacity="0.88" />
            <stop offset="100%" stopColor="#0e1a18" stopOpacity="0.42" />
          </linearGradient>
          <linearGradient id={fillMid} x1="8%" y1="0%" x2="92%" y2="100%">
            <stop offset="0%" stopColor="#2f5c57" stopOpacity="0.72" />
            <stop offset="100%" stopColor="#16302d" stopOpacity="0.32" />
          </linearGradient>
          <linearGradient id={fillFront} x1="24%" y1="12%" x2="86%" y2="88%">
            <stop offset="0%" stopColor="#7a9e96" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#2a5854" stopOpacity="0.22" />
          </linearGradient>
        </defs>

        <polygon
          className="event-construct-wash"
          points="248,-28 680,-18 732,348 292,392"
          fill={`url(#${wash})`}
        />

        <g className="event-construct-plane event-construct-plane--a">
          <polygon
            className="event-construct-sheet event-construct-sheet--back"
            points="268,-18 620,-46 688,286 318,338"
            fill={`url(#${fillBack})`}
          />
          <polygon className="event-construct-edge" points="268,-18 620,-46 688,286 318,338" />
        </g>

        <g className="event-construct-plane event-construct-plane--b">
          <polygon
            className="event-construct-sheet event-construct-sheet--mid"
            points="318,42 572,102 528,278 278,218"
            fill={`url(#${fillMid})`}
          />
          <polygon className="event-construct-edge" points="318,42 572,102 528,278 278,218" />
        </g>

        <g className="event-construct-plane event-construct-plane--c">
          <polygon
            className="event-construct-sheet event-construct-sheet--front"
            points="348,86 518,54 562,214 392,248"
            fill={`url(#${fillFront})`}
          />
          <polygon
            className="event-construct-edge event-construct-edge--front"
            points="348,86 518,54 562,214 392,248"
          />
          <path className="event-construct-tick" d="M348 104 L348 86 L366 86" />
          <path className="event-construct-tick event-construct-tick--amber" d="M518 54 L534 54 M518 54 L518 70" />
        </g>

        <g className="event-construct-plane event-construct-plane--d event-construct-plane--extra">
          <polygon
            className="event-construct-sheet event-construct-sheet--shard"
            points="408,128 488,116 508,188 424,204"
            fill={`url(#${fillFront})`}
          />
          <polygon className="event-construct-edge" points="408,128 488,116 508,188 424,204" />
        </g>

        <g className="event-construct-glint">
          <path d="M518 54 L546 42" />
        </g>
      </svg>
    </div>
  );
}

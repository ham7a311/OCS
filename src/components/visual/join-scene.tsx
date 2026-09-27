"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { imagery } from "@/data/imagery";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { useTheme } from "@/hooks/use-theme";

/** The closing place. The top of the drawing stays, and the base fades out. */
export function JoinScene() {
  const { theme } = useTheme();
  const plate = theme === "light" ? imagery.joinLight : imagery.join;

  return (
    <div className="join-plate" aria-hidden="true">
      <div className="join-plate__photo absolute inset-0">
        <Image
          src={plate.src}
          alt={plate.alt}
          fill
          placeholder="blur"
          sizes="100vw"
          className="join-plate__img"
        />
      </div>
    </div>
  );
}

/** The route's last mark: a short descent that ends on a gold node, drawn once. */
export function JoinRouteArrival() {
  const reduced = usePrefersReducedMotion();
  const viewport = { once: true, amount: 0.8 } as const;

  return (
    <svg aria-hidden="true" viewBox="0 0 40 96" className="join-arrival" fill="none">
      <motion.path
        d="M20 2 C 34 22, 6 40, 20 62 S 20 80, 20 84"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        initial={reduced ? false : { pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 0.8 }}
        viewport={viewport}
        transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1] }}
      />
      <motion.circle
        cx="20"
        cy="88"
        r="3.5"
        fill="currentColor"
        initial={reduced ? false : { opacity: 0, scale: 0.4 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={viewport}
        transition={{ duration: 0.5, delay: reduced ? 0 : 1.25, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: "20px 88px" }}
      />
    </svg>
  );
}

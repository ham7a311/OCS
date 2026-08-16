"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { riseVariants, staggerVariants, staticVariants, viewportOnce } from "@/lib/motion";

/**
 * Section entrance. Wraps content in a 16px rise plus fade that fires once,
 * and collapses to a no-op when the visitor asks for reduced motion.
 */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = usePrefersReducedMotion();

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={reduced ? staticVariants : riseVariants}
      transition={reduced ? undefined : { delay }}
    >
      {children}
    </motion.div>
  );
}

/** Parent that sequences its `RevealItem` children. */
export function RevealGroup({
  children,
  className,
  stagger = 0.06,
  delayChildren = 0,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
}) {
  const reduced = usePrefersReducedMotion();

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={reduced ? staticVariants : staggerVariants(stagger, delayChildren)}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = usePrefersReducedMotion();

  return (
    <motion.div className={className} variants={reduced ? staticVariants : riseVariants}>
      {children}
    </motion.div>
  );
}

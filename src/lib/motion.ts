import type { Transition, Variants } from "motion/react";

/**
 * The motion system. Every animated component draws its timing from here so
 * the whole page moves with one vocabulary rather than per-component guesses.
 */

export const duration = {
  instant: 0.12,
  fast: 0.2,
  base: 0.32,
  slow: 0.6,
} as const;

/** Decelerating curve for things arriving on screen. */
export const easeEntrance = [0.16, 1, 0.3, 1] as const;
/** Symmetric curve for state changes the user caused. */
export const easeUi = [0.4, 0, 0.2, 1] as const;

export const entranceTransition: Transition = {
  duration: duration.slow,
  ease: easeEntrance,
};

/** Standard arrival: a short rise plus a fade. Nothing scales or bounces. */
export const riseVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: entranceTransition },
};

export const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: entranceTransition },
};

/** Applied to a parent so its children arrive in sequence. */
export function staggerVariants(stagger = 0.06, delayChildren = 0): Variants {
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren },
    },
  };
}

/** Shared viewport config: animate once, slightly before fully in view. */
export const viewportOnce = { once: true, amount: 0.25, margin: "0px 0px -80px 0px" } as const;

/** Reduced-motion replacement: state still changes, nothing travels. */
export const staticVariants: Variants = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0, transition: { duration: 0 } },
};

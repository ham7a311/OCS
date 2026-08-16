"use client";

import { ArrowDown, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Em } from "@/components/ui/section-heading";
import { Glow } from "@/components/visual/glow";
import { GridBackdrop } from "@/components/visual/grid-backdrop";
import { site } from "@/config/site";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { easeEntrance } from "@/lib/motion";

/** The three-part supporting statement required by SRS FR-017. */
const commitments = [
  { index: "01", label: "Connecting students" },
  { index: "02", label: "Creating opportunities" },
  { index: "03", label: "Building the future" },
];

export function Hero() {
  const reduced = usePrefersReducedMotion();

  // The hero arrives on load rather than on scroll, so it uses its own
  // sequence instead of the shared Reveal wrapper.
  const rise = (delay: number) =>
    reduced
      ? { initial: { opacity: 1, y: 0 }, animate: { opacity: 1, y: 0 } }
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: easeEntrance },
        };

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden pt-32 pb-16 sm:pt-36 lg:pt-44 lg:pb-24"
    >
      <GridBackdrop size={80} intensity="faint" fade="radial" drift />
      <Glow size="48rem" opacity={0.055} className="-top-72 left-[18%] hidden sm:block" />

      <Container>
        <motion.p
          {...rise(0)}
          className="flex items-center gap-3 font-mono text-label uppercase text-ink-faint"
        >
          <span className="size-1.5 shrink-0 rounded-full bg-amber-400" aria-hidden="true" />
          {/* The full label needs more room than a small phone has, so the
              short form carries the same two facts on one line. */}
          <span className="sm:hidden">Student-led · Oman</span>
          <span className="hidden sm:inline">Student-led technology community</span>
          <span className="hidden h-px w-6 bg-line-strong sm:block" aria-hidden="true" />
          <span className="hidden sm:inline">Oman</span>
        </motion.p>

        <motion.h1
          {...rise(0.08)}
          id="hero-title"
          className="mt-7 max-w-[16ch] text-display text-ink"
        >
          Building the next generation of <Em>technology innovators</Em>.
        </motion.h1>

        <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-7">
            <motion.p {...rise(0.16)} className="max-w-[40ch] text-lead text-ink-muted">
              Students gathering around programming, AI, research, and collaboration
              to build things that are real.
            </motion.p>

            <motion.div {...rise(0.24)} className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href={site.whatsappUrl} external size="lg" className="sm:w-auto">
                Join OCS
                <ArrowUpRight
                  className="size-4 transition-transform duration-200 ease-ui group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5"
                  aria-hidden="true"
                />
              </Button>
              <Button href="#programs" variant="secondary" size="lg">
                Explore programs
                <ArrowDown
                  className="size-4 text-ink-faint transition-transform duration-200 ease-ui group-hover/button:translate-y-0.5"
                  aria-hidden="true"
                />
              </Button>
            </motion.div>
          </div>

          <motion.ul
            {...rise(0.32)}
            className="divide-y divide-line-subtle overflow-hidden rounded-md border border-line bg-surface-1 lg:col-span-5"
          >
            {commitments.map(({ index, label }) => (
              <li
                key={index}
                className="flex items-baseline gap-5 px-5 py-5 transition-colors duration-300 ease-ui hover:bg-surface-2"
              >
                <span className="font-mono text-[0.6875rem] tracking-[0.09em] text-amber-300">
                  {index}
                </span>
                <span className="text-[0.9375rem] text-ink">{label}</span>
              </li>
            ))}
          </motion.ul>
        </div>
      </Container>
    </section>
  );
}

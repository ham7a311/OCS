"use client";

import { ArrowDown, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Em } from "@/components/ui/section-heading";
import { Glow } from "@/components/visual/glow";
import { GridBackdrop } from "@/components/visual/grid-backdrop";
import { NodeNetwork } from "@/components/visual/node-network";
import { site } from "@/config/site";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { easeEntrance } from "@/lib/motion";

const commitments = [
  { index: "01", label: "Connecting students" },
  { index: "02", label: "Creating opportunities" },
  { index: "03", label: "Building the future" },
];

export function Hero() {
  const reduced = usePrefersReducedMotion();

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
      className="relative isolate overflow-hidden pb-10 pt-[calc(var(--ocs-hero-inset)+1.5rem)] sm:pb-12 lg:pb-14 lg:pt-[calc(var(--ocs-hero-inset)+2.5rem)]"
    >
      <GridBackdrop size={80} intensity="faint" fade="radial" />
      <NodeNetwork />
      <Glow size="48rem" opacity={0.055} className="-top-72 left-[18%] hidden sm:block" />

      <Container className="relative z-10">
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <motion.p
              {...rise(0)}
              className="flex items-center gap-3 font-mono text-label uppercase text-ink-muted"
            >
              <span className="size-1.5 shrink-0 rounded-full bg-amber-400" aria-hidden="true" />
              <span className="sm:hidden">Student-led · Oman</span>
              <span className="hidden sm:inline">Student-led technology community</span>
              <span className="hidden h-px w-6 bg-line-strong sm:block" aria-hidden="true" />
              <span className="hidden font-medium text-amber-300 sm:inline">Oman</span>
            </motion.p>

            <motion.h1
              {...rise(0.08)}
              id="hero-title"
              className="mt-7 max-w-[16ch] text-display text-ink"
            >
              Building the next generation of <Em>technology innovators</Em>.
            </motion.h1>

            <motion.p {...rise(0.16)} className="mt-8 max-w-[40ch] text-lead text-ink-muted">
              Students gathering around programming, AI, research, and collaboration
              to build things that are real.
            </motion.p>

            <motion.div {...rise(0.24)} className="mt-8 flex w-full max-w-full flex-col gap-3 sm:flex-row sm:items-center">
              <Button href={site.whatsappUrl} external size="lg" className="w-full min-w-0 sm:w-auto sm:min-w-[11.5rem]">
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

          <motion.div
            {...rise(0.28)}
            className="flex flex-col gap-5 lg:col-span-5 lg:mt-2"
          >
            <h2 className="max-w-[11ch] font-serif text-[1.75rem] italic leading-[1.15] tracking-[0.005em] text-ink sm:text-[1.9375rem]">
              How we show up.
            </h2>
            <ul className="w-full divide-y divide-line-subtle overflow-hidden rounded-lg border border-line bg-surface-1">
              {commitments.map(({ index, label }, itemIndex) => (
                <li
                  key={index}
                  data-arrow-from={itemIndex === commitments.length - 1 ? "" : undefined}
                  className="flex items-baseline gap-5 px-5 py-5 transition-colors duration-300 ease-ui hover:bg-surface-2"
                >
                  <span className="font-mono text-[0.6875rem] tracking-[0.09em] text-amber-300">
                    {index}
                  </span>
                  <span className="text-[0.9375rem] text-ink">{label}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

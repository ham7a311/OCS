"use client";

import { useRef } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Em } from "@/components/ui/section-heading";
import { HeroEnvironment } from "@/components/visual/hero-environment";
import { site } from "@/config/site";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { easeEntrance } from "@/lib/motion";

export function Hero() {
  const reduced = usePrefersReducedMotion();
  const copyRef = useRef<HTMLDivElement>(null);

  const rise = (delay: number) =>
    reduced
      ? { initial: { opacity: 1, y: 0 }, animate: { opacity: 1, y: 0 } }
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, delay, ease: easeEntrance },
        };

  return (
    <section id="top" aria-labelledby="hero-title" className="hero-section relative isolate">
      <HeroEnvironment quietRef={copyRef} />

      <Container className="relative z-10">
          <div ref={copyRef} className="max-w-[40rem]">
          <motion.p
            {...rise(0.1)}
            className="flex items-center gap-3 font-mono text-label uppercase text-ink-muted"
          >
            <span className="size-1.5 shrink-0 rounded-full bg-amber-400" aria-hidden="true" />
            <span className="sm:hidden">Student-led · Oman</span>
            <span className="hidden sm:inline">Student-led technology community</span>
            <span className="hidden h-px w-6 bg-line-strong sm:block" aria-hidden="true" />
            <span className="hidden font-medium text-amber-300 sm:inline">Oman</span>
          </motion.p>

          <motion.h1
            {...rise(0.2)}
            id="hero-title"
            className="mt-7 max-w-[16ch] text-display text-ink"
          >
            Building the next generation of <Em>technology innovators</Em>.
          </motion.h1>

          <motion.p {...rise(0.32)} className="hero-lead mt-8 max-w-[40ch] text-lead">
            Something happens on your campus every month — not a conference you hear about once a
            year. OCS runs a chapter inside your own school or university.
          </motion.p>

          <motion.div
            {...rise(0.44)}
            className="mt-9 flex w-full max-w-full flex-col gap-3 sm:w-fit sm:flex-row sm:items-center"
            data-arrow-from=""
          >
            <Button href={site.whatsappUrl} external size="lg" className="w-full min-w-0 sm:w-auto sm:min-w-[11.5rem]">
              Join OCS
              <ArrowUpRight
                className="size-4 transition-transform duration-200 ease-ui group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5"
                aria-hidden="true"
              />
            </Button>
            <Button
              href="/#programs"
              variant="secondary"
              size="lg"
              className="w-full min-w-0 border-ink/40 bg-surface-3 sm:w-auto hover:border-ink/55 hover:bg-ink/10"
            >
              Explore programs
              <ArrowDown
                className="size-4 text-ink-muted transition-transform duration-200 ease-ui group-hover/button:translate-y-0.5"
                aria-hidden="true"
              />
            </Button>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

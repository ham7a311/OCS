"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Container } from "@/components/ui/container";
import { RouteLink } from "@/components/ui/route";
import { Em, SectionHeading } from "@/components/ui/section-heading";
import { voices, type Voice } from "@/data/voices";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { easeEntrance } from "@/lib/motion";

function pad(value: number) {
  return String(value).padStart(2, "0");
}

function formatRole(role: string) {
  return role.replace(/\s+at\s+/gi, " · ");
}

function Attribution({ voice }: { voice: Voice }) {
  return (
    <figcaption className="voices-attribution">
      <span className="voices-attribution__name">{voice.name}</span>
      <span className="voices-attribution__meta">{formatRole(voice.role)}</span>
      <a href={`/events/archive#${voice.eventId}`} className="voices-attribution__session">
        {voice.session}
      </a>
    </figcaption>
  );
}

/**
 * Desktop: one quote at a time, with the other voices as a short index.
 * Click or arrow keys move between them. Nothing pins the page.
 */
function VoicesStage() {
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  const count = voices.length;
  const voice = voices[active] ?? voices[0];

  const move = (direction: 1 | -1) => {
    setActive((current) => (current + direction + count) % count);
  };

  if (!voice) return null;

  return (
    <div
      className="voices-stage"
      onKeyDown={(event) => {
        if (event.key === "ArrowDown" || event.key === "ArrowRight") {
          event.preventDefault();
          move(1);
        } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
          event.preventDefault();
          move(-1);
        }
      }}
    >
      <nav aria-label="Voices">
        <ol className="voices-index">
          {voices.map((entry, index) => (
            <li key={entry.id}>
              <button
                type="button"
                onClick={() => setActive(index)}
                aria-current={index === active ? "true" : undefined}
                className="voices-index__item"
              >
                <span className="voices-index__number">{pad(index + 1)}</span>
                <span className="voices-index__name">{entry.name}</span>
              </button>
            </li>
          ))}
        </ol>
      </nav>

      <div className="voices-quote-wrap" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <motion.figure
            key={voice.id}
            className="voices-quote"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: easeEntrance }}
          >
            <span className="voices-quote__mark" aria-hidden="true">
              “
            </span>
            <blockquote className="voices-quote__text">{voice.quote}</blockquote>
            <Attribution voice={voice} />
          </motion.figure>
        </AnimatePresence>
        <p className="voices-count" aria-hidden="true">
          {pad(active + 1)}
          <span className="voices-count__rule" />
          {pad(count)}
        </p>
      </div>
    </div>
  );
}

/** Below the desktop breakpoint: the same people, stacked, no interaction required. */
function VoicesSpread() {
  return (
    <div className="voices-spread">
      {voices.map((voice, index) => (
        <figure key={voice.id} className="voices-spread__item">
          <p className="voices-index__number">{pad(index + 1)}</p>
          <blockquote className="voices-spread__text">“{voice.quote}”</blockquote>
          <Attribution voice={voice} />
        </figure>
      ))}
    </div>
  );
}

export function Voices() {
  if (voices.length === 0) return null;

  return (
    <section
      id="voices"
      aria-labelledby="voices-title"
      className="voices-section relative isolate scroll-mt-[var(--ocs-nav-clearance)]"
    >
      <div aria-hidden="true" className="absolute inset-x-0 top-0 rule-fade" />
      <Container>
        <SectionHeading
          index="04"
          eyebrow="Voices"
          id="voices-title"
          title={
            <>
              One student at a time, <Em>after the room closed</Em>.
            </>
          }
          description="What attendees wrote once a session ended, each quote linked to the session it came from."
        />

        <VoicesStage />
        <VoicesSpread />

        <div className="voices-foot">
          <RouteLink href="/events/archive">All past events</RouteLink>
        </div>
      </Container>
    </section>
  );
}

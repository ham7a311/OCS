"use client";

import { useCallback, useEffect, useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, ArrowUpRight, UserRound } from "lucide-react";
import { BackLink } from "@/components/ui/back-link";
import { Container } from "@/components/ui/container";
import { PagerButton } from "@/components/ui/pager-button";
import { VoicesWaveField } from "@/components/visual/voices-wave-field";
import { voices, type Voice } from "@/data/voices";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { duration, easeUi } from "@/lib/motion";

function padIndex(value: number) {
  return String(value).padStart(2, "0");
}

function formatRole(role: string) {
  return role.replace(/\s+at\s+/gi, " · ").toUpperCase();
}

function sessionLines(session: string) {
  const split = session.indexOf(": ");
  if (split === -1) return [session];
  return [session.slice(0, split), session.slice(split + 2)];
}

function DefaultAvatar() {
  return (
    <span className="voices-avatar" aria-hidden="true">
      <UserRound className="size-4" strokeWidth={1.5} />
    </span>
  );
}

function VoiceStage({ voice }: { voice: Voice }) {
  const lines = sessionLines(voice.session);

  return (
    <article aria-labelledby={`${voice.id}-name`} className="voices-article">
      <div className="voices-author">
        <DefaultAvatar />
        <div className="min-w-0">
          <p id={`${voice.id}-name`} className="voices-author-name">
            {voice.name}
          </p>
          <p className="voices-author-role">{formatRole(voice.role)}</p>
        </div>
      </div>

      <p className="voices-session">
        {lines.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </p>

      <blockquote className="voices-quote-body">
        <span className="voices-mark" aria-hidden="true">
          “
        </span>
        {voice.quote}
      </blockquote>
    </article>
  );
}

export function VoicesViewer() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const liveId = useId();
  const reduced = usePrefersReducedMotion();
  const count = voices.length;
  const voice = voices[index] ?? voices[0];

  const go = useCallback(
    (next: -1 | 1) => {
      setDirection(next);
      setIndex((current) => (current + next + count) % count);
    },
    [count],
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)) {
        return;
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        go(-1);
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        go(1);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [go]);

  if (!voice) return null;

  const transition = {
    duration: reduced ? duration.fast : 0.48,
    ease: easeUi,
  };

  return (
    <section className="voices-stage" aria-labelledby="voices-title">
      <div className="voices-word-layer" aria-hidden="true">
        <div className="voices-word">VOICES</div>
      </div>
      <VoicesWaveField />

      <Container className="voices-frame">
        <BackLink href="/#events" label="Back to events" />

        <h1 id="voices-title" className="voices-title">
          Voices
        </h1>
        <p className="voices-lead">One student at a time, after the room closed.</p>

        <p className="voices-pull voices-pull--a" aria-hidden="true">
          Rooms worth
          <br />
          being in.
        </p>

        <div className="voices-deck">
          <PagerButton
            label="Previous voice"
            onClick={() => go(-1)}
            className="voices-pager voices-pager--prev"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
          </PagerButton>

          <div className="voices-card">
            <div id={liveId} aria-live="polite" aria-atomic="true" className="voices-card-live">
              <AnimatePresence mode="wait" initial={false} custom={direction}>
                <motion.div
                  key={voice.id}
                  custom={direction}
                  initial={reduced ? { opacity: 0 } : { opacity: 0, x: direction * 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduced ? { opacity: 0 } : { opacity: 0, x: direction * -14 }}
                  transition={transition}
                >
                  <VoiceStage voice={voice} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <PagerButton
            label="Next voice"
            onClick={() => go(1)}
            className="voices-pager voices-pager--next"
          >
            <ArrowRight className="size-4" aria-hidden="true" />
          </PagerButton>
        </div>

        <p className="voices-index">
          {padIndex(index + 1)}
          <span className="voices-index-rule" aria-hidden="true">
            /
          </span>
          {padIndex(count)}
        </p>

        <p className="voices-pull voices-pull--b" aria-hidden="true">
          After the
          <br />
          room closed.
        </p>

        <div className="voices-archive-wrap">
          <a href="/events/archive" className="voices-archive">
            All past events
            <ArrowUpRight className="voices-archive-arrow" aria-hidden="true" />
          </a>
        </div>
      </Container>
    </section>
  );
}

"use client";

import { Pause, Play, RotateCcw, X } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { creditBlocks } from "@/data/credits";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

type PlaybackState = "playing" | "stopped" | "ended";

const ROLL_DURATION_MS = 40_000;

export function CreditsPage() {
  const router = useRouter();
  const reducedMotion = usePrefersReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const rollRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<Animation | null>(null);
  const [playback, setPlayback] = useState<PlaybackState>("playing");
  const [run, setRun] = useState(0);

  useEffect(() => {
    document.documentElement.classList.add("credits-lock");
    document.body.classList.add("credits-lock");

    return () => {
      document.documentElement.classList.remove("credits-lock");
      document.body.classList.remove("credits-lock");
    };
  }, []);

  useEffect(() => {
    const roll = rollRef.current;
    if (!roll) return;

    roll.getAnimations().forEach((animation) => animation.cancel());
    animationRef.current?.cancel();
    animationRef.current = null;

    if (reducedMotion) return;

    const endCard = roll.querySelector<HTMLElement>(".credits-end-card");
    const endCardCenter = endCard
      ? endCard.offsetTop + endCard.offsetHeight / 2
      : roll.scrollHeight;
    const startY = window.innerHeight * 0.92;
    const endY = window.innerHeight * 0.5 - endCardCenter;
    const animation = roll.animate(
      [
        { transform: `translate3d(-50%, ${startY}px, 0)` },
        { transform: `translate3d(-50%, ${endY}px, 0)` },
      ],
      {
        duration: ROLL_DURATION_MS,
        easing: "linear",
        fill: "forwards",
      },
    );

    animationRef.current = animation;
    let active = true;
    void animation.finished.then(
      () => {
        if (active) setPlayback("ended");
      },
      () => {
        // Cancelling during replay or route exit rejects the finished promise.
      },
    );

    return () => {
      active = false;
      animation.cancel();
    };
  }, [reducedMotion, run]);

  const togglePlayback = useCallback(() => {
    const animation = animationRef.current;
    if (!animation || reducedMotion) return;

    if (animation.playState === "running") {
      animation.pause();
      setPlayback("stopped");
      return;
    }

    if (animation.playState === "finished") {
      setRun((value) => value + 1);
      return;
    }

    animation.play();
    setPlayback("playing");
  }, [reducedMotion]);

  const replay = useCallback(() => {
    if (reducedMotion) {
      stageRef.current?.scrollTo({ top: 0, behavior: "auto" });
      return;
    }
    setPlayback("playing");
    setRun((value) => value + 1);
  }, [reducedMotion]);

  const exit = useCallback(() => {
    router.push("/");
  }, [router]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        exit();
      } else if (event.key === " ") {
        event.preventDefault();
        togglePlayback();
      } else if (event.key.toLowerCase() === "r") {
        event.preventDefault();
        replay();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [exit, replay, togglePlayback]);

  const effectivePlayback = reducedMotion ? "stopped" : playback;
  const statusText =
    effectivePlayback === "playing"
      ? "Credits playing"
      : effectivePlayback === "ended"
        ? "Credits complete"
        : "Credits stopped";

  return (
    <section
      className={`credits-page${reducedMotion ? " credits-page--reduced" : ""}`}
      aria-label="Oman Computing Society credits"
    >
      <div className="credits-vignette" aria-hidden="true" />

      <div ref={stageRef} className="credits-stage">
        <div
          key={run}
          ref={rollRef}
          className="credits-roll"
        >
          <header className="credits-title-card">
            <p className="credits-kicker">A student-led computing community</p>
            <h1>Oman Computing Society</h1>
            <p className="credits-location">Sultanate of Oman</p>
          </header>

          {creditBlocks.map((block) => (
            <section key={block.title} className="credits-block">
              <h2>{block.title}</h2>
              <div className="credits-lines">
                {block.lines.map((line) => (
                  <div key={`${block.title}-${line.role}`} className="credits-line">
                    <p className="credits-role">{line.role}</p>
                    <div className="credits-names">
                      {line.names.map((name) => (
                        <p key={name}>{name}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}

          <footer className="credits-end-card">
            <p className="credits-kicker">Oman Computing Society</p>
            <p className="credits-end-title">The room stays open.</p>
            <p className="credits-location">© {new Date().getFullYear()} OCS</p>
          </footer>
        </div>
      </div>

      <div className="credits-controls" role="group" aria-label="Credits playback controls">
        <button
          type="button"
          onClick={togglePlayback}
          disabled={reducedMotion}
          className="credits-control"
          aria-label={effectivePlayback === "playing" ? "Stop credits" : "Play credits"}
        >
          {effectivePlayback === "playing" ? (
            <Pause aria-hidden="true" />
          ) : (
            <Play aria-hidden="true" />
          )}
          <span>{effectivePlayback === "playing" ? "Stop" : "Play"}</span>
        </button>
        <button
          type="button"
          onClick={replay}
          className="credits-control"
          aria-label="Replay credits"
        >
          <RotateCcw aria-hidden="true" />
          <span>Replay</span>
        </button>
        <button type="button" onClick={exit} className="credits-control" aria-label="Exit to home">
          <X aria-hidden="true" />
          <span>Exit</span>
        </button>
      </div>

      <p className="sr-only" aria-live="polite">
        {statusText}
      </p>
    </section>
  );
}

"use client";

import { useCallback, useEffect, useId, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { EventCard } from "@/components/sections/event-card";
import { PagerButton } from "@/components/ui/pager-button";
import { EventTimeline } from "@/components/visual/event-timeline";
import { pastEvents } from "@/data/events";

const DESKTOP_PAGER = "(min-width: 1024px)";

export function EventsArchiveViewer() {
  const [index, setIndex] = useState(0);
  const [desktopPager, setDesktopPager] = useState(false);
  const liveId = useId();
  const count = pastEvents.length;
  const event = pastEvents[index] ?? pastEvents[0];

  const go = useCallback(
    (direction: -1 | 1) => {
      setIndex((current) => (current + direction + count) % count);
    },
    [count],
  );

  useEffect(() => {
    const query = window.matchMedia(DESKTOP_PAGER);
    const sync = () => setDesktopPager(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!desktopPager) return;

    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)
      ) {
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
  }, [desktopPager, go]);

  if (pastEvents.length === 0 || !event) return null;

  return (
    <div className="mt-10">
      <div className="lg:hidden">
        <EventTimeline events={pastEvents} />
      </div>

      <div className="hidden lg:block">
        <div className="flex items-center gap-4">
          <PagerButton label="Previous event" onClick={() => go(-1)}>
            <ArrowLeft className="size-4" aria-hidden="true" />
          </PagerButton>

          <div id={liveId} aria-live="polite" aria-atomic="true" className="min-w-0 flex-1">
            <EventCard event={event} />
          </div>

          <PagerButton label="Next event" onClick={() => go(1)}>
            <ArrowRight className="size-4" aria-hidden="true" />
          </PagerButton>
        </div>

        <p className="mt-5 text-center font-mono text-[0.6875rem] tracking-[0.09em] text-ink-muted uppercase">
          {index + 1} of {count}
        </p>
      </div>
    </div>
  );
}

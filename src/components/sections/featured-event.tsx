import { ArrowUpRight } from "lucide-react";
import { EventCard } from "@/components/sections/event-card";
import { Container } from "@/components/ui/container";
import { Panel } from "@/components/ui/panel";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { Em, SectionHeading } from "@/components/ui/section-heading";
import { EventTimeline } from "@/components/visual/event-timeline";
import { PowerTraceCta } from "@/components/visual/power-trace";
import {
  TIMELINE_VISIBLE_LIMIT,
  pastEvents,
  upcomingEvents,
} from "@/data/events";

export function FeaturedEvent() {
  const hasUpcoming = upcomingEvents.length > 0;
  const visibleTimeline = pastEvents.slice(0, TIMELINE_VISIBLE_LIMIT);
  const hasArchive = pastEvents.length > TIMELINE_VISIBLE_LIMIT;

  return (
    <Section id="events" tone="canvas" labelledBy="events-title">
      <Container>
        <Reveal>
          <SectionHeading
            index="03"
            eyebrow="Events"
            id="events-title"
            title={
              <>
                Rooms worth <Em>being in</Em>.
              </>
            }
            description="We bring people in front of students who would not otherwise be in the same room as them."
          />
        </Reveal>

        <Reveal delay={0.08} className="mt-14 lg:mt-20">
          <p className="font-mono text-[0.6875rem] tracking-[0.09em] text-ink-muted uppercase">
            Upcoming
          </p>

          {hasUpcoming ? (
            <div className="mt-4 flex flex-col gap-4">
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <Panel className="mt-4 px-6 py-8 sm:px-8">
              <p className="text-[1.0625rem] font-medium tracking-[-0.015em] text-ink">
                Next gathering to be announced
              </p>
              <p className="mt-2 max-w-[48ch] text-sm leading-relaxed text-ink-muted">
                Workshops, talks, and rooms worth being in will appear here as soon
                as they are confirmed.
              </p>
            </Panel>
          )}
        </Reveal>

        {visibleTimeline.length > 0 ? (
          <Reveal delay={0.12} className="mt-10 lg:mt-12">
            <p className="mb-4 font-mono text-[0.6875rem] tracking-[0.09em] text-ink-muted uppercase">
              Past
            </p>

            <EventTimeline events={visibleTimeline} />

            {hasArchive ? (
              <a
                href="/events/archive"
                className="mt-6 inline-flex items-center gap-2 font-mono text-[0.6875rem] tracking-[0.09em] text-amber-300 uppercase transition-colors duration-200 ease-ui hover:text-ink"
              >
                View full events archive
                <ArrowUpRight className="size-3.5" aria-hidden="true" />
              </a>
            ) : null}
          </Reveal>
        ) : null}

        <Reveal
          delay={0.16}
          className="mt-16 flex flex-col items-center px-8 text-center sm:mt-20 sm:px-10"
        >
          <PowerTraceCta href="/model">View the Model</PowerTraceCta>
        </Reveal>
      </Container>
    </Section>
  );
}


import { ArrowUpRight } from "lucide-react";
import { CategoryBadge, StatusBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { Em, SectionHeading } from "@/components/ui/section-heading";
import {
  eventStatusLabel,
  featuredEvent,
  formatEventDate,
  splitEventDate,
} from "@/data/events";

export function FeaturedEvent() {
  const event = featuredEvent;
  const date = splitEventDate(event.date);

  const metadata = [
    { label: "Speaker", value: event.speaker },
    { label: "Date", value: formatEventDate(event.date) },
    { label: "Theme", value: event.category },
    { label: "Status", value: eventStatusLabel[event.status] },
  ];

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
          {/* The single largest panel on the page. Everything else is a row or
              a band, so the featured event reads as the focal object. */}
          <article className="relative isolate overflow-hidden rounded-lg border border-line bg-surface-1">
            <div className="relative flex flex-wrap items-center justify-between gap-3 border-b border-line-subtle px-6 py-4 sm:px-8">
              <CategoryBadge>{event.category}</CategoryBadge>
              <StatusBadge status={event.status} label={eventStatusLabel[event.status]} />
            </div>

            <div className="relative grid gap-10 px-6 py-10 sm:px-8 sm:py-12 lg:grid-cols-12 lg:gap-14 lg:py-14">
              {/* The date is treated as a typographic object, not a caption. */}
              <div className="lg:col-span-3">
                <p className="flex items-baseline gap-3 lg:flex-col lg:items-start lg:gap-1">
                  <span className="text-[3.5rem] leading-[0.85] font-medium tracking-[-0.04em] text-ink tabular-nums lg:text-[4.5rem]">
                    {date.day}
                  </span>
                  <span className="font-mono text-sm tracking-[0.14em] text-amber-300">
                    {date.month} {date.year}
                  </span>
                </p>
                <p className="mt-3 font-mono text-[0.6875rem] tracking-[0.09em] text-ink-faint uppercase lg:mt-4">
                  {date.weekday}
                </p>
              </div>

              <div className="lg:col-span-9">
                <h3 className="max-w-[22ch] text-[1.75rem] leading-[1.12] font-semibold tracking-[-0.025em] text-ink sm:text-[2.125rem]">
                  {event.title}
                </h3>
                <p className="mt-5 max-w-[62ch] text-lead text-ink-muted">
                  {event.description}
                </p>

                {event.status === "registration-open" && event.registrationUrl ? (
                  <div className="mt-8">
                    <Button href={event.registrationUrl} external>
                      Register
                      <ArrowUpRight className="size-4" aria-hidden="true" />
                    </Button>
                  </div>
                ) : null}
              </div>
            </div>

            <dl className="relative grid grid-cols-2 gap-px border-t border-line-subtle bg-line-subtle lg:grid-cols-4">
              {metadata.map((item) => (
                <div key={item.label} className="bg-surface-1 px-6 py-5 sm:px-8">
                  <dt className="font-mono text-[0.625rem] tracking-[0.09em] text-ink-faint uppercase">
                    {item.label}
                  </dt>
                  <dd className="mt-2 text-[0.9375rem] text-ink">{item.value}</dd>
                </div>
              ))}
            </dl>
          </article>
        </Reveal>
      </Container>
    </Section>
  );
}

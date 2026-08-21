import { ArrowUpRight } from "lucide-react";
import { CategoryBadge, StatusBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MetaGrid } from "@/components/ui/meta-grid";
import { eventDisplayMetadata } from "@/components/ui/speaker-name";
import {
  eventStatusLabel,
  splitEventDate,
  type OcsEvent,
} from "@/data/events";

export function EventCard({ event }: { event: OcsEvent }) {
  const date = splitEventDate(event.date);
  const metadata = eventDisplayMetadata(event);
  const columns = metadata.length <= 2 ? 2 : metadata.length === 3 ? 3 : 4;

  return (
    <article
      id={event.id}
      className="relative isolate scroll-mt-[var(--ocs-nav-clearance)] overflow-hidden rounded-lg border border-line bg-surface-1"
    >
      <div className="relative flex flex-wrap items-center justify-between gap-3 border-b border-line-subtle px-6 py-4 sm:px-8">
        <CategoryBadge>{event.category}</CategoryBadge>
        <StatusBadge status={event.status} label={eventStatusLabel[event.status]} />
      </div>

      <div className="relative grid gap-10 px-6 py-10 sm:px-8 sm:py-12 lg:grid-cols-12 lg:gap-14 lg:py-14">
        <div className="lg:col-span-3">
          <p className="flex items-baseline gap-3 lg:flex-col lg:items-start lg:gap-1">
            <span className="text-[3.5rem] leading-[0.85] font-medium tracking-[-0.04em] text-ink tabular-nums lg:text-[4.5rem]">
              {date.day}
            </span>
            <span className="font-mono text-sm tracking-[0.14em] text-amber-300">
              {date.month} {date.year}
            </span>
          </p>
          <p className="mt-3 font-mono text-[0.6875rem] tracking-[0.09em] text-ink-muted uppercase lg:mt-4">
            {date.weekday}
          </p>
        </div>

        <div className="lg:col-span-9">
          <h3 className="max-w-[28ch] text-[1.75rem] leading-[1.12] font-semibold tracking-[-0.025em] text-ink sm:text-[2.125rem]">
            {event.title}
          </h3>
          <p className="mt-5 max-w-[62ch] text-lead text-ink-muted">
            {event.description}
          </p>

          {event.collaboration ? (
            <p className="mt-5 text-sm text-ink-muted">
              <span className="font-mono text-[0.6875rem] tracking-[0.09em] text-ink-faint uppercase">
                In collaboration with
              </span>
              <span className="mt-1 block text-[0.9375rem] text-ink">{event.collaboration}</span>
            </p>
          ) : null}

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

      <MetaGrid
        items={metadata}
        columns={columns}
        className="border-t border-line-subtle"
      />
    </article>
  );
}

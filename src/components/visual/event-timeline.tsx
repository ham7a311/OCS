"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { TagChip } from "@/components/ui/badge";
import { eventMetadata, splitEventDate, type OcsEvent } from "@/data/events";
import { cn } from "@/lib/utils";

function TimelineRow({
  event,
  open,
  onToggle,
}: {
  event: OcsEvent;
  open: boolean;
  onToggle: () => void;
}) {
  const date = splitEventDate(event.date);
  const metadata = eventMetadata(event);
  const detailId = `event-detail-${event.id}`;

  return (
    <div className="timeline-item scroll-mt-[var(--ocs-nav-clearance)]" id={event.id}>
      <span className="timeline-node" aria-hidden="true" />
      <button
        type="button"
        className="timeline-row"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={detailId}
      >
        <span className="timeline-date">
          <span className="timeline-date-day">{date.day}</span>
          <span className="timeline-date-month">
            {date.month}
            <span className="hidden sm:inline"> {date.year}</span>
          </span>
        </span>
        <span className="timeline-title">{event.title}</span>
        <TagChip className="timeline-tag hidden sm:inline-flex">{event.category}</TagChip>
        <ChevronDown
          className={cn("timeline-chevron size-4 shrink-0 text-ink-faint", open && "rotated")}
          aria-hidden="true"
        />
      </button>

      <div id={detailId} className="timeline-panel" data-open={open ? "true" : "false"}>
        <div className="timeline-panel-inner">
          <div className="timeline-detail">
            <TagChip className="mb-3 sm:hidden">{event.category}</TagChip>
            <p className="max-w-[62ch] text-sm leading-relaxed text-ink-muted">
              {event.description}
            </p>
            {event.collaboration ? (
              <p className="mt-3 text-sm text-ink">
                <span className="font-mono text-[0.625rem] tracking-[0.09em] text-ink-faint uppercase">
                  With
                </span>{" "}
                {event.collaboration}
              </p>
            ) : null}
            <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-2 border-t border-line-subtle pt-3">
              {metadata.map((item) => (
                <div key={item.label}>
                  <dt className="font-mono text-[0.625rem] tracking-[0.09em] text-ink-muted uppercase">
                    {item.label}
                  </dt>
                  <dd className="mt-0.5 text-sm text-ink">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}

export function EventTimeline({
  events,
  expandFirst = false,
}: {
  events: OcsEvent[];
  expandFirst?: boolean;
}) {
  const [openId, setOpenId] = useState<string | null>(
    expandFirst && events[0] ? events[0].id : null,
  );

  if (events.length === 0) return null;

  return (
    <div className="event-timeline">
      <svg
        className="event-timeline-rail"
        viewBox="0 0 12 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M6 0 C 3.6 14, 8.6 28, 6 42 C 3.2 56, 8.8 70, 6 84 C 4.4 92, 7.4 96, 6 100" />
      </svg>
      {events.map((event) => (
        <TimelineRow
          key={event.id}
          event={event}
          open={openId === event.id}
          onToggle={() => setOpenId((current) => (current === event.id ? null : event.id))}
        />
      ))}
    </div>
  );
}

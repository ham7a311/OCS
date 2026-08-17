import type { Metadata } from "next";
import { Footer } from "@/components/sections/footer";
import { Navbar } from "@/components/sections/navbar";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { EventTimeline } from "@/components/visual/event-timeline";
import { pastEvents } from "@/data/events";

export const metadata: Metadata = {
  title: "Events archive",
  description: "A complete record of Oman Computing Society gatherings, workshops, and talks.",
  alternates: { canonical: "/events/archive" },
};

export default function EventsArchivePage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Section tone="canvas" labelledBy="archive-title" divider={false}>
          <Container className="pt-[var(--ocs-nav-clearance)]">
            <a
              href="/#events"
              className="inline-flex items-center gap-2 font-mono text-[0.6875rem] tracking-[0.09em] text-ink-muted uppercase transition-colors duration-200 ease-ui hover:text-ink"
            >
              Back to events
            </a>
            <h1
              id="archive-title"
              className="mt-6 text-h2 font-semibold tracking-[-0.025em] text-ink"
            >
              Events archive
            </h1>
            <p className="mt-3 max-w-[52ch] text-sm leading-relaxed text-ink-muted">
              Every gathering we have run, newest first. Open a row for the speaker, format, and
              what the session was actually about.
            </p>
            <div className="mt-10">
              <EventTimeline events={pastEvents} />
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}

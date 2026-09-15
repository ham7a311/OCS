import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { EventsArchiveViewer } from "@/components/sections/events-archive-viewer";
import { Footer } from "@/components/sections/footer";
import { Navbar } from "@/components/sections/navbar";
import { BackLink } from "@/components/ui/back-link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "All past events",
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
            <BackLink href="/#events" label="Back to events" />
            <h1
              id="archive-title"
              className="mt-6 text-h2 font-semibold tracking-[-0.025em] text-ink"
            >
              All past events
            </h1>
            <p className="mt-3 max-w-[52ch] text-sm leading-relaxed text-ink-muted">
              Completed sessions, latest first.
            </p>
            <EventsArchiveViewer />
            <div className="mt-10 lg:flex lg:justify-center">
              <a
                href="/#voices"
                className="inline-flex min-h-11 items-center gap-2 font-mono text-[0.6875rem] tracking-[0.09em] text-amber-300 uppercase transition-colors duration-200 ease-ui hover:text-ink"
              >
                Voices
                <ArrowUpRight className="size-3.5" aria-hidden="true" />
              </a>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}

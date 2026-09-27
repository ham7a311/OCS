import { ShowUpSequence } from "@/components/sections/show-up-sequence";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { HalftoneCta } from "@/components/ui/halftone-cta";
import { Reveal } from "@/components/ui/reveal";
import { RouteRule } from "@/components/ui/route";
import { Section } from "@/components/ui/section";
import { Em } from "@/components/ui/section-heading";
import { about } from "@/data/about";
import { site } from "@/config/site";

/**
 * About as one editorial movement: the statement, the mission, then How We
 * Show Up as the last part of the same story — not a section of its own.
 */
export function About() {
  return (
    <Section id="about" tone="raised" labelledBy="about-title">
      <Container>
        <Reveal>
          <Eyebrow index="01" stop>
            About OCS
          </Eyebrow>
        </Reveal>
        <div className="about-opening mt-8">
          <Reveal delay={0.06} className="about-opening__statement">
            <h2 id="about-title" className="about-statement">
              A technology community <Em>built by students</Em>.
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="about-opening__copy">
            <p className="max-w-[44ch] text-lead text-ink-muted">{about.intro}</p>
            <p className="mt-6 max-w-[46ch] text-[1.0625rem] leading-relaxed text-ink">
              <span className="font-medium">{about.statementLead}</span>{" "}
              <span className="text-ink-muted">{about.statementBody}</span>
            </p>
          </Reveal>

          <Reveal delay={0.14} className="about-opening__mission">
            <div className="ocs-mission-frame">
              <blockquote className="about-mission">
                <p className="about-mission__kicker">Our mission</p>
                <p className="about-mission__text">{site.mission}</p>
              </blockquote>
            </div>
            <p className="mt-6 font-mono text-[0.6875rem] tracking-[0.09em] text-ink-muted uppercase">
              Organised by students in Oman
            </p>
          </Reveal>
        </div>

        <div className="show-up-band mt-16 lg:mt-20">
          <RouteRule />
          <div className="mt-8 max-w-xl">
            <h3 className="show-up-heading">How we show up.</h3>
            <p className="mt-4 max-w-[48ch] text-ink-muted">
              Three commitments shape how a chapter feels, what it opens up, and what
              students leave able to build.
            </p>
          </div>
          <div className="mt-8">
            <ShowUpSequence />
          </div>
        </div>

        <Reveal delay={0.08}>
          <HalftoneCta
            className="mt-20 lg:mt-24"
            badge="Curious how this runs?"
            heading={
              <>
                See the model,
                <br />
                day to day.
              </>
            }
            subtext="Read the full breakdown of how OCS actually operates."
            action={{ href: "/model", label: "View the model" }}
          />
        </Reveal>
      </Container>
    </Section>
  );
}

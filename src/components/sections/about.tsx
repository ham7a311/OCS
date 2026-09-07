import { AboutFocusCards } from "@/components/sections/about-focus-cards";
import { Container } from "@/components/ui/container";
import { HalftoneCta } from "@/components/ui/halftone-cta";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { Em, SectionHeading } from "@/components/ui/section-heading";
import { about } from "@/data/about";
import { site } from "@/config/site";

export function About() {
  return (
    <Section id="about" tone="raised" labelledBy="about-title">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <SectionHeading
                index="01"
                eyebrow="About OCS"
                id="about-title"
                title={
                  <>
                    A technology community <Em>built by students</Em>.
                  </>
                }
              />
            </Reveal>

            <Reveal delay={0.06}>
              <p className="mt-8 max-w-[48ch] text-lead text-ink-muted">{about.intro}</p>
              <p className="mt-8 max-w-[42ch] text-[1.0625rem] leading-relaxed text-ink">
                <span className="font-medium">{about.statementLead}</span>{" "}
                <span className="text-ink-muted">{about.statementBody}</span>
              </p>
              <p className="mt-6 font-mono text-[0.6875rem] tracking-[0.09em] text-ink-muted uppercase">
                Organised by students in Oman
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="lg:col-span-5 lg:pt-10">
            <div className="ocs-mission-frame">
              <blockquote className="rounded-[9px] bg-canvas px-6 py-6 sm:px-7 sm:py-7">
                <p className="font-mono text-[0.6875rem] tracking-[0.09em] text-amber-300 uppercase">
                  Our mission
                </p>
                <p className="mt-4 text-[1.25rem] leading-[1.45] tracking-[-0.015em] text-ink sm:text-[1.375rem]">
                  {site.mission}
                </p>
              </blockquote>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.14}>
          <AboutFocusCards />
        </Reveal>

        <Reveal delay={0.18}>
          <HalftoneCta
            className="mt-10"
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

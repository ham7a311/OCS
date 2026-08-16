import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { Em, SectionHeading } from "@/components/ui/section-heading";
import { about, focusAreas } from "@/data/about";
import { site } from "@/config/site";

export function About() {
  return (
    <Section id="about" tone="raised" labelledBy="about-title">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-20">
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
            </Reveal>
          </div>

          <Reveal delay={0.1} className="lg:col-span-5 lg:pt-16">
            <blockquote className="border-l border-amber-500/70 pl-6">
              <p className="font-mono text-[0.6875rem] tracking-[0.09em] text-amber-300 uppercase">
                Our mission
              </p>
              <p className="mt-5 text-[1.375rem] leading-[1.45] tracking-[-0.015em] text-ink sm:text-[1.5rem]">
                {site.mission}
              </p>
            </blockquote>
          </Reveal>
        </div>

        <Reveal delay={0.14}>
          <dl className="mt-14 grid gap-8 border-t border-line-subtle pt-8 sm:grid-cols-3 lg:mt-16">
            {focusAreas.map((area, index) => (
              <div key={area.id} className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="pt-0.5 font-mono text-[0.6875rem] tracking-[0.09em] text-amber-300 tabular-nums"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <dt className="text-[0.9375rem] font-medium text-ink">{area.label}</dt>
                  <dd className="mt-1.5 max-w-[32ch] text-sm leading-relaxed text-ink-faint">
                    {area.description}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </Section>
  );
}

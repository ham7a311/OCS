import { ArrowUpRight } from "lucide-react";
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
          <ul className="mt-14 grid gap-px overflow-hidden rounded-lg border border-line-subtle bg-line-subtle sm:grid-cols-3 lg:mt-16">
            {focusAreas.map((area) => {
              const Icon = area.icon;

              return (
                <li key={area.id}>
                  <a
                    href={area.href}
                    className="group flex h-full gap-4 bg-surface-1 p-5 transition-colors duration-200 ease-ui hover:bg-surface-2 sm:p-6"
                  >
                    <span
                      aria-hidden="true"
                      className="grid size-10 shrink-0 place-items-center rounded-md border border-line text-ink-muted transition-colors duration-200 ease-ui group-hover:border-amber-500/40 group-hover:text-amber-300"
                    >
                      <Icon className="size-4" strokeWidth={1.5} />
                    </span>
                    <span>
                      <span className="flex items-center gap-2 text-[0.9375rem] font-medium text-ink">
                        {area.label}
                        <ArrowUpRight
                          className="size-3.5 text-ink-faint opacity-0 transition-opacity duration-200 ease-ui group-hover:opacity-100"
                          aria-hidden="true"
                        />
                      </span>
                      <span className="mt-1.5 block max-w-[32ch] text-sm leading-relaxed text-ink-faint">
                        {area.description}
                      </span>
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </Reveal>

        <Reveal delay={0.18}>
          <a
            href="/model"
            className="collab-card mt-10 flex flex-col gap-3 rounded-lg px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8"
          >
            <div>
              <p className="inline-flex items-center gap-2 text-[1.0625rem] font-medium tracking-[-0.015em] text-ink">
                Curious how this actually runs day to day?
                <ArrowUpRight
                  className="collab-arrow size-3.5 shrink-0 text-amber-300"
                  aria-hidden="true"
                />
              </p>
              <p className="mt-1 text-sm text-ink-muted">Read the full model.</p>
            </div>
            <span className="inline-flex items-center gap-2 font-mono text-[0.6875rem] tracking-[0.09em] text-amber-300 uppercase">
              View the Model
              <ArrowUpRight className="collab-arrow size-3.5" aria-hidden="true" />
            </span>
          </a>
        </Reveal>
      </Container>
    </Section>
  );
}

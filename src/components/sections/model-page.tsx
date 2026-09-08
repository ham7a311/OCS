import { ArrowUpRight, ClipboardList, Megaphone, Radio, Sparkles, UserRound } from "lucide-react";
import { EffortBadge, TagChip } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ContentTable } from "@/components/ui/content-table";
import { HalftoneCta } from "@/components/ui/halftone-cta";
import { Panel } from "@/components/ui/panel";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { Em, SectionHeading } from "@/components/ui/section-heading";
import { AudienceAtmosphereCards } from "@/components/sections/audience-atmosphere-cards";
import { EvidenceMetricGrid } from "@/components/sections/evidence-metric-grid";
import { GuardedCoreVisual } from "@/components/visual/guarded-core";
import { LoopConnector } from "@/components/visual/loop-connector";
import { LoopCard } from "@/components/visual/loop-time-plate";
import { CropMarkCta } from "@/components/visual/crop-mark";
import { SealCta } from "@/components/visual/seal-arc";
import { MoneyDuneFlight } from "@/components/visual/money-dune-flight";
import { TwoLoopsArtwork } from "@/components/visual/two-loops-artwork";
import { PanelField } from "@/components/visual/panel-field";
import { CircuitConvergeArtwork } from "@/components/visual/circuit-converge-artwork";
import { EvidenceTerminalArtwork } from "@/components/visual/evidence-terminal-artwork";
import { site } from "@/config/site";
import {
  chapterPrinciples,
  chapterRoles,
  chapterWaves,
  chapters,
  evidence,
  fastLoop,
  menuTiers,
  modelIntro,
  money,
  rhythm,
  slowLoop,
  squadWeeks,
  squads,
  yourData,
} from "@/data/model";

const roleIcons = {
  lead: Sparkles,
  programme: ClipboardList,
  signal: Megaphone,
  records: Radio,
  understudy: UserRound,
} as const;

function PullQuote({
  eyebrow,
  children,
}: {
  eyebrow?: string;
  children: string;
}) {
  return (
    <div className="ocs-mission-frame">
      <blockquote className="rounded-[9px] bg-canvas px-6 py-6 sm:px-7 sm:py-7">
        {eyebrow ? (
          <p className="font-mono text-[0.6875rem] tracking-[0.09em] text-amber-300 uppercase">
            {eyebrow}
          </p>
        ) : null}
        <p
          className={
            eyebrow
              ? "mt-4 text-[1.25rem] leading-[1.45] tracking-[-0.015em] text-ink sm:text-[1.375rem]"
              : "text-[1.25rem] leading-[1.45] tracking-[-0.015em] text-ink sm:text-[1.375rem]"
          }
        >
          {children}
        </p>
      </blockquote>
    </div>
  );
}

export function ModelPage() {
  return (
    <>
      <Section
        id="the-model"
        tone="canvas"
        labelledBy="model-title"
        divider={false}
        className="model-intro-section"
      >
        <Container className="relative z-10 pt-[var(--ocs-nav-clearance)]">
          <TwoLoopsArtwork />
          <Reveal className="relative z-10">
            <SectionHeading
              index="01"
              eyebrow="The Model"
              id="model-title"
              title={
                <>
                  Two loops, running at <Em>different speeds</Em>.
                </>
              }
              description={modelIntro.body}
            />
          </Reveal>

          <Reveal delay={0.08} className="relative z-10 mt-12 lg:mt-16">
            <LoopConnector
              left={<LoopCard kicker="Slow loop" pace="slow" loop={slowLoop} />}
              right={<LoopCard kicker="Fast loop" pace="fast" loop={fastLoop} />}
            />
          </Reveal>

          <Reveal delay={0.12} className="mt-10 lg:mt-14">
            <PullQuote>{modelIntro.coupling}</PullQuote>
          </Reveal>
        </Container>
      </Section>

      <Section id="rhythm" tone="raised" labelledBy="rhythm-title">
        <Container>
          <Reveal>
            <SectionHeading
              index="02"
              eyebrow="Rhythm"
              id="rhythm-title"
              title={
                <>
                  The calendar is the <Em>product</Em>.
                </>
              }
              description={rhythm.body}
            />
          </Reveal>

          <Reveal delay={0.08} className="mt-10">
            <ContentTable
              columns={["Week", "Phase", "What happens"]}
              colWidths={["8.75rem", "8.5rem", "auto"]}
              rows={rhythm.weeks.map((week) => ({
                id: week.id,
                cells: [week.kicker, week.title, week.body],
              }))}
            />
          </Reveal>

          <Reveal delay={0.1} className="mt-10">
            <PullQuote>{rhythm.weekThree}</PullQuote>
          </Reveal>

          <Reveal delay={0.12} className="mt-14 lg:mt-16">
            <h3 className="text-h3 text-ink">{rhythm.menuHeading}</h3>
            <p className="mt-4 max-w-[52ch] text-lead text-ink-muted">{rhythm.menuBody}</p>
            <div className="mt-8">
              <ContentTable
                framed
                columns={["Tier", "Format", "Effort", "Why it's on the menu"]}
                colWidths={["4.75rem", "12rem", "7.75rem", "auto"]}
                nowrapColumns={[0, 1, 2]}
                rows={menuTiers.map((tier) => ({
                  id: tier.id,
                  cells: [
                    tier.tier,
                    <span key={`${tier.id}-format`} className="flex flex-col items-start">
                      {tier.format}
                      {tier.earned ? <span className="tier-earned">Earned</span> : null}
                    </span>,
                    <EffortBadge key={`${tier.id}-effort`} level={tier.effort} />,
                    tier.why,
                  ],
                }))}
              />
            </div>
          </Reveal>

          <Reveal delay={0.14} className="mt-10 grid gap-4 lg:grid-cols-2">
            <Panel className="relative isolate overflow-hidden px-6 py-6 sm:px-8">
              <PanelField variant="online" />
              <div className="relative z-[2]">
                <p className="font-mono text-[0.6875rem] tracking-[0.09em] text-amber-300 uppercase">
                  Online by default
                </p>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">{rhythm.onlineDefault}</p>
              </div>
            </Panel>
            <Panel className="relative isolate overflow-hidden px-6 py-6 sm:px-8">
              <PanelField variant="room" />
              <div className="relative z-[2]">
                <p className="font-mono text-[0.6875rem] tracking-[0.09em] text-amber-300 uppercase">
                  In person, and only these
                </p>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">{rhythm.inPersonOnly}</p>
              </div>
            </Panel>
          </Reveal>

          <Reveal delay={0.16} className="mt-10">
            <PullQuote>{rhythm.campusQuiet}</PullQuote>
          </Reveal>
        </Container>
      </Section>

      <Section id="chapters" tone="canvas" labelledBy="chapters-title">
        <Container>
          <Reveal>
            <SectionHeading
              index="03"
              eyebrow="Chapters"
              id="chapters-title"
              title={
                <>
                  A chapter is one <Em>campus</Em>.
                </>
              }
              description={chapters.body}
            />
          </Reveal>

          <Reveal delay={0.08} className="mt-10">
            <PullQuote eyebrow="In plain words">{chapters.plainWords}</PullQuote>
          </Reveal>

          <Reveal delay={0.1} className="mt-14 lg:mt-16">
            <h3 className="text-h3 text-ink">{chapters.fiveHeading}</h3>
            <p className="mt-4 max-w-[52ch] text-lead text-ink-muted">{chapters.fiveBody}</p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {chapterRoles.map((role) => {
                const Icon = roleIcons[role.id];
                return (
                  <li key={role.id}>
                    <Panel className="flex h-full flex-col gap-4 px-5 py-5 sm:px-6 sm:py-6">
                      <div className="flex items-start justify-between gap-3">
                        <span className="grid size-10 place-items-center rounded-md border border-line text-ink-muted">
                          <Icon className="size-4" strokeWidth={1.5} aria-hidden="true" />
                        </span>
                        <TagChip>{role.hours}</TagChip>
                      </div>
                      <div>
                        <h4 className="text-[0.9875rem] font-medium text-ink">{role.title}</h4>
                        <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{role.description}</p>
                      </div>
                    </Panel>
                  </li>
                );
              })}
            </ul>
          </Reveal>

          <Reveal delay={0.12} className="mt-10 grid gap-4 sm:grid-cols-2">
            {chapterPrinciples.map((principle) => (
              <PullQuote key={principle.id} eyebrow={principle.title}>
                {principle.body}
              </PullQuote>
            ))}
          </Reveal>

          <Reveal delay={0.14} className="mt-14 lg:mt-16">
            <h3 className="text-h3 text-ink">{chapters.wavesHeading}</h3>
            <p className="mt-4 max-w-[52ch] text-lead text-ink-muted">{chapters.wavesBody}</p>
            <div className="mt-8">
              <ContentTable
                columns={["Wave", "Timeframe", "Campuses"]}
                colWidths={["6.75rem", "11.5rem", "auto"]}
                rows={chapterWaves.map((wave) => ({
                  id: wave.id,
                  cells: [wave.kicker, wave.title, wave.body],
                  note: wave.note,
                }))}
              />
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <HalftoneCta
              className="mt-10"
              badge="Start a chapter"
              heading={
                <>
                  Your campus
                  <br />
                  can have one.
                </>
              }
              subtext={chapters.startCta}
              action={{ href: "/signin", label: "Start a Chapter" }}
            />
          </Reveal>
        </Container>
      </Section>

      <Section id="build-squads" tone="raised" labelledBy="squads-title" className="build-squads-section">
        <Container className="relative z-10">
          <CircuitConvergeArtwork />
          <Reveal className="relative z-10">
            <SectionHeading
              index="04"
              eyebrow="Build squads"
              id="squads-title"
              title={
                <>
                  Three students. One real client. <Em>Ten weeks.</Em>
                </>
              }
              description={squads.body}
            />
          </Reveal>

          <Reveal delay={0.08} className="relative z-10 mt-10">
            <ContentTable
              columns={["Week(s)", "Phase", "What happens"]}
              colWidths={["8.75rem", "8.5rem", "auto"]}
              rows={squadWeeks.map((week) => ({
                id: week.id,
                cells: [week.kicker, week.title, week.body],
              }))}
            />
          </Reveal>

          <Reveal delay={0.1} className="mt-10">
            <div className="ocs-mission-frame">
              <blockquote className="rounded-[9px] bg-canvas px-6 py-6 sm:px-7 sm:py-7">
                <p className="font-mono text-[0.6875rem] tracking-[0.09em] text-amber-300 uppercase">
                  The rule that makes this safe
                </p>
                <p className="mt-4 text-[1.25rem] leading-[1.45] tracking-[-0.015em] text-ink sm:text-[1.375rem]">
                  {squads.ruleTitle}
                </p>
                <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink-muted">{squads.ruleBody}</p>
              </blockquote>
            </div>
          </Reveal>

          <Reveal delay={0.14} className="mt-10">
            <AudienceAtmosphereCards
              students={squads.forStudents}
              businesses={squads.forBusinesses}
            />
          </Reveal>

          <Reveal delay={0.16}>
            <HalftoneCta
              className="mt-10"
              badge="Build squads"
              heading={
                <>
                  Talk to us
                  <br />
                  about a project.
                </>
              }
              subtext="Guest talks, co-hosted builds, and student pipelines — reach the team on WhatsApp."
              action={{
                href: site.whatsappUrl,
                label: "Reach us on WhatsApp",
                external: true,
                ariaLabel: "Talk to us about a project — reach us on WhatsApp",
              }}
            />
          </Reveal>
        </Container>
      </Section>

      <Section id="evidence" tone="canvas" labelledBy="evidence-title">
        <Container className="relative z-10">
          <EvidenceTerminalArtwork />
          <Reveal className="relative z-10">
            <SectionHeading
              index="05"
              eyebrow="Evidence"
              id="evidence-title"
              title={
                <>
                  Six numbers, published every <Em>month</Em>.
                </>
              }
              description={evidence.body}
            />
          </Reveal>

          <Reveal delay={0.08} className="relative z-10">
            <EvidenceMetricGrid />
          </Reveal>
        </Container>
      </Section>

      <Section id="your-data" tone="raised" labelledBy="data-title">
        <Container>
          <div className="lg:grid lg:grid-cols-12 lg:items-center lg:gap-16">
            <div className="lg:col-span-6 xl:col-span-7">
              <Reveal>
                <SectionHeading
                  eyebrow="Your data"
                  id="data-title"
                  title={
                    <>
                      Asked for properly, or <Em>not at all</Em>.
                    </>
                  }
                  description={yourData.body}
                />
              </Reveal>
              <Reveal
                delay={0.08}
                className="mt-16 flex flex-col items-center px-6 text-center sm:mt-20 lg:mt-14 lg:items-start lg:px-0"
              >
                <div className="w-full max-w-[20.5rem]">
                  <CropMarkCta href="/privacy">Read the privacy notice</CropMarkCta>
                </div>
              </Reveal>
            </div>

            <div
              className="hidden lg:col-span-6 lg:flex lg:items-center lg:justify-center xl:col-span-5"
              aria-hidden="true"
            >
              <Reveal delay={0.12}>
                <GuardedCoreVisual />
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      <Section id="money" tone="canvas" labelledBy="money-title" className="money-section">
        <MoneyDuneFlight />
        <Container className="relative z-10">
          <Reveal>
            <SectionHeading
              eyebrow="Money"
              id="money-title"
              title={
                <>
                  Free to join. <Em>Always.</Em>
                </>
              }
              description={money.body}
            />
          </Reveal>
          <Reveal
            delay={0.08}
            className="mt-16 flex flex-col items-center px-10 text-center sm:mt-20 lg:items-start lg:px-0 lg:text-left"
          >
            <div className="flex w-full flex-col items-center gap-10 lg:max-w-[32rem] lg:items-start">
              <Button
                href="/#programs"
                variant="secondary"
                size="lg"
                className="h-14 w-[min(100%,20.5rem)] border-ink/40 bg-surface-3 px-8 text-[1.05rem] hover:border-ink/55 hover:bg-ink/10"
              >
                Explore Programs
              </Button>
              <SealCta href="/signin">Become a Member</SealCta>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}

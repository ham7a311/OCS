"use client";

import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { stats, type Stat } from "@/data/stats";
import { useCountUp } from "@/hooks/use-count-up";

function Figure({ stat, className }: { stat: Stat; className?: string }) {
  const { ref, value } = useCountUp(stat.value);

  return (
    <span className={className}>
      <span ref={ref}>{value}</span>
      {stat.suffix ? <span className="text-amber-300">{stat.suffix}</span> : null}
    </span>
  );
}

/**
 * Evidence, set as one story and its footnotes: the reach figure carries the
 * section, the other three read as a ledger beneath it.
 */
export function Stats() {
  const ordered = [...stats].sort((a, b) => a.displayOrder - b.displayOrder);
  const primary = ordered.find((stat) => stat.featured) ?? ordered[0];
  const secondary = ordered.filter((stat) => stat !== primary);

  if (!primary) return null;

  return (
    <Section tone="canvas" divider={false} className="stats-section">
      <Container>
        <Reveal>
          <Eyebrow>Impact to date</Eyebrow>
        </Reveal>

        <div className="mt-10 grid gap-14 lg:mt-12 lg:grid-cols-12 lg:items-end lg:gap-10">
          <Reveal delay={0.06} className="lg:col-span-7">
            <p className="stats-primary">
              <span data-arrow-to="" className="stats-primary__figure tabular-nums">
                <Figure stat={primary} />
              </span>
              <span className="stats-primary__label">{primary.label}</span>
            </p>
            <p className="mt-5 max-w-[34ch] text-lead text-ink-muted">{primary.note}</p>
          </Reveal>

          <Reveal delay={0.14} className="lg:col-span-5">
            <dl className="stats-ledger">
              {secondary.map((stat) => (
                <div key={stat.id} className="stats-ledger__row">
                  <dt className="stats-ledger__label">
                    <span className="text-ink">{stat.label}</span>
                    <span className="stats-ledger__note">{stat.note}</span>
                  </dt>
                  <dd className="stats-ledger__value tabular-nums">
                    <Figure stat={stat} />
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

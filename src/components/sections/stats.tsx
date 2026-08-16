"use client";

import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { stats, type Stat } from "@/data/stats";
import { useCountUp } from "@/hooks/use-count-up";

function StatCell({ stat }: { stat: Stat }) {
  const { ref, value } = useCountUp(stat.value);

  return (
    <div className="flex flex-col gap-3 bg-canvas px-5 py-8 sm:px-6 lg:px-7 lg:py-10">
      <p className="text-stat text-ink tabular-nums">
        <span ref={ref}>{value}</span>
        {stat.suffix ? <span className="text-amber-300">{stat.suffix}</span> : null}
      </p>
      <div className="flex flex-col gap-1.5">
        <p className="font-mono text-[0.6875rem] tracking-[0.09em] text-ink-muted uppercase">
          {stat.label}
        </p>
        <p className="text-sm text-ink-faint">{stat.note}</p>
      </div>
    </div>
  );
}

export function Stats() {
  return (
    <Section tone="canvas" divider={false} className="pt-4 pb-20 sm:pb-24 lg:pt-8 lg:pb-28">
      <Container>
        <Reveal>
          <Eyebrow>Impact to date</Eyebrow>
        </Reveal>

        <Reveal delay={0.08}>
          {/* Hairline seams come from the 1px gaps, so the figures sit in a
              measured grid rather than in four floating cards. */}
          <div className="mt-8 grid grid-cols-2 gap-px border-y border-line-subtle bg-line-subtle lg:grid-cols-4">
            {stats.map((stat) => (
              <StatCell key={stat.id} stat={stat} />
            ))}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

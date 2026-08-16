"use client";

import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { stats, type Stat } from "@/data/stats";
import { useCountUp } from "@/hooks/use-count-up";
import { cn } from "@/lib/utils";

function StatCell({ stat }: { stat: Stat }) {
  const { ref, value } = useCountUp(stat.value);

  return (
    <div
      data-arrow-well={stat.id === "workshops" ? "" : undefined}
      className={cn(
        "flex flex-col gap-3 px-4 py-7 sm:px-6 sm:py-8 lg:px-7 lg:py-10",
        stat.featured ? "bg-amber-500/[0.07]" : "bg-surface-1",
      )}
    >
      <p className="text-stat text-ink tabular-nums">
        <span ref={ref}>{value}</span>
        {stat.suffix ? <span className="text-amber-300">{stat.suffix}</span> : null}
      </p>
      <div className="flex flex-col gap-1.5">
        <p className="font-mono text-[0.625rem] leading-snug tracking-[0.08em] text-ink-muted uppercase sm:text-[0.6875rem] sm:tracking-[0.09em]">
          {stat.label}
        </p>
        <p className="text-sm leading-snug text-ink-faint">{stat.note}</p>
      </div>
    </div>
  );
}

export function Stats() {
  return (
    <Section tone="canvas" divider={false} className="pt-2 pb-16 sm:pb-20 lg:pt-4 lg:pb-24">
      <Container>
        <div data-arrow-to="" className="w-fit">
          <Reveal>
            <Eyebrow>Impact to date</Eyebrow>
          </Reveal>
        </div>

        <Reveal delay={0.08}>
          <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden border-y border-line-subtle bg-line-subtle lg:grid-cols-4">
            {stats.map((stat) => (
              <StatCell key={stat.id} stat={stat} />
            ))}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

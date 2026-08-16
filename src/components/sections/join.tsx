import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { Em } from "@/components/ui/section-heading";
import { Glow } from "@/components/visual/glow";
import { GridBackdrop } from "@/components/visual/grid-backdrop";
import { site } from "@/config/site";

/** What members actually participate in (SRS FR-046). */
const interests = [
  "Programming",
  "Artificial intelligence",
  "Technology",
  "Innovation",
  "Collaborative projects",
];

export function Join() {
  return (
    <Section id="join" tone="canvas" labelledBy="join-title" className="overflow-hidden">
      <GridBackdrop size={80} intensity="faint" fade="radial" drift />
      <Glow size="42rem" opacity={0.05} className="-bottom-80 left-1/2 -translate-x-1/2" />

      <Container className="relative">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <Reveal>
            <Eyebrow>Join OCS</Eyebrow>
          </Reveal>

          <Reveal delay={0.06}>
            <h2
              id="join-title"
              className="mt-6 text-h2 text-ink"
            >
              The room is open. <Em>Come build.</Em>
            </h2>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-6 text-lead text-ink-muted">
              Our community lives on WhatsApp. It is where workshops get announced,
              teams come together, and questions get answered by people a few steps
              ahead of you.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            {/* One action. Nothing competes with it. */}
            <div className="mt-10">
              <Button href={site.whatsappUrl} external size="lg">
                Join WhatsApp community
                <ArrowUpRight
                  className="size-4 transition-transform duration-200 ease-ui group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5"
                  aria-hidden="true"
                />
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.24}>
            <ul className="mt-12 flex flex-wrap justify-center gap-x-3 gap-y-2">
              {interests.map((interest, index) => (
                <li
                  key={interest}
                  className="flex items-center gap-3 font-mono text-[0.625rem] tracking-[0.09em] text-ink-faint uppercase"
                >
                  {index > 0 ? (
                    <span aria-hidden="true" className="size-1 rounded-full bg-line-strong" />
                  ) : null}
                  {interest}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

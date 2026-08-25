import { ArrowUpRight } from "lucide-react";
import { TagChip } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { Em } from "@/components/ui/section-heading";
import { Glow } from "@/components/visual/glow";
import { JoinCourtyardBackdrop } from "@/components/visual/join-courtyard";
import { GridBackdrop } from "@/components/visual/grid-backdrop";
import { site } from "@/config/site";
import { cn } from "@/lib/utils";

function GuideArrow({ toward }: { toward: "left" | "right" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 480 40"
      preserveAspectRatio="none"
      className={cn(
        "h-10 w-full text-amber-400",
        toward === "left" && "-scale-x-100",
      )}
    >
      <path
        d="M8 20
           C 36 8 62 32 90 18
           C 112 8 132 30 152 20
           L 166 6 L 180 34 L 194 6 L 208 34 L 222 6 L 236 34 L 250 8 L 264 32 L 276 20
           C 304 10 336 30 372 18
           C 396 10 420 24 444 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.55"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M432 11 L468 20 L432 29"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.55"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

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
    <Section id="join" tone="canvas" labelledBy="join-title" className="closing-cta-section">
      <JoinCourtyardBackdrop />
      <GridBackdrop size={80} intensity="faint" fade="radial" drift />
      <Glow size="42rem" opacity={0.05} className="-bottom-80 left-1/2 -translate-x-1/2" />

      <Container className="relative z-10">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <Reveal>
            <Eyebrow>Join OCS</Eyebrow>
          </Reveal>

          <div className="join-copy-panel">
            <Reveal delay={0.06}>
              <h2 id="join-title" className="mt-6 text-h2 text-ink">
                The room is open. <Em>Come build.</Em>
              </h2>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="join-lead mt-6 text-lead">
                Our community lives on WhatsApp. It is where workshops get announced,
                teams come together, and questions get answered by people a few steps
                ahead of you.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.18} className="w-full">
            <div className="mt-10 flex justify-center lg:relative lg:left-1/2 lg:w-screen lg:max-w-[100vw] lg:-translate-x-1/2 lg:px-8">
              <div className="flex w-full items-center justify-center gap-4 lg:gap-5">
                <div className="hidden min-w-0 flex-1 lg:block">
                  <GuideArrow toward="right" />
                </div>
                <div className="flex shrink-0 flex-col items-stretch gap-3 sm:flex-row sm:items-center">
                  <Button href={site.whatsappUrl} external size="lg" className="shrink-0">
                    Join WhatsApp community
                    <ArrowUpRight
                      className="size-4 transition-transform duration-200 ease-ui group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </Button>
                  <Button
                    href="/signin"
                    variant="secondary"
                    size="lg"
                    className="join-member-btn shrink-0"
                  >
                    Become a Member
                  </Button>
                </div>
                <div className="hidden min-w-0 flex-1 lg:block">
                  <GuideArrow toward="left" />
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.24}>
            <p className="mt-10 font-mono text-[0.625rem] tracking-[0.09em] text-ink-muted uppercase">
              Focus areas
            </p>
            <ul className="mt-3 flex flex-wrap justify-center gap-2">
              {interests.map((interest) => (
                <li key={interest}>
                  <TagChip>{interest}</TagChip>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

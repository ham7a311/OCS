import { ArrowUpRight } from "lucide-react";
import { TagChip } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { Em } from "@/components/ui/section-heading";
import { JoinRouteArrival, JoinScene } from "@/components/visual/join-scene";
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
    <Section id="join" tone="canvas" labelledBy="join-title" className="closing-cta-section">
      <Container className="relative z-10">
        <span className="join-route-stop" data-route-stop="" aria-hidden="true" />
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <JoinRouteArrival />

          <Reveal>
            <Eyebrow className="mt-4">Join OCS</Eyebrow>
          </Reveal>

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

          <Reveal delay={0.18} className="w-full">
            <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
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
      <JoinScene />
    </Section>
  );
}

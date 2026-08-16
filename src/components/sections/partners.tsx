import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { Em, SectionHeading } from "@/components/ui/section-heading";
import { partnershipContact } from "@/config/site";
import { partners } from "@/data/partners";

export function Partners() {
  return (
    <Section id="partners" tone="raised" labelledBy="partners-title">
      <Container>
        <Reveal>
          <SectionHeading
            index="04"
            eyebrow="Partners"
            id="partners-title"
            title={
              <>
                Organisations we <Em>work with</Em>.
              </>
            }
            description="Collaborations that give our members access to people, problems, and opportunities beyond the campus."
          />
        </Reveal>

        {/* Three partners are presented in matched frames at full legibility.
            A looping ticker of three names would read as padding; a measured
            row reads as a roster. */}
        <RevealGroup
          stagger={0.07}
          className="mt-14 grid gap-px border border-line-subtle bg-line-subtle sm:grid-cols-2 lg:mt-20 lg:grid-cols-4"
        >
          {partners
            .filter((partner) => partner.active)
            .map((partner) => (
              <RevealItem key={partner.id}>
                <div className="flex h-full min-h-[9.5rem] flex-col justify-between gap-6 bg-surface-1 p-6 transition-colors duration-300 ease-ui hover:bg-surface-2">
                  <span
                    aria-hidden="true"
                    className="grid size-10 place-items-center rounded-sm border border-line font-mono text-[0.6875rem] tracking-[0.06em] text-ink-faint"
                  >
                    {partner.monogram}
                  </span>
                  <p className="text-[1.0625rem] leading-tight font-medium tracking-[-0.015em] text-ink">
                    {partner.name}
                  </p>
                </div>
              </RevealItem>
            ))}

          {/* The invitation occupies a real slot rather than a footnote, and
              carries the contact action the SRS asks for (FR-043, FR-044). */}
          <RevealItem>
            <a
              href={partnershipContact.href}
              {...(partnershipContact.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="group flex h-full min-h-[9.5rem] flex-col justify-between gap-6 bg-surface-1 p-6 transition-colors duration-300 ease-ui hover:bg-surface-2"
            >
              <span
                aria-hidden="true"
                className="grid size-10 place-items-center rounded-sm border border-dashed border-line-strong text-ink-faint transition-colors duration-300 ease-ui group-hover:border-amber-500/60 group-hover:text-amber-300"
              >
                <ArrowUpRight className="size-4" />
              </span>
              <p className="text-[1.0625rem] leading-tight font-medium tracking-[-0.015em] text-ink-muted transition-colors duration-300 ease-ui group-hover:text-ink">
                Interested in collaborating?
                <span className="mt-2 block font-mono text-[0.625rem] tracking-[0.09em] text-amber-300 uppercase">
                  {partnershipContact.label}
                </span>
              </p>
            </a>
          </RevealItem>
        </RevealGroup>
      </Container>
    </Section>
  );
}

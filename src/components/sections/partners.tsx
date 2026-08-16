import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { Em, SectionHeading } from "@/components/ui/section-heading";
import { PartnerMarquee } from "@/components/visual/partner-marquee";
import { partnershipContact } from "@/config/site";
import { partners, partnershipModel } from "@/data/partners";

export function Partners() {
  const roster = partners.filter((partner) => partner.active);

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

        <Reveal delay={0.06}>
          <p className="mt-8 max-w-[54ch] text-sm leading-relaxed text-ink-muted">
            Partnership here means guest speakers, co-hosted sessions, mentorship,
            and routes into internships — not a logo on a slide.
          </p>
          <p className="mt-3 font-mono text-[0.6875rem] tracking-[0.09em] text-ink-muted uppercase">
            {roster.length} organisations
            <span className="mx-2 text-line-strong">·</span>
            Joint sessions and guest speakers
          </p>
        </Reveal>
      </Container>

      <Reveal delay={0.08}>
        <div className="mt-10 lg:mt-12">
          <PartnerMarquee partners={roster} />
        </div>
      </Reveal>

      <Container>
        <Reveal delay={0.1}>
          <ul className="mt-8 flex flex-wrap gap-2">
            {partnershipModel.map((item) => (
              <li
                key={item}
                className="rounded-full border border-line px-3 py-1 font-mono text-[0.625rem] tracking-[0.08em] text-ink-muted uppercase"
              >
                {item}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.14}>
          <a
            href={partnershipContact.href}
            {...(partnershipContact.external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className="group mt-10 flex flex-col gap-3 rounded-lg border border-amber-500/35 bg-amber-500/[0.08] px-6 py-6 transition-colors duration-300 ease-ui hover:border-amber-500/55 hover:bg-amber-500/[0.12] sm:flex-row sm:items-center sm:justify-between sm:px-8"
          >
            <div>
              <p className="text-[1.0625rem] font-medium tracking-[-0.015em] text-ink">
                Interested in collaborating?
              </p>
              <p className="mt-1 text-sm text-ink-muted">
                Space for more organisations — guest talks, co-hosted events, and student pipelines.
              </p>
            </div>
            <span className="inline-flex items-center gap-2 font-mono text-[0.6875rem] tracking-[0.09em] text-amber-300 uppercase">
              {partnershipContact.label}
              <ArrowUpRight
                className="size-3.5 transition-transform duration-200 ease-ui group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </span>
          </a>
        </Reveal>
      </Container>
    </Section>
  );
}

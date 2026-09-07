import { Container } from "@/components/ui/container";
import { HalftoneCta } from "@/components/ui/halftone-cta";
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
          <HalftoneCta
            className="mt-10"
            badge="Work with us"
            heading={
              <>
                Interested in
                <br />
                collaborating?
              </>
            }
            subtext="Space for more organisations — guest talks, co-hosted events, and student pipelines."
            action={{
              href: partnershipContact.href,
              label: partnershipContact.label,
              external: partnershipContact.external,
              ariaLabel: partnershipContact.external
                ? "Reach us on WhatsApp to discuss collaborating with OCS"
                : "Email the OCS team to discuss collaborating",
            }}
          />
        </Reveal>
      </Container>
    </Section>
  );
}

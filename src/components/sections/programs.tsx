import { Container } from "@/components/ui/container";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { Em, SectionHeading } from "@/components/ui/section-heading";
import { ProgramRow } from "@/components/sections/program-row";
import { programs } from "@/data/programs";

export function Programs() {
  return (
    <Section id="programs" tone="elevated" labelledBy="programs-title">
      <Container>
        <Reveal>
          <SectionHeading
            index="02"
            eyebrow="Programs"
            id="programs-title"
            title={
              <>
                What we <Em>actually run</Em>.
              </>
            }
            description="Four programs, each built so students leave having made something rather than having watched someone else make it."
          />
        </Reveal>

        <RevealGroup stagger={0.07} className="mt-14 border-t border-line-subtle lg:mt-20">
          {programs.map((program, index) => (
            <RevealItem key={program.id}>
              <ProgramRow programId={program.id} index={index} />
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}

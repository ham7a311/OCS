import { Container } from "@/components/ui/container";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { Em, SectionHeading } from "@/components/ui/section-heading";
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

        {/* Rows rather than cards: a technical index reads as a programme of
            work, where a grid of tiles would read as a services page. */}
        <RevealGroup stagger={0.07} className="mt-14 border-t border-line-subtle lg:mt-20">
          {programs.map((program, index) => {
            const Icon = program.icon;

            return (
              <RevealItem key={program.id}>
                <article className="group relative grid gap-x-8 gap-y-4 border-b border-line-subtle py-8 lg:grid-cols-12 lg:items-baseline lg:py-9">
                  <div className="flex items-center gap-4 lg:col-span-4 lg:items-baseline">
                    <span className="font-mono text-[0.6875rem] text-amber-300 tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <Icon
                      className="size-[1.125rem] shrink-0 text-ink-faint transition-colors duration-300 ease-ui group-hover:text-amber-300 lg:translate-y-0.5"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                    <h3 className="text-h3 text-ink">{program.title}</h3>
                  </div>

                  <p className="max-w-[58ch] text-[0.9375rem] leading-relaxed text-ink-muted lg:col-span-6">
                    {program.description}
                  </p>

                  {/* Stacked rather than wrapped on wide screens, so the
                      metadata column stays a clean right-aligned list. */}
                  <ul className="flex flex-wrap gap-x-3 gap-y-1.5 lg:col-span-2 lg:flex-col lg:items-end lg:gap-y-2">
                    {program.tags.map((tag) => (
                      <li
                        key={tag}
                        className="font-mono text-[0.625rem] tracking-[0.08em] text-ink-faint uppercase"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>

                  {/* The accent draws across the row on hover. One line, one
                      colour, no card lighting up. */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-amber-500/70 transition-transform duration-500 ease-entrance group-hover:scale-x-100"
                  />
                </article>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Container>
    </Section>
  );
}

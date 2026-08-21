import type { Metadata } from "next";
import { Footer } from "@/components/sections/footer";
import { Navbar } from "@/components/sections/navbar";
import { Container } from "@/components/ui/container";
import { site } from "@/config/site";
import { privacyNotice } from "@/data/privacy";

export const metadata: Metadata = {
  title: "Privacy notice",
  description: "What Oman Computing Society holds, and why.",
  alternates: { canonical: "/privacy" },
};

function PrivacyParagraph({ id, text }: { id: string; text: string }) {
  if (id !== "who") {
    return <p className="text-[1.0625rem] leading-relaxed text-ink-muted">{text}</p>;
  }

  const [before, after] = text.split("WhatsApp");

  return (
    <p className="text-[1.0625rem] leading-relaxed text-ink-muted">
      {before}
      <a
        href={site.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-amber-300 underline decoration-amber-500/40 underline-offset-2 transition-colors duration-200 ease-ui hover:text-ink"
      >
        WhatsApp
      </a>
      {after}
    </p>
  );
}

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <article className="pb-24">
          <Container className="max-w-[42rem] pt-[calc(var(--ocs-nav-clearance)+2rem)]">
            <h1 className="text-h2 text-ink">{privacyNotice.title}</h1>
            <p className="mt-3 font-serif text-[1.375rem] italic tracking-[0.005em] text-ink-muted">
              {privacyNotice.subtitle}
            </p>
            <p className="mt-3 font-mono text-[0.6875rem] tracking-[0.09em] text-ink-faint uppercase">
              {privacyNotice.version}
            </p>

            <div className="mt-14 flex flex-col gap-12">
              {privacyNotice.sections.map((section) => (
                <section key={section.id} aria-labelledby={section.id}>
                  <h2 id={section.id} className="text-[1.125rem] font-semibold tracking-[-0.02em] text-ink">
                    {section.heading}
                  </h2>
                  <div className="mt-4 flex flex-col gap-4">
                    {section.paragraphs.map((paragraph) => (
                      <PrivacyParagraph key={paragraph} id={section.id} text={paragraph} />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </Container>
        </article>
      </main>
      <Footer />
    </>
  );
}

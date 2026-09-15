import { Container } from "@/components/ui/container";
import { ChannelIcon } from "@/components/ui/channel-icon";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { TeamMarquee } from "@/components/visual/team-marquee";
import { navigation, site, socialChannels } from "@/config/site";

export function Footer() {
  const year = new Date().getFullYear();
  const channels = socialChannels.filter(
    (channel) =>
      channel.id === "whatsapp" || channel.id === "linkedin" || channel.id === "instagram",
  );

  return (
    <footer className="relative border-t border-line-subtle bg-surface-1">
      <Container>
        <div className="grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12 lg:py-20">
          <div className="flex flex-col items-start gap-5 sm:col-span-2 lg:col-span-1">
            <Logo size="footer" />
            <p className="max-w-[36ch] text-sm leading-relaxed text-ink-muted">
              {site.description}
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="font-mono text-[0.625rem] tracking-[0.09em] text-ink-muted uppercase">
              Explore
            </h2>
            <ul className="mt-3 flex flex-col">
              {navigation
                .filter((item) => item.id !== "top")
                .map((item) => (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      className="inline-flex min-h-6 items-center py-2 text-sm text-ink-muted transition-colors duration-200 ease-ui hover:text-ink"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              <li>
                <a
                  href="/team"
                  className="inline-flex min-h-6 items-center py-2 text-sm text-ink-muted transition-colors duration-200 ease-ui hover:text-ink"
                >
                  Core team
                </a>
              </li>
              <li>
                <a
                  href="/events/archive"
                  className="inline-flex min-h-6 items-center py-2 text-sm text-ink-muted transition-colors duration-200 ease-ui hover:text-ink"
                >
                  All past events
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  className="inline-flex min-h-6 items-center py-2 text-sm text-ink-muted transition-colors duration-200 ease-ui hover:text-ink"
                >
                  Privacy Notice
                </a>
              </li>
            </ul>
          </nav>

          <div>
            <h2 className="font-mono text-[0.625rem] tracking-[0.09em] text-ink-muted uppercase">
              Channels
            </h2>
            <div className="mt-4 flex items-center gap-1">
              {channels.map((channel) => (
                <ChannelIcon key={channel.id} channel={channel} />
              ))}
            </div>
            <p className="mt-5 max-w-[28ch] text-sm leading-relaxed text-ink-muted">
              Updates go out in the WhatsApp community — the lowest-friction way to stay in the room
              without a mailing list.
            </p>
            <a
              href={site.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex font-mono text-[0.6875rem] tracking-[0.09em] text-amber-300 uppercase transition-colors duration-200 ease-ui hover:text-ink"
            >
              Get updates on WhatsApp
            </a>
          </div>
        </div>
      </Container>

      <div className="border-t border-line-subtle pb-12 sm:pb-14">
        <Container>
          <h2 className="pt-12 pb-3 text-center font-serif text-[1.75rem] italic leading-[1.15] tracking-[0.005em] text-ink sm:pt-14 sm:pb-4 sm:text-[1.9375rem]">
            Know more about us.
          </h2>
          <div className="flex justify-center pb-10 sm:pb-12">
            <Button href="/team" variant="secondary" size="md">
              Learn more about the team
            </Button>
          </div>
        </Container>
        <TeamMarquee />
      </div>

      <Container>
        <div className="grid gap-3 border-t border-line-subtle pt-7 pb-20 sm:grid-cols-2 sm:items-center sm:pb-20">
          <p className="font-mono text-[0.625rem] tracking-[0.09em] text-ink-faint uppercase">
            © {year} {site.organizationName}. All rights reserved.
          </p>
          <p className="font-mono text-[0.625rem] tracking-[0.09em] text-ink-faint uppercase sm:text-right">
            Student-led · Sultanate of Oman
          </p>
        </div>
      </Container>
    </footer>
  );
}

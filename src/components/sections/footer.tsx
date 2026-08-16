import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { navigation, site, socialChannels } from "@/config/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-line-subtle bg-surface-1">
      <Container>
        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12 lg:gap-16 lg:py-20">
          <div className="flex flex-col gap-5 sm:col-span-2 lg:col-span-5">
            <div className="flex items-center gap-3">
              <Logo />
              <span className="text-[0.9375rem] font-semibold tracking-[-0.01em] text-ink">
                {site.organizationName}
              </span>
            </div>
            <p className="max-w-[42ch] text-sm leading-relaxed text-ink-faint">
              {site.description}
            </p>
          </div>

          <nav aria-label="Footer" className="lg:col-span-3 lg:col-start-7">
            <h2 className="font-mono text-[0.625rem] tracking-[0.09em] text-ink-faint uppercase">
              Explore
            </h2>
            <ul className="mt-3 flex flex-col">
              {navigation.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    className="inline-flex min-h-6 items-center py-2 text-sm text-ink-muted transition-colors duration-200 ease-ui hover:text-ink"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3 lg:col-start-10">
            <h2 className="font-mono text-[0.625rem] tracking-[0.09em] text-ink-faint uppercase">
              Channels
            </h2>
            {/* Only configured destinations appear here. A channel without a
                real URL is omitted rather than linked to nowhere. */}
            <ul className="mt-3 flex flex-col">
              {socialChannels.map((channel) => (
                <li key={channel.id}>
                  <a
                    href={channel.href}
                    {...(channel.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="group inline-flex min-h-6 items-center gap-1.5 py-2 text-sm break-words text-ink-muted transition-colors duration-200 ease-ui hover:text-ink"
                  >
                    {channel.label}
                    {channel.external ? (
                      <ArrowUpRight
                        className="size-3 shrink-0 text-ink-faint transition-transform duration-200 ease-ui group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    ) : null}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-line-subtle py-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[0.625rem] tracking-[0.09em] text-ink-faint uppercase">
            © {year} {site.organizationName}. All rights reserved.
          </p>
          <p className="font-mono text-[0.625rem] tracking-[0.09em] text-ink-faint uppercase">
            Student-led · Sultanate of Oman
          </p>
        </div>
      </Container>
    </footer>
  );
}

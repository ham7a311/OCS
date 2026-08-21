"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { homeSectionIds, navigation, site, type NavItem } from "@/config/site";
import { useActiveSection } from "@/hooks/use-active-section";
import { useNavClearance } from "@/hooks/use-nav-clearance";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { easeEntrance, easeUi } from "@/lib/motion";
import { cn } from "@/lib/utils";

const EMPTY_SECTION_IDS: readonly string[] = [];
const primaryNav = navigation.filter((item) => item.id !== "members");

export function Navbar() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { activeId, activate } = useActiveSection(onHome ? homeSectionIds : EMPTY_SECTION_IDS);
  const reduced = usePrefersReducedMotion();
  useNavClearance();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const isActive = (item: NavItem) => {
    if (item.kind === "route") return pathname === item.href;
    return onHome && activeId === item.id;
  };

  return (
    <>
      <header data-ocs-nav="" className="pointer-events-none fixed inset-x-0 top-0 z-50 bg-canvas">
        <div className="h-3 bg-canvas sm:h-4" aria-hidden="true" />
        <Container className="pointer-events-auto">
          <nav
            aria-label="Primary"
            className={cn(
              "relative flex h-16 min-w-0 items-center justify-between gap-2 rounded-lg border border-line-subtle bg-canvas px-2.5 backdrop-blur-[24px] transition-shadow duration-300 ease-ui sm:h-[4.25rem] sm:px-4",
              (scrolled || menuOpen) && "shadow-[0_12px_40px_-24px_rgba(20,18,12,0.45)]",
            )}
          >
            <Link
              href="/"
              className="flex min-w-0 items-center rounded-sm"
              aria-label={`${site.organizationName} — back to top`}
            >
              <Logo />
            </Link>

            <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 xl:flex">
              {primaryNav.map((item) => {
                const active = isActive(item);
                return (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      onClick={() => {
                        if (item.kind === "hash") activate(item.id);
                      }}
                      aria-current={active ? "true" : undefined}
                      className={cn(
                        "relative rounded-sm px-3 py-2 font-mono text-[0.6875rem] tracking-[0.09em] uppercase transition-colors duration-200 ease-ui",
                        active ? "text-ink" : "text-ink-faint hover:text-ink-muted",
                      )}
                    >
                      {item.label}
                      {active ? (
                        <motion.span
                          layoutId="nav-active"
                          aria-hidden="true"
                          transition={
                            reduced ? { duration: 0 } : { duration: 0.32, ease: easeUi }
                          }
                          className="absolute inset-x-3 -bottom-px h-px bg-amber-400"
                        />
                      ) : null}
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="flex shrink-0 items-center gap-0.5 sm:gap-2">
              <ThemeToggle />
              <Button
                href="/signin"
                variant="secondary"
                size="sm"
                aria-current={pathname === "/signin" ? "page" : undefined}
              >
                Members
              </Button>
              <Button
                href={site.whatsappUrl}
                external
                size="sm"
                className="hidden sm:inline-flex"
              >
                Join OCS
                <ArrowUpRight className="size-3.5" aria-hidden="true" />
              </Button>

              <button
                type="button"
                onClick={() => setMenuOpen((open) => !open)}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                className="grid size-11 place-items-center rounded-md text-ink-muted transition-colors duration-200 ease-ui hover:bg-surface-2 hover:text-ink xl:hidden"
              >
                {menuOpen ? (
                  <X className="size-5" aria-hidden="true" />
                ) : (
                  <Menu className="size-5" aria-hidden="true" />
                )}
              </button>
            </div>
          </nav>
        </Container>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            id="mobile-menu"
            initial={reduced ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.2, ease: easeUi }}
            className="fixed inset-0 z-40 bg-canvas xl:hidden"
          >
            <div className="flex h-full flex-col justify-between px-5 pt-28 pb-10 sm:px-8">
              <ul>
                {primaryNav.map((item, index) => (
                  <motion.li
                    key={item.id}
                    initial={reduced ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: reduced ? 0 : 0.4,
                      delay: reduced ? 0 : 0.04 * index,
                      ease: easeEntrance,
                    }}
                    className="border-b border-line-subtle first:border-t"
                  >
                    <a
                      href={item.href}
                      onClick={() => {
                        if (item.kind === "hash") activate(item.id);
                        closeMenu();
                      }}
                      className="flex items-baseline gap-5 py-5"
                    >
                      <span className="font-mono text-[0.6875rem] tracking-[0.09em] text-amber-300">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[1.75rem] font-medium tracking-[-0.02em] text-ink">
                        {item.label}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>

              <div className="flex flex-col gap-5">
                <Button
                  href={site.whatsappUrl}
                  external
                  size="lg"
                  className="w-full"
                >
                  Join OCS
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </Button>
                <p className="font-mono text-[0.6875rem] tracking-[0.09em] text-ink-faint uppercase">
                  Student-led · Sultanate of Oman
                </p>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

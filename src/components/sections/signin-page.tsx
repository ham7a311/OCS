"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Em } from "@/components/ui/section-heading";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { NodeNetwork } from "@/components/visual/node-network";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-5 shrink-0" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1Z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09A6.6 6.6 0 0 1 5.5 12c0-.72.13-1.43.34-2.09V7.07H2.18A11 11 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53Z"
      />
    </svg>
  );
}

function MicrosoftMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-5 shrink-0" aria-hidden="true">
      <path fill="#F25022" d="M1 1h10v10H1z" />
      <path fill="#7FBA00" d="M13 1h10v10H13z" />
      <path fill="#00A4EF" d="M1 13h10v10H1z" />
      <path fill="#FFB900" d="M13 13h10v10H13z" />
    </svg>
  );
}

function GitHubMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-5 shrink-0 fill-current" aria-hidden="true">
      <path d="M12 .3a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.55-1.38-1.33-1.75-1.33-1.75-1.09-.75.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.66-.3-5.46-1.33-5.46-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.48 5.92.43.37.81 1.1.81 2.23v3.3c0 .32.22.7.82.58A12 12 0 0 0 12 .3Z" />
    </svg>
  );
}

const providers = [
  { id: "google", label: "Continue with Google", icon: GoogleMark },
  { id: "microsoft", label: "Continue with Microsoft", icon: MicrosoftMark },
  { id: "github", label: "Continue with GitHub", icon: GitHubMark },
] as const;

function BackHomeLink() {
  return (
    <Link
      href="/"
      className="group inline-flex min-h-11 items-center gap-2 py-2 font-mono text-[0.6875rem] tracking-[0.09em] text-ink uppercase"
    >
      <ArrowLeft
        className="size-3.5 transition-transform duration-200 ease-ui group-hover:-translate-x-0.5 group-focus-visible:-translate-x-0.5"
        aria-hidden="true"
      />
      <span className="underline decoration-transparent underline-offset-4 transition-[text-decoration-color] duration-200 ease-ui group-hover:decoration-current group-focus-visible:decoration-current">
        Back to home
      </span>
    </Link>
  );
}

function SketchRule({
  kind,
  className,
}: {
  kind: "vertical" | "top" | "bottom";
  className?: string;
}) {
  const reduced = usePrefersReducedMotion();
  const vertical = kind === "vertical";

  const d =
    kind === "vertical"
      ? "M20 0 C 8 7, 33 14, 12 25 C 2 36, 37 47, 16 58 C 4 70, 34 82, 11 91 C 6 96, 26 98, 20 100"
      : kind === "top"
        ? "M0 12 C 7 4, 14 21, 24 9 C 35 1, 46 22, 58 10 C 70 2, 82 20, 91 8 C 96 4, 99 14, 100 12"
        : "M0 12 C 6 20, 15 3, 27 14 C 38 23, 49 4, 61 13 C 73 21, 84 5, 93 16 C 97 20, 99 10, 100 12";

  return (
    <svg
      aria-hidden="true"
      data-phase="in"
      data-reduced={reduced ? "" : undefined}
      className={cn(
        "index-sketch pointer-events-none overflow-visible text-line",
        vertical
          ? "absolute inset-y-0 left-[45%] z-20 hidden h-full w-10 -translate-x-1/2 md:block"
          : "h-4 w-full",
        className,
      )}
      viewBox={vertical ? "0 0 40 100" : "0 0 100 24"}
      preserveAspectRatio="none"
    >
      <path
        d={d}
        pathLength={1}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="index-sketch-stroke"
      />
    </svg>
  );
}

function SignInForm() {
  const [consented, setConsented] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <form
      autoComplete="off"
      onSubmit={onSubmit}
      className="w-full max-w-[26rem]"
    >
      <SketchRule kind="top" />
      <Eyebrow className="mt-6 [&>span:first-child]:hidden">Sign in</Eyebrow>

      <h1 className="mt-5 text-[1.75rem] font-semibold tracking-[-0.025em] text-ink sm:text-[2rem]">
        Sign in to OCS
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-ink-muted">
        Create your member profile and get matched with chapters, build squads, and mentors.
      </p>

      {/*
        OAuth is UI-only for now. Auth.js / provider credentials / callbacks
        are a separate backend task.
      */}
      <div className="mt-8 flex flex-col gap-3">
        {providers.map((provider) => {
          const Icon = provider.icon;
          return (
            <Button
              key={provider.id}
              type="button"
              variant="secondary"
              size="lg"
              disabled={!consented}
              className="w-full justify-center transition-[background-color,border-color,opacity] duration-200 ease-ui disabled:pointer-events-auto disabled:cursor-not-allowed disabled:opacity-45 enabled:hover:border-amber-400 enabled:focus-visible:border-amber-400"
            >
              <Icon />
              {provider.label}
            </Button>
          );
        })}
      </div>

      <label className="mt-6 flex min-h-11 cursor-pointer items-start gap-3">
        <input
          id="signin-consent"
          type="checkbox"
          checked={consented}
          onChange={(event) => setConsented(event.target.checked)}
          className="peer sr-only"
        />
        <span
          aria-hidden="true"
          className={cn(
            "relative mt-0.5 grid size-5 shrink-0 place-items-center rounded-sm border transition-colors duration-200 ease-ui",
            "peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-amber-400",
            consented ? "border-amber-500 bg-amber-500" : "border-line bg-transparent",
          )}
        >
          <Check
            className={cn(
              "size-3 text-on-accent transition-opacity duration-200 ease-ui",
              consented ? "opacity-100" : "opacity-0",
            )}
            strokeWidth={2.5}
          />
        </span>
        <span className="pt-px text-sm leading-relaxed text-ink-muted">
          By continuing, you agree to our{" "}
          <a
            href="/privacy"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(event) => event.stopPropagation()}
            className="text-amber-300 underline decoration-amber-500/40 underline-offset-2 transition-colors duration-200 ease-ui hover:text-ink"
          >
            Privacy Notice
          </a>
          .
        </span>
      </label>

      <div className="mt-8">
        <SketchRule kind="bottom" />
      </div>
    </form>
  );
}

export function SignInPage() {
  return (
    <div className="relative flex min-h-dvh flex-col md:flex-row">
      <aside className="relative hidden min-h-dvh flex-col px-8 py-8 md:flex md:w-[45%] lg:px-12">
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <NodeNetwork variant="ambient" />
        </div>

        <div className="relative z-10">
          <BackHomeLink />
        </div>

        <div className="relative z-10 flex flex-1 flex-col justify-center py-16">
          <h2 className="max-w-[14ch] text-h2 text-ink">
            Back to <Em>the chapter</Em>.
          </h2>
          <p className="mt-5 max-w-[32ch] text-lead text-ink-muted">
            Your profile, your campus, your build squad — in one place.
          </p>
        </div>

        <p className="relative z-10 font-mono text-[0.6875rem] tracking-[0.09em] text-ink-faint uppercase">
          OCS · Learn. Build. Connect.
        </p>
      </aside>

      <SketchRule kind="vertical" />

      <div className="relative flex min-h-dvh flex-1 flex-col px-5 py-6 sm:px-8 md:py-8">
        <div className="flex w-full items-start justify-between gap-4">
          <div className="md:hidden">
            <BackHomeLink />
          </div>
          <div className="ml-auto">
            <ThemeToggle />
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center py-10">
          <SignInForm />
        </div>
      </div>
    </div>
  );
}

"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";
import type { Partner } from "@/data/partners";

const SPEED_DESKTOP = 32;
const SPEED_MOBILE = 24;

function PartnerMark({ partner, decorative }: { partner: Partner; decorative?: boolean }) {
  const body = (
    <>
      <span
        aria-hidden="true"
        className="grid h-8 min-w-8 shrink-0 place-items-center rounded-md border border-line px-1.5 font-mono text-[0.6875rem] tracking-[0.08em]"
      >
        {partner.monogram}
      </span>
      <span className="text-[1.0625rem] font-medium tracking-[0.04em] whitespace-nowrap sm:text-[1.125rem]">
        {partner.name}
      </span>
    </>
  );

  const className =
    "flex min-w-[12.5rem] shrink-0 items-center gap-3 rounded-md border border-line px-3.5 py-2.5 text-ink-muted";

  if (partner.website && !decorative) {
    return (
      <a
        href={partner.website}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          className,
          "outline-none transition-colors duration-200 ease-ui hover:border-line-strong hover:text-ink focus-visible:border-line-strong focus-visible:text-ink",
        )}
      >
        {body}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }

  return (
    <div className={className}>
      {body}
    </div>
  );
}

function PartnerSet({
  partners,
  hidden,
}: {
  partners: Partner[];
  hidden?: boolean;
}) {
  return (
    <ul
      className="flex shrink-0 items-center gap-10 pr-10 sm:gap-12 sm:pr-12"
      aria-hidden={hidden || undefined}
    >
      {partners.map((partner, index) => (
        <li key={`${hidden ? "dup" : "live"}-${partner.id}-${index}`}>
          <PartnerMark partner={partner} decorative={hidden} />
        </li>
      ))}
    </ul>
  );
}

export function PartnerMarquee({ partners }: { partners: Partner[] }) {
  const reduced = usePrefersReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [duration, setDuration] = useState(36);
  const [repeats, setRepeats] = useState(1);

  useLayoutEffect(() => {
    if (reduced) return;

    const wrap = wrapRef.current;
    const firstSet = wrap?.querySelector<HTMLElement>("[data-marquee-set]");
    if (!wrap || !firstSet) return;

    const measure = () => {
      const setWidth = firstSet.scrollWidth / Math.max(repeats, 1);
      const viewWidth = wrap.getBoundingClientRect().width;
      if (setWidth < 8) return;

      const copiesPerHalf = Math.max(1, Math.ceil(viewWidth / setWidth));
      if (copiesPerHalf !== repeats) {
        setRepeats(copiesPerHalf);
        return;
      }

      const speed = window.innerWidth < 640 ? SPEED_MOBILE : SPEED_DESKTOP;
      setDuration((setWidth * copiesPerHalf) / speed);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(wrap);
    observer.observe(firstSet);
    return () => observer.disconnect();
  }, [reduced, partners, repeats]);

  if (reduced) {
    return (
      <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 px-5 sm:px-8 lg:px-12">
        {partners.map((partner) => (
          <li key={partner.id}>
            <PartnerMark partner={partner} />
          </li>
        ))}
      </ul>
    );
  }

  const extra = Math.max(repeats - 1, 0);

  return (
    <div
      ref={wrapRef}
      className="partner-marquee overflow-hidden py-2"
      style={{
        maskImage:
          "linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)",
      }}
    >
      <div
        className="partner-marquee-track flex w-max items-center"
        style={{ animationDuration: `${duration}s` }}
      >
        <div data-marquee-set="" className="flex items-center">
          <PartnerSet partners={partners} />
          {Array.from({ length: extra }, (_, index) => (
            <PartnerSet key={`pad-${index}`} partners={partners} hidden />
          ))}
        </div>
        <div className="flex items-center" aria-hidden="true">
          {Array.from({ length: repeats }, (_, index) => (
            <PartnerSet key={`loop-${index}`} partners={partners} hidden />
          ))}
        </div>
      </div>
    </div>
  );
}

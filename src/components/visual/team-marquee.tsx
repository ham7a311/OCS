"use client";

import { useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { team, type TeamMember } from "@/data/team";

const SPEED_DESKTOP = 30;
const SPEED_MOBILE = 22;

const DOTS = [
  { duration: 4.2, delay: 0, size: 5 },
  { duration: 3.55, delay: -0.9, size: 4 },
  { duration: 4.85, delay: -1.8, size: 6 },
  { duration: 3.9, delay: -2.6, size: 4.5 },
  { duration: 5.1, delay: -3.4, size: 5.5 },
  { duration: 3.7, delay: -1.35, size: 4 },
  { duration: 4.45, delay: -2.15, size: 5 },
] as const;

function TeamCard({ member, decorative }: { member: TeamMember; decorative?: boolean }) {
  return (
    <article
      tabIndex={decorative ? undefined : 0}
      aria-hidden={decorative || undefined}
      className="team-card relative flex h-[6.5rem] w-[18rem] shrink-0 flex-col justify-center rounded-lg border border-line bg-surface-1 px-5 py-4 outline-none"
      style={{ "--member-color": member.color } as CSSProperties}
    >
      {DOTS.map((dot, index) => (
        <span
          key={index}
          aria-hidden="true"
          className="team-orbit-dot"
          style={{
            width: dot.size,
            height: dot.size,
            animationDuration: `${dot.duration}s`,
            animationDelay: `${dot.delay}s`,
          }}
        />
      ))}
      <p className="truncate text-[0.9875rem] font-medium tracking-[-0.015em] text-ink">
        {member.name}
      </p>
      <p className="mt-1 line-clamp-2 min-h-[2.5rem] text-sm leading-snug text-ink-muted">
        {member.role}
      </p>
    </article>
  );
}

function TeamSet({ members, hidden }: { members: TeamMember[]; hidden?: boolean }) {
  return (
    <ul
      className="flex shrink-0 items-stretch gap-4 pr-4 sm:gap-5 sm:pr-5"
      aria-hidden={hidden || undefined}
    >
      {members.map((member, index) => (
        <li key={`${hidden ? "dup" : "live"}-${member.id}-${index}`}>
          <TeamCard member={member} decorative={hidden} />
        </li>
      ))}
    </ul>
  );
}

export function TeamMarquee() {
  const reduced = usePrefersReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [duration, setDuration] = useState(40);
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
  }, [reduced, repeats]);

  if (reduced) {
    return (
      <ul className="grid gap-3 px-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-4 lg:px-12">
        {team.map((member) => (
          <li key={member.id}>
            <TeamCard member={member} />
          </li>
        ))}
      </ul>
    );
  }

  const extra = Math.max(repeats - 1, 0);

  return (
    <div
      ref={wrapRef}
      className="partner-marquee overflow-hidden py-1"
      style={{
        maskImage:
          "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
      }}
    >
      <div
        className="partner-marquee-track flex w-max items-center"
        style={{ animationDuration: `${duration}s` }}
      >
        <div data-marquee-set="" className="flex items-center">
          <TeamSet members={team} />
          {Array.from({ length: extra }, (_, index) => (
            <TeamSet key={`pad-${index}`} members={team} hidden />
          ))}
        </div>
        <div className="flex items-center" aria-hidden="true">
          {Array.from({ length: repeats }, (_, index) => (
            <TeamSet key={`loop-${index}`} members={team} hidden />
          ))}
        </div>
      </div>
    </div>
  );
}

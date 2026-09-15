"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { LinkedInIcon } from "@/components/ui/channel-icon";
import { PagerButton } from "@/components/ui/pager-button";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";
import { team, type TeamMember } from "@/data/team";

const SPEED_DESKTOP = 30;
const SPEED_MOBILE = 22;
const STEP_MS = 480;
const SWIPE_ARM_PX = 10;

const DOTS = [
  { duration: 4.2, delay: 0, size: 5 },
  { duration: 3.55, delay: -0.9, size: 4 },
  { duration: 4.85, delay: -1.8, size: 6 },
  { duration: 3.9, delay: -2.6, size: 4.5 },
  { duration: 5.1, delay: -3.4, size: 5.5 },
  { duration: 3.7, delay: -1.35, size: 4 },
  { duration: 4.45, delay: -2.15, size: 5 },
] as const;

function MemberLinkedIn({
  member,
  decorative,
}: {
  member: TeamMember;
  decorative?: boolean;
}) {
  const className = cn(
    "inline-flex size-4 shrink-0 items-center justify-center",
    "lg:absolute lg:right-3.5 lg:top-[1.15rem] lg:z-10",
    "lg:opacity-0 lg:pointer-events-none lg:transition-opacity lg:duration-200 lg:ease-ui",
    "lg:group-hover:pointer-events-auto lg:group-hover:opacity-100",
  );
  const icon = <LinkedInIcon className="size-4" />;

  if (!member.linkedin) {
    return (
      <span className={className} style={{ color: member.color }} aria-hidden="true">
        {icon}
      </span>
    );
  }

  return (
    <a
      href={member.linkedin}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={decorative ? undefined : `${member.name} on LinkedIn`}
      aria-hidden={decorative || undefined}
      tabIndex={decorative ? -1 : undefined}
      className={cn(className, "cursor-pointer")}
      style={{ color: member.color }}
    >
      {icon}
    </a>
  );
}

function TeamCard({ member, decorative }: { member: TeamMember; decorative?: boolean }) {
  return (
    <article
      tabIndex={decorative ? undefined : 0}
      aria-hidden={decorative || undefined}
      className="team-card group relative flex h-[6.5rem] w-[18rem] shrink-0 flex-col justify-center rounded-lg border border-line bg-surface-1 px-5 py-4 outline-none"
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
      <p className="flex items-center gap-1.5 text-[0.9875rem] font-medium tracking-[-0.015em] text-ink">
        <span className="min-w-0 truncate">{member.name}</span>
        <MemberLinkedIn member={member} decorative={decorative} />
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

function wrapModulo(value: number, loop: number) {
  if (loop < 8) return 0;
  return ((value % loop) + loop) % loop;
}

function easeStep(t: number) {
  return 1 - (1 - t) ** 3;
}

export function TeamMarquee() {
  const reduced = usePrefersReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const loopWidthRef = useRef(0);
  const strideRef = useRef(304);
  const speedRef = useRef(SPEED_DESKTOP);
  const hoverPauseRef = useRef(false);
  const lastTsRef = useRef(0);
  const stepAnimRef = useRef<{ from: number; to: number; start: number } | null>(null);
  const pointerRef = useRef<{ id: number; x: number; dragging: boolean } | null>(null);
  const skipClickRef = useRef(false);
  const [repeats, setRepeats] = useState(1);

  const apply = useCallback(() => {
    const node = trackRef.current;
    if (!node) return;
    node.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
  }, []);

  const step = useCallback(
    (direction: -1 | 1) => {
      const loop = loopWidthRef.current;
      const stride = strideRef.current;
      if (loop < 8 || stride < 8) return;

      let from = wrapModulo(offsetRef.current, loop);
      let to = from + direction * stride;
      if (to < 0) {
        from += loop;
        to += loop;
      }

      offsetRef.current = from;
      apply();
      stepAnimRef.current = { from, to, start: performance.now() };
    },
    [apply],
  );

  useLayoutEffect(() => {
    if (reduced) return;

    const wrap = wrapRef.current;
    const firstSet = wrap?.querySelector<HTMLElement>("[data-marquee-set]");
    if (!wrap || !firstSet) return;

    const measure = () => {
      const item = firstSet.querySelector<HTMLElement>("li");
      const next = item?.nextElementSibling as HTMLElement | null;
      if (item && next) {
        strideRef.current = next.getBoundingClientRect().left - item.getBoundingClientRect().left;
      }

      const oneSet = firstSet.scrollWidth / Math.max(repeats, 1);
      const viewWidth = wrap.getBoundingClientRect().width;
      if (oneSet < 8) return;

      const copiesPerHalf = Math.max(1, Math.ceil(viewWidth / oneSet));
      speedRef.current = window.innerWidth < 640 ? SPEED_MOBILE : SPEED_DESKTOP;
      if (copiesPerHalf !== repeats) {
        setRepeats(copiesPerHalf);
        return;
      }

      loopWidthRef.current = firstSet.scrollWidth;
      offsetRef.current = wrapModulo(offsetRef.current, loopWidthRef.current);
      apply();
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(wrap);
    observer.observe(firstSet);
    return () => observer.disconnect();
  }, [apply, reduced, repeats]);

  useEffect(() => {
    if (reduced) return;

    let frame = 0;
    const tick = (now: number) => {
      const anim = stepAnimRef.current;
      if (anim) {
        const t = Math.min(1, (now - anim.start) / STEP_MS);
        offsetRef.current = anim.from + (anim.to - anim.from) * easeStep(t);
        apply();
        if (t >= 1) {
          offsetRef.current = wrapModulo(anim.to, loopWidthRef.current);
          apply();
          stepAnimRef.current = null;
          lastTsRef.current = now;
        }
      } else if (!hoverPauseRef.current) {
        if (lastTsRef.current) {
          const dt = Math.min(32, now - lastTsRef.current) / 1000;
          offsetRef.current = wrapModulo(
            offsetRef.current + speedRef.current * dt,
            loopWidthRef.current,
          );
          apply();
        }
        lastTsRef.current = now;
      } else {
        lastTsRef.current = now;
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [apply, reduced]);

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    const target = event.target as HTMLElement | null;
    if (target?.closest("a, button")) return;
    pointerRef.current = { id: event.pointerId, x: event.clientX, dragging: false };
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const pointer = pointerRef.current;
    if (!pointer || pointer.id !== event.pointerId) return;
    const dx = event.clientX - pointer.x;
    if (!pointer.dragging && Math.abs(dx) > SWIPE_ARM_PX) {
      pointer.dragging = true;
      event.currentTarget.setPointerCapture(event.pointerId);
    }
  };

  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const pointer = pointerRef.current;
    pointerRef.current = null;
    if (!pointer || pointer.id !== event.pointerId || !pointer.dragging) return;
    skipClickRef.current = true;
    const dx = event.clientX - pointer.x;
    const threshold = strideRef.current * 0.45;
    if (dx <= -threshold) step(1);
    else if (dx >= threshold) step(-1);
  };

  const onPointerCancel = (event: PointerEvent<HTMLDivElement>) => {
    const pointer = pointerRef.current;
    if (!pointer || pointer.id !== event.pointerId) return;
    pointerRef.current = null;
  };

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
      className="team-marquee-shell"
      onKeyDown={(event) => {
        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
        const target = event.target as HTMLElement | null;
        if (
          target &&
          (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)
        ) {
          return;
        }
        event.preventDefault();
        event.stopPropagation();
        step(event.key === "ArrowLeft" ? -1 : 1);
      }}
    >
      <PagerButton
        label="Previous team member"
        onClick={() => step(-1)}
        className="team-marquee-prev bg-surface-1/90 backdrop-blur-sm"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
      </PagerButton>

      <div
        ref={wrapRef}
        className="team-marquee overflow-hidden py-1"
        style={{
          maskImage: "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
        onClickCapture={(event) => {
          if (!skipClickRef.current) return;
          event.preventDefault();
          event.stopPropagation();
          skipClickRef.current = false;
        }}
        onMouseOver={(event) => {
          if ((event.target as HTMLElement | null)?.closest(".team-card")) {
            hoverPauseRef.current = true;
          }
        }}
        onMouseOut={(event) => {
          const next = event.relatedTarget as HTMLElement | null;
          if (!next || !event.currentTarget.contains(next) || !next.closest(".team-card")) {
            hoverPauseRef.current = false;
          }
        }}
      >
        <div ref={trackRef} className="team-marquee-track flex w-max items-center">
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

      <PagerButton
        label="Next team member"
        onClick={() => step(1)}
        className="team-marquee-next bg-surface-1/90 backdrop-blur-sm"
      >
        <ArrowRight className="size-4" aria-hidden="true" />
      </PagerButton>
    </div>
  );
}

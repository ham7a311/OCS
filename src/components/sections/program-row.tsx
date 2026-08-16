"use client";

import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { TagChip } from "@/components/ui/badge";
import { IndexSketchArrow, canUseHover } from "@/components/visual/index-sketch-arrow";
import { programs } from "@/data/programs";

export function ProgramRow({
  programId,
  index,
}: {
  programId: string;
  index: number;
}) {
  const program = programs.find((entry) => entry.id === programId);
  const Icon = program?.icon;
  const rowRef = useRef<HTMLElement>(null);
  const iconRef = useRef<HTMLElement>(null);
  const numberRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  const show = () => setActive(true);
  const hide = () => setActive(false);

  const onPointerEnter = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === "touch") return;
    if (!canUseHover()) return;
    show();
  };

  const onPointerLeave = () => {
    if (rowRef.current?.matches(":focus-visible")) return;
    hide();
  };

  const onFocus = () => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    show();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Escape") hide();
  };

  if (!program || !Icon) return null;

  return (
    <article
      ref={rowRef}
      id={program.id}
      tabIndex={0}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onFocus={onFocus}
      onBlur={hide}
      onKeyDown={onKeyDown}
      className="group relative grid gap-5 border-b border-line-subtle py-8 outline-none lg:grid-cols-[auto_minmax(0,42rem)] lg:items-start lg:gap-8 lg:py-9"
    >
      <span
        ref={iconRef}
        aria-hidden="true"
        className="relative z-10 grid size-11 shrink-0 place-items-center rounded-md border border-line bg-surface-1 text-ink-muted transition-colors duration-300 ease-ui group-hover:border-amber-500/40 group-hover:text-amber-300 group-focus-visible:border-amber-500/40 group-focus-visible:text-amber-300"
      >
        <Icon className="size-5" strokeWidth={1.5} />
      </span>

      <div className="relative z-10 min-w-0">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <span
            ref={numberRef}
            className="font-mono text-[0.6875rem] text-amber-300 tabular-nums"
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="relative w-fit text-h3 text-ink">
            <span
              aria-hidden="true"
              data-variant={index % 4}
              className={active ? "program-highlight is-on" : "program-highlight"}
            />
            <span className="relative z-[1]">{program.title}</span>
          </h3>
        </div>

        <p className="mt-3 max-w-[58ch] text-[0.9375rem] leading-relaxed text-ink-muted">
          {program.description}
        </p>

        <ul className="mt-4 flex flex-wrap gap-2">
          {program.tags.map((tag) => (
            <li key={tag}>
              <TagChip>{tag}</TagChip>
            </li>
          ))}
        </ul>
      </div>

      <span
        aria-hidden="true"
        className="absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-amber-500/70 transition-transform duration-500 ease-entrance group-hover:scale-x-100 group-focus-visible:scale-x-100"
      />

      <IndexSketchArrow
        active={active}
        containerRef={rowRef}
        fromRef={iconRef}
        toRef={numberRef}
      />
    </article>
  );
}

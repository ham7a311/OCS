"use client";

import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { ChevronDown } from "lucide-react";
import {
  CALLING_CODES,
  callingCodeFlagSrc,
  composePhone,
  parsePhone,
  type CallingCode,
} from "@/data/calling-codes";
import { cn } from "@/lib/utils";

function CountryFlag({ iso2, className }: { iso2: string; className?: string }) {
  return (
    <img
      src={callingCodeFlagSrc(iso2)}
      alt=""
      width={20}
      height={15}
      className={cn("h-[15px] w-5 shrink-0 rounded-[2px] object-cover", className)}
      loading="lazy"
      decoding="async"
    />
  );
}

export function PhoneField({
  id,
  name,
  value,
  onChange,
}: {
  id: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const listId = useId();
  const searchId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const parsed = parsePhone(value);
  const [country, setCountry] = useState<CallingCode>(parsed.country);
  const [national, setNational] = useState(parsed.national);
  const lastEmitted = useRef(value);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [highlight, setHighlight] = useState(0);

  useEffect(() => {
    if (value === lastEmitted.current) return;
    lastEmitted.current = value;
    const next = parsePhone(value);
    setCountry(next.country);
    setNational(next.national);
  }, [value]);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase().replace(/^\+/, "");
    if (!needle) return CALLING_CODES;
    return CALLING_CODES.filter(
      (entry) =>
        entry.name.toLowerCase().includes(needle) ||
        entry.dial.includes(needle) ||
        entry.iso2.toLowerCase().includes(needle),
    );
  }, [query]);

  useEffect(() => {
    setHighlight(0);
  }, [query, open]);

  useEffect(() => {
    if (!open) return;
    searchRef.current?.focus();
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const option = listRef.current?.querySelector(`[data-index="${highlight}"]`);
    option?.scrollIntoView({ block: "nearest" });
  }, [highlight, open, filtered]);

  function emit(nextCountry: CallingCode, nextNational: string) {
    const composed = composePhone(nextCountry, nextNational);
    lastEmitted.current = composed;
    onChange(composed);
  }

  function commitCountry(next: CallingCode) {
    setCountry(next);
    emit(next, national);
    setOpen(false);
    setQuery("");
  }

  function updateNational(raw: string) {
    const digits = raw.replace(/\D/g, "");
    setNational(digits);
    emit(country, digits);
  }

  function onListKeyDown(event: ReactKeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setHighlight((current) => Math.min(filtered.length - 1, current + 1));
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlight((current) => Math.max(0, current - 1));
    }
    if (event.key === "Enter") {
      event.preventDefault();
      const next = filtered[highlight];
      if (next) commitCountry(next);
    }
  }

  return (
    <div
      ref={rootRef}
      className="relative"
      onBlur={(event) => {
        if (rootRef.current?.contains(event.relatedTarget as Node)) return;
        setOpen(false);
        setQuery("");
      }}
    >
      <div
        className={cn(
          "flex h-11 overflow-hidden rounded-md border border-line bg-surface-1 text-[0.9375rem] text-ink",
          "transition-[border-color] duration-200 ease-ui focus-within:border-amber-400",
        )}
      >
        <button
          type="button"
          className="flex min-w-0 shrink-0 items-center gap-2 border-r border-line px-3 text-left hover:bg-surface-2"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listId}
          aria-label={`Country, ${country.name}`}
          onClick={() => setOpen((current) => !current)}
        >
          <CountryFlag iso2={country.iso2} />
          <span className="hidden max-w-[7.5rem] truncate sm:inline">{country.name}</span>
          <ChevronDown className="size-4 shrink-0 text-ink-faint" aria-hidden="true" />
        </button>
        <span className="flex items-center px-2.5 font-mono text-[0.8125rem] text-ink-muted" aria-hidden="true">
          +{country.dial}
        </span>
        <span className="sr-only">Country calling code +{country.dial}</span>
        <input
          id={id}
          name={name}
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          value={national}
          onChange={(event) => updateNational(event.target.value)}
          className="min-w-0 flex-1 bg-transparent pr-3.5 text-ink placeholder:text-ink-faint focus-visible:outline-none"
        />
      </div>

      {open ? (
        <div
          className="absolute top-[calc(100%+0.4rem)] right-0 left-0 z-30 overflow-hidden rounded-md border border-line bg-surface-1 shadow-[0_18px_48px_-28px_rgba(20,18,12,0.55)]"
          onKeyDown={onListKeyDown}
        >
          <div className="border-b border-line p-2">
            <input
              ref={searchRef}
              id={searchId}
              type="search"
              value={query}
              placeholder="Search country or code"
              autoComplete="off"
              onChange={(event) => setQuery(event.target.value)}
              className="h-10 w-full rounded-md border border-line bg-surface-2 px-3 text-sm text-ink placeholder:text-ink-faint focus-visible:border-amber-400 focus-visible:outline-none"
            />
          </div>
          <div
            ref={listRef}
            id={listId}
            role="listbox"
            aria-label="Country"
            className="max-h-[min(16rem,50vh)] overflow-y-auto py-1"
          >
            {filtered.length === 0 ? (
              <p className="px-3 py-3 text-sm text-ink-muted">No countries match.</p>
            ) : (
              filtered.map((entry, index) => {
                const selected = entry.iso2 === country.iso2 && entry.dial === country.dial;
                return (
                  <button
                    key={`${entry.iso2}-${entry.dial}-${entry.name}`}
                    type="button"
                    role="option"
                    data-index={index}
                    aria-selected={selected}
                    className={cn(
                      "flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm",
                      index === highlight ? "bg-surface-2" : "hover:bg-surface-2/70",
                    )}
                    onMouseEnter={() => setHighlight(index)}
                    onClick={() => commitCountry(entry)}
                  >
                    <CountryFlag iso2={entry.iso2} />
                    <span className="min-w-0 flex-1 truncate text-ink">{entry.name}</span>
                    <span className="shrink-0 font-mono text-[0.75rem] text-ink-muted">+{entry.dial}</span>
                  </button>
                );
              })
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}

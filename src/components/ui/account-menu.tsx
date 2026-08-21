"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { Panel } from "@/components/ui/panel";
import { cn } from "@/lib/utils";

export function AccountMenu({
  email,
  onSignOut,
  alwaysVisible,
  hideProfileLink,
}: {
  email: string;
  onSignOut: () => void;
  alwaysVisible?: boolean;
  hideProfileLink?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={cn("relative", !alwaysVisible && "hidden sm:block")}>
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={menuId}
        onClick={() => setOpen((current) => !current)}
        className={cn(
          "inline-flex h-10 max-w-[12.5rem] items-center gap-1.5 rounded-md border border-line px-3",
          "text-left text-[0.8125rem] text-ink transition-colors duration-200 ease-ui",
          "hover:border-line-strong hover:bg-surface-2/80",
        )}
      >
        <span className="min-w-0 truncate">{email}</span>
        <ChevronDown
          className={cn(
            "size-3.5 shrink-0 text-ink-faint transition-transform duration-200 ease-ui",
            open && "rotate-180",
          )}
          aria-hidden="true"
        />
      </button>

      {open ? (
        <Panel
          id={menuId}
          role="menu"
          tone="raised"
          className="absolute right-0 z-50 mt-2 min-w-[12.5rem] overflow-hidden py-1 shadow-[0_12px_40px_-24px_rgba(20,18,12,0.45)]"
        >
          {hideProfileLink ? null : (
            <Link
              href="/members"
              role="menuitem"
              onClick={() => setOpen(false)}
              className="block px-3.5 py-2.5 text-sm text-ink transition-colors duration-200 ease-ui hover:bg-surface-3/70"
            >
              My profile
            </Link>
          )}
          <button
            type="button"
            role="menuitem"
            onClick={() => {
              setOpen(false);
              onSignOut();
            }}
            className="block w-full px-3.5 py-2.5 text-left text-sm text-ink-muted transition-colors duration-200 ease-ui hover:bg-surface-3/70 hover:text-ink"
          >
            Sign out
          </button>
        </Panel>
      ) : null}
    </div>
  );
}

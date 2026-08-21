"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel,
  onCancel,
  onConfirm,
}: {
  open: boolean;
  title: string;
  description: string;
  confirmLabel: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onCancel();
    };
    document.addEventListener("keydown", onKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center p-5"
      onClick={onCancel}
    >
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        aria-hidden="true"
      />
      <Panel
        tone="raised"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        className="relative z-10 w-full max-w-[22rem] px-5 pb-5 pt-4 shadow-[0_24px_64px_-28px_rgba(20,18,12,0.55)] sm:px-6"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <h2
            id="confirm-dialog-title"
            className="pt-1.5 text-[0.9875rem] font-medium tracking-[-0.015em] text-ink"
          >
            {title}
          </h2>
          <button
            type="button"
            onClick={onCancel}
            aria-label="Close"
            className="grid size-11 shrink-0 place-items-center rounded-md text-ink-muted transition-colors duration-200 ease-ui hover:bg-surface-3 hover:text-ink"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted">{description}</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={onConfirm}
            className="border-signal-error/50 text-signal-error hover:border-signal-error hover:bg-signal-error/10 hover:text-signal-error"
          >
            {confirmLabel}
          </Button>
        </div>
      </Panel>
    </div>
  );
}

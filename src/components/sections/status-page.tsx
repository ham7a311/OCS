"use client";

import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Em } from "@/components/ui/section-heading";
import { ApprovalSeal, type SealVariant } from "@/components/visual/approval-seal";
import { site } from "@/config/site";

export type StatusKind = "pending" | "accepted" | "rejected";

type StatusConfig = {
  sealVariant: SealVariant;
  celebrate: boolean;
  heading: ReactNode;
  subheading: string;
  showEditDelete: boolean;
  primaryAction: { label: string; href: string; external?: boolean } | null;
};

const CONFIG: Record<StatusKind, StatusConfig> = {
  pending: {
    sealVariant: "outlined-gold",
    celebrate: false,
    heading: "Thanks — your profile is in.",
    subheading: "A committee member will review it shortly.",
    showEditDelete: true,
    primaryAction: null,
  },
  accepted: {
    sealVariant: "filled-gold",
    celebrate: true,
    heading: (
      <>
        You’re <Em>in.</Em>
      </>
    ),
    subheading:
      "Welcome to OCS — your profile has been approved. Keep an eye out for your chapter’s next session.",
    showEditDelete: false,
    primaryAction: { label: "Join OCS", href: site.whatsappUrl, external: true },
  },
  rejected: {
    sealVariant: "outlined-muted",
    celebrate: false,
    heading: "Not this time.",
    subheading:
      "Your profile wasn’t approved for membership right now — that often just means the committee needs a bit more detail, or is prioritising specific skills for open build squads this term. You’re welcome to update your profile below.",
    showEditDelete: true,
    primaryAction: null,
  },
};

export function StatusPage({
  status,
  onAskDelete,
  onEdit,
}: {
  status: StatusKind;
  onAskDelete: () => void;
  onEdit: () => void;
}) {
  const config = CONFIG[status];

  return (
    <div className="mt-10 flex flex-col items-center text-center">
      <ApprovalSeal variant={config.sealVariant} celebrate={config.celebrate} />
      <h2 className="mt-6 max-w-[22ch] text-[1.5rem] font-semibold tracking-[-0.025em] text-ink sm:text-[1.75rem]">
        {config.heading}
      </h2>
      <p className="mt-3 max-w-[46ch] text-sm leading-relaxed text-ink-muted sm:text-[0.9375rem]">
        {config.subheading}
      </p>

      {config.primaryAction ? (
        <Button href={config.primaryAction.href} external={config.primaryAction.external} className="mt-8">
          {config.primaryAction.label}
        </Button>
      ) : null}

      {config.showEditDelete ? (
        <>
          <Button type="button" variant="secondary" className="mt-8" onClick={onEdit}>
            Edit profile
          </Button>
          <button
            type="button"
            onClick={onAskDelete}
            className="mt-14 min-h-11 font-mono text-[0.6875rem] tracking-[0.09em] text-ink-faint uppercase underline decoration-transparent underline-offset-4 transition-[color,text-decoration-color] duration-200 ease-ui hover:text-signal-error hover:decoration-current"
          >
            Delete my data
          </button>
        </>
      ) : null}
    </div>
  );
}

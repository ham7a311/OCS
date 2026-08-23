"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ProfileWizard } from "@/components/sections/profile-wizard";
import { StatusPage, type StatusKind } from "@/components/sections/status-page";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { NodeNetwork } from "@/components/visual/node-network";
import { useMembersBackGuard } from "@/hooks/use-members-back-guard";
import { useSession } from "@/hooks/use-session";
import type { ProfileFormData } from "@/data/profile";

export function MembersPage() {
  const router = useRouter();
  const {
    session,
    profile,
    reviewStatus,
    needsReconsent,
    profileReady,
    saveProfile,
    deleteProfile,
  } = useSession();
  const { status: previewStatus, ready: previewReady } = usePreviewStatus();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [editing, setEditing] = useState(false);

  useMembersBackGuard({
    enabled: Boolean(session) && !previewStatus,
    editing,
    onCancelEdit: () => setEditing(false),
  });

  useEffect(() => {
    if (!previewReady || previewStatus) return;
    if (profileReady && !session) router.replace("/signin");
  }, [previewReady, previewStatus, profileReady, session, router]);

  if (!previewReady || (!previewStatus && (!profileReady || !session))) {
    return (
      <Section tone="canvas" labelledBy="profile-title" divider={false} className="!py-0">
        <Container className="max-w-[42rem] pt-[calc(var(--ocs-nav-clearance)+0.75rem)] pb-8">
          <span className="sr-only">Loading profile</span>
        </Container>
      </Section>
    );
  }

  const showWizard = !previewStatus && (!profile || needsReconsent || editing);

  async function handleSubmit(data: ProfileFormData) {
    await saveProfile(data);
    setEditing(false);
  }

  return (
    <Section
      tone="canvas"
      labelledBy="profile-title"
      divider={false}
      className="relative isolate min-h-dvh !py-0"
    >
      {!showWizard ? (
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          aria-hidden="true"
        >
          <NodeNetwork variant="ambient" density="sparse" />
        </div>
      ) : null}

      <Container className="relative z-10 max-w-[42rem] pt-[calc(var(--ocs-nav-clearance)+0.75rem)] pb-10">
        <h1 id="profile-title" className="sr-only">
          Your profile
        </h1>

        {showWizard ? (
          <ProfileWizard
            email={session?.email ?? ""}
            initialData={profile ?? undefined}
            submitLabel={profile ? "Save profile" : "Submit Profile"}
            onSubmit={handleSubmit}
          />
        ) : (
          <>
            <StatusPage
              status={previewStatus ?? toStatusKind(reviewStatus)}
              onAskDelete={() => setConfirmDelete(true)}
              onEdit={() => setEditing(true)}
            />
            <ConfirmDialog
              open={confirmDelete}
              title="Are you sure? This can't be undone."
              description="This deletes the profile details we hold about you."
              confirmLabel="Delete my data"
              onCancel={() => setConfirmDelete(false)}
              onConfirm={() => {
                void deleteProfile();
                setConfirmDelete(false);
              }}
            />
          </>
        )}
      </Container>
    </Section>
  );
}

function toStatusKind(reviewStatus: "pending" | "approved" | "rejected" | null): StatusKind {
  if (reviewStatus === "approved") return "accepted";
  if (reviewStatus === "rejected") return "rejected";
  return "pending";
}

function usePreviewStatus(): { status: StatusKind | null; ready: boolean } {
  const [status, setStatus] = useState<StatusKind | null>(null);
  const [ready, setReady] = useState(process.env.NODE_ENV === "production");

  useEffect(() => {
    if (process.env.NODE_ENV === "production") return;
    const raw = new URLSearchParams(window.location.search).get("status");
    if (raw === "pending" || raw === "accepted" || raw === "rejected") {
      setStatus(raw);
    }
    setReady(true);
  }, []);

  return { status, ready };
}

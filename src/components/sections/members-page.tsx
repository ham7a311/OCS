"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import { ProfileWizard } from "@/components/sections/profile-wizard";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { useSession } from "@/hooks/use-session";
import type { ProfileFormData } from "@/data/profile";

export function MembersPage() {
  const router = useRouter();
  const { session, profile, needsReconsent, profileReady, saveProfile, deleteProfile } =
    useSession();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (profileReady && !session) router.replace("/signin");
  }, [profileReady, session, router]);

  if (!profileReady || !session) {
    return (
      <Section tone="canvas" labelledBy="profile-title" divider={false} className="!py-0">
        <Container className="max-w-[42rem] pt-[calc(var(--ocs-nav-clearance)+0.75rem)] pb-8">
          <span className="sr-only">Loading profile</span>
        </Container>
      </Section>
    );
  }

  const showWizard = !profile || needsReconsent || editing;

  async function handleSubmit(data: ProfileFormData) {
    await saveProfile(data);
    setEditing(false);
  }

  return (
    <Section tone="canvas" labelledBy="profile-title" divider={false} className="!py-0">
      <Container className="max-w-[42rem] pt-[calc(var(--ocs-nav-clearance)+0.75rem)] pb-10">
        <h1 id="profile-title" className="sr-only">
          Your profile
        </h1>

        {showWizard ? (
          <ProfileWizard
            email={session.email}
            initialData={profile ?? undefined}
            submitLabel={profile ? "Save profile" : "Submit Profile"}
            onSubmit={handleSubmit}
          />
        ) : (
          <>
            <ProfileConfirmation
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

function ProfileConfirmation({
  onAskDelete,
  onEdit,
}: {
  onAskDelete: () => void;
  onEdit: () => void;
}) {
  return (
    <div className="mt-10 flex flex-col items-center text-center">
      <span
        aria-hidden="true"
        className="grid size-12 place-items-center rounded-full border border-amber-500/40 bg-amber-500/10 text-amber-300"
      >
        <Check className="size-5" strokeWidth={2.25} />
      </span>
      <h2 className="mt-6 max-w-[22ch] text-[1.5rem] font-semibold tracking-[-0.025em] text-ink sm:text-[1.75rem]">
        Thanks — your profile is in. A committee member will review it shortly.
      </h2>

      <div className="mt-8 flex w-full max-w-[22rem] flex-col items-center gap-4">
        <Button type="button" variant="secondary" onClick={onEdit}>
          Edit profile
        </Button>
        <button
          type="button"
          onClick={onAskDelete}
          className="min-h-11 font-mono text-[0.6875rem] tracking-[0.09em] text-ink-faint uppercase underline decoration-transparent underline-offset-4 transition-[color,text-decoration-color] duration-200 ease-ui hover:text-signal-error hover:decoration-current"
        >
          Delete my data
        </button>
      </div>
    </div>
  );
}

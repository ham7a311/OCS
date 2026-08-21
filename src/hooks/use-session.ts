"use client";

import { useCallback, useEffect, useState } from "react";
import { deleteMyProfile, getMyProfile, saveMyProfile } from "@/app/members/actions";
import type { ProfileFormData } from "@/data/profile";
import { authClient } from "@/lib/auth/client";

export type Session = {
  email: string;
};

export function useSession() {
  const { data, isPending } = authClient.useSession();
  const email = data?.user?.email ?? "";
  const session: Session | null = email ? { email } : null;

  const [loadedEmail, setLoadedEmail] = useState<string | null>(null);
  const [storedProfile, setStoredProfile] = useState<ProfileFormData | null>(null);
  const [needsReconsent, setNeedsReconsent] = useState(false);

  useEffect(() => {
    if (!email) return;

    let cancelled = false;

    getMyProfile().then((result) => {
      if (cancelled) return;
      setStoredProfile(result.profile);
      setNeedsReconsent(result.needsReconsent);
      setLoadedEmail(email);
    });

    return () => {
      cancelled = true;
    };
  }, [email]);

  const signOut = useCallback(async () => {
    await authClient.signOut();
    setStoredProfile(null);
    setNeedsReconsent(false);
    setLoadedEmail(null);
  }, []);

  const saveProfile = useCallback(async (next: ProfileFormData) => {
    const result = await saveMyProfile(next);
    if (!result.ok) throw new Error(result.error);
    setStoredProfile(result.profile);
    setNeedsReconsent(false);
  }, []);

  const deleteProfile = useCallback(async () => {
    const result = await deleteMyProfile();
    if (!result.ok) throw new Error(result.error);
    setStoredProfile(null);
    setNeedsReconsent(false);
  }, []);

  const profile = session ? storedProfile : null;
  const profileReady = !isPending && (!session || loadedEmail === session.email);

  return {
    session,
    profile,
    needsReconsent: Boolean(session) && needsReconsent,
    profileReady,
    isPending,
    signOut,
    saveProfile,
    deleteProfile,
  };
}

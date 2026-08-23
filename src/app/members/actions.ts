"use server";

import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { PRIVACY_NOTICE_VERSION } from "@/data/privacy";
import type { ProfileFormData } from "@/data/profile";
import { db } from "@/db";
import { profileConsentEvents, profiles } from "@/db/schema";
import { auth } from "@/lib/auth/server";
import { profileRowToFormData } from "@/lib/profile-map";
import { validateProfilePayload } from "@/lib/profile-validation";
import { limitProfileWrite } from "@/lib/rate-limit";

async function requireUser() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user?.id) {
    return { error: "You need to sign in first." as const, user: null };
  }
  return { error: null, user: session.user };
}

export async function getMyProfile(): Promise<{
  profile: ProfileFormData | null;
  needsReconsent: boolean;
  reviewStatus: "pending" | "approved" | "rejected" | null;
  email: string | null;
  error: string | null;
}> {
  const { error, user } = await requireUser();
  if (error || !user) {
    return {
      profile: null,
      needsReconsent: false,
      reviewStatus: null,
      email: null,
      error: error ?? "Unauthorized",
    };
  }

  const [row] = await db.select().from(profiles).where(eq(profiles.userId, user.id)).limit(1);

  if (row) {
    await db
      .update(profiles)
      .set({ lastActivityAt: new Date() })
      .where(eq(profiles.userId, user.id));
  }

  if (!row) {
    return {
      profile: null,
      needsReconsent: false,
      reviewStatus: null,
      email: user.email,
      error: null,
    };
  }

  const needsReconsent = row.privacyNoticeVersion !== PRIVACY_NOTICE_VERSION;
  return {
    profile: profileRowToFormData(row),
    needsReconsent,
    reviewStatus: row.reviewStatus,
    email: user.email,
    error: null,
  };
}

export async function saveMyProfile(
  input: unknown,
): Promise<{ ok: true; profile: ProfileFormData } | { ok: false; error: string }> {
  const { error, user } = await requireUser();
  if (error || !user) return { ok: false, error: error ?? "Unauthorized" };

  let data: ProfileFormData;
  try {
    data = validateProfilePayload(input);
  } catch (caught) {
    return { ok: false, error: caught instanceof Error ? caught.message : "Invalid profile data." };
  }

  const limited = await limitProfileWrite(user.id);
  if (!limited.ok) return { ok: false, error: limited.error };

  const now = new Date();
  const [existing] = await db.select().from(profiles).where(eq(profiles.userId, user.id)).limit(1);
  const kind = existing && existing.privacyNoticeVersion !== PRIVACY_NOTICE_VERSION
    ? ("notice_reconsent" as const)
    : existing
      ? null
      : ("profile_submit" as const);

  const values = {
    userId: user.id,
    fullName: data.fullName,
    preferredName: data.preferredName,
    phone: data.phone,
    school: data.school,
    otherSchool: data.otherSchool,
    programme: data.programme,
    yearOfStudy: data.yearOfStudy,
    graduationMonth: data.graduationMonth,
    graduationYear: data.graduationYear,
    reason: data.reason,
    skills: data.skills,
    startingOut: data.startingOut,
    interests: data.interests,
    outcome: data.outcome,
    github: data.github,
    linkedin: data.linkedin,
    openToSquad: data.openToSquad,
    offerMentor: data.offerMentor,
    sendUpdates: data.sendUpdates,
    reviewStatus: "pending" as const,
    reviewedAt: null,
    reviewedBy: null,
    privacyNoticeVersion: PRIVACY_NOTICE_VERSION,
    consentedAt: now,
    updatedAt: now,
    lastActivityAt: now,
  };

  if (existing) {
    await db.update(profiles).set(values).where(eq(profiles.userId, user.id));
  } else {
    await db.insert(profiles).values({ ...values, submittedAt: now });
  }

  if (kind) {
    await db.insert(profileConsentEvents).values({
      userId: user.id,
      noticeVersion: PRIVACY_NOTICE_VERSION,
      kind,
    });
  }

  return { ok: true, profile: { ...data, consent: true } };
}

export async function deleteMyProfile(): Promise<{ ok: true } | { ok: false; error: string }> {
  const { error, user } = await requireUser();
  if (error || !user) return { ok: false, error: error ?? "Unauthorized" };

  await db.delete(profileConsentEvents).where(eq(profileConsentEvents.userId, user.id));
  await db.delete(profiles).where(eq(profiles.userId, user.id));
  return { ok: true };
}

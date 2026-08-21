import { PRIVACY_NOTICE_VERSION } from "@/data/privacy";
import type { ProfileFormData, ReasonId } from "@/data/profile";
import type { ProfileRow } from "@/db/schema";

export function profileRowToFormData(row: ProfileRow): ProfileFormData {
  const needsReconsent = row.privacyNoticeVersion !== PRIVACY_NOTICE_VERSION;
  return {
    fullName: row.fullName,
    preferredName: row.preferredName,
    phone: row.phone,
    school: row.school,
    otherSchool: row.otherSchool,
    programme: row.programme,
    yearOfStudy: row.yearOfStudy,
    graduationMonth: row.graduationMonth,
    graduationYear: row.graduationYear,
    reason: row.reason as ReasonId,
    skills: row.skills ?? [],
    startingOut: row.startingOut,
    interests: row.interests ?? [],
    outcome: row.outcome,
    github: row.github,
    linkedin: row.linkedin,
    openToSquad: row.openToSquad,
    offerMentor: row.offerMentor,
    sendUpdates: row.sendUpdates,
    consent: needsReconsent ? false : true,
  };
}

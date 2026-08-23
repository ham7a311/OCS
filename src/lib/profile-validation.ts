import {
  GRADUATION_YEARS,
  INTERESTS,
  MONTHS,
  REASONS,
  SCHOOLS,
  SKILLS,
  YEARS_OF_STUDY,
  type ProfileFormData,
  type ReasonId,
} from "@/data/profile";

const ALLOWED_KEYS = new Set<keyof ProfileFormData>([
  "fullName",
  "preferredName",
  "phone",
  "school",
  "otherSchool",
  "programme",
  "yearOfStudy",
  "graduationMonth",
  "graduationYear",
  "reason",
  "skills",
  "startingOut",
  "interests",
  "outcome",
  "github",
  "linkedin",
  "openToSquad",
  "offerMentor",
  "sendUpdates",
  "consent",
]);

const SCHOOL_SET = new Set<string>(SCHOOLS);
const YEAR_SET = new Set<string>(YEARS_OF_STUDY);
const SKILL_SET = new Set<string>(SKILLS);
const INTEREST_SET = new Set<string>(INTERESTS);
const REASON_SET = new Set<string>(REASONS.map((reason) => reason.id));
const MONTH_SET = new Set<string>(MONTHS.map((month) => month.value));
const GRAD_YEAR_SET = new Set<string>(GRADUATION_YEARS);

function isNonEmpty(value: string) {
  return value.trim().length > 0;
}

function isOptionalHttpsUrl(value: string) {
  if (!isNonEmpty(value)) return true;
  try {
    const url = new URL(value.trim());
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

function asString(value: unknown, field: string): string {
  if (typeof value !== "string") throw new Error(`${field} is required.`);
  return value;
}

function asBoolean(value: unknown, field: string): boolean {
  if (typeof value !== "boolean") throw new Error(`${field} is required.`);
  return value;
}

function asStringArray(value: unknown, field: string): string[] {
  if (!Array.isArray(value) || value.some((item) => typeof item !== "string")) {
    throw new Error(`${field} is invalid.`);
  }
  return value;
}

export function validateProfilePayload(input: unknown): ProfileFormData {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    throw new Error("Invalid profile data.");
  }

  const raw = input as Record<string, unknown>;
  for (const key of Object.keys(raw)) {
    if (!ALLOWED_KEYS.has(key as keyof ProfileFormData)) {
      throw new Error("Unexpected profile field.");
    }
  }

  const fullName = asString(raw.fullName, "Full name").trim();
  if (!isNonEmpty(fullName)) throw new Error("Enter your full name.");

  const school = asString(raw.school, "School").trim();
  if (!SCHOOL_SET.has(school)) throw new Error("Choose your school or university.");

  const otherSchool = asString(raw.otherSchool ?? "", "School name").trim();
  if (school === "Other" && !isNonEmpty(otherSchool)) throw new Error("Enter your school's name.");
  if (school !== "Other" && isNonEmpty(otherSchool)) {
    throw new Error("School name is only used when Other is selected.");
  }

  const programme = asString(raw.programme ?? "", "Programme").trim();

  const yearOfStudy = asString(raw.yearOfStudy ?? "", "Year of study").trim();
  if (yearOfStudy && !YEAR_SET.has(yearOfStudy)) throw new Error("Choose your year of study.");

  const graduationMonth = asString(raw.graduationMonth ?? "", "Graduation month").trim();
  if (graduationMonth && !MONTH_SET.has(graduationMonth)) {
    throw new Error("Choose a valid graduation month.");
  }

  const graduationYear = asString(raw.graduationYear ?? "", "Graduation year").trim();
  if (graduationYear && !GRAD_YEAR_SET.has(graduationYear)) {
    throw new Error("Choose a valid graduation year.");
  }

  const reason = asString(raw.reason, "Reason").trim();
  if (!REASON_SET.has(reason)) throw new Error("Choose why you are here.");

  const skills = asStringArray(raw.skills, "Skills");
  if (skills.some((skill) => !SKILL_SET.has(skill))) throw new Error("Choose skills from the list.");
  const uniqueSkills = [...new Set(skills)];

  const startingOut = asBoolean(raw.startingOut, "Starting out");
  if (startingOut && uniqueSkills.length > 0) {
    throw new Error("Choose skills or “None, I'm starting out,” not both.");
  }
  if (!startingOut && uniqueSkills.length === 0) {
    throw new Error("Select at least one skill, or choose “None, I'm starting out.”");
  }

  const interests = asStringArray(raw.interests, "Interests");
  if (interests.some((interest) => !INTEREST_SET.has(interest))) {
    throw new Error("Choose interests from the list.");
  }
  const uniqueInterests = [...new Set(interests)];
  if (uniqueInterests.length === 0) throw new Error("Choose at least one interest.");

  const github = asString(raw.github ?? "", "GitHub").trim();
  const linkedin = asString(raw.linkedin ?? "", "LinkedIn").trim();
  if (!isOptionalHttpsUrl(github)) throw new Error("Enter a valid GitHub URL, or leave it blank.");
  if (!isOptionalHttpsUrl(linkedin)) throw new Error("Enter a valid LinkedIn URL, or leave it blank.");

  const consent = asBoolean(raw.consent, "Consent");
  if (!consent) throw new Error("You need to agree before we can store your profile.");

  return {
    fullName,
    preferredName: asString(raw.preferredName ?? "", "Preferred name").trim(),
    phone: asString(raw.phone ?? "", "Phone").trim(),
    school,
    otherSchool: school === "Other" ? otherSchool : "",
    programme,
    yearOfStudy,
    graduationMonth,
    graduationYear,
    reason: reason as ReasonId,
    skills: startingOut ? [] : uniqueSkills,
    startingOut,
    interests: uniqueInterests,
    outcome: asString(raw.outcome ?? "", "Outcome").trim(),
    github,
    linkedin,
    openToSquad: asBoolean(raw.openToSquad, "Open to squad"),
    offerMentor: asBoolean(raw.offerMentor, "Offer mentor"),
    sendUpdates: asBoolean(raw.sendUpdates, "Send updates"),
    consent,
  };
}

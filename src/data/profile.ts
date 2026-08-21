export const SCHOOLS = [
  "Middle East College",
  "Muscat University",
  "UTAS — Muscat",
  "GUtech",
  "Sultan Qaboos University",
  "Sohar University",
  "NUST",
  "MCBS",
  "University of Nizwa",
  "A'Sharqiyah University",
  "Dhofar University",
  "UTAS — other branch",
  "Other",
] as const;

export const YEARS_OF_STUDY = [
  "Foundation",
  "Year 1",
  "Year 2",
  "Year 3",
  "Year 4+",
  "Postgraduate",
  "Graduated",
  "Not currently studying",
] as const;

export const SKILLS = [
  "Python",
  "C/C++",
  "Java",
  "JavaScript",
  "TypeScript",
  "HTML/CSS",
  "React",
  "Node.js",
  "Web Dev",
  "Mobile Dev",
  "Kotlin",
  "Swift",
  "PHP",
  "Go",
  "Databases/SQL",
  "Data Analysis",
  "Machine Learning",
  "UI/UX Design",
  "Figma",
  "Graphic Design",
  "Networking",
  "Cloud/DevOps",
  "Cybersecurity",
  "Linux",
  "Git",
  "Docker",
  "Algorithms/DSA",
  "Arduino/Embedded",
  "IoT",
  "Robotics",
  "Game Dev",
  "Hardware",
] as const;

export const STARTING_OUT_LABEL = "None, I'm starting out";

export const INTERESTS = [
  "Study halls",
  "Hands-on workshops",
  "Contest nights",
  "Hackathons",
  "Build squads (real client projects)",
  "AI & Machine Learning",
  "Running a chapter",
  "Speaking",
] as const;

export const REASONS = [
  {
    id: "member",
    title: "Already a member",
    description: "You've been to something we ran.",
  },
  {
    id: "interested",
    title: "Interested in joining",
    description: "You haven't yet, but you want in.",
  },
  {
    id: "alumni",
    title: "Alumni",
    description: "You've graduated but want to stay close.",
  },
  {
    id: "mentor",
    title: "Offering to mentor",
    description: "You're a working engineer who can review student work.",
  },
] as const;

export type ReasonId = (typeof REASONS)[number]["id"];

export const MONTHS = [
  { value: "01", label: "January" },
  { value: "02", label: "February" },
  { value: "03", label: "March" },
  { value: "04", label: "April" },
  { value: "05", label: "May" },
  { value: "06", label: "June" },
  { value: "07", label: "July" },
  { value: "08", label: "August" },
  { value: "09", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
] as const;

const currentYear = new Date().getFullYear();
export const GRADUATION_YEARS = Array.from({ length: 13 }, (_, index) =>
  String(currentYear - 4 + index),
);

export const PROFILE_STEPS = [
  { index: "01", title: "Who you are" },
  { index: "02", title: "Where you study" },
  { index: "03", title: "Why you're here" },
  { index: "04", title: "What you can already do" },
  { index: "05", title: "What you want from OCS" },
  { index: "06", title: "Your data, and your say in it" },
] as const;

export const TOTAL_PROFILE_STEPS = PROFILE_STEPS.length;

export type ProfileFormData = {
  fullName: string;
  preferredName: string;
  phone: string;
  school: string;
  otherSchool: string;
  programme: string;
  yearOfStudy: string;
  graduationMonth: string;
  graduationYear: string;
  reason: ReasonId | "";
  skills: string[];
  startingOut: boolean;
  interests: string[];
  outcome: string;
  github: string;
  linkedin: string;
  openToSquad: boolean;
  offerMentor: boolean;
  sendUpdates: boolean;
  consent: boolean;
};

export function createEmptyProfile(): ProfileFormData {
  return {
    fullName: "",
    preferredName: "",
    phone: "",
    school: "",
    otherSchool: "",
    programme: "",
    yearOfStudy: "",
    graduationMonth: "",
    graduationYear: "",
    reason: "",
    skills: [],
    startingOut: false,
    interests: [],
    outcome: "",
    github: "",
    linkedin: "",
    openToSquad: false,
    offerMentor: false,
    sendUpdates: false,
    consent: false,
  };
}

function isNonEmpty(value: string) {
  return value.trim().length > 0;
}

export function isStepValid(step: number, data: ProfileFormData): boolean {
  switch (step) {
    case 1:
      return isNonEmpty(data.fullName);
    case 2:
      if (!isNonEmpty(data.school)) return false;
      if (data.school === "Other" && !isNonEmpty(data.otherSchool)) return false;
      if (!isNonEmpty(data.programme)) return false;
      if (!isNonEmpty(data.yearOfStudy)) return false;
      return true;
    case 3:
      return data.reason !== "";
    case 4:
      return data.startingOut || data.skills.length > 0;
    case 5:
      return data.interests.length > 0;
    case 6:
      return data.consent;
    default:
      return false;
  }
}

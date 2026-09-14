import type { EventKind } from "@/lib/event-artwork";

export type EventStatus = "upcoming" | "registration-open" | "completed" | "cancelled";

export type EventDatePrecision = "day" | "month";

export type OcsEvent = {
  id: string;
  title: string;
  description: string;
  speaker?: string;
  /** Optional LinkedIn profile for the speaker. */
  speakerLinkedin?: string | null;
  /** ISO 8601 date. Formatted for display at render time. Month-precision uses day 01 as a sort anchor only. */
  date: string;
  /** When `month`, do not surface a calendar day or weekday. */
  datePrecision?: EventDatePrecision;
  /** Shown instead of weekday when the day is not announced. */
  dateNote?: string;
  /** Clock time with timezone, e.g. "7:30 PM GST". */
  time?: string;
  /** Short badge tag. */
  category: string;
  /** Meta-row theme. Falls back to `category` when omitted. */
  theme?: string;
  kind?: EventKind;
  status: EventStatus;
  /** Only surfaced while the status is `registration-open`. */
  registrationUrl: string | null;
  format?: string;
  collaboration?: string;
  /** Workshops and webinars. Never implied for hackathons. */
  attendanceCertificate?: boolean;
};

/** Real upcoming events. Artwork (Orbit / Halo / Construction) is wired on EventCard by kind. */
export const upcomingEvents: OcsEvent[] = [
  {
    id: "hackathon-at-gutech",
    title: "Hackathon at GUtech",
    description:
      "A campus hackathon with GUtech CS Club. The exact date is not announced yet — expected mid-November.",
    date: "2026-11-01",
    datePrecision: "month",
    dateNote: "Expected mid-November",
    category: "Hackathon",
    theme: "Hackathon",
    kind: "hackathon",
    status: "upcoming",
    registrationUrl: null,
    format: "In person — GUtech",
    collaboration: "GUtech CS Club",
  },
];

/** Newest first. Drives the homepage Past timeline and the archive EventCard deck. */
export const pastEvents: OcsEvent[] = [
  {
    id: "ocs-ai-founder-hub",
    title: "Six systems local businesses pay for",
    description:
      "Six systems local businesses actually pay for in 2026, and building one live.",
    date: "2026-09-05",
    category: "Workshop",
    theme: "AI systems for local businesses",
    kind: "workshop",
    status: "completed",
    registrationUrl: null,
    collaboration: "AI Founder Hub",
    attendanceCertificate: true,
  },
  {
    id: "ai-agents-under-the-scope",
    title: "AI Agents: Under the Scope",
    description:
      "AI Agents are rapidly changing the way we interact with technology — but how do they actually work, and what can they really do?",
    speaker: "Al Munther Al Harrasi",
    speakerLinkedin: "https://www.linkedin.com/in/al-munther-al-harrasi",
    date: "2026-09-02",
    time: "5:00 PM GST",
    category: "Workshop",
    theme: "AI Agents",
    kind: "workshop",
    status: "completed",
    registrationUrl: null,
    format: "Google Meet — Online",
    collaboration: "Uplift Academy",
    attendanceCertificate: true,
  },
  {
    id: "advanced-air-mobility-101",
    title: "Advanced Air Mobility 101",
    description:
      "A session on the software systems powering the next generation of aviation. Mr. Fahad Al Riyami, Founder of AeroVecto, explores advanced air mobility, emerging technologies, and the code shaping the future of flight.",
    speaker: "Mr. Fahad Al Riyami",
    speakerLinkedin: "https://www.linkedin.com/in/fahadalriyami",
    date: "2026-08-22",
    time: "7:30 PM GST",
    category: "Webinar",
    theme: "Advanced Air Mobility",
    kind: "webinar",
    status: "completed",
    registrationUrl: null,
    format: "Google Meet",
    collaboration: "NSRI & AeroVecto",
    attendanceCertificate: true,
  },
  {
    id: "introduction-to-vibe-coding",
    title: "Introduction to Vibe Coding",
    description:
      "An introduction to building software by describing ideas to AI rather than writing every line by hand. Led by Al Munther, the session explored how AI can help turn ideas into working projects — no prior coding experience required.",
    speaker: "Al Munther Al Harrasi",
    speakerLinkedin: "https://www.linkedin.com/in/al-munther-al-harrasi",
    date: "2026-08-13",
    time: "4:00 PM GST",
    category: "Workshop",
    theme: "AI-Assisted Development",
    kind: "workshop",
    status: "completed",
    registrationUrl: null,
    format: "Google Meet",
    collaboration: "Uplift Academy",
    attendanceCertificate: true,
  },
  {
    id: "from-strategy-to-execution",
    title: "From Strategy to Execution: Building Solutions that Work",
    description:
      "From an idea on paper to a solution that works in the real world.",
    speaker: "Anas Kanjo",
    date: "2026-08-09",
    time: "7:00 PM GST",
    category: "Webinar",
    theme: "Building solutions",
    kind: "webinar",
    status: "completed",
    registrationUrl: null,
    format: "Google Meet",
    collaboration: "QLM Middle East",
    attendanceCertificate: true,
  },
  {
    id: "introduction-to-python",
    title: "Introduction to Python",
    description:
      "OCS's first-ever Python workshop, organized in collaboration with Uplift Academy, a USA-registered 501(c)(3) non-profit dedicated to accessible STEM education. Led by Al Munther Al Harrasi, the session welcomed complete beginners and those looking to strengthen their Python fundamentals.",
    speaker: "Al Munther Al Harrasi",
    speakerLinkedin: "https://www.linkedin.com/in/al-munther-al-harrasi",
    date: "2026-08-04",
    time: "1:30 PM GST",
    category: "Workshop",
    theme: "Programming — Python Fundamentals",
    kind: "workshop",
    status: "completed",
    registrationUrl: null,
    format: "Google Meet",
    collaboration: "Uplift Academy",
    attendanceCertificate: true,
  },
  {
    id: "leading-oman-forward",
    title: "Leading Oman Forward: Leadership, Soft Skills, and Oman Vision 2040",
    description:
      "Leadership, communication, and growth beyond code, in the frame of Oman Vision 2040.",
    speaker: "Mr. Clive Curtis",
    date: "2026-07-11",
    category: "Webinar",
    theme: "Leadership and Vision 2040",
    kind: "webinar",
    status: "completed",
    registrationUrl: null,
    collaboration: "The British Omani Society",
    attendanceCertificate: true,
  },
];

/** Compact timeline rows shown on the main Events section before the archive link. */
export const TIMELINE_VISIBLE_LIMIT = 4;

export const eventStatusLabel: Record<EventStatus, string> = {
  upcoming: "Upcoming",
  "registration-open": "Registration open",
  completed: "Completed",
  cancelled: "Cancelled",
};

export function formatEventDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function splitEventDate(iso: string) {
  const date = new Date(`${iso}T00:00:00Z`);
  const part = (options: Intl.DateTimeFormatOptions) =>
    date.toLocaleDateString("en-GB", { ...options, timeZone: "UTC" });

  return {
    day: part({ day: "2-digit" }),
    month: part({ month: "short" }).toUpperCase(),
    year: part({ year: "numeric" }),
    weekday: part({ weekday: "long" }),
  };
}

export function eventMetadata(event: OcsEvent) {
  return [
    ...(event.speaker ? [{ label: "Speaker", value: event.speaker }] : []),
    { label: "Theme", value: event.theme ?? event.category },
    ...(event.format ? [{ label: "Format", value: event.format }] : []),
    ...(event.time ? [{ label: "Time", value: event.time }] : []),
    ...(event.attendanceCertificate &&
    (event.status === "upcoming" || event.status === "registration-open")
      ? [{ label: "Certificate", value: "Of attendance" }]
      : []),
  ];
}

export type EventStatus = "upcoming" | "registration-open" | "completed" | "cancelled";

export type OcsEvent = {
  id: string;
  title: string;
  description: string;
  speaker: string;
  /** Optional LinkedIn profile for the speaker. */
  speakerLinkedin?: string | null;
  /** ISO 8601 date. Formatted for display at render time. */
  date: string;
  /** Clock time with timezone, e.g. "7:30 PM GST". */
  time?: string;
  /** Short badge tag. */
  category: string;
  /** Meta-row theme. Falls back to `category` when omitted. */
  theme?: string;
  status: EventStatus;
  /** Only surfaced while the status is `registration-open`. */
  registrationUrl: string | null;
  format?: string;
  collaboration?: string;
};

export const upcomingEvents: OcsEvent[] = [];

export const pastEvents: OcsEvent[] = [
  {
    id: "advanced-air-mobility-101",
    title: "Advanced Air Mobility 101",
    description:
      "A session on the software systems powering the next generation of aviation. Mr. Fahad Al Riyami, Founder of AeroVecto, explores advanced air mobility, emerging technologies, and the code shaping the future of flight.",
    speaker: "Mr. Fahad Al Riyami",
    speakerLinkedin: "https://www.linkedin.com/in/fahadalriyami",
    date: "2026-08-22",
    time: "7:30 PM GST",
    category: "Aviation & Software",
    theme: "Advanced Air Mobility",
    status: "completed",
    registrationUrl: null,
    format: "Google Meet",
    collaboration: "NSRI & AeroVecto",
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
    category: "AI & Software Development",
    theme: "AI-Assisted Development",
    status: "completed",
    registrationUrl: null,
    format: "Google Meet",
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
    category: "Programming",
    theme: "Programming — Python Fundamentals",
    status: "completed",
    registrationUrl: null,
    format: "Google Meet",
    collaboration: "Uplift Academy",
  },
];

/** Compact timeline rows shown on the main Events section before the archive link. */
export const TIMELINE_VISIBLE_LIMIT = 8;

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
    { label: "Speaker", value: event.speaker },
    { label: "Theme", value: event.theme ?? event.category },
    ...(event.format ? [{ label: "Format", value: event.format }] : []),
    ...(event.time ? [{ label: "Time", value: event.time }] : []),
  ];
}

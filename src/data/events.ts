export type EventStatus = "upcoming" | "registration-open" | "completed" | "cancelled";

export type OcsEvent = {
  id: string;
  title: string;
  description: string;
  speaker: string;
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

export const upcomingEvents: OcsEvent[] = [
  {
    id: "advanced-air-mobility-101",
    title: "Advanced Air Mobility 101: Exploring the Software That Enables the Future of Flight",
    description:
      "A session on the software systems powering the next generation of aviation. Mr. Fahad Al Riyami, Founder of AeroVecto, explores advanced air mobility, emerging technologies, and the code shaping the future of flight.",
    speaker: "Mr. Fahad Al Riyami",
    date: "2026-08-22",
    time: "7:30 PM GST",
    category: "Aviation & Software",
    theme: "Advanced Air Mobility",
    status: "upcoming",
    registrationUrl: null,
    format: "Google Meet",
    collaboration: "NSRI & AeroVecto",
  },
];

export const pastEvents: OcsEvent[] = [
  {
    id: "introduction-to-vibe-coding",
    title: "Introduction to Vibe Coding",
    description:
      "An introduction to building software by describing ideas to AI rather than writing every line by hand. Led by Al Munther, the session explored how AI can help turn ideas into working projects — no prior coding experience required.",
    speaker: "Al Munther Al Harrasi",
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
    title: "Introduction to Python — First Python Workshop",
    description:
      "OCS's first-ever Python workshop, organized in collaboration with Uplift Academy, a USA-registered 501(c)(3) non-profit dedicated to accessible STEM education. Led by Al Munther Al Harrasi, the session welcomed complete beginners and those looking to strengthen their Python fundamentals.",
    speaker: "Al Munther Al Harrasi",
    date: "2026-08-04",
    time: "1:30 PM GST",
    category: "Programming",
    theme: "Programming — Python Fundamentals",
    status: "completed",
    registrationUrl: null,
    format: "Google Meet",
    collaboration: "Uplift Academy",
  },
  {
    id: "leadership-character-vision-2040",
    title: "Leadership, Character & Vision 2040",
    description:
      "A session on the character and leadership that national ambition asks of the people who carry it, and on where a technically capable generation fits inside Oman Vision 2040.",
    speaker: "Mr. Clive Curtis",
    date: "2026-07-11",
    category: "Oman Vision 2040",
    status: "completed",
    registrationUrl: null,
    format: "Webinar",
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

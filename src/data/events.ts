export type EventStatus = "upcoming" | "registration-open" | "completed" | "cancelled";

export type OcsEvent = {
  id: string;
  title: string;
  description: string;
  speaker: string;
  /** ISO 8601. Formatted for display at render time. */
  date: string;
  category: string;
  status: EventStatus;
  /** Only surfaced while the status is `registration-open`. */
  registrationUrl: string | null;
  format?: string;
};

/**
 * Replacing this object is the only change required to feature a different
 * event. The section reads every field generically (SRS FR-037).
 */
export const featuredEvent: OcsEvent = {
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
};

export const upcomingEvents: OcsEvent[] = [];

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

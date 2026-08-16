export type Stat = {
  id: string;
  /** Numeric portion, animated on scroll into view. */
  value: number;
  /** Rendered immediately after the value, e.g. "+". */
  suffix?: string;
  label: string;
  /** One-line context so the figure reads as evidence, not decoration. */
  note: string;
  displayOrder: number;
  /** Draws a little more attention — used for the surprising reach figure. */
  featured?: boolean;
};

export const stats: Stat[] = [
  {
    id: "countries",
    value: 13,
    suffix: "+",
    label: "Countries represented",
    note: "Students in Oman, and attendees joining from across 13 countries",
    displayOrder: 1,
    featured: true,
  },
  {
    id: "members",
    value: 50,
    suffix: "+",
    label: "Members",
    note: "Students building together",
    displayOrder: 2,
  },
  {
    id: "students-impacted",
    value: 100,
    suffix: "+",
    label: "Students impacted",
    note: "Reached through our activities",
    displayOrder: 3,
  },
  {
    id: "workshops",
    value: 10,
    suffix: "+",
    label: "Workshops",
    note: "Delivered to date",
    displayOrder: 4,
  },
];

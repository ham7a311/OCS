import { Boxes, BrainCircuit, Terminal, type LucideIcon } from "lucide-react";

/**
 * About content. Kept short on purpose: the Hero already states what OCS is.
 * This section adds depth — who runs it, the mission, and the breadth of work.
 */
export const about = {
  intro:
    "Oman Computing Society is a student-led technology community bringing students together through programming, AI, research, and collaboration.",
  statementLead: "Built and led by students.",
  statementBody:
    "Everything we run gives students the people, space, and momentum to build something real.",
} as const;

export type Commitment = {
  index: string;
  label: string;
  body: string;
  link: { href: string; label: string };
};

/** How We Show Up — the three commitments, read in order inside About. */
export const commitments: Commitment[] = [
  {
    index: "01",
    label: "Connecting students",
    body: "Something happens on your campus every month. OCS runs a chapter inside your own school or university.",
    link: { href: "/model", label: "How a chapter runs" },
  },
  {
    index: "02",
    label: "Creating opportunities",
    body: "Guest speakers, co-hosted sessions, mentorship, and routes into internships — not a logo on a slide.",
    link: { href: "/#partners", label: "Who we work with" },
  },
  {
    index: "03",
    label: "Building the future",
    body: "Four programs, each built so students leave having made something rather than having watched someone else make it.",
    link: { href: "/#programs", label: "What we run" },
  },
];

export type FocusAtmosphere = "violet" | "cyan" | "teal";

export type FocusArea = {
  id: string;
  label: string;
  description: string;
  icon: LucideIcon;
  href: string;
  atmosphere: FocusAtmosphere;
};

export const focusAreas: FocusArea[] = [
  {
    id: "ai-innovation",
    label: "AI & innovation",
    description: "Machine learning and emerging technology, practised rather than only discussed.",
    icon: BrainCircuit,
    href: "/#artificial-intelligence",
    atmosphere: "violet",
  },
  {
    id: "computer-science",
    label: "Computer science",
    description: "The practical engineering foundation that turns ideas into working software.",
    icon: Terminal,
    href: "/#programming-workshops",
    atmosphere: "cyan",
  },
  {
    id: "collaboration",
    label: "Collaboration & projects",
    description: "Shared work — workshops, hackathons, and student-led builds.",
    icon: Boxes,
    href: "/#student-projects",
    atmosphere: "teal",
  },
];

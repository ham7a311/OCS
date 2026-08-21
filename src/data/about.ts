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

export type FocusArea = {
  id: string;
  label: string;
  description: string;
  icon: LucideIcon;
  href: string;
};

export const focusAreas: FocusArea[] = [
  {
    id: "ai-innovation",
    label: "AI & innovation",
    description: "Machine learning and emerging technology, practised rather than only discussed.",
    icon: BrainCircuit,
    href: "/#artificial-intelligence",
  },
  {
    id: "computer-science",
    label: "Computer science",
    description: "The practical engineering foundation that turns ideas into working software.",
    icon: Terminal,
    href: "/#programming-workshops",
  },
  {
    id: "collaboration",
    label: "Collaboration & projects",
    description: "Shared work — workshops, hackathons, and student-led builds.",
    icon: Boxes,
    href: "/#student-projects",
  },
];

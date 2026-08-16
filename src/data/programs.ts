import { Boxes, BrainCircuit, Terminal, Trophy, type LucideIcon } from "lucide-react";

export type Program = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  /** Short technical metadata set in mono beneath the title. */
  tags: string[];
  active: boolean;
  displayOrder: number;
};

export const programs: Program[] = [
  {
    id: "programming-workshops",
    title: "Programming workshops",
    description:
      "Hands-on sessions that introduce students to programming from the ground up, covering Python, C++, and the modern software tooling used in real engineering work.",
    icon: Terminal,
    tags: ["Python", "C++", "Modern tooling"],
    active: true,
    displayOrder: 1,
  },
  {
    id: "artificial-intelligence",
    title: "Artificial intelligence",
    description:
      "Machine learning and emerging technology explored through practical AI projects and open technical discussion, so students work with the field rather than only reading about it.",
    icon: BrainCircuit,
    tags: ["Machine learning", "AI projects", "Discussions"],
    active: true,
    displayOrder: 2,
  },
  {
    id: "hackathons",
    title: "Hackathons",
    description:
      "Intensive collaborative problem solving where teams form quickly, scope a real problem, and ship something working under pressure.",
    icon: Trophy,
    tags: ["Teams", "Problem solving", "Building"],
    active: true,
    displayOrder: 3,
  },
  {
    id: "student-projects",
    title: "Student projects",
    description:
      "Support and space for students to turn their own ideas into practical solutions, from first prototype through to something other people can actually use.",
    icon: Boxes,
    tags: ["Prototyping", "Engineering", "Ownership"],
    active: true,
    displayOrder: 4,
  },
];

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  /** Unique orbit color — distinct from site gold and highlighter yellow. */
  color: string;
  linkedin: string | null;
  /** When set, fills the circular avatar. All null until portraits land. */
  photo?: string | null;
  /** CSS object-position when the crop needs a non-center face. */
  photoPosition?: string;
  /** Extra zoom on a full-body shot so the face fills the disc. */
  photoScale?: number;
  /** Temporary placeholder copy until each member writes their own. */
  about: string;
  education?: string;
  skills: string[];
  /** Extra profile links on /team (LinkedIn still comes from `linkedin`). */
  links?: { label: string; href: string }[];
};

export const team: TeamMember[] = [
  {
    id: "abhiman",
    name: "Abhiman Dewangan",
    role: "CEO & Founder",
    color: "#5C7CFA",
    linkedin: "https://www.linkedin.com/in/abhiman-dewangan",
    photo: "/images/abhiman-pfp.jpeg",
    photoPosition: "50% 18%",
    photoScale: 1.45,
    about:
      "Came to Oman at four, and it became more than home. Founded Oman Computing Society so students would have the room he wished existed. Whether it’s AI or mathematics, the rule is the same: if something is missing, build it.",
    skills: ["Python", "React", "FastAPI", "RAG", "LLMs", "Git"],
  },
  {
    id: "alazher",
    name: "Al Azher Al Rawahi",
    role: "Chief Marketing Officer",
    color: "#E4574A",
    linkedin: "https://www.linkedin.com/in/alazhar96",
    about:
      "Makes sure the room is visible without turning it into a brand deck. Campaigns, partnerships, and the public face of sessions that would otherwise stay inside one campus.",
    education: "Marketing · Sultan Qaboos University",
    skills: ["Content creation", "Social media", "Graphic Design", "Photography", "Figma"],
  },
  {
    id: "noor-al-rahbi",
    name: "Noor Al Rahbi",
    role: "Director of Ops",
    color: "#EF6FA7",
    linkedin: "https://www.linkedin.com/in/noor-al-rahbi-919410370",
    about:
      "Works on speaker outreach, communications, and partnerships — connecting the room to people and organisations through webinars and collaborations that would not happen on their own.",
    education: "AI · GUtech",
    skills: ["Communication", "Partnerships", "Event Coordination", "Teamwork"],
  },
  {
    id: "noor-al-balushi",
    name: "Noor Al Balushi",
    role: "Chief Digital Engagement Officer",
    color: "#9B5DE5",
    linkedin: "https://www.linkedin.com/in/noor-al-balushi247",
    about:
      "Cares about cybersecurity, AI, digital forensics, and fraud detection — work that has to survive a real-world problem. Also the quieter side: innovation, partnerships, and keeping the community together.",
    photo: "/images/noor-b-pfp.jpeg",
    photoPosition: "52% 36%",
    photoScale: 1.55,
    education: "CS (Cybersecurity) · MCBS",
    skills: ["Cybersecurity", "AI", "Digital Forensics", "Fraud Detection", "Community Building"],
    links: [{ label: "Email", href: "mailto:nooralbalushi247@gmail.com" }],
  },
  {
    id: "rabia-khalid",
    name: "Rabia Khalid",
    role: "Chief Tech Officer",
    color: "#2FBF71",
    linkedin: "https://www.linkedin.com/in/eng-rabia-khalid",
    about:
      "Sets the technical bar for what OCS builds and teaches. Reviews the stack, the workshops, and whether a squad is actually shipping software or just talking about it.",
    education: "Software Engineering · UTAS — Muscat",
    skills: ["Python", "Java", "Databases/SQL", "Machine Learning", "Linux", "Git"],
  },
  {
    id: "al-munther-al-harrasi",
    name: "Al Munther Al Harrasi",
    role: "Director of Tech",
    color: "#E07A3D",
    linkedin: "https://www.linkedin.com/in/al-munther-al-harrasi",
    about:
      "Runs the day-to-day of the tech department: session briefs, tooling, and the people who stand at the front of a workshop. Turns a topic into something students can leave having made.",
    education: "Computer Science · UTAS — Muscat",
    skills: ["Python", "JavaScript", "Web Dev", "AI tools", "Vibe coding"],
  },
  {
    id: "hamza",
    name: "Hamza Al Bulushi",
    role: "Member of Tech Dept.",
    color: "#4ECDC4",
    linkedin: "https://www.linkedin.com/in/ham7a311/",
    photo: "/images/hamza-pfp2.jpeg",
    photoPosition: "50% 18%",
    about:
      "Full-stack engineer designing and shipping real web products. Built and maintains the official OCS website.",
    education: "Computer Science · GUtech",
    skills: ["TypeScript", "Next.js", "Node.js", "Python", "C++", "Git"],
    links: [
      { label: "Portfolio", href: "https://ham7a311.dev" },
      { label: "GitHub", href: "https://github.com/ham7a311" },
    ],
  },
  {
    id: "taif",
    name: "Taif Al Badi",
    role: "Member of Tech Dept.",
    color: "#D67EE8",
    linkedin: "https://www.linkedin.com/in/taif-albadi-748a25348",
    photo: "/images/taif-pfp.JPG",
    photoPosition: "50% 12%",
    photoScale: 2.35,
    about:
      "Cares about AI and making something you can actually run. Shows up in the tech room — workshops, student projects, the messy middle — and would rather ship a demo than talk about one.",
    education: "AI · GUtech",
    skills: ["AI", "Python", "C++", "UI/UX Design", "Graphic Design", "Git"],
    links: [
      { label: "GitHub", href: "https://github.com/Taif-Albadi" },
      { label: "Email", href: "mailto:tarmy797@gmail.com" },
    ],
  },
  {
    id: "al-yazen",
    name: "Al Yazen Al Hadhrami",
    role: "Member of Tech Dept.",
    color: "#4A8FB8",
    linkedin: null,
    photo: "/images/alyazen-pfp.JPG",
    photoPosition: "58% 42%",
    photoScale: 2.1,
    about:
      "IT student at UTAS Muscat. Builds software, AI-powered work, and the web — including hackathons and innovation programmes around Oman. At OCS he works frontend: keep it simple, keep it usable.",
    education: "IT · UTAS — Muscat",
    skills: [
      "Frontend",
      "Web Dev",
      "AI tools",
      "UI/UX",
      "Project Management",
      "Public Speaking",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/alyazanpro" },
      { label: "Email", href: "mailto:alyazanpro@gmail.com" },
    ],
  },
  {
    id: "sulaiman",
    name: "Sulaiman Al Darei",
    role: "The Brain of OCS",
    color: "#C9A03A",
    linkedin: "https://www.linkedin.com/in/sulaiman-al-darei",
    about:
      "Holds the threads nobody else wants to hold: structure, questions, and the model when it starts to drift. The title is a joke until you need him in the room.",
    education: "Computer Science · Sultan Qaboos University",
    skills: ["Algorithms/DSA", "Python", "C/C++", "Git", "Linux"],
  },
];

export function teamFirstName(name: string) {
  return name.split(/\s+/).filter(Boolean)[0] ?? name;
}

/** Centre of the desktop chapter seal. “Al …” keeps the next token. */
export function teamSealGivenName(name: string) {
  const parts = name.split(/\s+/).filter(Boolean);
  if (parts[0] === "Al" && parts[1]) return `${parts[0]} ${parts[1]}`;
  return parts[0] ?? name;
}

export function teamPageLinks(member: TeamMember) {
  const extras = member.links ?? [];
  if (!member.linkedin) return extras;
  const hasLinkedIn = extras.some(
    (link) =>
      link.label.toLowerCase() === "linkedin" || link.href === member.linkedin,
  );
  return hasLinkedIn ? extras : [...extras, { label: "LinkedIn", href: member.linkedin }];
}

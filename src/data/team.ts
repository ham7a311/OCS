export type TeamMember = {
  id: string;
  name: string;
  role: string;
  /** Unique orbit color — distinct from site gold and highlighter yellow. */
  color: string;
  linkedin: string | null;
};

export const team: TeamMember[] = [
  {
    id: "abhiman",
    name: "Abhiman Dewangan",
    role: "CEO & Founder",
    color: "#5C7CFA",
    linkedin: "https://www.linkedin.com/in/abhiman-dewangan",
  },
  {
    id: "alazher",
    name: "Al Azher Al Rawahi",
    role: "Chief Marketing Officer",
    color: "#E4574A",
    linkedin: null,
  },
  {
    id: "noor-al-rahbi",
    name: "Noor Al Rahbi",
    role: "Director of Ops",
    color: "#4A9DE0",
    linkedin: null,
  },
  {
    id: "noor-al-balushi",
    name: "Noor Al Balushi",
    role: "Chief Digital Engagement Officer",
    color: "#9B5DE5",
    linkedin: null,
  },
  {
    id: "rabia-khalid",
    name: "Rabia Khalid",
    role: "Chief Tech Officer",
    color: "#2FBF71",
    linkedin: null,
  },
  {
    id: "al-munther-al-harrasi",
    name: "Al Munther Al Harrasi",
    role: "Director of Tech",
    color: "#E07A3D",
    linkedin: null,
  },
  {
    id: "hamza",
    name: "Hamza Al Bulushi",
    role: "Member of Tech Dept.",
    color: "#4ECDC4",
    linkedin: "https://www.linkedin.com/in/ham7a311/",
  },
  {
    id: "giridhar",
    name: "Giridhar",
    role: "Member of Marketing and Communications",
    color: "#C9A03A",
    linkedin: null,
  },
  {
    id: "taif",
    name: "Taif Al Badi",
    role: "Member of Tech Dept.",
    color: "#EF6FA7",
    linkedin: null,
  },
];

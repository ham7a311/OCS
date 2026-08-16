export type TeamMember = {
  id: string;
  name: string;
  role: string;
  /** Unique orbit color — distinct from site gold and highlighter yellow. */
  color: string;
};

export const team: TeamMember[] = [
  { id: "abhiman", name: "Abhiman", role: "CEO & Founder", color: "#5C7CFA" },
  { id: "alazher", name: "Alazher", role: "Chief Marketing Officer", color: "#E4574A" },
  { id: "noor-al-rahbi", name: "Noor Al Rahbi", role: "Director of Ops", color: "#4A9DE0" },
  {
    id: "noor-al-balushi",
    name: "Noor Al Balushi",
    role: "Chief Digital Engagement Officer",
    color: "#9B5DE5",
  },
  { id: "rabia-khalid", name: "Rabia Khalid", role: "Chief Tech Officer", color: "#2FBF71" },
  {
    id: "al-munther-al-harrasi",
    name: "Al Munther Al Harrasi",
    role: "Director of Tech",
    color: "#E07A3D",
  },
  { id: "hamza", name: "Hamza", role: "Member of Tech Dept.", color: "#4ECDC4" },
  {
    id: "giridhar",
    name: "Giridhar",
    role: "Member of Marketing and Communications",
    color: "#C9A03A",
  },
  { id: "taif", name: "Taif", role: "Member of Tech Dept.", color: "#EF6FA7" },
];

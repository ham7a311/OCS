export type Voice = {
  id: string;
  quote: string;
  name: string;
  role: string;
  eventId: string;
  session: string;
};

export const voices: Voice[] = [
  {
    id: "alyazen-al-hadhrami-ai-agents",
    quote:
      "A special thank you to the Oman Computing Society for supporting this learning opportunity.",
    name: "Alyazen Al Hadhrami",
    role: "IT student at UTAS",
    eventId: "ai-agents-under-the-scope",
    session: "AI Agents: Under the Scope",
  },
  {
    id: "nawal-akram-ai-agents",
    quote: "Thankful to OCS and Uplift Academy for making this kind of learning accessible.",
    name: "Nawal Akram",
    role: "Artificial Intelligence student",
    eventId: "ai-agents-under-the-scope",
    session: "AI Agents: Under the Scope",
  },
  {
    id: "anfal-al-mahrouqi-ai-agents",
    quote:
      "Just wrapped up AI Agents: Under the Scope at the Oman Computing Society — a great look at how AI agents actually think and act.",
    name: "Anfal Al Mahrouqi",
    role: "Software Engineering student at UTAS",
    eventId: "ai-agents-under-the-scope",
    session: "AI Agents: Under the Scope",
  },
  {
    id: "fatima-al-barwani-ai-agents",
    quote: "Thank you OCS and Uplift Academy for the opportunity!",
    name: "Fatima Al Barwani",
    role: "Student at MCBS · Oman scholar 2024",
    eventId: "ai-agents-under-the-scope",
    session: "AI Agents: Under the Scope",
  },
  {
    id: "taif-al-badi-vibe-coding",
    quote:
      "Happy to have completed the Introduction to Vibe Coding workshop, organized by the Oman Computing Society and Uplift Academy.",
    name: "Taif Al Badi",
    role: "AI student at GUtech",
    eventId: "introduction-to-vibe-coding",
    session: "Introduction to Vibe Coding",
  },
  {
    id: "anfal-al-mahrouqi-vibe-coding",
    quote:
      "Thank you to Oman Computing Society and Uplift Academy, and to the speaker Abhiman Dewangan, for such a clear, hands-on walkthrough.",
    name: "Anfal Al Mahrouqi",
    role: "Software Engineering student at UTAS",
    eventId: "introduction-to-vibe-coding",
    session: "Introduction to Vibe Coding",
  },
];

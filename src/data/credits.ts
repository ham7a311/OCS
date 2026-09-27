export type CreditLine = {
  role: string;
  names: readonly string[];
};

export type CreditBlock = {
  title: string;
  lines: readonly CreditLine[];
};

export const creditBlocks: readonly CreditBlock[] = [
  {
    title: "Presented by",
    lines: [{ role: "Founder", names: ["Abhiman Dewangan"] }],
  },
  {
    title: "Core team",
    lines: [
      { role: "CEO & Founder", names: ["Abhiman Dewangan"] },
      { role: "Director of Operations", names: ["Noor Al Rahbi"] },
      {
        role: "Chief Digital Engagement Officer",
        names: ["Noor Al Balushi"],
      },
      { role: "Chief Technology Officer", names: ["Rabia Khalid"] },
      { role: "Director of Technology", names: ["Al Munther Al Harrasi"] },
      {
        role: "Technology Department",
        names: ["Hamza Al Bulushi", "Taif Al Badi", "Al Yazen Al Hadhrami"],
      },
      { role: "The Brain of OCS", names: ["Sulaiman Al Darei"] },
    ],
  },
  {
    title: "Website",
    lines: [
      { role: "Application & Section Ideas", names: ["Hamza Al Bulushi"] },
      { role: "Website Revampment", names: ["Sulaiman Al Darei"] },
      { role: "Website Images", names: ["Taif Al Badi", "Hamza Al Bulushi"] },
      { role: "Design Direction", names: ["Claude"] },
      { role: "Image Concepts & Prompts", names: ["Claude"] },
      { role: "Section & Improvement Prompts", names: ["Claude"] },
    ],
  },
  {
    title: "Website technology",
    lines: [
      { role: "Development Tool", names: ["Cursor"] },
      { role: "Primary AI Model", names: ["Cursor Grok 4.6"] },
      {
        role: "Additional AI Models",
        names: [
          "Composer 2.5",
          "Cursor Grok 4.5",
          "GPT-5.6 Sol",
          "Opus 5",
          "Sonnet 5",
        ],
      },
      { role: "Database", names: ["Neon"] },
      { role: "Authentication", names: ["Better Auth"] },
      { role: "Generated Imagery", names: ["Gemini", "ChatGPT"] },
    ],
  },
  {
    title: "Community",
    lines: [
      { role: "Speaker Outreach", names: ["Noor Al Rahbi"] },
      {
        role: "Partnerships & Communications",
        names: ["Noor Al Rahbi", "Noor Al Balushi"],
      },
      { role: "Website Development", names: ["Hamza Al Bulushi"] },
      { role: "Technical Direction", names: ["Rabia Khalid", "Al Munther Al Harrasi"] },
      { role: "Public Presence", names: ["Al Azher Al Rawahi"] },
    ],
  },
  {
    title: "Special thanks",
    lines: [
      { role: "To", names: ["Every student who entered the room"] },
      { role: "And to", names: ["The Sultanate of Oman"] },
    ],
  },
];

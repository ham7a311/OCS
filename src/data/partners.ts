export type Partner = {
  id: string;
  name: string;
  /** One line that explains the relationship, not just the name. */
  descriptor: string;
  /** Monogram used when no logo asset exists. */
  monogram: string;
  logo: string | null;
  /** Artwork painted on a light field vs a dark field. */
  logoTone: "light" | "dark";
  logoWidth: number;
  logoHeight: number;
  website: string | null;
  active: boolean;
};

export const partners: Partner[] = [
  {
    id: "uplift-academy",
    name: "Uplift Academy",
    descriptor: "Mentorship and academic tutoring",
    monogram: "UA",
    logo: "/partners/UpliftAcademyLogo.png",
    logoTone: "light",
    logoWidth: 1280,
    logoHeight: 720,
    website: "https://upliftacademy.in/",
    active: true,
  },
  {
    id: "nsri",
    name: "NSRI",
    descriptor: "Student research and publication pathways",
    monogram: "NS",
    logo: "/partners/nsri.png",
    logoTone: "dark",
    logoWidth: 128,
    logoHeight: 128,
    website: "https://nsri.world/",
    active: true,
  },
  {
    id: "georgia-association-of-builders",
    name: "Georgia Association of Builders",
    descriptor: "Industry collaboration and outreach",
    monogram: "GAB",
    logo: "/partners/GAB.png",
    logoTone: "dark",
    logoWidth: 592,
    logoHeight: 592,
    website: null,
    active: true,
  },
];

export const partnershipModel = [
  "Guest speakers",
  "Event co-hosting",
  "Mentorship",
  "Internship pipelines",
] as const;

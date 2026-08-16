/**
 * Central site configuration.
 *
 * Every URL and organisational string used anywhere in the UI resolves from
 * here, so nothing is duplicated across components (SRS NFR-035, FR-048).
 *
 * Channels whose URL is not configured resolve to `undefined` and are omitted
 * from the UI entirely rather than rendered as dead links (SRS FR-052).
 * `process.env` members are read statically so Next can inline them.
 */

function optional(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

const WHATSAPP_COMMUNITY_URL =
  optional(process.env.NEXT_PUBLIC_WHATSAPP_URL) ??
  "https://chat.whatsapp.com/KfIbhy1foiZ25RPhyGZM6o";

const LINKEDIN_URL =
  optional(process.env.NEXT_PUBLIC_LINKEDIN_URL) ??
  "https://www.linkedin.com/company/oman-computing-society";
const INSTAGRAM_URL = optional(process.env.NEXT_PUBLIC_INSTAGRAM_URL);
const CONTACT_EMAIL = optional(process.env.NEXT_PUBLIC_CONTACT_EMAIL);

export const site = {
  organizationName: "Oman Computing Society",
  abbreviation: "OCS",
  tagline: "A student-led computing community in Oman",

  description:
    "Empowering the next generation of innovators through technology, collaboration, and learning.",

  mission:
    "To connect students across Oman and beyond, providing opportunities to learn, innovate, and collaborate in the rapidly evolving world of technology.",

  url: optional(process.env.NEXT_PUBLIC_SITE_URL) ?? "https://omancomputingsociety.org",

  whatsappUrl: WHATSAPP_COMMUNITY_URL,
  linkedinUrl: LINKEDIN_URL,
  instagramUrl: INSTAGRAM_URL,
  contactEmail: CONTACT_EMAIL,
} as const;

export type SocialChannel = {
  id: "whatsapp" | "linkedin" | "instagram" | "email";
  label: string;
  href: string;
  external: boolean;
};

/** Only channels with a real destination. Never a placeholder `#`. */
export const socialChannels: SocialChannel[] = [
  {
    id: "whatsapp",
    label: "WhatsApp community",
    href: site.whatsappUrl,
    external: true,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: LINKEDIN_URL,
    external: true,
  },
  INSTAGRAM_URL && {
    id: "instagram" as const,
    label: "Instagram",
    href: INSTAGRAM_URL,
    external: true,
  },
  CONTACT_EMAIL && {
    id: "email" as const,
    label: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
    external: false,
  },
].filter(Boolean) as SocialChannel[];

/**
 * Where prospective partners should write. Falls back to the community chat
 * when no official inbox is configured, so the invitation is always
 * actionable (SRS FR-044).
 */
export const partnershipContact = CONTACT_EMAIL
  ? {
      href: `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
        "Partnership enquiry — Oman Computing Society",
      )}`,
      label: "Email the OCS team",
      external: false,
    }
  : {
      href: site.whatsappUrl,
      label: "Reach us on WhatsApp",
      external: true,
    };

export const navigation = [
  { id: "about", label: "About", href: "#about" },
  { id: "programs", label: "Programs", href: "#programs" },
  { id: "events", label: "Events", href: "#events" },
  { id: "partners", label: "Partners", href: "#partners" },
] as const;

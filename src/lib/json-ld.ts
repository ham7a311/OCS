import { site } from "@/config/site";

const organizationId = `${site.url}/#organization`;
const websiteId = `${site.url}/#website`;

export const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": organizationId,
      name: site.organizationName,
      alternateName: site.abbreviation,
      url: site.url,
      description:
        "OCS is a student-led computing/technology community in Oman bringing students together through programming, artificial intelligence, research, hackathons, student projects, collaboration, and learning.",
      logo: `${site.url}/ocs-logo.png`,
      sameAs: [site.linkedinUrl, site.instagramUrl],
      knowsAbout: [
        "Computer Science",
        "Programming",
        "Artificial Intelligence",
        "Machine Learning",
        "Research",
        "Hackathons",
        "Student Projects",
        "Technology Education",
        "Technology Collaboration",
      ],
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      name: site.organizationName,
      alternateName: site.abbreviation,
      url: site.url,
      publisher: { "@id": organizationId },
      about: { "@id": organizationId },
      mainEntity: { "@id": organizationId },
    },
  ],
} as const;

export function siteJsonLdScript() {
  return JSON.stringify(siteJsonLd).replace(/</g, "\\u003c");
}

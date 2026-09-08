export type EventArtworkKind = "orbit" | "halo" | "construction";

const KIND_TO_CATEGORY = {
  orbit: "hackathon",
  halo: "webinar",
  construction: "workshop",
} as const;

/**
 * Maps an event category onto the shared upcoming-card artwork language.
 * Unknown categories render without a field so Orbit is never applied by default.
 */
export function eventArtworkKind(category: string): EventArtworkKind | null {
  const key = category.trim().toLowerCase();
  if (key.includes("hackathon")) return "orbit";
  if (key.includes("webinar")) return "halo";
  if (key.includes("workshop")) return "construction";
  return null;
}

export function eventArtworkCategory(kind: EventArtworkKind | null) {
  return kind ? KIND_TO_CATEGORY[kind] : undefined;
}

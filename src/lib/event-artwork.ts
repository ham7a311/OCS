export type EventArtworkKind = "orbit" | "halo" | "construction";

export type EventKind = "hackathon" | "webinar" | "workshop";

const KIND_TO_ARTWORK: Record<EventKind, EventArtworkKind> = {
  hackathon: "orbit",
  webinar: "halo",
  workshop: "construction",
};

const KIND_TO_CATEGORY: Record<EventArtworkKind, EventKind> = {
  orbit: "hackathon",
  halo: "webinar",
  construction: "workshop",
};

/**
 * Maps an event onto the shared card artwork language.
 * Explicit `kind` wins. Unknown category strings render without a field so Orbit
 * is never applied by default.
 */
export function eventArtworkKind(event: {
  kind?: EventKind;
  category: string;
}): EventArtworkKind | null {
  if (event.kind) return KIND_TO_ARTWORK[event.kind];

  const key = event.category.trim().toLowerCase();
  if (key.includes("hackathon")) return "orbit";
  if (key.includes("webinar")) return "halo";
  if (key.includes("workshop")) return "construction";
  return null;
}

export function eventArtworkCategory(kind: EventArtworkKind | null) {
  return kind ? KIND_TO_CATEGORY[kind] : undefined;
}

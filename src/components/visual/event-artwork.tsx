"use client";

import { EventHaloSignal } from "@/components/visual/event-halo-signal";
import { EventLayeredConstruction } from "@/components/visual/event-layered-construction";
import { EventOrbitalEclipse } from "@/components/visual/event-orbital-eclipse";
import type { EventArtworkKind } from "@/lib/event-artwork";

export function EventArtwork({ kind }: { kind: EventArtworkKind | null }) {
  if (kind === "orbit") return <EventOrbitalEclipse />;
  if (kind === "halo") return <EventHaloSignal />;
  if (kind === "construction") return <EventLayeredConstruction />;
  return null;
}

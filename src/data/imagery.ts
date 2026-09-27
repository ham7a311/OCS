import type { StaticImageData } from "next/image";
import heroPromenade from "../../public/images/cinematic/hero-muscat-promenade.jpg";
import joinRidges from "../../public/images/cinematic/join-dot-ridges.png";
import joinRidgesLight from "../../public/images/cinematic/join-dot-ridges-light.png";
import programsTerrain from "../../public/images/cinematic/programs-terrain.jpg";
import voicesHands from "../../public/images/cinematic/voices-hands.png";
import voicesHandsLight from "../../public/images/cinematic/voices-hands-light.png";

export type CinematicImage = {
  src: StaticImageData;
  /** Empty when the image is atmosphere only and carries no information. */
  alt: string;
};

/**
 * Art-directed stills. Sources are 2K masters; next/image serves AVIF/WebP at
 * the size each breakpoint actually needs.
 */
export const imagery = {
  hero: {
    src: heroPromenade,
    alt: "",
  },
  programs: {
    src: programsTerrain,
    alt: "",
  },
  join: {
    src: joinRidges,
    alt: "",
  },
  joinLight: {
    src: joinRidgesLight,
    alt: "",
  },
  voices: {
    src: voicesHands,
    alt: "",
  },
  voicesLight: {
    src: voicesHandsLight,
    alt: "",
  },
} satisfies Record<string, CinematicImage>;

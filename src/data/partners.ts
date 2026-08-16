export type Partner = {
  id: string;
  name: string;
  /** Monogram used for the wordmark lockup while no logo asset exists. */
  monogram: string;
  logo: string | null;
  website: string | null;
  active: boolean;
};

export const partners: Partner[] = [
  {
    id: "uplift-academy",
    name: "Uplift Academy",
    monogram: "UA",
    logo: null,
    website: null,
    active: true,
  },
  {
    id: "nsri",
    name: "NSRI",
    monogram: "NS",
    logo: null,
    website: null,
    active: true,
  },
  {
    id: "georgia-association-of-builders",
    name: "Georgia Association of Builders",
    monogram: "GAB",
    logo: null,
    website: null,
    active: true,
  },
];

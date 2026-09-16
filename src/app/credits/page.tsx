import type { Metadata } from "next";
import { CreditsPage } from "@/components/sections/credits-page";

export const metadata: Metadata = {
  title: "Credits",
  description: "The people behind Oman Computing Society.",
  alternates: { canonical: "/credits" },
  robots: { index: false, follow: false },
};

export default function CreditsRoute() {
  return (
    <main id="main">
      <CreditsPage />
    </main>
  );
}

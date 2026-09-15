import type { Metadata } from "next";
import { Footer } from "@/components/sections/footer";
import { Navbar } from "@/components/sections/navbar";
import { TeamPage } from "@/components/sections/team-page";

export const metadata: Metadata = {
  title: "Core team",
  description:
    "The students who run Oman Computing Society — operations, tech, and the public face of the sessions.",
  alternates: { canonical: "/team" },
};

export default function TeamRoute() {
  return (
    <>
      <Navbar />
      <main id="main">
        <TeamPage />
      </main>
      <Footer />
    </>
  );
}

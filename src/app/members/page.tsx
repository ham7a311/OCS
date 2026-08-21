import type { Metadata } from "next";
import { MembersPage } from "@/components/sections/members-page";
import { Navbar } from "@/components/sections/navbar";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Your profile",
  description: "Tell Oman Computing Society who you are so we can staff chapters and build squads.",
  alternates: { canonical: "/members" },
  robots: { index: false, follow: false },
};

export default function MembersRoute() {
  return (
    <>
      <Navbar />
      <main id="main">
        <MembersPage />
      </main>
    </>
  );
}

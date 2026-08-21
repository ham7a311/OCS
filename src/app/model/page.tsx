import type { Metadata } from "next";
import { Footer } from "@/components/sections/footer";
import { ModelPage } from "@/components/sections/model-page";
import { Navbar } from "@/components/sections/navbar";

export const metadata: Metadata = {
  title: "The Model",
  description:
    "How Oman Computing Society actually runs: chapters, build squads, a monthly rhythm, and published evidence.",
  alternates: { canonical: "/model" },
};

export default function ModelRoute() {
  return (
    <>
      <Navbar />
      <main id="main">
        <ModelPage />
      </main>
      <Footer />
    </>
  );
}

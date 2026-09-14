import type { Metadata } from "next";
import { Footer } from "@/components/sections/footer";
import { Navbar } from "@/components/sections/navbar";
import { VoicesViewer } from "@/components/sections/voices-viewer";

export const metadata: Metadata = {
  title: "Voices",
  description: "What students said after Oman Computing Society sessions.",
  alternates: { canonical: "/voices" },
};

export default function VoicesPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <VoicesViewer />
      </main>
      <Footer />
    </>
  );
}

import { About } from "@/components/sections/about";
import { FeaturedEvent } from "@/components/sections/featured-event";
import { Footer } from "@/components/sections/footer";
import { Hero } from "@/components/sections/hero";
import { Join } from "@/components/sections/join";
import { Navbar } from "@/components/sections/navbar";
import { Partners } from "@/components/sections/partners";
import { Programs } from "@/components/sections/programs";
import { SignedInHomeGate } from "@/components/sections/signed-in-home-gate";
import { Stats } from "@/components/sections/stats";
import { ImpactArrow } from "@/components/visual/impact-arrow";

export default function HomePage() {
  return (
    <>
      <SignedInHomeGate />
      <Navbar />
      <main id="main">
        <ImpactArrow>
          <Hero />
          <Stats />
        </ImpactArrow>
        <About />
        <Programs />
        <FeaturedEvent />
        <Partners />
        <Join />
      </main>
      <Footer />
    </>
  );
}

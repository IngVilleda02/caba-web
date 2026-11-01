import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { Facts } from "@/components/sections/Facts";
import { Services } from "@/components/sections/Services";
import { Projects } from "@/components/sections/Projects";
import { PlantScene, Why, Process } from "@/components/sections/Story";
import { Contact } from "@/components/sections/Contact";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { localBusinessJsonLd } from "@/lib/seo";

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="contenido">
        <Hero />
        <Facts />
        <Services />
        <Projects />
        <PlantScene />
        <Why />
        <Process />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd()) }} />
    </>
  );
}

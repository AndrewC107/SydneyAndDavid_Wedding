import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Intro } from "@/components/Intro";
import { RSVPForm } from "@/components/RSVPForm";
import { VisualBreak } from "@/components/VisualBreak";
import { WeddingDetails } from "@/components/WeddingDetails";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Intro />
      <WeddingDetails />
      <VisualBreak />
      <RSVPForm />
      <Footer />
    </main>
  );
}

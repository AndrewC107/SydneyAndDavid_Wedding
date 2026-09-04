import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Intro } from "@/components/Intro";
import { RSVPForm } from "@/components/RSVPForm";
import { VisualBreak } from "@/components/VisualBreak";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Intro />
      <RSVPForm />
      <VisualBreak />
      <Footer />
    </main>
  );
}

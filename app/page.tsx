import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Intro } from "@/components/Intro";
import { RSVPForm } from "@/components/RSVPForm";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Intro />
      <RSVPForm />
      <Footer />
    </main>
  );
}

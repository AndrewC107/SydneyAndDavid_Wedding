import { Divider } from "@/components/Divider";
import { wedding } from "@/config/wedding";

export function Intro() {
  return (
    <section className="bg-cream px-6 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-xl text-center">
        <h2 className="font-display text-[1.7rem] leading-snug font-normal text-espresso italic sm:text-[2.05rem] sm:leading-snug">
          {wedding.message.heading}
        </h2>

        <div className="mt-8">
          <Divider />
        </div>

        <p className="mt-8 font-sans text-[1.05rem] leading-relaxed font-light text-charcoal/90">
          {wedding.message.body}
        </p>
      </div>
    </section>
  );
}

import { Divider } from "@/components/Divider";
import { coupleNames, wedding } from "@/config/wedding";

export function Footer() {
  return (
    <footer className="bg-ivory px-6 py-14 text-center sm:py-16">
      <Divider />
      <p className="mt-8 font-display text-3xl text-espresso italic">
        {coupleNames}
      </p>
      <p className="mt-2 font-sans text-[0.7rem] tracking-[0.22em] text-charcoal/70 uppercase">
        {wedding.date.display}
      </p>
    </footer>
  );
}

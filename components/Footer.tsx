import Image from "next/image";
import { Divider } from "@/components/Divider";
import { coupleNames, venueLocation, wedding } from "@/config/wedding";

export function Footer() {
  return (
    <footer className="bg-ivory px-6 py-10 sm:px-8 sm:py-14">
      <div className="mx-auto grid max-w-4xl items-center gap-8 md:grid-cols-2 md:gap-12">
        <Image
          src="/images/visual-estate.jpg"
          alt="White estate house at Martin Estates, framed by trees and a gravel drive"
          width={903}
          height={1024}
          sizes="(max-width: 768px) 92vw, 28rem"
          className="mx-auto h-auto w-full max-w-md"
        />

        <div className="text-center">
          <p className="font-sans text-[0.68rem] font-medium tracking-[0.32em] text-olive uppercase">
            Save the Date
          </p>
          <p className="mt-5 font-display text-3xl text-espresso italic sm:text-4xl">
            {coupleNames}
          </p>
          <div className="mt-6 flex justify-center">
            <Divider />
          </div>
          <p className="mt-6 font-sans text-[0.72rem] tracking-[0.22em] text-charcoal/70 uppercase">
            {wedding.date.display}
          </p>
          <p className="mt-4 font-display text-xl text-espresso italic">
            {wedding.venue.name}
          </p>
          <p className="mt-1 font-sans text-sm tracking-[0.08em] text-charcoal/75">
            {venueLocation}
          </p>
        </div>
      </div>
    </footer>
  );
}

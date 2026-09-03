import { Divider } from "@/components/Divider";
import { venueLocation, wedding } from "@/config/wedding";

export function WeddingDetails() {
  return (
    <section
      id="details"
      className="bg-ivory px-6 py-20 sm:px-8 sm:py-24"
    >
      <div className="mx-auto max-w-md text-center">
        <p className="font-sans text-[0.68rem] font-medium tracking-[0.38em] text-olive uppercase">
          The Details
        </p>

        <div className="mt-10">
          <p className="font-sans text-[0.72rem] font-medium tracking-[0.28em] text-peach uppercase">
            {wedding.date.weekday}
          </p>
          <h2 className="mt-3 font-display text-[2.15rem] leading-none text-espresso italic sm:text-[2.6rem]">
            {wedding.date.display}
          </h2>
        </div>

        <div className="mt-10">
          <Divider />
        </div>

        <div className="mt-10">
          <p className="font-display text-[1.85rem] leading-tight text-espresso italic sm:text-[2.1rem]">
            {wedding.venue.name}
          </p>
          <p className="mt-2 font-sans text-sm tracking-[0.16em] text-charcoal/80 uppercase">
            {venueLocation}
          </p>
        </div>

        <div className="mt-12">
          <p className="font-sans text-[0.68rem] font-medium tracking-[0.24em] text-sage uppercase">
            {wedding.ceremony.timeLabel}
          </p>
          <p className="mt-2 font-display text-xl text-espresso italic">
            {wedding.ceremony.time}
          </p>
        </div>
      </div>
    </section>
  );
}

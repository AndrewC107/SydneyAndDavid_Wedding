import Image from "next/image";
import { coupleNames, venueLocation, wedding } from "@/config/wedding";

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden px-4 py-16 sm:px-8">
      <Image
        src="/images/hero-orchard.jpg"
        alt="Sunlit peach orchard with ripe fruit and green leaves"
        fill
        priority
        sizes="100vw"
        className="animate-fade-in object-cover object-[center_30%]"
      />

      <div
        className="absolute inset-0 bg-gradient-to-b from-espresso/15 via-espresso/10 to-espresso/30"
        aria-hidden="true"
      />

      <div className="animate-fade-up relative z-10 w-full max-w-[20.5rem] sm:max-w-md md:max-w-lg">
        <div className="relative">
          <div className="relative overflow-hidden bg-linen px-7 py-12 shadow-[0_18px_50px_rgba(42,34,28,0.16)] sm:px-11 sm:py-16">
            <Image
              src="/images/linen-texture.jpg"
              alt=""
              fill
              sizes="(max-width: 480px) 90vw, 512px"
              className="object-cover object-center"
              aria-hidden="true"
            />
            <div
              className="absolute inset-0 bg-linen/45"
              aria-hidden="true"
            />

            <div className="relative z-10 text-center text-espresso">
              <p className="font-sans text-[0.68rem] font-medium tracking-[0.38em] text-olive uppercase">
                Save the Date
              </p>

              <h1 className="mt-6 font-display text-[3.85rem] leading-[0.88] font-normal italic sm:text-[5.25rem] md:text-[6rem]">
                <span className="block">{wedding.couple.personOne}</span>
                <span
                  className="mt-1 block font-display text-[2rem] font-normal not-italic text-peach sm:text-[2.5rem]"
                  aria-hidden="true"
                >
                  &
                </span>
                <span className="sr-only"> and </span>
                <span className="mt-1 block">{wedding.couple.personTwo}</span>
              </h1>

              <div
                className="mx-auto mt-8 h-px w-16 bg-peach/50"
                aria-hidden="true"
              />

              <p className="mt-7 font-sans text-[0.78rem] font-medium tracking-[0.22em] text-charcoal uppercase">
                {wedding.date.display}
              </p>

              <p className="mt-4 font-display text-[1.35rem] leading-snug italic sm:text-[1.5rem]">
                {wedding.venue.name}
              </p>
              <p className="mt-1 font-sans text-sm tracking-[0.08em] text-charcoal/80">
                {venueLocation}
              </p>
            </div>
          </div>

          <div
            className="pointer-events-none absolute -inset-3 z-20 sm:-inset-5"
            aria-hidden="true"
          >
            <Image
              src="/images/lace-border.webp"
              alt=""
              fill
              sizes="(max-width: 480px) 95vw, 560px"
              className="object-fill"
            />
          </div>

          <Image
            src="/images/calla-lilies.webp"
            alt=""
            width={220}
            height={330}
            className="pointer-events-none absolute -right-4 top-8 z-30 w-[46%] max-w-[8.75rem] drop-shadow-[0_8px_16px_rgba(42,34,28,0.18)] sm:-right-7 sm:top-10 sm:max-w-[11rem]"
            aria-hidden="true"
          />
        </div>
      </div>

      <p className="sr-only">
        {coupleNames} — {wedding.date.display} at {wedding.venue.name},{" "}
        {venueLocation}
      </p>
    </section>
  );
}

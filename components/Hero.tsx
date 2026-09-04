import Image from "next/image";
import { coupleNames, venueLocation, wedding } from "@/config/wedding";

/**
 * Inner opening of the lace frame, measured from lace-border.webp (900×1350).
 * Sized to the outer lip of that opening so the cloth tucks under the lace
 * and the visible inner border stays aligned.
 */
const LACE_WINDOW = {
  top: "10.44%",
  right: "15.56%",
  bottom: "10.37%",
  left: "15.67%",
} as const;

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

      <div className="animate-hero-in relative z-10 w-full max-w-[21.5rem] sm:max-w-md md:max-w-lg">
        <div className="relative aspect-[2/3] w-full">
          <div
            className="pointer-events-none absolute inset-0 z-20"
            aria-hidden="true"
          >
            <Image
              src="/images/lace-border.webp"
              alt=""
              fill
              sizes="(max-width: 480px) 95vw, 560px"
              className="object-contain"
            />
          </div>

          <div
            className="absolute z-10 overflow-hidden bg-linen"
            style={LACE_WINDOW}
          >
            <Image
              src="/images/linen-texture.jpg"
              alt=""
              fill
              sizes="(max-width: 480px) 70vw, 420px"
              className="object-cover object-center"
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-linen/45" aria-hidden="true" />

            <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 py-6 text-center text-espresso sm:px-6 sm:py-8">
              <p className="font-sans text-[0.68rem] font-medium tracking-[0.38em] text-olive uppercase">
                Save the Date
              </p>

              <h1 className="mt-5 font-script text-[3.35rem] leading-[1.12] font-normal sm:text-[4.15rem] md:text-[4.75rem]">
                <span className="block">{wedding.couple.personOne}</span>
                <span
                  className="mt-0 block font-script text-[2rem] sm:text-[2.35rem]"
                  aria-hidden="true"
                >
                  &
                </span>
                <span className="sr-only"> and </span>
                <span className="block">{wedding.couple.personTwo}</span>
              </h1>

              <div
                className="mx-auto mt-5 h-px w-14 bg-peach/50"
                aria-hidden="true"
              />

              <p className="mt-5 font-sans text-[0.72rem] font-medium tracking-[0.22em] text-charcoal uppercase sm:text-[0.78rem]">
                {wedding.date.display}
              </p>

              <p className="mt-3 font-display text-[1.25rem] leading-snug italic sm:text-[1.45rem]">
                {wedding.venue.name}
              </p>
              <p className="mt-1 font-sans text-[0.8rem] tracking-[0.08em] text-charcoal/80 sm:text-sm">
                {venueLocation}
              </p>
            </div>
          </div>

          <Image
            src="/images/calla-lilies.webp"
            alt=""
            width={220}
            height={330}
            className="pointer-events-none absolute -right-3 top-[16%] z-30 w-[40%] max-w-[8.5rem] drop-shadow-[0_8px_16px_rgba(42,34,28,0.18)] sm:-right-5 sm:max-w-[10.5rem]"
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

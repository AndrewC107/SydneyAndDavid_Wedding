"use client";

import { FormEvent, useEffect, useState } from "react";
import { wedding } from "@/config/wedding";
import { handleRSVPSubmit } from "@/lib/rsvp";
import { requiresMailingAddress, type Attendance } from "@/lib/rsvp-types";

const attendanceOptions: { value: Attendance; label: string }[] = [
  { value: "yes", label: "I'll be there" },
  { value: "no", label: "I unfortunately already know I can't make it" },
  { value: "not_sure", label: "I'm not sure" },
];

export function RSVPForm() {
  const [fullName, setFullName] = useState("");
  const [attending, setAttending] = useState<Attendance | "">("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (status === "success") {
      document.getElementById("rsvp")?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [status]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!fullName.trim() || !attending) {
      setStatus("error");
      setErrorMessage("Please share your name and whether you can join us.");
      return;
    }

    if (
      requiresMailingAddress(attending) &&
      (!street.trim() || !city.trim() || !province.trim() || !postalCode.trim())
    ) {
      setStatus("error");
      setErrorMessage("Please share your mailing address so we can send your formal invite.");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const trimmedNotes = notes.trim();

      await handleRSVPSubmit({
        fullName: fullName.trim(),
        attending,
        mailingAddress: requiresMailingAddress(attending)
          ? {
              street: street.trim(),
              city: city.trim(),
              province: province.trim(),
              postalCode: postalCode.trim(),
            }
          : undefined,
        notes: trimmedNotes || undefined,
      });
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again in a moment.",
      );
    }
  }

  return (
    <section id="rsvp" className="bg-ivory px-6 py-20 sm:px-8 sm:py-24">
      {status === "success" ? (
        <div className="mx-auto w-full max-w-md text-center">
          <p
            className="border border-beige bg-linen px-6 py-10 font-display text-2xl leading-snug text-espresso italic sm:text-[1.65rem]"
            role="status"
          >
            {attending && wedding.rsvp.confirmation[attending]}
          </p>
        </div>
      ) : (
        <div className="mx-auto max-w-md text-center">
          <p className="font-sans text-[0.68rem] font-medium tracking-[0.32em] text-olive uppercase">
            {wedding.rsvp.heading}
          </p>
          <p className="mt-4 font-display text-[1.45rem] leading-snug text-espresso italic sm:text-[1.65rem]">
            {wedding.rsvp.supporting}
          </p>

          <form className="mt-10 text-left" onSubmit={onSubmit} noValidate>
            <label className="block">
              <span className="font-sans text-[0.7rem] font-medium tracking-[0.18em] text-charcoal uppercase">
                Name
              </span>
              <input
                type="text"
                name="fullName"
                autoComplete="name"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                className="mt-2 h-12 w-full border border-beige bg-linen px-4 font-sans text-base text-espresso placeholder:text-charcoal/40"
                placeholder="Your name"
              />
            </label>

            <fieldset className="mt-7">
              <legend className="font-sans text-[0.7rem] font-medium tracking-[0.18em] text-charcoal uppercase">
                Will you be able to join us?
              </legend>
              <div className="mt-3 grid grid-cols-1 gap-2">
                {attendanceOptions.map((option) => {
                  const selected = attending === option.value;
                  return (
                    <label
                      key={option.value}
                      className={`flex min-h-12 cursor-pointer items-center justify-center border px-4 py-3 text-center font-sans text-[0.85rem] leading-snug tracking-wide transition-colors ${
                        selected
                          ? "border-peach bg-apricot/25 text-espresso"
                          : "border-beige bg-linen text-charcoal hover:border-peach/50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="attending"
                        value={option.value}
                        checked={selected}
                        onChange={() => setAttending(option.value)}
                        className="sr-only"
                      />
                      {option.label}
                    </label>
                  );
                })}
              </div>
            </fieldset>

            {requiresMailingAddress(attending) && (
              <div className="mt-7 space-y-4">
                <label className="block">
                  <span className="font-sans text-[0.7rem] font-medium tracking-[0.18em] text-charcoal uppercase">
                    Mailing Address
                  </span>
                  <input
                    type="text"
                    name="street"
                    autoComplete="street-address"
                    value={street}
                    onChange={(event) => setStreet(event.target.value)}
                    className="mt-2 h-12 w-full border border-beige bg-linen px-4 font-sans text-base text-espresso placeholder:text-charcoal/40"
                    placeholder="Street address"
                  />
                </label>

                <div className="grid grid-cols-2 gap-3">
                  <label className="block">
                    <span className="font-sans text-[0.7rem] font-medium tracking-[0.18em] text-charcoal uppercase">
                      City
                    </span>
                    <input
                      type="text"
                      name="city"
                      autoComplete="address-level2"
                      value={city}
                      onChange={(event) => setCity(event.target.value)}
                      className="mt-2 h-12 w-full border border-beige bg-linen px-4 font-sans text-base text-espresso placeholder:text-charcoal/40"
                      placeholder="City"
                    />
                  </label>

                  <label className="block">
                    <span className="font-sans text-[0.7rem] font-medium tracking-[0.18em] text-charcoal uppercase">
                      Province
                    </span>
                    <input
                      type="text"
                      name="province"
                      autoComplete="address-level1"
                      value={province}
                      onChange={(event) => setProvince(event.target.value)}
                      className="mt-2 h-12 w-full border border-beige bg-linen px-4 font-sans text-base text-espresso placeholder:text-charcoal/40"
                      placeholder="Province"
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="font-sans text-[0.7rem] font-medium tracking-[0.18em] text-charcoal uppercase">
                    Postal Code
                  </span>
                  <input
                    type="text"
                    name="postalCode"
                    autoComplete="postal-code"
                    value={postalCode}
                    onChange={(event) => setPostalCode(event.target.value)}
                    className="mt-2 h-12 w-full border border-beige bg-linen px-4 font-sans text-base text-espresso placeholder:text-charcoal/40"
                    placeholder="Postal code"
                  />
                </label>

                <p className="font-display text-base text-espresso italic">
                  Formal invite to follow
                </p>
              </div>
            )}

            <label className="mt-7 block">
              <span className="font-sans text-[0.7rem] font-medium tracking-[0.18em] text-charcoal uppercase">
                Notes <span className="tracking-normal normal-case">(optional)</span>
              </span>
              <textarea
                name="notes"
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                rows={3}
                maxLength={1000}
                className="mt-2 w-full resize-y border border-beige bg-linen px-4 py-3 font-sans text-base text-espresso placeholder:text-charcoal/40"
                placeholder="Anything else you'd like us to know"
              />
            </label>

            {status === "error" && (
              <p className="mt-5 font-sans text-sm text-peach" role="alert">
                {errorMessage}
              </p>
            )}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="mt-8 flex h-12 w-full items-center justify-center bg-espresso font-sans text-[0.72rem] font-medium tracking-[0.22em] text-linen uppercase transition-colors hover:bg-charcoal disabled:opacity-60"
            >
              {status === "submitting" ? "Sending…" : "Submit"}
            </button>
          </form>
        </div>
      )}
    </section>
  );
}

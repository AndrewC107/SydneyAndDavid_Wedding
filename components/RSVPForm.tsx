"use client";

import { FormEvent, useState } from "react";
import { wedding } from "@/config/wedding";
import { handleRSVPSubmit, type Attendance } from "@/lib/rsvp";

const attendanceOptions: { value: Attendance; label: string }[] = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
  { value: "not_sure", label: "Not sure yet" },
];

export function RSVPForm() {
  const [fullName, setFullName] = useState("");
  const [attending, setAttending] = useState<Attendance | "">("");
  const [guestCount, setGuestCount] = useState("1");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!fullName.trim() || !attending) {
      setStatus("error");
      setErrorMessage("Please share your name and whether you can join us.");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      await handleRSVPSubmit({
        fullName: fullName.trim(),
        attending,
        guestCount:
          attending === "no" ? undefined : Number.parseInt(guestCount, 10) || 1,
      });
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again in a moment.");
    }
  }

  return (
    <section id="rsvp" className="bg-cream px-6 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-md text-center">
        <p className="font-sans text-[0.68rem] font-medium tracking-[0.32em] text-olive uppercase">
          {wedding.rsvp.heading}
        </p>
        <p className="mt-4 font-display text-[1.45rem] leading-snug text-espresso italic sm:text-[1.65rem]">
          {wedding.rsvp.supporting}
        </p>

        {status === "success" ? (
          <p
            className="mt-12 border border-beige bg-linen px-6 py-10 font-display text-2xl text-espresso italic"
            role="status"
          >
            {wedding.rsvp.confirmation}
          </p>
        ) : (
          <form className="mt-10 text-left" onSubmit={onSubmit} noValidate>
            <label className="block">
              <span className="font-sans text-[0.7rem] font-medium tracking-[0.18em] text-charcoal uppercase">
                Full Name
              </span>
              <input
                type="text"
                name="fullName"
                autoComplete="name"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                className="mt-2 h-12 w-full border border-beige bg-linen px-4 font-sans text-base text-espresso placeholder:text-charcoal/40"
                placeholder="Your name"
                required
              />
            </label>

            <fieldset className="mt-7">
              <legend className="font-sans text-[0.7rem] font-medium tracking-[0.18em] text-charcoal uppercase">
                Will you be able to join us?
              </legend>
              <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
                {attendanceOptions.map((option) => {
                  const selected = attending === option.value;
                  return (
                    <label
                      key={option.value}
                      className={`flex min-h-12 cursor-pointer items-center justify-center border px-3 text-center font-sans text-[0.85rem] tracking-wide transition-colors ${
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

            {attending !== "no" && (
              <label className="mt-7 block">
                <span className="font-sans text-[0.7rem] font-medium tracking-[0.18em] text-charcoal uppercase">
                  Number of Guests
                </span>
                <select
                  name="guestCount"
                  value={guestCount}
                  onChange={(event) => setGuestCount(event.target.value)}
                  className="mt-2 h-12 w-full border border-beige bg-linen px-4 font-sans text-base text-espresso"
                >
                  {["1", "2", "3", "4", "5", "6"].map((count) => (
                    <option key={count} value={count}>
                      {count}
                    </option>
                  ))}
                </select>
              </label>
            )}

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
        )}
      </div>
    </section>
  );
}

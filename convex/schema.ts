import { defineSchema, defineTable } from "convex/server";
import { rsvpFields } from "./lib/rsvpValidators";

export default defineSchema({
  /**
   * Save the Date RSVP responses from the wedding site.
   *
   * | Field           | When collected                          |
   * |-----------------|-----------------------------------------|
   * | fullName        | Always                                  |
   * | attending       | Always — yes / no / not_sure              |
   * | mailingAddress  | When attending is "yes" or "not_sure"  |
   * | notes           | Optional — any submission               |
   * | submittedAt     | Set automatically on submit (ms epoch)  |
   */
  rsvps: defineTable(rsvpFields)
    .index("by_attending", ["attending"])
    .index("by_submitted_at", ["submittedAt"])
    .index("by_full_name", ["fullName"]),
});

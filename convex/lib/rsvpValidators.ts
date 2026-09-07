import { v } from "convex/values";

/** Responses guests can submit on the Save the Date site. */
export const guestAttendance = v.union(
  v.literal("yes"),
  v.literal("no"),
  v.literal("not_sure"),
);

/** All tracked response states, including manual no-response entries. */
export const attendance = v.union(
  v.literal("yes"),
  v.literal("no"),
  v.literal("not_sure"),
  v.literal("no_response"),
);

/** Mailing address — collected when attending is "yes" or "not_sure". */
export const mailingAddress = v.object({
  street: v.string(),
  city: v.string(),
  province: v.string(),
  postalCode: v.string(),
});

/** Fields stored for each RSVP submission. */
export const rsvpFields = {
  fullName: v.string(),
  attending: attendance,
  mailingAddress: v.optional(mailingAddress),
  notes: v.optional(v.string()),
  submittedAt: v.number(),
};

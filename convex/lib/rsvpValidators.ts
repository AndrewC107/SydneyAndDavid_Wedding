import { v } from "convex/values";

/** Guest attendance choice from the Save the Date form. */
export const attendance = v.union(
  v.literal("yes"),
  v.literal("no"),
  v.literal("not_sure"),
);

/** Mailing address — collected only when attending is "yes". */
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
  submittedAt: v.number(),
};

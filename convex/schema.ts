import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const attendance = v.union(
  v.literal("yes"),
  v.literal("no"),
  v.literal("not_sure"),
);

const mailingAddress = v.object({
  street: v.string(),
  city: v.string(),
  province: v.string(),
  postalCode: v.string(),
});

export default defineSchema({
  rsvps: defineTable({
    fullName: v.string(),
    attending: attendance,
    mailingAddress: v.optional(mailingAddress),
    submittedAt: v.number(),
  })
    .index("by_attending", ["attending"])
    .index("by_submitted_at", ["submittedAt"]),
});

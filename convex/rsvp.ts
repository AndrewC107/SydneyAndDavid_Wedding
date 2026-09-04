import { mutation } from "./_generated/server";
import { v } from "convex/values";

const attendanceValidator = v.union(
  v.literal("yes"),
  v.literal("no"),
  v.literal("not_sure"),
);

const mailingAddressValidator = v.object({
  street: v.string(),
  city: v.string(),
  province: v.string(),
  postalCode: v.string(),
});

function trimAddress(address: {
  street: string;
  city: string;
  province: string;
  postalCode: string;
}) {
  return {
    street: address.street.trim(),
    city: address.city.trim(),
    province: address.province.trim(),
    postalCode: address.postalCode.trim(),
  };
}

export const submit = mutation({
  args: {
    fullName: v.string(),
    attending: attendanceValidator,
    mailingAddress: v.optional(mailingAddressValidator),
  },
  returns: v.id("rsvps"),
  handler: async (ctx, args) => {
    const fullName = args.fullName.trim();

    if (fullName.length < 2) {
      throw new Error("Please enter your full name.");
    }

    if (fullName.length > 120) {
      throw new Error("Name is too long.");
    }

    if (args.attending === "yes") {
      if (!args.mailingAddress) {
        throw new Error("Mailing address is required.");
      }

      const address = trimAddress(args.mailingAddress);

      if (
        !address.street ||
        !address.city ||
        !address.province ||
        !address.postalCode
      ) {
        throw new Error("Please complete your mailing address.");
      }

      return await ctx.db.insert("rsvps", {
        fullName,
        attending: args.attending,
        mailingAddress: address,
        submittedAt: Date.now(),
      });
    }

    return await ctx.db.insert("rsvps", {
      fullName,
      attending: args.attending,
      submittedAt: Date.now(),
    });
  },
});

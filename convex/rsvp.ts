import { mutation, query } from "./_generated/server";
import type { MutationCtx } from "./_generated/server";
import { v } from "convex/values";
import type { Id } from "./_generated/dataModel";
import {
  attendance,
  guestAttendance,
  mailingAddress,
} from "./lib/rsvpValidators";

const rsvpDoc = v.object({
  _id: v.id("rsvps"),
  _creationTime: v.number(),
  fullName: v.string(),
  attending: attendance,
  mailingAddress: v.optional(mailingAddress),
  submittedAt: v.number(),
});

type AttendanceValue = "yes" | "no" | "not_sure" | "no_response";

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

async function insertRsvp(
  ctx: MutationCtx,
  args: {
    fullName: string;
    attending: AttendanceValue;
    mailingAddress?: {
      street: string;
      city: string;
      province: string;
      postalCode: string;
    };
  },
): Promise<Id<"rsvps">> {
  const fullName = args.fullName.trim();

  if (fullName.length < 2) {
    throw new Error("Please enter a full name.");
  }

  if (fullName.length > 120) {
    throw new Error("Name is too long.");
  }

  if (args.attending === "yes") {
    if (!args.mailingAddress) {
      throw new Error("Mailing address is required for attending guests.");
    }

    const address = trimAddress(args.mailingAddress);

    if (
      !address.street ||
      !address.city ||
      !address.province ||
      !address.postalCode
    ) {
      throw new Error("Please complete the mailing address.");
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
}

export const submit = mutation({
  args: {
    fullName: v.string(),
    attending: guestAttendance,
    mailingAddress: v.optional(mailingAddress),
  },
  returns: v.id("rsvps"),
  handler: async (ctx, args) => {
    return await insertRsvp(ctx, args);
  },
});

export const createManual = mutation({
  args: {
    fullName: v.string(),
    attending: attendance,
    mailingAddress: v.optional(mailingAddress),
  },
  returns: v.id("rsvps"),
  handler: async (ctx, args) => {
    return await insertRsvp(ctx, args);
  },
});

export const list = query({
  args: {},
  returns: v.array(rsvpDoc),
  handler: async (ctx) => {
    return await ctx.db
      .query("rsvps")
      .withIndex("by_submitted_at")
      .order("desc")
      .collect();
  },
});

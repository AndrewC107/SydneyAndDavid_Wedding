import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import type { RSVPPayload } from "@/lib/rsvp-types";

let client: ConvexHttpClient | null = null;

function getConvexClient(): ConvexHttpClient {
  if (!client) {
    const url = process.env.NEXT_PUBLIC_CONVEX_URL;
    if (!url) {
      throw new Error("RSVP storage is not configured.");
    }
    client = new ConvexHttpClient(url);
  }
  return client;
}

function formatConvexError(error: unknown): string {
  if (error instanceof Error) {
    if (error.message.includes("Server Error")) {
      return "We couldn't save your RSVP right now. Please try again in a moment.";
    }
    return error.message;
  }

  return "Something went wrong. Please try again in a moment.";
}

export async function handleRSVPSubmit(data: RSVPPayload): Promise<void> {
  try {
    await getConvexClient().mutation(
      api.rsvp.submit,
      data.mailingAddress
        ? {
            fullName: data.fullName,
            attending: data.attending,
            mailingAddress: data.mailingAddress,
          }
        : {
            fullName: data.fullName,
            attending: data.attending,
          },
    );
  } catch (error) {
    throw new Error(formatConvexError(error));
  }
}

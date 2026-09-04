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

export async function handleRSVPSubmit(data: RSVPPayload): Promise<void> {
  await getConvexClient().mutation(api.rsvp.submit, {
    fullName: data.fullName,
    attending: data.attending,
    mailingAddress: data.mailingAddress,
  });
}

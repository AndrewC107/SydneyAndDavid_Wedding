export type Attendance = "yes" | "no" | "not_sure";

export type RSVPPayload = {
  fullName: string;
  attending: Attendance;
  guestCount?: number;
};

/**
 * Isolated RSVP submission. Swap the body of this function later
 * without changing the form UI.
 *
 * Future options: Supabase, Firebase, Google Sheets, Airtable,
 * Formspree, a custom API, or a serverless database.
 */
export async function handleRSVPSubmit(data: RSVPPayload): Promise<void> {
  // TODO: replace this placeholder with the chosen storage method.
  // Example: await fetch("/api/rsvp", { method: "POST", body: JSON.stringify(data) })
  await new Promise((resolve) => setTimeout(resolve, 500));
  console.info("RSVP received (not yet persisted):", data);
}

export type Attendance = "yes" | "no" | "not_sure";

export type MailingAddress = {
  street: string;
  city: string;
  province: string;
  postalCode: string;
};

export type RSVPPayload = {
  fullName: string;
  attending: Attendance;
  mailingAddress?: MailingAddress;
  notes?: string;
};

export function requiresMailingAddress(attending: Attendance | ""): boolean {
  return attending === "yes" || attending === "not_sure";
}

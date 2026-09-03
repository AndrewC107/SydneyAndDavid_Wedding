export const wedding = {
  couple: {
    personOne: "Sydney",
    personTwo: "David",
  },

  date: {
    display: "July 17th, 2027",
    weekday: "Saturday",
    iso: "2027-07-17",
  },

  venue: {
    name: "Martin Estates",
    city: "Beamsville",
    province: "Ontario",
  },

  ceremony: {
    timeLabel: "Ceremony time",
    time: "To Be Announced",
  },

  message: {
    heading: "We would be honoured to share our special day with you",
    body: "We're so excited to celebrate this next chapter surrounded by the people who mean the most to us. We hope you'll save the date and join us for a summer day at Martin Estates.",
  },

  rsvp: {
    heading: "Save the Date RSVP",
    supporting: "Let us know if you're planning to celebrate with us.",
    confirmation: "Thank you! We can't wait to celebrate with you.",
  },

  meta: {
    title: "Sydney & David — Save the Date",
    description:
      "Save the date for Sydney & David's wedding on July 17th, 2027 at Martin Estates in Beamsville, Ontario.",
  },
} as const;

export const coupleNames = `${wedding.couple.personOne} & ${wedding.couple.personTwo}`;

export const venueLocation = `${wedding.venue.city}, ${wedding.venue.province}`;

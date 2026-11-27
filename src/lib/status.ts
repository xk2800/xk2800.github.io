// Keys must match statusOptions in studio/schemaTypes/profile.ts. "%s" takes the status detail.
const green = "bg-green-600";
const amber = "bg-amber-500";
const blue = "bg-blue-600";

export const statuses: Record<string, { text: string; dot: string }> = {
  available: { text: "Available for work", dot: green },
  open: { text: "Open to new opportunities", dot: green },
  selective: { text: "Open to the right opportunity", dot: amber },
  freelance: { text: "Available for freelance", dot: green },
  limited: { text: "Taking on select projects", dot: amber },
  booked: { text: "Booked until %s", dot: "bg-red-600" },
  employed: { text: "Currently at %s", dot: blue },
  building: { text: "Building %s", dot: blue },
  learning: { text: "Currently learning %s", dot: blue },
  collaborations: { text: "Open to collaborations", dot: amber },
  break: { text: "Taking a break", dot: "bg-gray-400" },
};

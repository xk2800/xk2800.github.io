import { createElement } from "react";
import { defineArrayMember, defineField, defineType } from "sanity";
import { StatusReference } from "./StatusReference";

// Values must match `statuses` in src/lib/status.ts (the site holds the colours)
const statusOptions = [
  { title: "Available for work (green)", value: "available" },
  { title: "Open to new opportunities (green)", value: "open" },
  { title: "Open to the right opportunity (amber)", value: "selective" },
  { title: "Available for freelance (green)", value: "freelance" },
  { title: "Taking on select projects (amber)", value: "limited" },
  { title: "Booked until [month] (red)", value: "booked" },
  { title: "Currently at [company] (blue)", value: "employed" },
  { title: "Building [project] (blue)", value: "building" },
  { title: "Currently learning [topic] (blue)", value: "learning" },
  { title: "Open to collaborations (amber)", value: "collaborations" },
  { title: "Taking a break (grey)", value: "break" },
];
const needsDetail = ["booked", "employed", "building", "learning"];

// Singleton: only the document with _id "profile" is used (see sanity.config.ts).
export const profile = defineType({
  name: "profile",
  title: "Profile",
  type: "document",
  fields: [
    defineField({
      name: "status",
      description: createElement(StatusReference),
      type: "string",
      options: { list: statusOptions },
      initialValue: "open",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "statusDetail",
      title: "Status detail",
      description: "Replaces the [brackets] in the status, e.g. March, or a company, project or topic name.",
      type: "string",
      hidden: ({ document }) => !needsDetail.includes(document?.status as string),
      validation: (r) =>
        r.custom((value, { document }) =>
          needsDetail.includes(document?.status as string) && !value?.trim()
            ? "This status needs a detail"
            : true,
        ),
    }),
    defineField({
      name: "headline",
      title: "Contact headline",
      description: "Home page → Contact section: the large line under the “Contact” heading.",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "blurb",
      title: "Contact blurb",
      description: "Home page → Contact section: the paragraph below the headline.",
      type: "text",
      rows: 3,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "email",
      title: "Contact email",
      description:
        "Home page: both “Say hello” buttons (intro and Contact section), and the copy-email button, which shows this address.",
      type: "string",
      validation: (r) => r.required().email(),
    }),
    defineField({
      name: "about",
      type: "array",
      description: "Home page → About section: the full text under the “About” heading. Links open in a new tab.",
      // Only what the site styles: paragraphs, bold, italic and links
      of: [
        defineArrayMember({
          type: "block",
          styles: [{ title: "Normal", value: "normal" }],
          lists: [],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [{ name: "href", type: "url", title: "URL" }],
              },
            ],
          },
        }),
      ],
      validation: (r) => r.required(),
    }),
  ],
  preview: { prepare: () => ({ title: "Profile" }) },
});

import { defineArrayMember, defineField, defineType } from "sanity";

// Singleton: only the document with _id "profile" is used (see sanity.config.ts).
export const profile = defineType({
  name: "profile",
  title: "Profile",
  type: "document",
  fields: [
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

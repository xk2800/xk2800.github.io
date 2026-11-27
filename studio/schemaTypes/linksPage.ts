import { defineArrayMember, defineField, defineType } from "sanity";

const text = (name: string, title: string, description?: string) =>
  defineField({ name, title, description, type: "string", validation: (r) => r.required() });
const url = (name: string) =>
  defineField({ name, title: "URL", type: "url", validation: (r) => r.required() });

// Singleton: only the document with _id "linksPage" is used (see sanity.config.ts).
export const linksPage = defineType({
  name: "linksPage",
  title: "Links page",
  type: "document",
  fields: [
    defineField({
      name: "website",
      title: "Main website button",
      type: "object",
      fields: [text("title", "Title"), text("subtitle", "Subtitle"), url("url")],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "socials",
      title: "Links",
      type: "array",
      description: "Drag to reorder.",
      of: [
        defineArrayMember({
          name: "socialLink",
          type: "object",
          fields: [
            text("label", "Label"),
            text("handle", "Handle", "Shown on the right, e.g. @username."),
            url("url"),
            defineField({
              name: "icon",
              type: "string",
              description: "Leave empty for a generic link icon.",
              options: {
                list: [
                  { title: "LinkedIn", value: "linkedin" },
                  { title: "GitHub", value: "github" },
                ],
              },
            }),
            defineField({
              name: "lucideIcon",
              title: "Lucide icon name",
              type: "string",
              description:
                "Optional, overrides Icon above. Lucide icons only: copy the name from lucide.dev/icons, e.g. globe or train-front. Lucide has no brand logos (use Icon above for LinkedIn or GitHub). An unknown name shows the Icon above, or the generic link icon.",
              validation: (r) =>
                r.regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, { name: "Lucide name" })
                  .error("Use the Lucide name as written on lucide.dev, e.g. circle-user."),
            }),
          ],
          preview: { select: { title: "label", subtitle: "url" } },
        }),
      ],
    }),
    defineField({
      name: "email",
      type: "string",
      description: "Email button on the Links page only. The home page uses the email in Profile.",
      validation: (r) => r.required().email(),
    }),
    defineField({
      name: "referrals",
      type: "array",
      description: "Drag to reorder. Remove them all to hide the section.",
      of: [
        defineArrayMember({
          name: "referral",
          type: "object",
          fields: [
            text("title", "Title"),
            defineField({ name: "subtitle", title: "Subtitle", type: "string", description: "Optional." }),
            url("url"),
            defineField({
              name: "showDisclaimer",
              title: "Show disclaimer",
              type: "boolean",
              description: "Marks the title with * and shows the referral disclaimer below the list.",
              options: { layout: "checkbox" },
              initialValue: false,
            }),
          ],
          preview: { select: { title: "title", subtitle: "url" } },
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Links page" }) },
});

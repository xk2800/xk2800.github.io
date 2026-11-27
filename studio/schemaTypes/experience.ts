import { defineField, defineType } from "sanity";

export const experience = defineType({
  name: "experience",
  title: "Experience",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "company", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "startDate",
      type: "date",
      options: { dateFormat: "MMM YYYY" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "endDate",
      type: "date",
      options: { dateFormat: "MMM YYYY" },
      description: "Leave empty for a current role (shows as Present).",
    }),
    defineField({ name: "description", type: "text", rows: 4, validation: (r) => r.required() }),
    defineField({
      name: "skills",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
  ],
  orderings: [
    { name: "startDesc", title: "Start date, newest", by: [{ field: "startDate", direction: "desc" }] },
  ],
  preview: { select: { title: "title", subtitle: "company" } },
});

import { defineArrayMember, defineField, defineType } from "sanity";

export const archiveEntry = defineType({
  name: "archiveEntry",
  title: "Project archive",
  type: "document",
  fields: [
    defineField({ name: "project", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "year",
      title: "Year label",
      type: "string",
      description: "Shown on the page, e.g. 2022 or 2021–23.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "sortYear",
      type: "number",
      description: "Newest first. Use decimals to place ranges, e.g. 2021.5. Ties sort by project name.",
      validation: (r) => r.required(),
    }),
    defineField({ name: "description", type: "text", rows: 4, validation: (r) => r.required() }),
    defineField({ name: "madeAt", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "awards",
      type: "array",
      of: [
        defineArrayMember({
          name: "award",
          type: "object",
          fields: [
            defineField({ name: "title", type: "string", validation: (r) => r.required() }),
            defineField({ name: "url", title: "URL", type: "url", description: "Optional. Makes the award a link." }),
          ],
          preview: { select: { title: "title", subtitle: "url" } },
        }),
      ],
    }),
    defineField({
      name: "builtWith",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
  ],
  orderings: [
    {
      name: "sortYearDesc",
      title: "Newest first",
      by: [
        { field: "sortYear", direction: "desc" },
        { field: "project", direction: "asc" },
      ],
    },
  ],
  preview: { select: { title: "project", subtitle: "year" } },
});

import { defineArrayMember, defineField, defineType } from "sanity";

// Singleton: only the document with _id "navigation" is used (see sanity.config.ts).
export const navigation = defineType({
  name: "navigation",
  title: "Navigation",
  type: "document",
  fields: [
    defineField({
      name: "sections",
      title: "Sections",
      type: "array",
      description:
        "Drag to reorder. This sets the order of both the sidebar nav and the sections on the home page.",
      // Each item needs a matching component in the site code, so the set is fixed
      options: { disableActions: ["add", "addBefore", "addAfter", "duplicate", "remove", "copy"] },
      of: [
        defineArrayMember({
          type: "object",
          name: "navSection",
          fields: [
            defineField({ name: "id", title: "Section", type: "string", readOnly: true }),
            defineField({
              name: "label",
              title: "Nav label",
              type: "string",
              description: "Text in the sidebar nav. Section headings on the page don’t change.",
              validation: (r) => r.required(),
            }),
          ],
          preview: { select: { title: "label", subtitle: "id" } },
        }),
      ],
      validation: (r) => r.required().length(5),
    }),
  ],
  preview: { prepare: () => ({ title: "Navigation" }) },
});

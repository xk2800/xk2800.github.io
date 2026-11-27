import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";
import { defineField, defineType } from "sanity";

export const skillGroup = defineType({
  name: "skillGroup",
  title: "Skill group",
  type: "document",
  fields: [
    // Hidden: fixes the order of the groups on the page; new groups go last
    orderRankField({ type: "skillGroup", newItemPosition: "after" }),
    defineField({
      name: "name",
      title: "Group name",
      type: "string",
      description: "Home page → Skills section: the label for this group.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "items",
      title: "Skills",
      type: "array",
      of: [{ type: "string" }],
      description: "Shown in this order. Drag to rearrange.",
      validation: (r) => r.required().min(1).unique(),
    }),
  ],
  orderings: [orderRankOrdering],
  preview: {
    select: { title: "name", items: "items" },
    prepare: ({ title, items }) => ({ title, subtitle: (items ?? []).join(", ") }),
  },
});

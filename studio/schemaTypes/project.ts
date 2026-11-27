import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";
import { defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "featured",
      type: "boolean",
      description:
        "On: shown large under “Selected projects” on the home page. Off: listed under “More projects”.",
      initialValue: false,
      validation: (r) =>
        r.custom((featured, { document }) =>
          // The large screenshot is a link, so it needs somewhere to go
          featured && !document?.live && !document?.source
            ? "A featured project needs a live or source link"
            : true,
        ),
    }),
    // Hidden field set by dragging in the Projects list
    orderRankField({ type: "project", newItemPosition: "after" }),
    defineField({ name: "description", type: "text", rows: 4, validation: (r) => r.required() }),
    defineField({
      name: "image",
      title: "Screenshot",
      type: "image",
      description: "Cropped from the top: 16:9 when featured, 16:10 under “More projects”.",
      validation: (r) => r.required().assetRequired(),
    }),
    defineField({
      name: "alt",
      title: "Screenshot alt text",
      type: "string",
      description: "Describes the screenshot for screen readers.",
      validation: (r) => r.required(),
    }),
    defineField({ name: "stack", type: "array", of: [{ type: "string" }], options: { layout: "tags" } }),
    defineField({ name: "live", title: "Live URL", type: "url", description: "“Visit site” link." }),
    defineField({ name: "source", title: "Source URL", type: "url", description: "“Source” link." }),
  ],
  orderings: [orderRankOrdering],
  preview: {
    select: { title: "title", featured: "featured", media: "image" },
    prepare: ({ title, featured, media }) => ({
      title,
      subtitle: featured ? "Selected projects" : "More projects",
      media,
    }),
  },
});

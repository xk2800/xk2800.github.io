import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemaTypes";

// Types with exactly one document, whose _id equals the type name
const singletons = ["profile"];

export default defineConfig({
  name: "default",
  title: "xavierkhew.com",
  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET || "production",
  plugins: [
    structureTool({
      structure: (S, context) =>
        S.list()
          .title("Content")
          .items([
            S.documentTypeListItem("experience"),
            orderableDocumentListDeskItem({ type: "project", title: "Projects (drag to reorder)", S, context }),
            S.documentTypeListItem("archiveEntry"),
            S.listItem()
              .title("Profile")
              .id("profile")
              .child(S.document().schemaType("profile").documentId("profile")),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
    templates: (templates) => templates.filter((t) => !singletons.includes(t.schemaType)),
  },
  document: {
    actions: (actions, { schemaType }) =>
      singletons.includes(schemaType)
        ? actions.filter((a) => !["delete", "duplicate", "unpublish"].includes(a.action ?? ""))
        : actions,
  },
});

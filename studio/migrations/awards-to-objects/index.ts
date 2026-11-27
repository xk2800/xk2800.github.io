import { at, defineMigration, set } from "sanity/migrate";

// Turns plain-string awards into { title, url } objects. Safe to run twice.
export default defineMigration({
  title: "Convert awards to objects",
  documentTypes: ["archiveEntry"],
  migrate: {
    document(doc) {
      const awards = doc.awards as unknown[] | undefined;
      if (!awards?.some((a) => typeof a === "string")) return;
      return at(
        "awards",
        set(
          awards.map((a, i) =>
            typeof a === "string" ? { _type: "award", _key: `award${i}`, title: a } : a,
          ),
        ),
      );
    },
  },
});

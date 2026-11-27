# Adding a new home page section

This guide adds an **Education** section with content edited in Sanity. For your own section, replace `education` / `Education` everywhere.

- **Static text only?** Do steps 2–5, and put the text straight into the component.
- **Content edited in Sanity?** Do all the steps.

The section ID (`education`) must be spelled the same everywhere. It's used for the nav link, the scroll highlighting and the order set in Sanity.

## How sections work

- Each section is a component in `src/components/sections/`.
- `src/pages/index.astro` renders them in the order set in the Studio under **Navigation & section order**. The sidebar nav uses the same order.
- The site fetches from Sanity **only when it builds**, so every content change needs a rebuild.
- The build fails unless the Sanity `navigation` document lists every section ID in the code exactly once.

## 1. Add the content type

Create `studio/schemaTypes/education.ts`:

```ts
import { defineField, defineType } from "sanity";

export const education = defineType({
  name: "education",
  title: "Education",
  type: "document",
  fields: [
    defineField({
      name: "school",
      type: "string",
      description: "Home page → Education section: the heading of each entry.",
      validation: (r) => r.required(),
    }),
    defineField({ name: "qualification", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "startYear",
      type: "number",
      description: "Entries are listed newest first by this year.",
      validation: (r) => r.required().integer(),
    }),
    defineField({ name: "endYear", type: "number", description: "Leave empty if ongoing." }),
  ],
  preview: { select: { title: "school", subtitle: "qualification" } },
});
```

In `studio/schemaTypes/index.ts`, import it and add it to the `schemaTypes` array:

```ts
import { education } from "./education";
```

In `studio/sanity.config.ts`, add it to the `.items([...])` list. The Studio menu lists each type by hand, so it won't appear without this line:

```ts
S.documentTypeListItem("education"),
```

Other kinds of list:

- **Drag to reorder:** copy how `project` is set up (`orderRankField` in its schema, `orderableDocumentListDeskItem` in the config, and `order(orderRank asc)` in its query).
- **Only one document** (like `profile`): add the type name to `singletons` and copy the `profile` list item.

## 2. Add the fetch function

*Skip this for static text.*

Add to the end of `src/lib/sanity.ts`:

```ts
type Education = {
  school: string;
  qualification: string;
  startYear: number;
  endYear: number | null;
};

export async function getEducation() {
  return client.fetch<Education[]>(
    `*[_type == "education"] | order(startYear desc) { school, qualification, startYear, endYear }`,
  );
}
```

A field you ask for that is empty comes back as `null`. For lists, use `coalesce(myList, [])` so the component always gets an array.

## 3. Create the component

Create `src/components/sections/Education.astro`:

```astro
---
import { getEducation } from "../../lib/sanity";

// `first`: whether this section sits at the top of the content column
const { first } = Astro.props;
const entries = await getEducation();
---

<section
  id="education"
  class:list={["scroll-mt-[96px]", first ? "rise pt-8 lg:pt-0" : "mt-20"]}
  style={first ? "--i:3" : undefined}
>
  <h2 class="section-heading" data-draw>
    Education
  </h2>
  <ol class="space-y-6">
    {entries.map((e) => (
      <li>
        <h3 class="text-base font-medium text-baseTextCTAColor">{e.school}</h3>
        <p class="mt-1 text-sm text-subTextColor">
          {e.qualification} · {e.startYear} — {e.endYear ?? "Present"}
        </p>
      </li>
    ))}
  </ol>
</section>
```

Keep the `id`, the `class:list` / `style` lines and the `section-heading` heading. For static text, remove the import and the `entries` line, and replace the `<ol>` with your own markup.

For images, copy `Projects.astro`: fetch the image URL with its width and height, and render it with Astro's `<Image>`. Astro then optimizes it at build time.

## 4. Register the section

In `src/pages/index.astro`, import the component and add it to `sectionComponents`:

```astro
import Education from "../components/sections/Education.astro";
```

```ts
const sectionComponents = {
  // ...existing sections
  education: Education,
};
```

In `src/lib/sanity.ts`, add `"education"` to `sectionIds`.

In `studio/schemaTypes/navigation.ts`, raise the number in `.length(...)` by one (for example, `.length(5)` becomes `.length(6)`).

## 5. Add it to the nav in Sanity

> **Timing:** this changes the live dataset straight away. Until the new code is deployed, every build of the old code **fails**, including webhook builds. The last successful site stays online. Do this when you're ready to push.

First, if the Studio shows an unpublished draft of **Navigation**, publish or discard it. Publishing an old draft later would remove the new item.

The Studio's add button is turned off on purpose, so use a one-off script. Create `studio/add-section.mjs`:

```js
import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2025-01-01" });
await client
  .patch("navigation")
  .append("sections", [{ _key: "education", _type: "navSection", id: "education", label: "Education" }])
  .commit();
console.log("added");
```

Run it **once** from `studio/` (running it twice adds a duplicate, which fails the build), then delete it:

```bash
npx sanity login          # only if you aren't logged in
npx sanity exec add-section.mjs --with-user-token
rm add-section.mjs
```

## 6. Add the content

*Skip this for static text.*

1. In `studio/`, run `npm run dev`. It reads the project ID from `studio/.env` (see `studio/.env.example`).
2. Open http://localhost:3333, add your Education entries and click **Publish**. Unpublished drafts don't show on the site.

## 7. Test locally

From the repo root (the `.env` there needs `SANITY_PROJECT_ID`, see `.env.example`):

```bash
npm run dev      # preview at the URL it prints
npm run build    # must finish without errors
```

If published changes don't appear in `npm run dev`, restart it.

In the browser, check that:

- the section and its nav link appear
- clicking the link scrolls to the section
- the nav highlights it as you scroll

## 8. Deploy

1. If you added a content type, add it to the **webhook filter** at sanity.io/manage → your project → API → Webhooks. For example:

   ```
   _type in ["experience", "profile", "archiveEntry", "project", "skillGroup", "navigation", "education"]
   ```

2. Commit all the files (`git add -A`) and push.
3. Redeploy both Dokploy apps: the **Studio** (so the new type and list appear) and the **site**.
4. In the Studio, open **Navigation & section order**, drag the new item into place and **Publish**.

## Removing a section

Reverse step 4 (and lower `.length(...)`), delete the component, then remove the nav item with a script run the same way as in step 5:

```js
import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2025-01-01" });
await client.patch("navigation").unset(['sections[id=="education"]']).commit();
console.log("removed");
```

The timing warning from step 5 applies here too. If the section had its own content type, delete its documents in the Studio **before** removing the schema.

## Troubleshooting

| Problem | Likely cause |
|---|---|
| `Sanity "navigation" must list each section once` | The nav document and `sectionIds` don't match: step 5 was skipped or run twice, or the code isn't updated yet. The message lists the IDs found in Sanity. |
| `Cannot read properties of undefined` or an invalid component error from `index.astro` | The section is in `sectionIds` but missing from `sectionComponents`. |
| New type missing from the Studio menu | The `sanity.config.ts` line is missing, or the Studio wasn't redeployed. |
| Section is empty on the site | The entries are still drafts, or the type name in the query doesn't match the schema's `name`. |
| Publishing doesn't rebuild the site | The type is missing from the webhook filter. |

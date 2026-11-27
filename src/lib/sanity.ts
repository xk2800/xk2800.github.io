import { createClient } from "@sanity/client";
import { escapeHTML, toHTML, uriLooksSafe } from "@portabletext/to-html";

const projectId = import.meta.env.SANITY_PROJECT_ID;
if (!projectId) throw new Error("SANITY_PROJECT_ID is not set (see .env.example)");

// Build-time only: nothing here ships to the browser.
const client = createClient({
  projectId,
  dataset: import.meta.env.SANITY_DATASET || "production",
  apiVersion: "2025-01-01",
  useCdn: false,
});

// "2026-07-01" -> "Jul 2026"
const month = (d: string) =>
  new Date(d).toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" });

type ExperienceDoc = {
  startDate: string;
  endDate?: string;
  title: string;
  company: string;
  description: string;
  skills?: string[];
};

export async function getExperiences() {
  const docs = await client.fetch<ExperienceDoc[]>(
    `*[_type == "experience"] | order(startDate desc) { startDate, endDate, title, company, description, skills }`,
  );
  return docs.map((d) => ({
    start: month(d.startDate),
    end: d.endDate ? month(d.endDate) : "Present",
    title: d.title,
    company: d.company,
    description: d.description,
    skills: d.skills ?? [],
  }));
}

export async function getAboutHtml() {
  const about = await client.fetch(`*[_id == "profile"][0].about`);
  if (!about?.length) throw new Error('Sanity "profile" document has no About text');
  return toHTML(about, {
    components: {
      marks: {
        // Links open in a new tab, like the rest of the site
        link: ({ children, value }) =>
          value?.href && uriLooksSafe(value.href)
            ? `<a target="_blank" rel="noopener noreferrer" href="${escapeHTML(value.href)}">${children}</a>`
            : children,
      },
    },
  });
}

type ArchiveEntry = {
  year: string;
  project: string;
  description: string;
  madeAt: string;
  awards: { title: string; url?: string }[];
  builtWith: string[];
};

export async function getArchive() {
  // coalesce: Sanity omits empty arrays, the page expects them
  const docs = await client.fetch<ArchiveEntry[]>(
    `*[_type == "archiveEntry"] | order(sortYear desc, project asc) {
      year, project, description, madeAt, "awards": coalesce(awards, []), "builtWith": coalesce(builtWith, [])
    }`,
  );
  return docs.map((d) => ({
    ...d,
    // Plain strings are awards not yet migrated (studio/migrations/awards-to-objects)
    awards: d.awards.map((a) => {
      if (typeof a === "string") return { title: a };
      return { title: a.title, url: a.url && uriLooksSafe(a.url) ? a.url : undefined };
    }),
  }));
}

export async function getContact() {
  const c = await client.fetch<{ email?: string; headline?: string; blurb?: string } | null>(
    `*[_id == "profile"][0]{ email, headline, blurb }`,
  );
  if (!c?.email || !c.headline || !c.blurb) {
    throw new Error('Sanity "profile" document is missing email, headline or blurb');
  }
  return { email: c.email, headline: c.headline, blurb: c.blurb };
}

type Project = {
  title: string;
  featured: boolean;
  description: string;
  // Remote image: Astro downloads and optimizes it at build time, and needs the dimensions
  image: { src: string; width: number; height: number };
  alt: string;
  stack: string[];
  live: string | null;
  source: string | null;
};

export async function getProjects() {
  return client.fetch<Project[]>(
    `*[_type == "project"] | order(orderRank asc) {
      title, "featured": featured == true, description, alt, live, source,
      "stack": coalesce(stack, []),
      "image": image.asset->{ "src": url, "width": metadata.dimensions.width, "height": metadata.dimensions.height }
    }`,
  );
}

export async function getSkillGroups() {
  return client.fetch<{ name: string; items: string[] }[]>(
    `*[_type == "skillGroup"] | order(orderRank asc) { name, "items": coalesce(items, []) }`,
  );
}

// One per component in src/components/sections
const sectionIds = ["about", "experience", "projects", "skills", "contact"] as const;

export async function getNavigation() {
  const items = await client.fetch<{ id: (typeof sectionIds)[number]; label: string }[] | null>(
    `*[_id == "navigation"][0].sections[]{ id, label }`,
  );
  // Each section must appear exactly once, or the page would silently lose or repeat one
  const found = (items ?? []).map((i) => i.id).sort().join();
  if (found !== [...sectionIds].sort().join() || items!.some((i) => !i.label)) {
    throw new Error(`Sanity "navigation" must list each section once with a label (got: ${found || "nothing"})`);
  }
  return items!;
}

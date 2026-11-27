import { createClient } from "@sanity/client";

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

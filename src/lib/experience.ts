import { experiences as local } from "../content/experience";

type Experience = (typeof local)[number];

// Fetched at build time. Without PAYLOAD_URL the local file is used, so deploys work before the CMS is hosted.
export async function getExperiences(): Promise<Experience[]> {
  const base = import.meta.env.PAYLOAD_URL;
  if (!base) return local;

  // No fallback from here on: failing the build beats silently publishing stale content
  const res = await fetch(new URL("/api/experiences?sort=_order&limit=0&depth=0", base));
  if (!res.ok) throw new Error(`Payload experiences request failed: ${res.status}`);

  const { docs } = await res.json();
  if (!docs?.length) throw new Error("Payload returned no experiences");

  return docs.map((d: Experience) => ({ ...d, skills: d.skills ?? [] }));
}

/**
 * Build-time script: generates dist/data/fallback-projects.json from client PROJECTS_DATA
 * so the server can return default projects when data/projects.json doesn't exist (e.g. first Railway deploy).
 * Run with: pnpm exec tsx scripts/generate-fallback-projects.ts
 */
import fs from "fs";
import path from "path";
import { PROJECTS_DATA } from "../client/src/data/projectsData";

const root = path.resolve(process.cwd());
const outDir = path.join(root, "dist", "data");
const outFile = path.join(outDir, "fallback-projects.json");

function toProjectRecord(
  p: (typeof PROJECTS_DATA)[0],
  index: number
): Record<string, unknown> {
  return {
    slug: p.slug,
    key: p.key,
    title: p.title,
    client: p.client,
    year: p.year,
    category: p.category,
    services: p.services,
    websiteUrl: p.websiteUrl ?? "",
    description: { fr: p.description.fr, en: p.description.en },
    images: p.images,
    featuredOnHomeTriptych: index < 3,
    homeTriptychOrder: index < 3 ? index : undefined,
    featuredOnProjectsTriptych: index < 3,
    projectsTriptychOrder: index < 3 ? index : undefined,
    featuredOnHomeCarousel: index < 6,
    homeCarouselImage: undefined,
    homeCarouselOrder: index < 6 ? index : undefined,
  };
}

const projects = PROJECTS_DATA.map((p, i) => toProjectRecord(p, i));
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outFile, JSON.stringify({ projects }, null, 2), "utf-8");
console.log("[generate-fallback-projects] Wrote", outFile, "with", projects.length, "projects");

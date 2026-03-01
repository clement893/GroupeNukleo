import fs from "fs/promises";
import path from "path";
import { z } from "zod";
import { getDb } from "./db";
import { sql } from "drizzle-orm";

// Allow Railway etc. to point to a persistent volume (e.g. DATA_PATH=/tmp/data or a mounted volume)
const DATA_DIR = process.env.DATA_PATH
  ? path.resolve(process.env.DATA_PATH)
  : path.resolve(process.cwd(), "data");
const PROJECTS_FILE = path.join(DATA_DIR, "projects.json");

const projectCategoryEnum = z.enum([
  "Brand",
  "Site web",
  "Plateforme",
  "Marketing numérique",
  "Campagnes",
  "Transformation",
]);

export const projectSchema = z.object({
  slug: z.string().min(1),
  key: z.string().min(1),
  title: z.string().min(1),
  client: z.string().min(1),
  year: z.string(),
  category: projectCategoryEnum,
  services: z.string(),
  websiteUrl: z.string().optional(),
  description: z.object({
    fr: z.string(),
    en: z.string(),
  }),
  images: z.array(z.string()),
  /** Afficher dans le triptyque de la page d'accueil */
  featuredOnHomeTriptych: z.boolean().optional(),
  /** Image à afficher dans le triptyque accueil (nom de fichier); si absent, utilise images[0] */
  homeTriptychImage: z.string().optional(),
  /** Ordre dans le triptyque accueil (0, 1, 2) pour garder l'ordre choisi */
  homeTriptychOrder: z.number().min(0).max(2).optional(),
  /** Afficher dans le triptyque de la page Projets */
  featuredOnProjectsTriptych: z.boolean().optional(),
  /** Image à afficher dans le triptyque page Projets; si absent, utilise images[0] */
  projectsTriptychImage: z.string().optional(),
  /** Ordre dans le triptyque page Projets (0, 1, 2) pour garder l'ordre choisi */
  projectsTriptychOrder: z.number().min(0).max(2).optional(),
  /** Afficher dans le carrousel "Latest project" en haut de la page d'accueil */
  featuredOnHomeCarousel: z.boolean().optional(),
  /** Image à afficher dans le carrousel accueil (nom de fichier); si absent, utilise images[0] */
  homeCarouselImage: z.string().optional(),
  /** Ordre dans le carrousel accueil (0..5) pour garder l'ordre choisi */
  homeCarouselOrder: z.number().min(0).max(5).optional(),
});

export type ProjectRecord = z.infer<typeof projectSchema>;

export async function readProjects(): Promise<ProjectRecord[]> {
  const db = await getDb();
  if (db) {
    try {
      const result = await db.execute(sql`SELECT value FROM projects_store WHERE key = 'projects' LIMIT 1`);
      const rows = Array.isArray(result) ? result : (result as { rows?: unknown[] })?.rows ?? [];
      const row = rows[0] as { value?: string } | undefined;
      if (row?.value) {
        const data = JSON.parse(row.value) as { projects?: unknown[] };
        const projects = Array.isArray(data?.projects) ? data.projects : [];
        const parsed = projects
          .map((p: unknown) => projectSchema.safeParse(p))
          .filter((r): r is z.SafeParseSuccess<ProjectRecord> => r.success)
          .map((r) => r.data);
        return parsed;
      }
    } catch {
      // Table might not exist yet
    }
  }

  try {
    const raw = await fs.readFile(PROJECTS_FILE, "utf-8");
    const data = JSON.parse(raw);
    const projects = Array.isArray(data.projects) ? data.projects : [];
    return projects
      .map((p: unknown) => projectSchema.safeParse(p))
      .filter((r): r is z.SafeParseSuccess<ProjectRecord> => r.success)
      .map((r) => r.data);
  } catch {
    // No data/projects.json yet (e.g. first deploy on Railway): use fallback from build
    try {
      const fallbackPath = path.join(process.cwd(), "dist", "data", "fallback-projects.json");
      const raw = await fs.readFile(fallbackPath, "utf-8");
      const data = JSON.parse(raw);
      const projects = Array.isArray(data.projects) ? data.projects : [];
      return projects
        .map((p: unknown) => projectSchema.safeParse(p))
        .filter((r): r is z.SafeParseSuccess<ProjectRecord> => r.success)
        .map((r) => r.data);
    } catch {
      return [];
    }
  }
}

async function writeProjects(projects: ProjectRecord[]): Promise<void> {
  const payload = JSON.stringify({ projects }, null, 2);

  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(PROJECTS_FILE, payload, "utf-8");

  const db = await getDb();
  if (db) {
    try {
      await db.execute(
        sql`INSERT INTO projects_store (key, value, "updatedAt") VALUES ('projects', ${payload}, NOW()) ON CONFLICT (key) DO UPDATE SET value = ${payload}, "updatedAt" = NOW()`
      );
    } catch {
      // Table might not exist yet
    }
  }
}


export async function initProjects(projects: ProjectRecord[]): Promise<ProjectRecord[]> {
  const parsed = projects
    .map((p) => projectSchema.safeParse(p))
    .filter((r): r is z.SafeParseSuccess<ProjectRecord> => r.success)
    .map((r) => r.data);
  await writeProjects(parsed);
  return parsed;
}

export async function updateProject(input: ProjectRecord): Promise<ProjectRecord> {
  const projects = await readProjects();
  const index = projects.findIndex((p) => p.slug === input.slug);
  if (index === -1) {
    projects.push(input);
  } else {
    projects[index] = input;
  }
  await writeProjects(projects);
  return input;
}

/** Set which 3 projects appear in each triptych (and their order + image per project). */
export async function setTriptychSlugs(input: {
  homeTriptychSlugs: string[];
  projectsTriptychSlugs: string[];
  homeTriptychImageBySlug?: Record<string, string>;
  projectsTriptychImageBySlug?: Record<string, string>;
}): Promise<ProjectRecord[]> {
  const projects = await readProjects();
  if (projects.length === 0) {
    throw new Error("Aucun projet en base. Cliquez d'abord sur « Initialiser depuis le site » puis enregistrez les triptyques.");
  }

  const homeSlugs = input.homeTriptychSlugs.slice(0, 3);
  const projectsSlugs = input.projectsTriptychSlugs.slice(0, 3);
  const homeImg = input.homeTriptychImageBySlug ?? {};
  const projectsImg = input.projectsTriptychImageBySlug ?? {};

  const updated = projects.map((p) => ({
    ...p,
    featuredOnHomeTriptych: homeSlugs.includes(p.slug),
    homeTriptychImage: homeSlugs.includes(p.slug) && homeImg[p.slug] ? homeImg[p.slug] : undefined,
    homeTriptychOrder: homeSlugs.includes(p.slug) ? homeSlugs.indexOf(p.slug) : undefined,
    featuredOnProjectsTriptych: projectsSlugs.includes(p.slug),
    projectsTriptychImage: projectsSlugs.includes(p.slug) && projectsImg[p.slug] ? projectsImg[p.slug] : undefined,
    projectsTriptychOrder: projectsSlugs.includes(p.slug) ? projectsSlugs.indexOf(p.slug) : undefined,
  }));

  // Ordre pour le site : les 3 du triptyque Projets en premier (ordre choisi), puis le reste
  const projectsOrder = projectsSlugs
    .map((s) => updated.find((p) => p.slug === s))
    .filter((p): p is ProjectRecord => Boolean(p));
  const rest = updated.filter((p) => !projectsSlugs.includes(p.slug));
  const reordered = [...projectsOrder, ...rest];

  await writeProjects(reordered);
  return reordered;
}

const MAX_CAROUSEL_SLIDES = 6;

/** Set which projects (and which image per project) appear in the home carousel. */
export async function setCarouselSlugs(input: {
  carouselSlugs: string[];
  imageBySlug: Record<string, string>;
}): Promise<ProjectRecord[]> {
  const projects = await readProjects();
  if (projects.length === 0) {
    throw new Error("Aucun projet en base. Cliquez d'abord sur « Initialiser depuis le site » puis enregistrez le carousel.");
  }

  const slugs = input.carouselSlugs.slice(0, MAX_CAROUSEL_SLIDES);
  const imageBySlug = input.imageBySlug || {};

  const updated = projects.map((p) => ({
    ...p,
    featuredOnHomeCarousel: slugs.includes(p.slug),
    homeCarouselImage: slugs.includes(p.slug) && imageBySlug[p.slug] ? imageBySlug[p.slug] : undefined,
    homeCarouselOrder: slugs.includes(p.slug) ? slugs.indexOf(p.slug) : undefined,
  }));

  const carouselOrder = slugs.map((s) => updated.find((p) => p.slug === s)).filter((p): p is ProjectRecord => Boolean(p));
  const rest = updated.filter((p) => !slugs.includes(p.slug));
  const reordered = [...carouselOrder, ...rest];

  await writeProjects(reordered);
  return reordered;
}

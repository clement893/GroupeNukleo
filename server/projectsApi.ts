import fs from "fs/promises";
import path from "path";
import { z } from "zod";

const DATA_DIR = path.resolve(process.cwd(), "data");
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
  /** Afficher dans le triptyque de la page Projets */
  featuredOnProjectsTriptych: z.boolean().optional(),
  /** Afficher dans le carrousel "Latest project" en haut de la page d'accueil */
  featuredOnHomeCarousel: z.boolean().optional(),
  /** Image à afficher dans le carrousel accueil (nom de fichier); si absent, utilise images[0] */
  homeCarouselImage: z.string().optional(),
});

export type ProjectRecord = z.infer<typeof projectSchema>;

export async function readProjects(): Promise<ProjectRecord[]> {
  try {
    const raw = await fs.readFile(PROJECTS_FILE, "utf-8");
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

async function writeProjects(projects: ProjectRecord[]): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(
    PROJECTS_FILE,
    JSON.stringify({ projects }, null, 2),
    "utf-8"
  );
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

/** Set which 3 projects appear in each triptych (and their order). Reorders projects so home triptych are first, then projects triptych, then rest. */
export async function setTriptychSlugs(input: {
  homeTriptychSlugs: string[];
  projectsTriptychSlugs: string[];
}): Promise<ProjectRecord[]> {
  const projects = await readProjects();
  const homeSlugs = input.homeTriptychSlugs.slice(0, 3);
  const projectsSlugs = input.projectsTriptychSlugs.slice(0, 3);

  const updated = projects.map((p) => ({
    ...p,
    featuredOnHomeTriptych: homeSlugs.includes(p.slug),
    featuredOnProjectsTriptych: projectsSlugs.includes(p.slug),
  }));

  const homeSet = new Set(homeSlugs);
  const homeOrder = homeSlugs.map((s) => updated.find((p) => p.slug === s)).filter(Boolean) as ProjectRecord[];
  const projectsOrder = projectsSlugs
    .filter((s) => !homeSet.has(s))
    .map((s) => updated.find((p) => p.slug === s))
    .filter(Boolean) as ProjectRecord[];
  const rest = updated.filter((p) => !homeSlugs.includes(p.slug) && !projectsSlugs.includes(p.slug));
  const reordered = [...homeOrder, ...projectsOrder, ...rest];

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
  const slugs = input.carouselSlugs.slice(0, MAX_CAROUSEL_SLIDES);
  const imageBySlug = input.imageBySlug || {};

  const updated = projects.map((p) => ({
    ...p,
    featuredOnHomeCarousel: slugs.includes(p.slug),
    homeCarouselImage: slugs.includes(p.slug) && imageBySlug[p.slug] ? imageBySlug[p.slug] : undefined,
  }));

  const carouselOrder = slugs.map((s) => updated.find((p) => p.slug === s)).filter(Boolean) as ProjectRecord[];
  const rest = updated.filter((p) => !slugs.includes(p.slug));
  const reordered = [...carouselOrder, ...rest];

  await writeProjects(reordered);
  return reordered;
}

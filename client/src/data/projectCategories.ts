import { imageNameToSlug } from '@/lib/projectSlug';
import { PROJECTS_DATA, type ProjectFilterCategory } from '@/data/projectsData';

/** Filtres affichés sous le triptyque sur la page Projets */
export const PROJECT_FILTER_LABELS = ['Tous', 'Brand', 'Site web', 'Plateforme', 'Marketing numérique', 'Campagnes', 'Transformation'] as const;
export type ProjectFilterValue = (typeof PROJECT_FILTER_LABELS)[number];

/**
 * Construit dynamiquement le mapping slug → catégorie à partir de PROJECTS_DATA.
 * Chaque image d'un projet hérite de la catégorie de ce projet.
 */
function buildSlugToFilter(): Record<string, Exclude<ProjectFilterValue, 'Tous'>> {
  const map: Record<string, Exclude<ProjectFilterValue, 'Tous'>> = {};
  for (const project of PROJECTS_DATA) {
    for (const image of project.images) {
      const slug = imageNameToSlug(image);
      map[slug] = project.category as Exclude<ProjectFilterValue, 'Tous'>;
    }
  }
  return map;
}

const SLUG_TO_FILTER = buildSlugToFilter();

const DEFAULT_FILTER: Exclude<ProjectFilterValue, 'Tous'> = 'Design';

/**
 * Retourne la catégorie de filtre pour un projet à partir du nom de fichier image.
 */
export function getProjectFilterCategory(imageName: string): Exclude<ProjectFilterValue, 'Tous'> {
  const slug = imageNameToSlug(imageName);
  return SLUG_TO_FILTER[slug] ?? DEFAULT_FILTER;
}

/**
 * Filtre une liste d'images par catégorie (ou retourne tout si "Tous").
 */
export function filterImagesByCategory(
  imageNames: string[],
  category: ProjectFilterValue
): string[] {
  if (category === 'Tous') return imageNames;
  return imageNames.filter((name) => getProjectFilterCategory(name) === category);
}

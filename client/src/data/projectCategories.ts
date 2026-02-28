import { imageNameToSlug } from '@/lib/projectSlug';

/** Filtres affichés sous le triptyque sur la page Projets */
export const PROJECT_FILTER_LABELS = ['Tous', 'Design', 'Brand', 'Site web', 'Plateforme', 'Transformation'] as const;
export type ProjectFilterValue = (typeof PROJECT_FILTER_LABELS)[number];

/** Slug → catégorie de filtre (une des 5, sans "Tous") */
const SLUG_TO_FILTER: Record<string, Exclude<ProjectFilterValue, 'Tous'>> = {
  'mbam-1': 'Design',
  'mbam-2': 'Design',
  'mbam-9': 'Design',
  'summitlaw-1': 'Brand',
  'summitlaw-2': 'Brand',
  'summitlaw-3': 'Brand',
  'summitlaw-13': 'Brand',
  'queertech-1': 'Plateforme',
  'queertech-2': 'Plateforme',
  'affilia-3': 'Brand',
  'affilia-4': 'Brand',
  'affilia-7': 'Brand',
  'adeleblais-2': 'Design',
  'humankind-1': 'Site web',
  'humankind-2': 'Site web',
  'matchstick-1': 'Site web',
  'matchstick-2': 'Site web',
  'doctoctoc-1': 'Plateforme',
  'doctoctoc-2': 'Plateforme',
  'nouvelleile-1': 'Site web',
  'reseau-sante-1': 'Transformation',
  'reseau-sante-2': 'Transformation',
  'ssco-1': 'Site web',
  'ssco-2': 'Site web',
  'ssco-3': 'Site web',
  'tam-1': 'Brand',
  'tam-3': 'Brand',
  'tam-4': 'Brand',
  'zu-2': 'Design',
};

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

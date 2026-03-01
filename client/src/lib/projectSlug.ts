/**
 * Convert project image filename to URL slug.
 * e.g. "MBAM_1.jpg" -> "mbam-1", "D28_24_14.jpg" -> "d28-24-14"
 */
export function imageNameToSlug(imageName: string): string {
  const withoutExt = imageName.replace(/\.(jpg|jpeg|png|gif|webp)$/i, '');
  return withoutExt.replace(/_/g, '-').toLowerCase();
}

/**
 * Find image filename from slug and list of image names.
 */
export function slugToImageName(slug: string, imageNames: string[]): string | null {
  const normalized = slug.toLowerCase();
  return imageNames.find((name) => imageNameToSlug(name) === normalized) ?? null;
}

/**
 * Project key = base name without trailing _number (e.g. MBAM_1.jpg → MBAM, SummitLaw_2.jpg → SummitLaw).
 * Used to deduplicate: one image per project in the gallery.
 */
export function getProjectKey(imageName: string): string {
  const withoutExt = imageName.replace(/\.(jpg|jpeg|png|gif|webp)$/i, '');
  return withoutExt.replace(/_\d+$/, '');
}

/** Projets exclus de la page Projets (ne pas afficher). */
const EXCLUDED_PROJECT_KEYS = ['Numerota', 'MentorAero'];

export function isExcludedProject(imageName: string): boolean {
  const key = getProjectKey(imageName);
  return EXCLUDED_PROJECT_KEYS.some((e) => e.toLowerCase() === key.toLowerCase());
}

/**
 * Keep only one image per project (first occurrence for each project key).
 * Removes gallery duplicates so each project appears once.
 */
export function oneImagePerProject(imageNames: string[]): string[] {
  const seen = new Set<string>();
  return imageNames.filter((name) => {
    const key = getProjectKey(name);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

/**
 * All image names that belong to the same project (same project key).
 * Use on the project detail page to show the full gallery for that project.
 */
export function getImagesForProject(projectKey: string, imageNames: string[]): string[] {
  return imageNames.filter((name) => getProjectKey(name) === projectKey);
}

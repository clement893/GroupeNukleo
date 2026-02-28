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

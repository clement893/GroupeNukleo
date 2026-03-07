/**
 * Site photos API - manages all site images via R2 + site_media table.
 * When R2 is configured, photos are stored in R2 and URLs in DB.
 * Fallbacks point to static files in /demo/ and /team/.
 */

import { getDb } from "./db";
import { siteMedia } from "../drizzle/schema";
import { eq, inArray } from "drizzle-orm";
import { isR2Configured, uploadToR2 } from "./r2Storage";

export const SITE_PHOTO_KEYS = {
  HERO_COVER: "hero_cover",
  HEADER_LOGO: "header_logo",
  FOOTER_LOGO: "footer_logo",
  MENU_LOGO: "menu_logo",
  NUKLEO_LOGO: "nukleo_logo",
  ROB_LOGO: "rob_logo",
  UNION_FALLBACK: "union_fallback",
  LEADER_CLEMENT: "leader_clement",
  LEADER_LIONEL: "leader_lionel",
} as const;

export const SITE_PHOTO_FALLBACKS: Record<string, string> = {
  [SITE_PHOTO_KEYS.HERO_COVER]: "/demo/agency-hero-cover.png",
  [SITE_PHOTO_KEYS.HEADER_LOGO]: "/demo/LogoGroupeNukleo.svg",
  [SITE_PHOTO_KEYS.FOOTER_LOGO]: "/demo/logo-groupe-nukleo-white.png",
  [SITE_PHOTO_KEYS.MENU_LOGO]: "/demo/logo-groupe-nukleo.png",
  [SITE_PHOTO_KEYS.NUKLEO_LOGO]: "/demo/NukleoLogo.svg",
  [SITE_PHOTO_KEYS.ROB_LOGO]: "/demo/RobLogo.svg",
  [SITE_PHOTO_KEYS.UNION_FALLBACK]: "/demo/consulting-hero-cover.png",
  [SITE_PHOTO_KEYS.LEADER_CLEMENT]: "/team/Clement.jpg",
  [SITE_PHOTO_KEYS.LEADER_LIONEL]: "/team/LionelPardin.jpg",
};

export const SITE_PHOTO_LABELS: Record<string, string> = {
  [SITE_PHOTO_KEYS.HERO_COVER]: "Image hero (bannière accueil)",
  [SITE_PHOTO_KEYS.HEADER_LOGO]: "Logo header",
  [SITE_PHOTO_KEYS.FOOTER_LOGO]: "Logo footer (blanc)",
  [SITE_PHOTO_KEYS.MENU_LOGO]: "Logo menu",
  [SITE_PHOTO_KEYS.NUKLEO_LOGO]: "Logo Nukleo (bloc entreprise)",
  [SITE_PHOTO_KEYS.ROB_LOGO]: "Logo Rouge On Blue (bloc entreprise)",
  [SITE_PHOTO_KEYS.UNION_FALLBACK]: "Image fallback section Union",
  [SITE_PHOTO_KEYS.LEADER_CLEMENT]: "Photo Clément Roy",
  [SITE_PHOTO_KEYS.LEADER_LIONEL]: "Photo Lionel Pardin",
};

const ALL_KEYS = Object.values(SITE_PHOTO_KEYS);

/** Get URL for a single photo key */
export async function getSitePhotoUrl(key: string): Promise<string> {
  if (!isR2Configured()) {
    return SITE_PHOTO_FALLBACKS[key] ?? "";
  }
  const db = await getDb();
  if (!db) return SITE_PHOTO_FALLBACKS[key] ?? "";

  const row = await db.select().from(siteMedia).where(eq(siteMedia.key, key)).limit(1);
  return row[0]?.url ?? SITE_PHOTO_FALLBACKS[key] ?? "";
}

/** Get all site photo URLs (for admin preview + client) */
export async function getAllSitePhotoUrls(): Promise<Record<string, string>> {
  const result: Record<string, string> = {};
  for (const key of ALL_KEYS) {
    result[key] = SITE_PHOTO_FALLBACKS[key] ?? "";
  }

  if (!isR2Configured()) return result;

  const db = await getDb();
  if (!db) return result;

  const rows = await db.select().from(siteMedia).where(inArray(siteMedia.key, ALL_KEYS));
  for (const row of rows) {
    result[row.key] = row.url;
  }
  return result;
}

/** Upload photo to R2 and save URL to DB */
export async function uploadSitePhotoToR2(
  key: string,
  buffer: Buffer,
  contentType: string,
  ext: string
): Promise<string> {
  if (!ALL_KEYS.includes(key)) throw new Error(`Invalid photo key: ${key}`);

  const safeKey = key.replace(/[^a-z0-9_]/gi, "_");
  const r2Key = `media/site-photos/${safeKey}${ext}`;
  const url = await uploadToR2(r2Key, buffer, contentType);

  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db
    .insert(siteMedia)
    .values({ key, url })
    .onConflictDoUpdate({
      target: siteMedia.key,
      set: { url, updatedAt: new Date() },
    });

  return url;
}

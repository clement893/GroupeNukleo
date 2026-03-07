/**
 * Media storage API - supports both R2 (Cloudflare) and local filesystem.
 * When R2 is configured, uploads go to R2 and URLs are stored in site_media table.
 * When R2 is not configured, falls back to local filesystem (current behavior).
 */

import { getDb } from "./db";
import { siteMedia } from "../drizzle/schema";
import { eq } from "drizzle-orm";
import { getUnionVideoPath } from "./unionVideoApi";
import { getPressReleasePath } from "./pressReleaseApi";
import { isR2Configured, uploadToR2, getR2PublicUrl } from "./r2Storage";

const SITE_MEDIA_KEYS = {
  UNION_VIDEO: "union_video",
  PRESS_RELEASE: "press_release",
} as const;

/** Get union video URL - from R2 (DB) or filesystem */
export async function getUnionVideoUrl(): Promise<string | null> {
  if (isR2Configured()) {
    const db = await getDb();
    if (db) {
      const row = await db.select().from(siteMedia).where(eq(siteMedia.key, SITE_MEDIA_KEYS.UNION_VIDEO)).limit(1);
      return row[0]?.url ?? null;
    }
  }
  return getUnionVideoPath();
}

/** Get press release URL - from R2 (DB) or filesystem */
export async function getPressReleaseUrl(): Promise<string | null> {
  if (isR2Configured()) {
    const db = await getDb();
    if (db) {
      const row = await db.select().from(siteMedia).where(eq(siteMedia.key, SITE_MEDIA_KEYS.PRESS_RELEASE)).limit(1);
      return row[0]?.url ?? null;
    }
  }
  return getPressReleasePath();
}

/** Save union video URL to DB (after R2 upload) */
export async function saveUnionVideoUrl(url: string): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db
    .insert(siteMedia)
    .values({ key: SITE_MEDIA_KEYS.UNION_VIDEO, url })
    .onConflictDoUpdate({
      target: siteMedia.key,
      set: { url, updatedAt: new Date() },
    });
}

/** Save press release URL to DB (after R2 upload) */
export async function savePressReleaseUrl(url: string): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db
    .insert(siteMedia)
    .values({ key: SITE_MEDIA_KEYS.PRESS_RELEASE, url })
    .onConflictDoUpdate({
      target: siteMedia.key,
      set: { url, updatedAt: new Date() },
    });
}

/** Upload union video to R2 and save URL to DB */
export async function uploadUnionVideoToR2(buffer: Buffer, contentType: string, ext: string): Promise<string> {
  const key = `media/union-video${ext}`;
  const url = await uploadToR2(key, buffer, contentType);
  await saveUnionVideoUrl(url);
  return url;
}

/** Upload press release PDF to R2 and save URL to DB */
export async function uploadPressReleaseToR2(buffer: Buffer): Promise<string> {
  const key = "media/press-release.pdf";
  const url = await uploadToR2(key, buffer, "application/pdf");
  await savePressReleaseUrl(url);
  return url;
}

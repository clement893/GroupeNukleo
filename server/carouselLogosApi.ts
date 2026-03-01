import fs from "fs/promises";
import path from "path";
import { z } from "zod";
import { eq, asc } from "drizzle-orm";
import { getDb } from "./db";
import { carouselLogos } from "../drizzle/schema";

const DATA_DIR = path.resolve(process.cwd(), "data");
const LOGOS_FILE = path.join(DATA_DIR, "carousel-logos.json");

const logoSchema = z.object({
  id: z.string(),
  src: z.string().min(1),
  alt: z.string().min(1),
  url: z.string().optional().default(""),
  displayOrder: z.number().int().min(0),
});

export type CarouselLogo = z.infer<typeof logoSchema>;

function rowToLogo(row: { id: number; src: string; alt: string; url: string; displayOrder: number }): CarouselLogo {
  return {
    id: String(row.id),
    src: row.src,
    alt: row.alt,
    url: row.url ?? "",
    displayOrder: row.displayOrder,
  };
}

/** One-time seed from JSON file into DB when table is empty (e.g. after first deploy with this migration) */
async function seedFromJsonIfNeeded(db: Awaited<ReturnType<typeof getDb>>): Promise<void> {
  if (!db) return;
  const existing = await db.select().from(carouselLogos).limit(1);
  if (existing.length > 0) return;
  try {
    const raw = await fs.readFile(LOGOS_FILE, "utf-8");
    const data = JSON.parse(raw);
    const logos = Array.isArray(data.logos) ? data.logos : [];
    const valid = logos
      .map((l: unknown) => logoSchema.safeParse(l))
      .filter((r): r is z.SafeParseSuccess<CarouselLogo> => r.success)
      .map((r) => r.data);
    if (valid.length === 0) return;
    for (let i = 0; i < valid.length; i++) {
      await db.insert(carouselLogos).values({
        src: valid[i].src,
        alt: valid[i].alt,
        url: valid[i].url ?? "",
        displayOrder: valid[i].displayOrder ?? i,
      });
    }
    console.log(`[CarouselLogos] Seeded ${valid.length} logos from JSON into DB`);
  } catch {
    // No file or invalid – ignore
  }
}

export async function readLogos(): Promise<CarouselLogo[]> {
  const db = await getDb();
  if (db) {
    try {
      await seedFromJsonIfNeeded(db);
      const rows = await db
        .select()
        .from(carouselLogos)
        .orderBy(asc(carouselLogos.displayOrder));
      return rows.map(rowToLogo);
    } catch (e) {
      console.warn("[CarouselLogos] DB read failed, falling back to JSON:", e);
    }
  }

  try {
    const raw = await fs.readFile(LOGOS_FILE, "utf-8");
    const data = JSON.parse(raw);
    const logos = Array.isArray(data.logos) ? data.logos : [];
    return logos
      .map((l: unknown) => logoSchema.safeParse(l))
      .filter((r): r is z.SafeParseSuccess<CarouselLogo> => r.success)
      .map((r) => r.data)
      .sort((a, b) => a.displayOrder - b.displayOrder);
  } catch {
    return [];
  }
}

async function writeLogos(logos: CarouselLogo[]): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const sorted = [...logos].sort((a, b) => a.displayOrder - b.displayOrder);
  await fs.writeFile(LOGOS_FILE, JSON.stringify({ logos: sorted }, null, 2), "utf-8");
}

export async function addLogo(input: { src: string; alt: string; url?: string }): Promise<CarouselLogo> {
  const db = await getDb();
  if (db) {
    try {
      const logos = await db.select().from(carouselLogos).orderBy(asc(carouselLogos.displayOrder));
      const maxOrder = logos.length === 0 ? 0 : Math.max(...logos.map((l) => l.displayOrder), -1) + 1;
      const [inserted] = await db
        .insert(carouselLogos)
        .values({
          src: input.src,
          alt: input.alt,
          url: input.url ?? "",
          displayOrder: maxOrder,
        })
        .returning();
      if (inserted) return rowToLogo(inserted);
    } catch (e) {
      console.warn("[CarouselLogos] DB add failed, falling back to JSON:", e);
    }
  }

  const logos = await readLogos();
  const maxOrder = logos.length === 0 ? 0 : Math.max(...logos.map((l) => l.displayOrder), -1) + 1;
  const newLogo: CarouselLogo = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
    src: input.src,
    alt: input.alt,
    url: input.url ?? "",
    displayOrder: maxOrder,
  };
  logos.push(newLogo);
  await writeLogos(logos);
  return newLogo;
}

export async function updateLogo(input: {
  id: string;
  src?: string;
  alt?: string;
  url?: string;
  displayOrder?: number;
}): Promise<CarouselLogo> {
  const db = await getDb();
  const numId = parseInt(input.id, 10);
  if (db && !Number.isNaN(numId)) {
    try {
      const [updated] = await db
        .update(carouselLogos)
        .set({
          ...(input.src !== undefined && { src: input.src }),
          ...(input.alt !== undefined && { alt: input.alt }),
          ...(input.url !== undefined && { url: input.url }),
          ...(input.displayOrder !== undefined && { displayOrder: input.displayOrder }),
          updatedAt: new Date(),
        })
        .where(eq(carouselLogos.id, numId))
        .returning();
      if (updated) return rowToLogo(updated);
    } catch (e) {
      console.warn("[CarouselLogos] DB update failed, falling back to JSON:", e);
    }
  }

  const logos = await readLogos();
  const index = logos.findIndex((l) => l.id === input.id);
  if (index === -1) throw new Error("Logo introuvable");
  const current = logos[index];
  logos[index] = {
    ...current,
    ...(input.src !== undefined && { src: input.src }),
    ...(input.alt !== undefined && { alt: input.alt }),
    ...(input.url !== undefined && { url: input.url }),
    ...(input.displayOrder !== undefined && { displayOrder: input.displayOrder }),
  };
  await writeLogos(logos);
  return logos[index];
}

export async function removeLogo(id: string): Promise<void> {
  const db = await getDb();
  const numId = parseInt(id, 10);
  if (db && !Number.isNaN(numId)) {
    try {
      const result = await db.delete(carouselLogos).where(eq(carouselLogos.id, numId)).returning({ id: carouselLogos.id });
      if (result.length > 0) return;
    } catch (e) {
      console.warn("[CarouselLogos] DB delete failed, falling back to JSON:", e);
    }
  }

  const logos = await readLogos();
  const filtered = logos.filter((l) => l.id !== id);
  if (filtered.length === logos.length) throw new Error("Logo introuvable");
  await writeLogos(filtered);
}

export async function reorderLogos(
  order: Array<{ id: string; displayOrder: number }>
): Promise<CarouselLogo[]> {
  const db = await getDb();
  if (db) {
    try {
      for (const { id, displayOrder } of order) {
        const numId = parseInt(id, 10);
        if (!Number.isNaN(numId)) {
          await db.update(carouselLogos).set({ displayOrder, updatedAt: new Date() }).where(eq(carouselLogos.id, numId));
        }
      }
      return readLogos();
    } catch (e) {
      console.warn("[CarouselLogos] DB reorder failed, falling back to JSON:", e);
    }
  }

  const logos = await readLogos();
  const orderMap = new Map(order.map((o) => [o.id, o.displayOrder]));
  for (const logo of logos) {
    const o = orderMap.get(logo.id);
    if (o !== undefined) logo.displayOrder = o;
  }
  await writeLogos(logos);
  return readLogos();
}

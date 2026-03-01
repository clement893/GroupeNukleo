import { getDb } from "./db";
import { pageTexts } from "../drizzle/schema";
import { eq, asc } from "drizzle-orm";
import { readFile } from "fs/promises";
import path from "path";

function flattenObj(obj: Record<string, unknown>, prefix = ""): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (v !== null && typeof v === "object" && !Array.isArray(v)) {
      Object.assign(out, flattenObj(v as Record<string, unknown>, key));
    } else if (typeof v === "string") {
      out[key] = v;
    } else if (Array.isArray(v) && v.every((x) => typeof x === "string")) {
      out[key] = (v as string[]).join("\n");
    }
  }
  return out;
}

export async function getAllPageTexts() {
  const db = await getDb();
  if (!db) return [];
  try {
    return await db.select().from(pageTexts).orderBy(asc(pageTexts.key));
  } catch (e: unknown) {
    const code = e && typeof e === "object" && "code" in e ? (e as { code: string }).code : null;
    if (code === "42P01") {
      console.warn("[PageTexts] Table page_texts does not exist yet.");
      return [];
    }
    console.error("[PageTexts] getAll error:", e);
    throw e;
  }
}

export async function updatePageText(id: number, textEn: string, textFr: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db
    .update(pageTexts)
    .set({ textEn, textFr, updatedAt: new Date() })
    .where(eq(pageTexts.id, id));
  return { success: true };
}

export async function createPageText(key: string, textEn: string, textFr: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const [row] = await db
    .insert(pageTexts)
    .values({ key, textEn, textFr })
    .returning();
  return row;
}

export async function importPageTextsFromJson(en: Record<string, string>, fr: Record<string, string>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const keys = new Set([...Object.keys(en), ...Object.keys(fr)]);
  let created = 0;
  let updated = 0;
  for (const key of keys) {
    const textEn = en[key] ?? "";
    const textFr = fr[key] ?? "";
    const existing = await db.select().from(pageTexts).where(eq(pageTexts.key, key)).limit(1);
    if (existing.length > 0) {
      await db
        .update(pageTexts)
        .set({ textEn, textFr, updatedAt: new Date() })
        .where(eq(pageTexts.id, existing[0].id));
      updated++;
    } else {
      await db.insert(pageTexts).values({ key, textEn, textFr });
      created++;
    }
  }
  return { created, updated, total: keys.size };
}

/** Read locale JSON files from disk, flatten, and import into page_texts. Paths relative to cwd or absolute. */
export async function seedFromLocaleFiles(
  enPath: string = path.join(process.cwd(), "client", "src", "locales", "en.json"),
  frPath: string = path.join(process.cwd(), "client", "src", "locales", "fr.json")
) {
  let enRaw: string;
  let frRaw: string;
  try {
    enRaw = await readFile(enPath, "utf-8");
  } catch (e) {
    throw new Error(`Cannot read en locale file at ${enPath}: ${e instanceof Error ? e.message : String(e)}`);
  }
  try {
    frRaw = await readFile(frPath, "utf-8");
  } catch (e) {
    throw new Error(`Cannot read fr locale file at ${frPath}: ${e instanceof Error ? e.message : String(e)}`);
  }
  const en = flattenObj(JSON.parse(enRaw) as Record<string, unknown>);
  const fr = flattenObj(JSON.parse(frRaw) as Record<string, unknown>);
  return importPageTextsFromJson(en, fr);
}

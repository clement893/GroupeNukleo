import { getDb } from "./db";
import { pageTexts } from "../drizzle/schema";
import { eq, asc } from "drizzle-orm";
import { readFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** Résout le répertoire des fichiers locales (en.json / fr.json) — même source que le site. */
function getLocalesDir(): string[] {
  const candidates: string[] = [];
  if (process.env.LOCALES_DIR) {
    candidates.push(path.resolve(process.env.LOCALES_DIR));
  }
  const cwd = process.cwd();
  candidates.push(
    path.join(cwd, "dist", "locales"),
    path.join(cwd, "locales"),
    path.join(cwd, "client", "src", "locales")
  );
  if (__dirname) {
    candidates.push(path.join(__dirname, "locales"), path.join(__dirname, "..", "locales"));
  }
  return candidates;
}

function getLocaleFilePaths(): { en: string; fr: string }[] {
  const dirs = getLocalesDir();
  return dirs.map((dir) => ({
    en: path.join(dir, "en.json"),
    fr: path.join(dir, "fr.json"),
  }));
}

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

/** Read locale JSON files from disk, flatten, and import into page_texts. Uses same resolution as getLocaleSections (LOCALES_DIR, dist/locales, bundle dir, etc.). */
export async function seedFromLocaleFiles(
  enPath?: string,
  frPath?: string
): Promise<{ created: number; updated: number; total: number; source?: string }> {
  const candidates: [string, string][] = [];
  if (enPath && frPath) {
    candidates.push([enPath, frPath]);
  }
  for (const { en: enP, fr: frP } of getLocaleFilePaths()) {
    if (!candidates.some(([a, b]) => a === enP && b === frP)) candidates.push([enP, frP]);
  }

  let lastErr: Error | null = null;
  for (const [enP, frP] of candidates) {
    try {
      const enRaw = await readFile(enP, "utf-8");
      const frRaw = await readFile(frP, "utf-8");
      const en = flattenObj(JSON.parse(enRaw) as Record<string, unknown>);
      const fr = flattenObj(JSON.parse(frRaw) as Record<string, unknown>);
      const result = await importPageTextsFromJson(en, fr);
      return { ...result, source: enP };
    } catch (e) {
      lastErr = e instanceof Error ? e : new Error(String(e));
      continue;
    }
  }

  throw new Error(
    `Could not read locale files. Tried: ${candidates.map(([p]) => p).join("; ")}. Last error: ${lastErr?.message ?? "unknown"}. Set LOCALES_DIR to the folder containing en.json and fr.json if needed.`
  );
}

/** Ordre prioritaire des sections (pages du site) pour l’admin. */
const SECTION_ORDER = [
  "home", "services", "about", "contact", "projects", "resources", "faq", "leo",
  "nav", "header", "menu", "footer", "preFooter", "common", "notFound", "alt",
  "hero", "capabilities", "manifesto", "trinity", "cta", "testimonials", "whoWeServe", "clients",
  "startProject", "expertise", "artsCulture", "agencies", "media", "lab", "bureau", "studio",
  "artsCultureCommitment", "assessment", "seo", "pwa", "other",
];
const HIDDEN_SECTIONS = new Set(["approche"]);

/** Returns the list of section keys (first segment of locale keys) from the site’s locale files. Used by admin to show the right pages. Prefers dist/locale-sections.json (generated at build) so production always shows correct sections. */
export async function getLocaleSections(): Promise<string[]> {
  const embeddedPath = path.join(__dirname, "locale-sections.json");
  try {
    const raw = await readFile(embeddedPath, "utf-8");
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.every((x) => typeof x === "string")) return parsed;
  } catch {
    // fallback: read fr.json from candidates
  }
  for (const { fr: frP } of getLocaleFilePaths()) {
    try {
      const raw = await readFile(frP, "utf-8");
      const data = JSON.parse(raw) as Record<string, unknown>;
      const keys = Object.keys(data).filter((k) => !HIDDEN_SECTIONS.has(k));
      const orderSet = new Set(SECTION_ORDER);
      const ordered = SECTION_ORDER.filter((k) => keys.includes(k));
      const rest = keys.filter((k) => !orderSet.has(k));
      return [...ordered, ...rest];
    } catch {
      continue;
    }
  }
  return [...SECTION_ORDER];
}

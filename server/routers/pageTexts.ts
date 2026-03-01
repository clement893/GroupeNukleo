import { adminProcedure, publicProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { pageTexts } from "../../drizzle/schema";
import { eq, asc } from "drizzle-orm";
import { z } from "zod";

export const pageTextsRouter = router({
  /** List all page texts (admin) */
  getAll: adminProcedure.query(async () => {
    try {
      const db = await getDb();
      if (!db) return [];
      const rows = await db.select().from(pageTexts).orderBy(asc(pageTexts.key));
      return rows;
    } catch (e: unknown) {
      const code = e && typeof e === "object" && "code" in e ? (e as { code: string }).code : null;
      if (code === "42P01") {
        console.warn("[PageTexts] Table page_texts does not exist yet. Run init-db or migration.");
        return [];
      }
      console.error("[PageTexts] getAll error:", e);
      throw e;
    }
  }),

  /** Public: get all translations for a language (flat key -> value). Used by frontend to override locale JSON. */
  getTranslations: publicProcedure
    .input(z.object({ lang: z.enum(["en", "fr"]) }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return {};
      const rows = await db.select().from(pageTexts).orderBy(asc(pageTexts.key));
      const out: Record<string, string> = {};
      for (const row of rows) {
        const value = input.lang === "en" ? row.textEn : row.textFr;
        if (value) out[row.key] = value;
      }
      return out;
    }),

  /** Update one page text (admin) */
  update: adminProcedure
    .input(
      z.object({
        id: z.number(),
        textEn: z.string(),
        textFr: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");
      await db
        .update(pageTexts)
        .set({
          textEn: input.textEn,
          textFr: input.textFr,
          updatedAt: new Date(),
        })
        .where(eq(pageTexts.id, input.id));
      return { success: true };
    }),

  /** Create a new page text (admin) */
  create: adminProcedure
    .input(
      z.object({
        key: z.string().min(1).max(512),
        textEn: z.string(),
        textFr: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");
      const [row] = await db
        .insert(pageTexts)
        .values({
          key: input.key,
          textEn: input.textEn,
          textFr: input.textFr,
        })
        .returning();
      return row;
    }),

  /** Delete a page text (admin) */
  delete: adminProcedure.input(z.object({ id: z.number() })).mutation(async ({ input }) => {
    const db = await getDb();
    if (!db) throw new Error("Database not available");
    await db.delete(pageTexts).where(eq(pageTexts.id, input.id));
    return { success: true };
  }),

  /** Import flat keys from JSON (admin). Payload: { en: Record<string, string>, fr: Record<string, string> } - keys must match. */
  importFromJson: adminProcedure
    .input(
      z.object({
        en: z.record(z.string()),
        fr: z.record(z.string()),
      })
    )
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");
      const keys = new Set([...Object.keys(input.en), ...Object.keys(input.fr)]);
      let created = 0;
      let updated = 0;
      for (const key of keys) {
        const textEn = input.en[key] ?? "";
        const textFr = input.fr[key] ?? "";
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
    }),
});

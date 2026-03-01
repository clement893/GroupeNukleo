import { adminProcedure, publicProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { pageVisibility } from "../../drizzle/schema";
import { eq, desc } from "drizzle-orm";
import { z } from "zod";

export const pageVisibilityRouter = router({
  // Get all pages visibility (public - needed for frontend menu/footer filtering)
  // This is safe because it only returns visibility status, not sensitive data
  getAll: publicProcedure.query(async () => {
    try {
      const db = await getDb();
      if (!db) {
        throw new Error("Database not available");
      }
      
      const pages = await db
        .select()
        .from(pageVisibility)
        .orderBy(desc(pageVisibility.updatedAt));

      return Array.isArray(pages) ? pages : [];
    } catch (error: unknown) {
      const code =
        (error && typeof error === 'object' && 'code' in error ? (error as { code: string }).code : null) ||
        (error && typeof error === 'object' && 'cause' in error && error.cause && typeof error.cause === 'object' && 'code' in error.cause
          ? (error.cause as { code: string }).code
          : null);
      if (code === 'ECONNREFUSED' || code === '42P01') {
        if (code === '42P01') {
          console.warn("[PageVisibility] Table page_visibility does not exist yet; run init-db or deploy with updated init-db.");
        }
        return [];
      }
      console.error("[PageVisibility] Error fetching pages:", error);
      return [];
    }
  }),

  // Get visibility for a specific path (public - needed for frontend routing)
  getByPath: publicProcedure
    .input(z.object({ path: z.string() }))
    .query(async ({ input }) => {
      try {
        const db = await getDb();
        if (!db) {
          throw new Error("Database not available");
        }
        
        const page = await db
          .select()
          .from(pageVisibility)
          .where(eq(pageVisibility.path, input.path))
          .limit(1);

        // If page doesn't exist in DB, default to visible
        return page[0] || { path: input.path, isVisible: true };
      } catch (error: unknown) {
        const code =
          (error && typeof error === 'object' && 'code' in error ? (error as { code: string }).code : null) ||
          (error && typeof error === 'object' && 'cause' in error && error.cause && typeof error.cause === 'object' && 'code' in error.cause
            ? (error.cause as { code: string }).code
            : null);
        if (code === '42P01') {
          console.warn("[PageVisibility] Table page_visibility does not exist yet; run init-db or deploy with updated init-db.");
        } else {
          console.error("[PageVisibility] Error fetching page visibility:", error);
        }
        return { path: input.path, isVisible: true };
      }
    }),

  // Update visibility for a page (admin only)
  updateVisibility: adminProcedure
    .input(
      z.object({
        path: z.string(),
        isVisible: z.boolean(),
        description: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const db = await getDb();
        if (!db) {
          throw new Error("Database not available");
        }

        // Check if page exists
        const existing = await db
          .select()
          .from(pageVisibility)
          .where(eq(pageVisibility.path, input.path))
          .limit(1);

        if (existing.length > 0) {
          // Update existing
          await db
            .update(pageVisibility)
            .set({
              isVisible: input.isVisible,
              description: input.description,
              updatedAt: new Date(),
            })
            .where(eq(pageVisibility.path, input.path));
        } else {
          // Create new
          await db.insert(pageVisibility).values({
            path: input.path,
            isVisible: input.isVisible,
            description: input.description,
          });
        }

        return { success: true };
      } catch (error) {
        console.error("[PageVisibility] Error updating visibility:", error);
        throw new Error("Failed to update page visibility");
      }
    }),

  // Bulk update visibility (admin only)
  bulkUpdate: adminProcedure
    .input(
      z.array(
        z.object({
          path: z.string(),
          isVisible: z.boolean(),
          description: z.string().optional(),
        })
      )
    )
    .mutation(async ({ input }) => {
      try {
        const db = await getDb();
        if (!db) {
          throw new Error("Database not available");
        }

        for (const page of input) {
          const existing = await db
            .select()
            .from(pageVisibility)
            .where(eq(pageVisibility.path, page.path))
            .limit(1);

          if (existing.length > 0) {
            await db
              .update(pageVisibility)
              .set({
                isVisible: page.isVisible,
                description: page.description,
                updatedAt: new Date(),
              })
              .where(eq(pageVisibility.path, page.path));
          } else {
            await db.insert(pageVisibility).values({
              path: page.path,
              isVisible: page.isVisible,
              description: page.description,
            });
          }
        }

        return { success: true };
      } catch (error) {
        console.error("[PageVisibility] Error bulk updating:", error);
        throw new Error("Failed to bulk update page visibility");
      }
    }),
});

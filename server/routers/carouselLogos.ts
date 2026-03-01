import { z } from "zod";
import { router, adminProcedure, publicProcedure } from "../_core/trpc";
import { readLogos, addLogo, updateLogo, removeLogo, reorderLogos } from "../carouselLogosApi";

export const carouselLogosRouter = router({
  getAll: publicProcedure.query(() => readLogos()),

  getAllAdmin: adminProcedure.query(() => readLogos()),

  add: adminProcedure
    .input(
      z.object({
        src: z.string().min(1),
        alt: z.string().min(1),
        url: z.string().optional().default(""),
      })
    )
    .mutation(({ input }) => addLogo(input)),

  update: adminProcedure
    .input(
      z.object({
        id: z.string(),
        src: z.string().min(1).optional(),
        alt: z.string().min(1).optional(),
        url: z.string().optional(),
        displayOrder: z.number().int().min(0).optional(),
      })
    )
    .mutation(({ input }) => updateLogo(input)),

  remove: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ input }) => removeLogo(input.id)),

  reorder: adminProcedure
    .input(z.array(z.object({ id: z.string(), displayOrder: z.number().int().min(0) })))
    .mutation(({ input }) => reorderLogos(input)),
});

import { z } from "zod";
import { router, adminProcedure, publicProcedure } from "../_core/trpc";
import {
  readProjects,
  initProjects,
  updateProject,
  setTriptychSlugs,
  setCarouselSlugs,
  projectSchema,
} from "../projectsApi";

export const projectsRouter = router({
  list: publicProcedure.query(() => readProjects()),

  listAdmin: adminProcedure.query(() => readProjects()),

  initFromClient: adminProcedure
    .input(z.object({ projects: z.array(projectSchema) }))
    .mutation(({ input }) => initProjects(input.projects)),

  update: adminProcedure
    .input(projectSchema)
    .mutation(({ input }) => updateProject(input)),

  setTriptychSlugs: adminProcedure
    .input(
      z.object({
        homeTriptychSlugs: z.array(z.string()).max(3),
        projectsTriptychSlugs: z.array(z.string()).max(3),
        homeTriptychImageBySlug: z.record(z.string(), z.string()).optional(),
        projectsTriptychImageBySlug: z.record(z.string(), z.string()).optional(),
      })
    )
    .mutation(({ input }) =>
      setTriptychSlugs({
        homeTriptychSlugs: input.homeTriptychSlugs,
        projectsTriptychSlugs: input.projectsTriptychSlugs,
        homeTriptychImageBySlug: input.homeTriptychImageBySlug ?? {},
        projectsTriptychImageBySlug: input.projectsTriptychImageBySlug ?? {},
      })
    ),

  setCarouselSlugs: adminProcedure
    .input(
      z.object({
        carouselSlugs: z.array(z.string()).max(6),
        imageBySlug: z.record(z.string(), z.string()).optional(),
      })
    )
    .mutation(({ input }) => setCarouselSlugs({ carouselSlugs: input.carouselSlugs, imageBySlug: input.imageBySlug ?? {} })),
});

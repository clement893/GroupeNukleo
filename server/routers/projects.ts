import { z } from "zod";
import { router, adminProcedure, publicProcedure } from "../_core/trpc";
import {
  readProjects,
  initProjects,
  updateProject,
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
});

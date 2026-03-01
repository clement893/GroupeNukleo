import { z } from "zod";
import fs from "fs/promises";
import path from "path";
import { router, adminProcedure, publicProcedure } from "../_core/trpc";

const DATA_DIR = path.resolve(process.cwd(), "data");
const LOGOS_FILE = path.join(DATA_DIR, "carousel-logos.json");

const logoSchema = z.object({
  id: z.string(),
  src: z.string().min(1, "Chemin image requis"),
  alt: z.string().min(1, "Texte alternatif requis"),
  url: z.string().optional().default(""),
  displayOrder: z.number().int().min(0),
});

type Logo = z.infer<typeof logoSchema>;

async function readLogos(): Promise<Logo[]> {
  try {
    const raw = await fs.readFile(LOGOS_FILE, "utf-8");
    const data = JSON.parse(raw);
    const logos = Array.isArray(data.logos) ? data.logos : [];
    return logos
      .map((l: unknown) => logoSchema.safeParse(l))
      .filter((r): r is z.SafeParseSuccess<Logo> => r.success)
      .map((r) => r.data)
      .sort((a, b) => a.displayOrder - b.displayOrder);
  } catch {
    return [];
  }
}

async function writeLogos(logos: Logo[]): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const sorted = [...logos].sort((a, b) => a.displayOrder - b.displayOrder);
  await fs.writeFile(LOGOS_FILE, JSON.stringify({ logos: sorted }, null, 2), "utf-8");
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export const carouselLogosRouter = router({
  getAll: publicProcedure.query(async () => {
    return readLogos();
  }),

  getAllAdmin: adminProcedure.query(async () => {
    return readLogos();
  }),

  add: adminProcedure
    .input(
      z.object({
        src: z.string().min(1),
        alt: z.string().min(1),
        url: z.string().optional().default(""),
      })
    )
    .mutation(async ({ input }) => {
      const logos = await readLogos();
      const maxOrder = logos.length === 0 ? 0 : Math.max(...logos.map((l) => l.displayOrder), -1) + 1;
      const newLogo: Logo = {
        id: generateId(),
        src: input.src,
        alt: input.alt,
        url: input.url ?? "",
        displayOrder: maxOrder,
      };
      logos.push(newLogo);
      await writeLogos(logos);
      return newLogo;
    }),

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
    .mutation(async ({ input }) => {
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
    }),

  remove: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      const logos = await readLogos();
      const filtered = logos.filter((l) => l.id !== input.id);
      if (filtered.length === logos.length) throw new Error("Logo introuvable");
      await writeLogos(filtered);
      return { success: true };
    }),

  reorder: adminProcedure
    .input(z.array(z.object({ id: z.string(), displayOrder: z.number().int().min(0) })))
    .mutation(async ({ input }) => {
      const logos = await readLogos();
      const orderMap = new Map(input.map((o) => [o.id, o.displayOrder]));
      for (const logo of logos) {
        const order = orderMap.get(logo.id);
        if (order !== undefined) logo.displayOrder = order;
      }
      await writeLogos(logos);
      return readLogos();
    }),
});

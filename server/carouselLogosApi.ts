import fs from "fs/promises";
import path from "path";
import { z } from "zod";

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

export async function readLogos(): Promise<CarouselLogo[]> {
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

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export async function addLogo(input: { src: string; alt: string; url?: string }): Promise<CarouselLogo> {
  const logos = await readLogos();
  const maxOrder = logos.length === 0 ? 0 : Math.max(...logos.map((l) => l.displayOrder), -1) + 1;
  const newLogo: CarouselLogo = {
    id: generateId(),
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
  const logos = await readLogos();
  const filtered = logos.filter((l) => l.id !== id);
  if (filtered.length === logos.length) throw new Error("Logo introuvable");
  await writeLogos(filtered);
}

export async function reorderLogos(
  order: Array<{ id: string; displayOrder: number }>
): Promise<CarouselLogo[]> {
  const logos = await readLogos();
  const orderMap = new Map(order.map((o) => [o.id, o.displayOrder]));
  for (const logo of logos) {
    const o = orderMap.get(logo.id);
    if (o !== undefined) logo.displayOrder = o;
  }
  await writeLogos(logos);
  return readLogos();
}

import fs from "fs/promises";
import path from "path";

const PDF_BASENAME = "press-release";

/** Get the path where the press release PDF is stored on disk.
 * In production, use dist/public/demo so uploaded files are served by express.static.
 * In development, use client/public/demo (Vite serves from client/public).
 */
export function getPressReleaseDir(): string {
  const isProd = process.env.NODE_ENV === "production";
  const baseDir = isProd
    ? path.resolve(process.cwd(), "dist", "public", "demo")
    : path.resolve(process.cwd(), "client", "public", "demo");
  return baseDir;
}

/** Check if the press release PDF exists and return its public path */
export async function getPressReleasePath(): Promise<string | null> {
  const dir = getPressReleaseDir();
  try {
    const files = await fs.readdir(dir);
    const pdfFile = files.find((f) => f.startsWith(PDF_BASENAME) && /\.pdf$/i.test(f));
    return pdfFile ? `/demo/${pdfFile}` : null;
  } catch {
    return null;
  }
}

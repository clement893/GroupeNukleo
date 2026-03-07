import fs from "fs/promises";
import path from "path";

const VIDEO_BASENAME = "union-video";

/** Get the path where the union video is stored on disk.
 * In production, use dist/public/demo so uploaded files are served by express.static.
 * In development, use client/public/demo (Vite serves from client/public).
 */
export function getUnionVideoDir(): string {
  const isProd = process.env.NODE_ENV === "production";
  const baseDir = isProd
    ? path.resolve(process.cwd(), "dist", "public", "demo")
    : path.resolve(process.cwd(), "client", "public", "demo");
  return baseDir;
}

/** Get the full path to the video file (checks mp4 first, then webm) */
export function getUnionVideoFilePath(): string {
  return path.join(getUnionVideoDir(), `${VIDEO_BASENAME}.mp4`);
}

/** Check if the union video file exists and return its public path */
export async function getUnionVideoPath(): Promise<string | null> {
  const dir = getUnionVideoDir();
  try {
    const files = await fs.readdir(dir);
    const videoFile = files.find((f) => f.startsWith(VIDEO_BASENAME) && /\.(mp4|webm|mov)$/i.test(f));
    return videoFile ? `/demo/${videoFile}` : null;
  } catch {
    return null;
  }
}

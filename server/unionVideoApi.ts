import fs from "fs/promises";
import path from "path";

const VIDEO_BASENAME = "union-video";

/** Get the path where the union video is stored on disk */
export function getUnionVideoDir(): string {
  return path.resolve(process.cwd(), "client", "public", "demo");
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
    const videoFile = files.find((f) => f.startsWith(VIDEO_BASENAME) && /\.(mp4|webm)$/i.test(f));
    return videoFile ? `/demo/${videoFile}` : null;
  } catch {
    return null;
  }
}

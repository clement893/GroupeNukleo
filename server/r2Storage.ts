/**
 * Cloudflare R2 storage - S3-compatible object storage.
 * Used for union video, press release PDF, and other media uploads.
 *
 * Required env vars when R2 is enabled:
 * - R2_ACCOUNT_ID
 * - R2_ACCESS_KEY_ID
 * - R2_SECRET_ACCESS_KEY
 * - R2_BUCKET_NAME
 * - R2_PUBLIC_URL (base URL for public access, e.g. https://pub-xxx.r2.dev or custom domain)
 */

import { S3Client, PutObjectCommand, HeadObjectCommand } from "@aws-sdk/client-s3";

export const R2_KEYS = {
  UNION_VIDEO: "media/union-video",
  PRESS_RELEASE: "media/press-release.pdf",
} as const;

function getR2Config() {
  const accountId = process.env.R2_ACCOUNT_ID;
  const accessKeyId = process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
  const bucketName = process.env.R2_BUCKET_NAME;
  const publicUrl = process.env.R2_PUBLIC_URL?.replace(/\/$/, ""); // trim trailing slash

  if (!accountId || !accessKeyId || !secretAccessKey || !bucketName || !publicUrl) {
    return null;
  }

  return {
    accountId,
    accessKeyId,
    secretAccessKey,
    bucketName,
    publicUrl,
  };
}

let r2Client: S3Client | null = null;

function getR2Client(): S3Client | null {
  const config = getR2Config();
  if (!config) return null;

  if (!r2Client) {
    r2Client = new S3Client({
      region: "auto",
      endpoint: `https://${config.accountId}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
      },
    });
  }

  return r2Client;
}

/** Check if R2 is configured and available */
export function isR2Configured(): boolean {
  return getR2Config() !== null;
}

/** Upload a buffer to R2 and return the public URL */
export async function uploadToR2(
  key: string,
  buffer: Buffer,
  contentType: string
): Promise<string> {
  const config = getR2Config();
  const client = getR2Client();

  if (!config || !client) {
    throw new Error("R2 is not configured. Set R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME, R2_PUBLIC_URL.");
  }

  await client.send(
    new PutObjectCommand({
      Bucket: config.bucketName,
      Key: key,
      Body: buffer,
      ContentType: contentType,
    })
  );

  return `${config.publicUrl}/${key}`;
}

/** Check if an object exists in R2 */
export async function existsInR2(key: string): Promise<boolean> {
  const client = getR2Client();
  const config = getR2Config();

  if (!client || !config) return false;

  try {
    await client.send(
      new HeadObjectCommand({
        Bucket: config.bucketName,
        Key: key,
      })
    );
    return true;
  } catch {
    return false;
  }
}

/** Get the public URL for an R2 object (does not check existence) */
export function getR2PublicUrl(key: string): string {
  const config = getR2Config();
  if (!config) throw new Error("R2 is not configured");
  return `${config.publicUrl}/${key}`;
}

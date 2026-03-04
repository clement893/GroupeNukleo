/**
 * Rend le fond noir du logo transparent (remplace le fichier).
 * Usage: node scripts/logo-remove-black-bg.mjs
 */
import sharp from 'sharp';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const logoPath = join(__dirname, '../client/public/demo/nukleo-logo-tagline.png');

// Seuil : pixels plus sombres que ça deviennent transparents (0–255)
const BLACK_THRESHOLD = 25;

const buffer = readFileSync(logoPath);
const image = sharp(buffer);
const { data, info } = await image.raw().ensureAlpha().toBuffer({ resolveWithObject: true });
const { width, height, channels } = info;

for (let i = 0; i < data.length; i += channels) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  if (r <= BLACK_THRESHOLD && g <= BLACK_THRESHOLD && b <= BLACK_THRESHOLD) {
    data[i + 3] = 0;
  }
}

await sharp(data, { raw: { width, height, channels } })
  .png()
  .toFile(logoPath);

console.log('Logo mis à jour : fond noir rendu transparent.');

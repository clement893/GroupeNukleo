/**
 * Prend l'image logo EN (fond noir) et produit nukleo-logo-tagline-en.png avec fond transparent.
 * Usage: node scripts/logo-en-remove-black-bg.mjs [chemin_source]
 * Par défaut: .cursor/projects/.../assets/Nukleo_couleur_RVB_Tagline_ENG-*.png → client/public/demo/nukleo-logo-tagline-en.png
 */
import sharp from 'sharp';
import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const defaultInput = join(root, '.cursor/projects/Users-margauxgoethals-nukleo-digital/assets/Nukleo_couleur_RVB_Tagline_ENG-02262f23-9c2d-4ecd-9c1f-914f8d6cc57f.png');
const outputPath = join(root, 'client/public/demo/nukleo-logo-tagline-en.png');

const inputPath = process.argv[2] || defaultInput;
if (!existsSync(inputPath)) {
  console.error('Fichier source introuvable:', inputPath);
  process.exit(1);
}

const BLACK_THRESHOLD = 35;

const buffer = readFileSync(inputPath);
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
  .toFile(outputPath);

console.log('Logo EN mis à jour : fond noir rendu transparent →', outputPath);

/**
 * Copies client locale JSON files to dist/locales so the server can read them
 * at runtime for POST /api/admin/page-texts/seed-from-locales (Railway production).
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const srcEn = path.join(root, "client", "src", "locales", "en.json");
const srcFr = path.join(root, "client", "src", "locales", "fr.json");
const outDir = path.join(root, "dist", "locales");
const outEn = path.join(outDir, "en.json");
const outFr = path.join(outDir, "fr.json");

if (!fs.existsSync(srcEn) || !fs.existsSync(srcFr)) {
  console.warn("[copy-locales] Source locale files not found, skipping.");
  process.exit(0);
}

fs.mkdirSync(outDir, { recursive: true });
fs.copyFileSync(srcEn, outEn);
fs.copyFileSync(srcFr, outFr);
console.log("[copy-locales] Copied en.json and fr.json to dist/locales");

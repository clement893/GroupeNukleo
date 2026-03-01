/**
 * Build-time: reads client/src/locales/fr.json and writes dist/locale-sections.json
 * so the server always has the correct section list at runtime (no path resolution issues on Railway).
 */
const fs = require("fs");
const path = require("path");

const SECTION_ORDER = [
  "home", "services", "about", "contact", "projects", "resources", "faq", "leo",
  "nav", "header", "menu", "footer", "preFooter", "common", "notFound", "alt",
  "hero", "capabilities", "manifesto", "trinity", "cta", "testimonials", "whoWeServe", "clients",
  "startProject", "expertise", "artsCulture", "agencies", "media", "lab", "bureau", "studio",
  "artsCultureCommitment", "assessment", "seo", "pwa", "other",
];
const HIDDEN_SECTIONS = new Set(["approche"]);

const root = path.join(__dirname, "..");
const frPath = path.join(root, "client", "src", "locales", "fr.json");
const outPath = path.join(root, "dist", "locale-sections.json");

if (!fs.existsSync(frPath)) {
  console.warn("[generate-locale-sections] fr.json not found, skipping.");
  process.exit(0);
}

const data = JSON.parse(fs.readFileSync(frPath, "utf-8"));
const keys = Object.keys(data).filter((k) => !HIDDEN_SECTIONS.has(k));
const orderSet = new Set(SECTION_ORDER);
const ordered = SECTION_ORDER.filter((k) => keys.includes(k));
const rest = keys.filter((k) => !orderSet.has(k));
const sections = [...ordered, ...rest];

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(sections, null, 0));
console.log("[generate-locale-sections] Wrote dist/locale-sections.json with", sections.length, "sections");

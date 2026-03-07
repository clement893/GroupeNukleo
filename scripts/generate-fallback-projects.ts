/**
 * Build-time script: generates dist/data/fallback-projects.json (empty by default).
 * The server projectsApi uses this when data/projects.json and DB projects_store are empty.
 */
import fs from "fs";
import path from "path";

const root = path.resolve(process.cwd());
const outDir = path.join(root, "dist", "data");
const outFile = path.join(outDir, "fallback-projects.json");

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outFile, JSON.stringify({ projects: [] }, null, 2), "utf-8");
console.log("[generate-fallback-projects] Wrote", outFile, "with 0 projects");

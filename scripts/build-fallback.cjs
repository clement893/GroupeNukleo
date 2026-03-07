/**
 * Bundles generate-fallback-projects.ts with esbuild and runs it with node.
 * Faster than tsx on Railway (no on-the-fly TS compile).
 */
const esbuild = require("esbuild");
const path = require("path");
const fs = require("fs");
const { spawnSync } = require("child_process");

const root = path.join(__dirname, "..");
const outDir = path.join(root, "dist", "scripts");
const outFile = path.join(outDir, "gen-fallback.mjs");
const entry = path.join(root, "scripts", "generate-fallback-projects.ts");

fs.mkdirSync(outDir, { recursive: true });

esbuild.buildSync({
  entryPoints: [entry],
  bundle: true,
  platform: "node",
  format: "esm",
  outfile: outFile,
});

const r = spawnSync("node", [outFile], { cwd: root, stdio: "inherit" });
if (r.status !== 0) process.exit(r.status || 1);

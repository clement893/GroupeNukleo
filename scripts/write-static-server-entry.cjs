/**
 * Writes dist/index.js so that "node dist/index.js" starts a static server
 * serving the Vite build (dist/). Used when the platform runs node dist/index.js
 * instead of "npx serve dist -s".
 */
const fs = require("fs");
const path = require("path");

const distDir = path.resolve(__dirname, "..", "dist");
const outFile = path.join(distDir, "index.js");

const code = `const { spawn } = require("child_process");
const path = require("path");

const distDir = path.join(__dirname);
const port = process.env.PORT || "3000";
const rootDir = path.join(__dirname, "..");

const child = spawn("npx", ["serve", distDir, "-s", "-l", port], {
  stdio: "inherit",
  cwd: rootDir,
  env: { ...process.env, PORT: port },
  shell: true,
});
child.on("exit", (code) => process.exit(code != null ? code : 0));
`;

if (!fs.existsSync(distDir)) {
  console.error("scripts/write-static-server-entry.cjs: dist/ not found. Run vite build first.");
  process.exit(1);
}

fs.writeFileSync(outFile, code, "utf8");
console.log("Wrote", outFile);

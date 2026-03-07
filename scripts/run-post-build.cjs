/**
 * Runs post-vite build steps in parallel, then verify.
 * Usage: node scripts/run-post-build.cjs
 * (Run after: vite build && esbuild server/...)
 */
const { spawn } = require("child_process");
const path = require("path");

const root = path.join(__dirname, "..");

function run(cmd, args, opts = {}) {
  return new Promise((resolve, reject) => {
    const cwd = opts.cwd || root;
    const name = opts.name || cmd;
    const child = spawn(cmd, args, {
      cwd,
      stdio: "inherit",
      shell: process.platform === "win32",
    });
    child.on("close", (code) => {
      if (code !== 0) reject(new Error(`${name} exited with ${code}`));
      else resolve();
    });
    child.on("error", reject);
  });
}

async function main() {
  const start = Date.now();
  await Promise.all([
    run("node", ["scripts/copy-locales-to-dist.cjs"], { name: "copy-locales" }),
    run("node", ["scripts/generate-locale-sections.cjs"], { name: "generate-locale-sections" }),
  ]);
  await run("pnpm", ["verify:build"], { name: "verify:build" });
  console.log(`\n[run-post-build] All steps done in ${((Date.now() - start) / 1000).toFixed(1)}s`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

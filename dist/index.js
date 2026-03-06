const { spawn } = require("child_process");
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

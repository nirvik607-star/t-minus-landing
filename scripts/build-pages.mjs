import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const apiDir = path.join(root, "src", "app", "api");
const stashDir = path.join(root, ".api-stash-pages");
const outDir = path.join(root, "out");
const nextDir = path.join(root, ".next");

let stashed = false;
try {
  if (fs.existsSync(apiDir)) {
    if (fs.existsSync(stashDir)) {
      fs.rmSync(stashDir, { recursive: true, force: true });
    }
    fs.renameSync(apiDir, stashDir);
    stashed = true;
  }

  if (fs.existsSync(nextDir)) {
    fs.rmSync(nextDir, { recursive: true, force: true });
  }

  execSync("npx next build --webpack", {
    stdio: "inherit",
    env: {
      ...process.env,
      GITHUB_PAGES: "true",
      PAGES_BASE_PATH: process.env.PAGES_BASE_PATH ?? "/t-minus-landing",
    },
  });

  if (fs.existsSync(outDir)) {
    fs.writeFileSync(path.join(outDir, ".nojekyll"), "");
  }
} finally {
  if (stashed && fs.existsSync(stashDir)) {
    if (fs.existsSync(apiDir)) {
      fs.rmSync(apiDir, { recursive: true, force: true });
    }
    fs.renameSync(stashDir, apiDir);
  }
}

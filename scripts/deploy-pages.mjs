import { execFileSync, execSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const root = process.cwd();
const outDir = path.join(root, "out");
const skipBuild = process.argv.includes("--skip-build");

if (!skipBuild) {
  execSync("npm run build:pages", { stdio: "inherit" });
}

if (!fs.existsSync(outDir)) {
  throw new Error("Missing out/ directory; run npm run build:pages first.");
}

const headSha = execFileSync("git", ["rev-parse", "--short", "HEAD"], {
  encoding: "utf8",
}).trim();

const worktreeDir = fs.mkdtempSync(path.join(os.tmpdir(), "t-minus-gh-pages-"));

try {
  // Check whether remote gh-pages exists
  let hasRemoteGhPages = false;
  try {
    execFileSync("git", ["rev-parse", "--verify", "refs/remotes/origin/gh-pages"], {
      stdio: "ignore",
    });
    hasRemoteGhPages = true;
  } catch {
    hasRemoteGhPages = false;
  }

  if (hasRemoteGhPages) {
    execFileSync("git", ["worktree", "add", "--detach", worktreeDir, "origin/gh-pages"], {
      stdio: "inherit",
    });
  } else {
    execFileSync("git", ["worktree", "add", "--orphan", "-b", "gh-pages", worktreeDir], {
      stdio: "inherit",
    });
  }

  for (const entry of fs.readdirSync(worktreeDir)) {
    if (entry === ".git") continue;
    fs.rmSync(path.join(worktreeDir, entry), { recursive: true, force: true });
  }

  fs.cpSync(outDir, worktreeDir, { recursive: true });
  fs.writeFileSync(path.join(worktreeDir, ".nojekyll"), "");

  execFileSync("git", ["-C", worktreeDir, "add", "-A"], { stdio: "inherit" });

  const status = execFileSync("git", ["-C", worktreeDir, "status", "--porcelain"], {
    encoding: "utf8",
  }).trim();

  if (!status) {
    console.log("gh-pages is already up to date.");
  } else {
    execFileSync(
      "git",
      ["-C", worktreeDir, "commit", "-m", `Deploy ${headSha} to GitHub Pages`],
      { stdio: "inherit" }
    );
    execFileSync("git", ["-C", worktreeDir, "push", "origin", "HEAD:gh-pages"], {
      stdio: "inherit",
    });
  }
} finally {
  try {
    execFileSync("git", ["worktree", "remove", "--force", worktreeDir], {
      stdio: "ignore",
    });
  } catch {
    // fallback cleanup
  }
  fs.rmSync(worktreeDir, { recursive: true, force: true });
}

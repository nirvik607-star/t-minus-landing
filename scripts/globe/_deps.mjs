// Shared loader for the globe data generators.
//
// The generators depend on packages that are NOT in this repo's package.json
// (they are generation-only). Install them into any scratch folder and point
// GLOBE_GEN_DIR at it — see src/lib/globe/README.md for the exact commands.
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const genDir = process.env.GLOBE_GEN_DIR;
if (!genDir) {
  console.error(
    "Set GLOBE_GEN_DIR to a folder whose node_modules holds the generator packages " +
      "(see src/lib/globe/README.md).",
  );
  process.exit(1);
}

/** CommonJS-style require rooted at the scratch folder (JSON files, CJS packages, paths). */
export const genRequire = createRequire(path.join(path.resolve(genDir), "package.json"));

/** import() an ESM-only package from the scratch folder. */
export const genImport = (name) => import(pathToFileURL(genRequire.resolve(name)).href);

/** Installed version of a generator package. */
export const genVersion = (name) => {
  const entry = genRequire.resolve.paths(name).map((p) => path.join(p, name, "package.json"));
  for (const file of entry) {
    try {
      return genRequire(file).version;
    } catch {
      // try the next lookup path
    }
  }
  throw new Error(`Cannot find ${name} under ${genDir}`);
};

/** Repo root (scripts/globe/ -> ../..). */
export const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");

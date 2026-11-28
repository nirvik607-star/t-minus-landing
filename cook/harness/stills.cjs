/* Renders the shot list to cook/stills/<round>/. Usage:
 *   node cook/harness/stills.cjs <round> [--base http://localhost:3000] [--only id,id] [--path /dev/scene]
 */
const { chromium } = require("playwright");
const fs = require("node:fs");
const path = require("node:path");

const args = process.argv.slice(2);
const round = args[0] || "r01";
const flag = (name, dflt) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : dflt;
};
const base = flag("base", "http://localhost:3000");
const pagePath = flag("path", "/");
const only = flag("only", "");
const scale = Number(flag("scale", "1"));
const outDir = path.join(__dirname, "..", "stills", round);
fs.mkdirSync(outDir, { recursive: true });

const VIEWPORTS = {
  d: { width: 1440, height: 900 },
  m: { width: 390, height: 844 },
};

/** id, viewport keys, query string, optional scroll (fraction of runway, or selector). */
const SHOTS = [
  { id: "S01-hero", vps: ["d", "m"], qs: "skipIntro=1&still=1" },
  { id: "S02-star", vps: ["d", "m"], qs: "introAt=0.9&still=1" },
  { id: "S03a-collapse", vps: ["d"], qs: "introAt=2.02&still=1" },
  { id: "S03b-flood", vps: ["d"], qs: "introAt=2.4&still=1" },
  { id: "S03c-drain", vps: ["d"], qs: "introAt=2.85&still=1" },
  { id: "S04-forming", vps: ["d", "m"], qs: "introAt=3.25&still=1" },
  { id: "S04b-sweep", vps: ["d"], qs: "introAt=3.9&still=1" },
  { id: "S05-rising", vps: ["d", "m"], qs: "skipIntro=1&still=1", pin: 0.3 },
  { id: "S06-dial", vps: ["d", "m"], qs: "skipIntro=1&still=1", pin: 0.78 },
  { id: "S09-closing", vps: ["d", "m"], qs: "skipIntro=1&still=1", sel: "[data-section='closing']" },
];

(async () => {
  const browser = await chromium.launch({
    args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"],
  });
  const problems = [];
  for (const shot of SHOTS) {
    if (only && !only.split(",").some((o) => shot.id.includes(o))) continue;
    for (const vk of shot.vps) {
      const ctx = await browser.newContext({ viewport: VIEWPORTS[vk], deviceScaleFactor: scale });
      const page = await ctx.newPage();
      page.on("pageerror", (e) => problems.push(`${shot.id}-${vk} pageerror: ${String(e).slice(0, 240)}`));
      page.on("console", (m) => {
        if (m.type() === "error") problems.push(`${shot.id}-${vk} console: ${m.text().slice(0, 240)}`);
      });
      await page.goto(`${base}${pagePath}?${shot.qs}`, { waitUntil: "load" });
      await page.waitForSelector("canvas[data-scene-ready='true']", { timeout: 20000 }).catch(() => {
        problems.push(`${shot.id}-${vk}: scene never became ready`);
      });
      if (shot.pin !== undefined) {
        await page.evaluate((f) => {
          const run = document.querySelector("[data-runway]");
          const r = run.getBoundingClientRect();
          const top = r.top + window.scrollY;
          window.scrollTo(0, top + (r.height - window.innerHeight) * f);
        }, shot.pin);
      } else if (shot.sel) {
        await page.evaluate((s) => {
          const el = document.querySelector(s);
          el.scrollIntoView({ block: "end" });
        }, shot.sel);
      }
      await page.waitForTimeout(1600);
      await page.screenshot({ path: path.join(outDir, `${shot.id}-${vk}.png`) });
      await ctx.close();
    }
  }
  await browser.close();
  if (problems.length) console.log(problems.join("\n"));
  console.log(`stills written to ${outDir}`);
})();

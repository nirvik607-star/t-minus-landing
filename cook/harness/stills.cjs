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
  { id: "S04-forming", vps: ["d", "m"], qs: "introAt=3.35&still=1" },
  { id: "S04b-sweep", vps: ["d"], qs: "introAt=3.85&still=1" },
  { id: "S04c-arrive", vps: ["d", "m"], qs: "introAt=4.45&still=1" },
  { id: "S05-rising", vps: ["d", "m"], qs: "skipIntro=1&still=1", pin: 0.3 },
  { id: "S06-dial", vps: ["d", "m"], qs: "skipIntro=1&still=1", pin: 0.78 },
  { id: "S06b-dive", vps: ["d", "m"], qs: "skipIntro=1&still=1", pin: 1.0, extra: 0.42 },
  { id: "S06c-inside", vps: ["d", "m"], qs: "skipIntro=1&still=1", sel: "[data-section='features'] h2", block: "center" },
  { id: "S07a-drops", vps: ["d", "m"], qs: "skipIntro=1&still=1", feature: "drops-home" },
  { id: "S07b-clock", vps: ["d", "m"], qs: "skipIntro=1&still=1", feature: "clock" },
  { id: "S07c-size", vps: ["d", "m"], qs: "skipIntro=1&still=1", feature: "size-assist" },
  { id: "S07d-hold", vps: ["d", "m"], qs: "skipIntro=1&still=1", feature: "hold" },
  { id: "S07e-lab", vps: ["d", "m"], qs: "skipIntro=1&still=1", feature: "lab" },
  { id: "S08-closet", vps: ["d", "m"], qs: "skipIntro=1&still=1", feature: "closet" },
  // Phones: each demo at rest, centred in the hole.
  { id: "S07p1-drops-held", vps: ["m"], qs: "skipIntro=1&still=1", held: "drops-home" },
  { id: "S07p2-clock-held", vps: ["m"], qs: "skipIntro=1&still=1", held: "clock" },
  { id: "S07p3-size-held", vps: ["m"], qs: "skipIntro=1&still=1", held: "size-assist" },
  { id: "S07p4-hold-held", vps: ["m"], qs: "skipIntro=1&still=1", held: "hold" },
  { id: "S07p5-lab-held", vps: ["m"], qs: "skipIntro=1&still=1", held: "lab" },
  { id: "S07p6-closet-held", vps: ["m"], qs: "skipIntro=1&still=1", held: "closet" },
  { id: "S08b-pullout", vps: ["d", "m"], qs: "skipIntro=1&still=1", sel: "[data-section='closing']", block: "end", back: 0.42 },
  { id: "S09-closing", vps: ["d", "m"], qs: "skipIntro=1&still=1", sel: "[data-section='closing']" },
  { id: "S11a-privacy", vps: ["m"], path: "/privacy", qs: "" },
  { id: "S11b-terms", vps: ["m"], path: "/terms", qs: "" },
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
      await page.goto(`${base}${shot.path || pagePath}?${shot.qs}`, { waitUntil: "load" });
      if (!shot.path) {
        await page.waitForSelector("canvas[data-scene-ready='true']", { timeout: 20000 }).catch(() => {
          problems.push(`${shot.id}-${vk}: scene never became ready`);
        });
      }
      if (shot.pin !== undefined) {
        await page.evaluate((f) => {
          const run = document.querySelector("[data-runway]");
          const r = run.getBoundingClientRect();
          const top = r.top + window.scrollY;
          window.scrollTo(0, top + (r.height - window.innerHeight) * f[0] + window.innerHeight * f[1]);
        }, [shot.pin, shot.extra || 0]);
      } else if (shot.held) {
        await page.evaluate((id) => {
          const run = document.querySelector(`[data-feature='${id}'] [data-demo-run]`);
          const r = run.getBoundingClientRect();
          // Half-way through the stretch where the demo rests.
          window.scrollTo(0, r.top + window.scrollY + r.height / 2 - window.innerHeight / 2);
        }, shot.held);
      } else if (shot.feature) {
        await page.evaluate((id) => {
          const el = document.querySelector(`[data-feature='${id}']`);
          if (window.innerWidth < 1024) {
            // Phones: the feature's copy sits just under the header, its demo below.
            window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 76);
          } else {
            el.scrollIntoView({ block: "center" });
          }
        }, shot.feature);
      } else if (shot.sel) {
        await page.evaluate(([s, block, back]) => {
          const el = document.querySelector(s);
          el.scrollIntoView({ block: block || "end" });
          if (back) window.scrollBy(0, -window.innerHeight * back);
        }, [shot.sel, shot.block, shot.back || 0]);
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

// Validates site imagery: manifest entries, files, dimensions, weight, alt text and stray references.
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const manifest = JSON.parse(readFileSync(join(root, "lib/images/manifest.json"), "utf8"));
const LOCALES = ["en", "de", "tr"];
const MAX_KB = 350;

const errors = [];
const warnings = [];
const lowRes = [];
const referenced = new Set();
let finals = 0;
let placeholders = 0;

for (const [key, e] of Object.entries(manifest)) {
  for (const l of LOCALES) if (!e.alt?.[l]?.trim()) errors.push(`${key}: missing ${l} alt text`);
  if (!/^\/images\/[a-z0-9/-]+\.(webp|avif)$/.test(e.file)) errors.push(`${key}: file must be lowercase .webp/.avif under /images (${e.file})`);

  if (e.status === "final") {
    finals++;
    if (!e.size || !e.widths?.length || e.widths.at(-1) !== e.size[0]) {
      errors.push(`${key}: final entry needs size and widths ending at full width — re-run images:optimize`);
      continue;
    }
    const ratio = e.size[0] / e.size[1];
    for (const w of e.widths) {
      const rel = e.file.replace(/\.(webp|avif)$/, `-${w}w.$1`);
      const abs = join(root, "public", rel);
      referenced.add(abs);
      if (!existsSync(abs)) {
        errors.push(`${key}: missing variant public${rel}`);
        continue;
      }
      const meta = await sharp(abs).metadata();
      if (meta.width !== w || Math.abs(meta.width / meta.height - ratio) > 0.01) {
        errors.push(`${key}: variant ${w}w is ${meta.width}×${meta.height}, expected ${w}px wide at ${ratio.toFixed(3)}`);
      }
      const kb = Math.round(statSync(abs).size / 1024);
      if (kb > MAX_KB) warnings.push(`${key}: ${w}w is ${kb}KB, above ${MAX_KB}KB target`);
    }
    if (e.size[0] < e.target[0]) lowRes.push(`${key} (${e.size[0]}/${e.target[0]}px)`);
  } else {
    placeholders++;
    const abs = join(root, "public/images/placeholders", `${key}.svg`);
    referenced.add(abs);
    if (!existsSync(abs)) errors.push(`${key}: placeholder missing — run npm run images:placeholders`);
  }
}

function walk(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const f of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, f.name);
    if (f.isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

for (const file of walk(join(root, "public/images"))) {
  if (!referenced.has(file)) errors.push(`unused image asset: ${relative(root, file)}`);
}

for (const file of [...walk(join(root, "app")), ...walk(join(root, "components")), ...walk(join(root, "lib"))]) {
  if (!/\.(tsx?|mjs)$/.test(file) || file.includes(join("lib", "images"))) continue;
  const src = readFileSync(file, "utf8");
  if (/["'`]\/images\//.test(src)) errors.push(`${relative(root, file)}: hard-coded /images/ path — use getImage() from lib/images`);
}

console.log(`Images: ${finals} final, ${placeholders} placeholder`);
if (lowRes.length) console.log(`Source-limited originals (not upscaled): ${lowRes.length}`);
for (const w of warnings) console.warn(`warn  ${w}`);
for (const e of errors) console.error(`error ${e}`);
if (errors.length) process.exit(1);
console.log("Image check passed.");

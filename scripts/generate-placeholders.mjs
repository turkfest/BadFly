// Writes clearly-labelled SVG placeholders for manifest entries that have no final photo yet.
// These are temporary stand-ins only; final images are installed with scripts/optimize-images.mjs.
import { mkdirSync, readFileSync, rmSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const manifest = JSON.parse(readFileSync(join(root, "lib/images/manifest.json"), "utf8"));
const dir = join(root, "public/images/placeholders");
mkdirSync(dir, { recursive: true });

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function svg(key, [w, h], section) {
  const pad = Math.round(Math.min(w, h) * 0.06);
  const big = Math.round(Math.min(w, h) * 0.05);
  const small = Math.max(14, Math.round(Math.min(w, h) * 0.02));
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <rect width="100%" height="100%" fill="#E4DDD1"/>
  <rect x="${pad / 2}" y="${pad / 2}" width="${w - pad}" height="${h - pad}" fill="none" stroke="#0E0E10" stroke-opacity="0.15" stroke-dasharray="12 10"/>
  <text x="${pad}" y="${pad + big}" font-family="Helvetica, Arial, sans-serif" font-size="${big}" font-weight="600" fill="#0E0E10" fill-opacity="0.7">PLACEHOLDER</text>
  <text x="${pad}" y="${pad + big + small * 2}" font-family="Helvetica, Arial, sans-serif" font-size="${small}" fill="#0E0E10" fill-opacity="0.6">${esc(key)} · ${w}×${h}</text>
  <text x="${pad}" y="${h - pad}" font-family="Helvetica, Arial, sans-serif" font-size="${small}" fill="#0E0E10" fill-opacity="0.45">${esc(section)}</text>
</svg>
`;
}

let written = 0;
let removed = 0;
for (const [key, entry] of Object.entries(manifest)) {
  const file = join(dir, `${key}.svg`);
  if (entry.status === "final") {
    if (existsSync(file)) {
      rmSync(file);
      removed++;
    }
    continue;
  }
  writeFileSync(file, svg(key, entry.target, entry.section));
  written++;
}

console.log(`Placeholders written: ${written}, removed (final image present): ${removed}`);

// Converts source photos in images-src/<manifest-key>.<ext> to optimised WebP under public/images.
// Usage: npm run images:optimize [-- --force] [-- key1 key2]
// Final images are never overwritten unless --force is passed.
import { existsSync, readdirSync, readFileSync, rmSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, extname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const manifestPath = join(root, "lib/images/manifest.json");
const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
const srcDir = join(root, "images-src");

const args = process.argv.slice(2);
const force = args.includes("--force");
const only = args.filter((a) => !a.startsWith("--"));

const MAX_BYTES = 350 * 1024;
const EXTS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".tif", ".tiff"]);
// Responsive widths; the full-size output is always added. Must match lib/images/loader.ts naming.
const LADDER = [480, 800, 1200, 1600, 2400];
const variantPath = (file, w) => file.replace(/\.(webp|avif)$/, `-${w}w.$1`);

if (!existsSync(srcDir)) {
  console.log("No images-src/ folder found. Add source photos named <manifest-key>.jpg and re-run.");
  process.exit(0);
}

const sources = new Map();
for (const f of readdirSync(srcDir)) {
  const ext = extname(f).toLowerCase();
  if (EXTS.has(ext)) sources.set(f.slice(0, -ext.length), join(srcDir, f));
}

function parsePosition(pos) {
  const [x = "50%", y = "50%"] = String(pos).split(/\s+/);
  return [parseFloat(x) / 100, parseFloat(y) / 100];
}

let done = 0;
for (const [key, entry] of Object.entries(manifest)) {
  if (only.length && !only.includes(key)) continue;
  const source = sources.get(key);
  if (!source) continue;

  const out = join(root, "public", variantPath(entry.file, entry.size?.[0] ?? 0));
  if (entry.status === "final" && existsSync(out) && !force) {
    console.log(`skip  ${key} (final image exists; use --force to replace)`);
    continue;
  }

  const [tw, th] = entry.target;
  const ratio = tw / th;
  const img = sharp(source).rotate();
  const { width: sw, height: sh } = await img.metadata().then((m) =>
    m.orientation && m.orientation >= 5 ? { width: m.height, height: m.width } : m,
  );
  const [px, py] = parsePosition(entry.position);

  let cw = sw;
  let ch = Math.round(sw / ratio);
  if (ch > sh) {
    ch = sh;
    cw = Math.round(sh * ratio);
  }
  const left = Math.round((sw - cw) * px);
  const top = Math.round((sh - ch) * py);
  const outW = Math.min(tw, cw);
  const outH = Math.round(outW / ratio);

  const encode = (w, q) =>
    sharp(source)
      .rotate()
      .extract({ left, top, width: cw, height: ch })
      .resize(w, Math.round(w / ratio), { fit: "cover", withoutEnlargement: true })
      .toColourspace("srgb")
      .webp({ quality: q, effort: 6, smartSubsample: true })
      .toBuffer();

  // High starting quality: catalogue sources are small, so detail matters more than bytes.
  let quality = 88;
  let buf;
  for (;;) {
    buf = await encode(outW, quality);
    if (buf.length <= MAX_BYTES || quality <= 58) break;
    quality -= 6;
  }

  for (const w of entry.widths ?? []) {
    const stale = join(root, "public", variantPath(entry.file, w));
    if (existsSync(stale)) rmSync(stale);
  }
  const widths = [...LADDER.filter((w) => w < outW), outW];
  mkdirSync(dirname(join(root, "public", entry.file)), { recursive: true });
  let totalKb = 0;
  for (const w of widths) {
    const data = w === outW ? buf : await encode(w, quality);
    writeFileSync(join(root, "public", variantPath(entry.file, w)), data);
    totalKb += data.length / 1024;
  }
  entry.status = "final";
  entry.size = [outW, outH];
  entry.widths = widths;

  const placeholder = join(root, "public/images/placeholders", `${key}.svg`);
  if (existsSync(placeholder)) rmSync(placeholder);

  const note = outW < tw ? ` (source smaller than target ${tw}×${th})` : "";
  console.log(`ok    ${key} → ${entry.file} [${widths.join(", ")}w] ${outW}×${outH} q${quality} ${Math.round(buf.length / 1024)}KB (all ${Math.round(totalKb)}KB)${note}`);
  done++;
}

writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Optimised ${done} image(s).`);

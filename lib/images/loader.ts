import type { ImageLoaderProps } from "next/image";

// Static export has no image optimiser: pick the smallest pre-generated WebP variant that covers
// the requested width. Available widths travel in the src fragment ("/a.webp#480,800,1054").
export default function imageLoader({ src, width }: ImageLoaderProps): string {
  const [path, fragment] = src.split("#");
  if (!fragment) return path;
  const widths = fragment.split(",").map(Number);
  const chosen = widths.find((w) => w >= width) ?? widths[widths.length - 1];
  return path.replace(/\.(webp|avif)$/, `-${chosen}w.$1`);
}

import manifest from "./manifest.json";
import type { Locale } from "@/lib/i18n/config";

// Single source of truth for site imagery; scripts/optimize-images.mjs flips entries to "final".
type ManifestEntry = {
  file: string;
  target: [number, number];
  size: [number, number] | null;
  widths?: number[];
  status: "placeholder" | "final";
  position: string;
  section: string;
  alt: Record<Locale, string>;
};

const entries = manifest as unknown as Record<keyof typeof manifest, ManifestEntry>;

export type ImageKey = keyof typeof manifest;

export type SiteImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
  position: string;
  placeholder: boolean;
};

export function getImage(key: ImageKey, locale: Locale): SiteImage {
  const e = entries[key];
  const final = e.status === "final" && e.size !== null && !!e.widths?.length;
  const [width, height] = final ? e.size! : e.target;
  return {
    src: final ? `${e.file}#${e.widths!.join(",")}` : `/images/placeholders/${key}.svg`,
    width,
    height,
    alt: e.alt[locale],
    position: e.position,
    placeholder: !final,
  };
}

// To add a language: append it here, add dictionaries/<code>.ts and register it in lib/i18n/dictionaries.ts.
export const locales = ["en", "de", "tr"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeLabels: Record<Locale, { short: string; name: string; hreflang: string; og: string }> = {
  en: { short: "EN", name: "English", hreflang: "en", og: "en_GB" },
  de: { short: "DE", name: "Deutsch", hreflang: "de", og: "de_DE" },
  tr: { short: "TR", name: "Türkçe", hreflang: "tr", og: "tr_TR" },
};

export function isLocale(value: string | undefined | null): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}

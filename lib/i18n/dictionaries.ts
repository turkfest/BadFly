import { notFound } from "next/navigation";
import { isLocale, type Locale } from "./config";
import en from "@/dictionaries/en";
import de from "@/dictionaries/de";
import tr from "@/dictionaries/tr";
import type { Dictionary } from "@/dictionaries/types";

const dictionaries: Record<Locale, Dictionary> = { en, de, tr };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export async function resolveLocale(params: Promise<{ locale: string }>): Promise<Locale> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return locale;
}

import type { Metadata } from "next";
import { locales, localeLabels, defaultLocale, type Locale } from "./i18n/config";
import { routes, type RouteKey } from "./routes";
import { site } from "./site";
import type { Dictionary } from "@/dictionaries/types";

export function absoluteUrl(locale: Locale, route: RouteKey): string {
  return `${site.url}/${locale}${routes[route]}/`;
}

export function buildMetadata({
  locale,
  route,
  dict,
  title,
  description,
}: {
  locale: Locale;
  route: RouteKey;
  dict: Dictionary;
  title: string;
  description: string;
}): Metadata {
  const languages: Record<string, string> = {};
  for (const l of locales) languages[localeLabels[l].hreflang] = absoluteUrl(l, route);
  languages["x-default"] = absoluteUrl(defaultLocale, route);

  return {
    title,
    description,
    keywords: dict.meta.keywords,
    alternates: {
      canonical: absoluteUrl(locale, route),
      languages,
    },
    openGraph: {
      type: "website",
      siteName: site.name,
      title,
      description,
      url: absoluteUrl(locale, route),
      locale: localeLabels[locale].og,
      alternateLocale: locales.filter((l) => l !== locale).map((l) => localeLabels[l].og),
      images: [ogImage(dict)],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage(dict).url],
    },
  };
}

export function ogImage(dict: Dictionary) {
  return { url: `${site.url}/og.png`, width: 1200, height: 630, alt: dict.meta.defaultTitle };
}

export function organizationJsonLd(locale: Locale, dict: Dictionary) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${site.url}/#organization`,
    name: site.name,
    url: `${site.url}/${locale}/`,
    logo: `${site.url}/icons/logo.svg`,
    email: site.email,
    slogan: dict.home.hero.tagline,
    description: dict.meta.defaultDescription,
    address: { "@type": "PostalAddress", addressCountry: site.country },
    areaServed: { "@type": "Place", name: site.areaServed },
    knowsAbout: dict.meta.keywords,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: site.email,
      availableLanguage: ["English", "German", "Turkish"],
      areaServed: "EU",
    },
    sameAs: Object.values(site.social),
  };
}

export function websiteJsonLd(locale: Locale, dict: Dictionary) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    name: site.name,
    url: `${site.url}/${locale}/`,
    inLanguage: localeLabels[locale].hreflang,
    description: dict.meta.defaultDescription,
    publisher: { "@id": `${site.url}/#organization` },
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function serviceJsonLd(locale: Locale, name: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: name,
    name,
    description,
    provider: { "@id": `${site.url}/#organization` },
    areaServed: { "@type": "Place", name: site.areaServed },
    url: absoluteUrl(locale, "privateLabel"),
  };
}

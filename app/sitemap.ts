import type { MetadataRoute } from "next";
import { locales, localeLabels, defaultLocale } from "@/lib/i18n/config";
import { routes, type RouteKey } from "@/lib/routes";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

const priorities: Record<RouteKey, number> = {
  home: 1,
  products: 0.9,
  privateLabel: 0.9,
  about: 0.7,
  contact: 0.8,
};

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return (Object.keys(routes) as RouteKey[]).flatMap((route) =>
    locales.map((locale) => {
      const languages: Record<string, string> = {};
      for (const l of locales) languages[localeLabels[l].hreflang] = absoluteUrl(l, route);
      languages["x-default"] = absoluteUrl(defaultLocale, route);
      return {
        url: absoluteUrl(locale, route),
        lastModified,
        changeFrequency: route === "home" || route === "products" ? "weekly" : "monthly",
        priority: priorities[route],
        alternates: { languages },
      };
    }),
  );
}

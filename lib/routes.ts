import type { Locale } from "./i18n/config";

export const routes = {
  home: "",
  products: "/products",
  privateLabel: "/private-label",
  about: "/about",
  contact: "/contact",
} as const;

export type RouteKey = keyof typeof routes;

export function href(locale: Locale, route: RouteKey, hash?: string): string {
  return `/${locale}${routes[route]}/${hash ? `#${hash}` : ""}`;
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, localeLabels, type Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/cn";

export function LanguageSwitcher({
  locale,
  label,
  className,
  onNavigate,
}: {
  locale: Locale;
  label: string;
  className?: string;
  onNavigate?: () => void;
}) {
  const pathname = usePathname() || `/${locale}/`;

  const pathFor = (target: Locale) => {
    const segments = pathname.split("/");
    segments[1] = target;
    const path = segments.join("/");
    return path.endsWith("/") ? path : `${path}/`;
  };

  return (
    <nav aria-label={label} className={cn("flex items-center gap-1 text-xs font-medium tracking-wider", className)}>
      {locales.map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          {i > 0 && <span className="text-current opacity-30">/</span>}
          <Link
            href={pathFor(l)}
            hrefLang={localeLabels[l].hreflang}
            lang={localeLabels[l].hreflang}
            aria-current={l === locale ? "true" : undefined}
            title={localeLabels[l].name}
            onClick={onNavigate}
            className={cn(
              "px-1.5 py-1 transition-opacity duration-300",
              l === locale ? "opacity-100" : "opacity-45 hover:opacity-100",
            )}
          >
            {localeLabels[l].short}
          </Link>
        </span>
      ))}
    </nav>
  );
}

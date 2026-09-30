import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/dictionaries/types";
import { href } from "@/lib/routes";
import { site } from "@/lib/site";
import { privateLabelServices } from "@/lib/data/process";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ArrowUpRight } from "@/components/ui/Icons";

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const { nav, footer } = dict;
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink-900 text-bone-200">
      <div className="container py-20 md:py-24">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link href={href(locale, "home")} aria-label="BadFly — Home">
              <Logo tone="light" />
            </Link>
            <p className="mt-8 max-w-sm font-display text-2xl font-medium leading-snug text-bone-50">
              {footer.tagline}
            </p>
            <p className="mt-6 text-sm text-bone-200/60">{footer.madeIn}</p>
          </div>

          <div className="md:col-span-2">
            <h2 className="mb-6 text-xs font-medium uppercase tracking-eyebrow text-bone-200/50">{footer.navigation}</h2>
            <ul className="space-y-3 text-sm">
              {(["home", "products", "privateLabel", "about", "contact"] as const).map((key) => (
                <li key={key}>
                  <Link href={href(locale, key)} className="transition-colors hover:text-bone-50">
                    {nav[key]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h2 className="mb-6 text-xs font-medium uppercase tracking-eyebrow text-bone-200/50">{footer.services}</h2>
            <ul className="space-y-3 text-sm">
              {privateLabelServices.map((id) => (
                <li key={id}>
                  <Link href={href(locale, "privateLabel")} className="transition-colors hover:text-bone-50">
                    {dict.privateLabelServices[id].title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h2 className="mb-6 text-xs font-medium uppercase tracking-eyebrow text-bone-200/50">{footer.contact}</h2>
            <ul className="space-y-3 text-sm">
              <li>
                <a href={`mailto:${site.email}`} className="transition-colors hover:text-bone-50">
                  {site.email}
                </a>
              </li>
              {site.social.map((s) => (
                <li key={s.url}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 transition-colors hover:text-bone-50">
                    {s.name} <ArrowUpRight size={14} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-20 flex flex-col-reverse items-start justify-between gap-6 border-t border-bone-50/10 pt-8 text-xs text-bone-200/50 sm:flex-row sm:items-center">
          <p>
            © {year} {site.name}. {footer.rights}
          </p>
          <LanguageSwitcher locale={locale} label={nav.language} className="text-bone-200" />
        </div>
      </div>

      <div aria-hidden="true" className="overflow-hidden">
        <p className="container select-none whitespace-nowrap pb-2 font-display text-[22vw] font-semibold leading-[0.75] tracking-[-0.05em] text-bone-50/[0.04] 2xl:text-[300px]">
          BADFLY
        </p>
      </div>
    </footer>
  );
}

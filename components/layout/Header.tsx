"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/dictionaries/types";
import { href, type RouteKey } from "@/lib/routes";
import { cn } from "@/lib/cn";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Close, Menu, ArrowRight } from "@/components/ui/Icons";

const navItems: RouteKey[] = ["products", "privateLabel", "about", "contact"];

export function Header({ locale, nav }: { locale: Locale; nav: Dictionary["nav"] }) {
  const pathname = usePathname();
  const mobileMenuId = useId();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (pathname) setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (route: RouteKey) => pathname?.startsWith(href(locale, route).replace(/\/$/, ""));

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink-900 focus:px-4 focus:py-2 focus:text-bone-50"
      >
        {nav.skipToContent}
      </a>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-premium",
          scrolled || open ? "border-b hairline bg-bone-50/85 backdrop-blur-xl" : "border-b border-transparent",
        )}
      >
        <div className="container flex h-20 items-center justify-between gap-6">
          <Link href={href(locale, "home")} aria-label="BadFly — Home" className="shrink-0">
            <Logo />
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-10">
              {navItems.map((key) => (
                <li key={key}>
                  <Link
                    href={href(locale, key)}
                    aria-current={isActive(key) ? "page" : undefined}
                    className={cn(
                      "relative text-sm transition-colors duration-300 hover:text-ink-900",
                      "after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:origin-left after:bg-ink-900 after:transition-transform after:duration-500 after:ease-premium",
                      isActive(key) ? "text-ink-900 after:scale-x-100" : "text-ink-600 after:scale-x-0 hover:after:scale-x-100",
                    )}
                  >
                    {nav[key]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <LanguageSwitcher locale={locale} label={nav.language} className="hidden text-ink-900 sm:flex" />
            <Link
              href={href(locale, "contact")}
              className="hidden h-11 items-center bg-ink-900 px-5 text-sm font-medium text-bone-50 transition-colors duration-500 hover:bg-clay-500 md:inline-flex"
            >
              {nav.cta}
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls={mobileMenuId}
              aria-label={open ? nav.closeMenu : nav.openMenu}
              className="-mr-2 flex h-11 w-11 items-center justify-center lg:hidden"
            >
              {open ? <Close size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id={mobileMenuId}
            role="dialog"
            aria-modal="true"
            aria-label={nav.openMenu}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-20 z-40 flex flex-col bg-bone-50 lg:hidden"
          >
            <nav aria-label="Mobile" className="container flex flex-1 flex-col pt-10">
              <ul className="flex flex-col">
                {(["home", ...navItems] as RouteKey[]).map((key, i) => (
                  <motion.li
                    key={key}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.05 * i, ease: [0.22, 1, 0.36, 1] }}
                    className="border-b hairline"
                  >
                    <Link
                      href={href(locale, key)}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between py-5 font-display text-3xl font-medium tracking-tight"
                    >
                      {nav[key]}
                      <ArrowRight size={22} className="text-ink-400" />
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-auto flex items-center justify-between pb-10 pt-8">
                <LanguageSwitcher locale={locale} label={nav.language} onNavigate={() => setOpen(false)} className="text-sm" />
                <Link
                  href={href(locale, "contact")}
                  onClick={() => setOpen(false)}
                  className="inline-flex h-12 items-center bg-ink-900 px-6 text-sm font-medium text-bone-50"
                >
                  {nav.cta}
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

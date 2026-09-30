"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/dictionaries/types";
import { href } from "@/lib/routes";
import { LinkButton } from "@/components/ui/Button";
import { MediaImage } from "@/components/ui/MediaImage";
import type { SiteImage } from "@/lib/images";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero({
  locale,
  dict,
  image,
}: {
  locale: Locale;
  dict: Dictionary["home"]["hero"];
  image: SiteImage;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  const words = Array.from(dict.title.matchAll(/\S+/g), (match) => ({ word: match[0], offset: match.index }));

  return (
    <section ref={ref} className="grain relative overflow-hidden bg-bone-50 pb-16 pt-32 md:pb-24 md:pt-40">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          className="absolute -left-40 top-10 h-[36rem] w-[36rem] rounded-full bg-clay-400/15 blur-[120px]"
          animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-32 top-40 h-[30rem] w-[30rem] rounded-full bg-bone-300/60 blur-[100px]"
          animate={{ x: [0, -50, 0], y: [0, 60, 0] }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-16">
        <div className="lg:col-span-7">
          <motion.p
            className="eyebrow mb-8"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
          >
            {dict.eyebrow}
          </motion.p>

          <h1 className="font-display text-display-lg font-medium text-ink-900">
            {words.map(({ word, offset }, i) => (
              <span key={offset} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                <motion.span
                  className="inline-block"
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1.1, ease, delay: 0.1 + i * 0.06 }}
                >
                  {word}
                  {i < words.length - 1 ? "\u00A0" : ""}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            className="mt-8 max-w-xl text-lg leading-relaxed text-ink-600 md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 0.6 }}
          >
            {dict.subtitle}
          </motion.p>
          <motion.div
            className="mt-10 flex flex-col gap-3 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 0.75 }}
          >
            <LinkButton href={href(locale, "contact")}>{dict.primaryCta}</LinkButton>
            <LinkButton href={href(locale, "products")} variant="secondary" arrow={false}>
              {dict.secondaryCta}
            </LinkButton>
          </motion.div>
        </div>

        <motion.div
          className="lg:col-span-5"
          initial={{ opacity: 0, clipPath: "inset(10% 8% 10% 8%)" }}
          animate={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)" }}
          transition={{ duration: 1.4, ease, delay: 0.4 }}
        >
          <div className="relative overflow-hidden">
            <motion.div style={{ scale: imageScale }}>
              <MediaImage image={image} ratio="aspect-square" sizes="(min-width: 1024px) 42vw, 100vw" priority />
            </motion.div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-900/55 to-transparent p-6 pt-16 text-bone-50 md:p-8 md:pt-20">
              <p className="max-w-xs font-display text-lg font-medium leading-snug md:text-xl">{dict.tagline}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

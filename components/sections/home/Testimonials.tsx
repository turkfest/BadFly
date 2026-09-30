"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import type { Dictionary } from "@/dictionaries/types";
import { ChevronLeft, ChevronRight, Quote } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

const ease = [0.22, 1, 0.36, 1] as const;

export function Testimonials({
  dict,
  labels,
}: {
  dict: Dictionary["home"]["testimonials"];
  labels: { previous: string; next: string };
}) {
  const [index, setIndex] = useState(0);
  const items = dict.items;
  const item = items[index];
  const go = (dir: 1 | -1) => setIndex((i) => (i + dir + items.length) % items.length);

  return (
    <section className="section bg-bone-50" aria-roledescription="carousel" aria-label={dict.title}>
      <div className="container grid gap-14 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <p className="eyebrow mb-6">{dict.eyebrow}</p>
          <h2 className="font-display text-display-md font-medium text-balance">{dict.title}</h2>
          <div className="mt-10 flex items-center gap-3">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label={labels.previous}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-ink-900/20 transition-colors hover:bg-ink-900 hover:text-bone-50"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label={labels.next}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-ink-900/20 transition-colors hover:bg-ink-900 hover:text-bone-50"
            >
              <ChevronRight size={20} />
            </button>
            <span className="ml-4 font-display text-sm tabular-nums text-ink-500" aria-live="polite">
              {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
            </span>
          </div>
        </Reveal>

        <Reveal className="relative lg:col-span-7 lg:col-start-6" delay={0.1}>
          <Quote className="mb-8 text-clay-500" size={44} />
          <div className="relative min-h-[22rem] sm:min-h-[18rem]">
            <AnimatePresence mode="wait">
              <motion.figure
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease }}
              >
                <blockquote className="font-display text-2xl font-medium leading-snug tracking-tight text-ink-900 md:text-[2rem] md:leading-[1.3]">
                  “{item.quote}”
                </blockquote>
                <figcaption className="mt-10 flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ink-900 font-display text-sm text-bone-50">
                    {item.name
                      .split(" ")
                      .filter((w) => !w.endsWith("."))
                      .map((w) => w[0])
                      .slice(0, 2)
                      .join("")}
                  </span>
                  <span>
                    <span className="block font-medium">{item.name}</span>
                    <span className="block text-sm text-ink-500">
                      {item.role}, {item.company} · {item.country}
                    </span>
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>
          <div className="mt-8 flex gap-2">
            {items.map((t, i) => (
              <button
                key={t.name}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`${i + 1} / ${items.length}`}
                aria-current={i === index ? "true" : undefined}
                className="py-3"
              >
                <span
                  className={cn(
                    "block h-px transition-all duration-500 ease-premium",
                    i === index ? "w-12 bg-ink-900" : "w-6 bg-ink-900/25",
                  )}
                />
              </button>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

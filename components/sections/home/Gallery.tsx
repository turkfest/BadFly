"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/dictionaries/types";
import type { SiteImage } from "@/lib/images";
import { asset } from "@/lib/asset";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ChevronLeft, ChevronRight, Close, Plus } from "@/components/ui/Icons";

const ease = [0.22, 1, 0.36, 1] as const;

export function Gallery({
  items,
  dict,
}: {
  items: (SiteImage & { id: string })[];
  dict: Dictionary["home"]["gallery"];
}) {
  const [active, setActive] = useState<number | null>(null);
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastActive = useRef<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const step = useCallback(
    (dir: 1 | -1) => setActive((i) => (i === null ? i : (i + dir + items.length) % items.length)),
    [items.length],
  );

  useEffect(() => {
    if (active === null) {
      document.documentElement.style.overflow = "";
      if (lastActive.current !== null) triggerRefs.current[lastActive.current]?.focus();
      return;
    }
    lastActive.current = active;
    document.documentElement.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, close, step]);

  const current = active !== null ? items[active] : null;

  return (
    <section className="section bg-bone-100">
      <div className="container">
        <SectionHeading eyebrow={dict.eyebrow} title={dict.title} intro={dict.intro} />

        <div className="mt-16 columns-1 gap-4 sm:columns-2 lg:columns-3 lg:gap-6">
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              className="mb-4 break-inside-avoid lg:mb-6"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, ease, delay: (i % 3) * 0.08 }}
            >
              <button
                ref={(el) => {
                  triggerRefs.current[i] = el;
                }}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`${dict.open}: ${item.alt}`}
                className="group relative block w-full overflow-hidden bg-bone-200"
              >
                <motion.div layoutId={`gallery-${item.id}`} transition={{ duration: 0.6, ease }}>
                  <Image
                    src={asset(item.src)}
                    alt={item.alt}
                    width={item.width}
                    height={item.height}
                    unoptimized={item.placeholder}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="h-auto w-full transition-transform duration-[1200ms] ease-premium group-hover:scale-[1.04]"
                  />
                </motion.div>
                <span className="absolute inset-0 bg-ink-900/0 transition-colors duration-500 group-hover:bg-ink-900/20" />
                <span className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-bone-50 text-ink-900 opacity-0 transition-all duration-500 ease-premium group-hover:opacity-100 group-focus-visible:opacity-100">
                  <Plus size={18} />
                </span>
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {current && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={current.alt}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-ink-900/95 p-4 backdrop-blur-sm md:p-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={close}
          >
            <motion.div
              layoutId={`gallery-${current.id}`}
              transition={{ duration: 0.6, ease }}
              className="relative max-h-full w-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={asset(current.src)}
                alt={current.alt}
                width={current.width}
                height={current.height}
                unoptimized={current.placeholder}
                sizes="90vw"
                className="h-auto max-h-[80vh] w-auto max-w-[90vw] object-contain"
              />
              <p className="mt-4 text-center text-sm text-bone-200/80">{current.alt}</p>
            </motion.div>

            <button
              ref={closeRef}
              type="button"
              onClick={close}
              aria-label={dict.close}
              className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-bone-50/10 text-bone-50 transition-colors hover:bg-bone-50/20 md:right-8 md:top-8"
            >
              <Close size={22} />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              aria-label={dict.previous}
              className="absolute left-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-bone-50/10 text-bone-50 transition-colors hover:bg-bone-50/20 md:left-8"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              aria-label={dict.next}
              className="absolute right-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-bone-50/10 text-bone-50 transition-colors hover:bg-bone-50/20 md:right-8"
            >
              <ChevronRight size={22} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

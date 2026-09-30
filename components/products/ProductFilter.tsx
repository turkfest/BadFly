"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { ProductCard } from "./ProductCard";
import { cn } from "@/lib/cn";
import type { SiteImage } from "@/lib/images";

type Item = {
  id: string;
  group: string;
  image: SiteImage;
  name: string;
  description: string;
  meta: { label: string; value: string }[];
};

type Props = {
  items: Item[];
  groups: { id: string; label: string }[];
  allLabel: string;
  filterLabel: string;
  countLabel: string;
  cardHref: string;
};

const ease = [0.22, 1, 0.36, 1] as const;

export function ProductFilter({ items, groups, allLabel, filterLabel, countLabel, cardHref }: Props) {
  const [group, setGroup] = useState<string>("all");
  const visible = useMemo(() => (group === "all" ? items : items.filter((i) => i.group === group)), [group, items]);
  const options = [{ id: "all", label: allLabel }, ...groups];

  return (
    <div>
      <div className="sticky top-20 z-30 -mx-5 border-b hairline bg-bone-50/90 px-5 py-4 backdrop-blur-xl md:mx-0 md:px-0">
        <div className="flex items-center justify-between gap-6">
          <div role="group" aria-label={filterLabel} className="-mx-1 flex gap-2 overflow-x-auto px-1 [scrollbar-width:none]">
            {options.map((o) => {
              const selected = group === o.id;
              return (
                <button
                  key={o.id}
                  type="button"
                  onClick={() => setGroup(o.id)}
                  aria-pressed={selected}
                  className={cn(
                    "relative h-10 shrink-0 rounded-full px-5 text-sm transition-colors duration-300",
                    selected ? "text-bone-50" : "text-ink-600 hover:text-ink-900",
                  )}
                >
                  {selected && (
                    <motion.span
                      layoutId="filter-pill"
                      className="absolute inset-0 rounded-full bg-ink-900"
                      transition={{ duration: 0.5, ease }}
                    />
                  )}
                  <span className="relative">{o.label}</span>
                </button>
              );
            })}
          </div>
          <p className="hidden shrink-0 text-sm tabular-nums text-ink-500 md:block" aria-live="polite">
            {visible.length} {countLabel}
          </p>
        </div>
      </div>

      <motion.ul layout className="mt-12 grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((item) => (
            <motion.li
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.5, ease }}
            >
              <ProductCard
                index={items.indexOf(item)}
                name={item.name}
                description={item.description}
                image={item.image}
                href={cardHref}
                meta={item.meta}
              />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}

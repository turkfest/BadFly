"use client";

import { motion, useScroll } from "framer-motion";
import { useRef } from "react";
import type { Dictionary } from "@/dictionaries/types";
import { processSteps } from "@/lib/data/process";
import { cn } from "@/lib/cn";

const ease = [0.22, 1, 0.36, 1] as const;

type Props = {
  steps: Dictionary["process"];
  eyebrow: string;
  title: string;
  intro: string;
  stepLabel: string;
  tone?: "dark" | "light";
};

export function ProcessTimeline({ steps, eyebrow, title, intro, stepLabel, tone = "dark" }: Props) {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 75%", "end 60%"] });
  const dark = tone === "dark";

  return (
    <section className={cn("section", dark ? "bg-ink-900 text-bone-50" : "bg-bone-100 text-ink-900")}>
      <div className="container grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease }}
            >
              <p className={cn("eyebrow mb-6", dark && "text-bone-200/60")}>{eyebrow}</p>
              <h2 className="font-display text-display-md font-medium text-balance">{title}</h2>
              <p className={cn("mt-6 text-lg leading-relaxed", dark ? "text-bone-200/70" : "text-ink-600")}>{intro}</p>
            </motion.div>
          </div>
        </div>

        <ol ref={listRef} className="relative lg:col-span-7 lg:col-start-6">
          <div aria-hidden="true" className={cn("absolute bottom-0 left-[1.1rem] top-0 w-px", dark ? "bg-bone-50/10" : "bg-ink-900/10")}>
            <motion.div className="h-full w-full origin-top bg-clay-400" style={{ scaleY: scrollYProgress }} />
          </div>

          {processSteps.map((id, i) => (
            <motion.li
              key={id}
              className="relative pb-14 pl-16 last:pb-0"
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.8, ease }}
            >
              <span
                className={cn(
                  "absolute left-0 top-0 flex h-9 w-9 items-center justify-center rounded-full border font-display text-xs",
                  dark ? "border-bone-50/20 bg-ink-900 text-bone-50" : "border-ink-900/15 bg-bone-100 text-ink-900",
                )}
              >
                <span className="sr-only">{stepLabel} </span>
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-2xl font-medium tracking-tight md:text-3xl">{steps[id].title}</h3>
              <p className={cn("mt-3 max-w-lg leading-relaxed", dark ? "text-bone-200/70" : "text-ink-600")}>
                {steps[id].text}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Reveal } from "./Reveal";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  as?: "h1" | "h2";
  className?: string;
  action?: ReactNode;
};

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "dark",
  as: Heading = "h2",
  className,
  action,
}: Props) {
  const light = tone === "light";
  return (
    <div
      className={cn(
        "flex flex-col gap-8 md:flex-row md:items-end md:justify-between",
        align === "center" && "items-center text-center md:flex-col md:items-center",
        className,
      )}
    >
      <Reveal className={cn("max-w-3xl", align === "center" && "mx-auto")}>
        {eyebrow && <p className={cn("eyebrow mb-6", light && "text-bone-200/70")}>{eyebrow}</p>}
        <Heading
          className={cn(
            "font-display font-medium text-balance",
            Heading === "h1" ? "text-display-lg" : "text-display-md",
            light ? "text-bone-50" : "text-ink-900",
          )}
        >
          {title}
        </Heading>
        {intro && (
          <p
            className={cn(
              "mt-6 max-w-2xl text-lg leading-relaxed text-pretty",
              align === "center" && "mx-auto",
              light ? "text-bone-200/80" : "text-ink-600",
            )}
          >
            {intro}
          </p>
        )}
      </Reveal>
      {action && <Reveal delay={0.1}>{action}</Reveal>}
    </div>
  );
}

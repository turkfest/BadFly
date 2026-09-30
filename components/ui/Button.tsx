import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { ArrowRight } from "./Icons";

type Variant = "primary" | "secondary" | "light" | "outline-light" | "link";

const base =
  "group relative inline-flex items-center justify-center gap-3 whitespace-nowrap text-sm font-medium tracking-wide transition-all duration-500 ease-premium focus-visible:ring-offset-2";

const variants: Record<Variant, string> = {
  primary: "h-14 px-8 bg-ink-900 text-bone-50 hover:bg-clay-500",
  secondary: "h-14 px-8 border border-ink-900/20 text-ink-900 hover:border-ink-900 hover:bg-ink-900 hover:text-bone-50",
  light: "h-14 px-8 bg-bone-50 text-ink-900 hover:bg-clay-500 hover:text-bone-50",
  "outline-light": "h-14 px-8 border border-bone-50/30 text-bone-50 hover:border-bone-50 hover:bg-bone-50 hover:text-ink-900",
  link: "h-auto p-0 text-ink-900 underline-offset-8 hover:underline",
};

type Props = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: Variant;
  arrow?: boolean;
  className?: string;
  children: ReactNode;
};

export function LinkButton({ variant = "primary", arrow = true, className, children, ...props }: Props) {
  return (
    <Link className={cn(base, variants[variant], className)} {...props}>
      <span>{children}</span>
      {arrow && (
        <ArrowRight size={18} className="transition-transform duration-500 ease-premium group-hover:translate-x-1" />
      )}
    </Link>
  );
}

export function buttonClasses(variant: Variant = "primary", className?: string) {
  return cn(base, variants[variant], className);
}

import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={cn("h-7 w-7", className)} aria-hidden="true" focusable="false">
      <rect width="32" height="32" fill="currentColor" />
      <path d="M16 9c-4.5-4-10-3-10 1.5 0 4 4.5 6 10 6.5-5.5.5-8 3-6.5 5.5 1.7 2.8 5.5.5 6.5-3.5 1 4 4.8 6.3 6.5 3.5 1.5-2.5-1-5-6.5-5.5 5.5-.5 10-2.5 10-6.5C26 6 20.5 5 16 9Z" fill="var(--logo-fg, #F6F3EE)" />
    </svg>
  );
}

export function Logo({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  return (
    <span
      className={cn("inline-flex items-center gap-3", tone === "light" ? "text-bone-50" : "text-ink-900", className)}
      style={tone === "light" ? ({ "--logo-fg": "#0E0E10" } as CSSProperties) : undefined}
    >
      <LogoMark />
      <span className="font-display text-[1.05rem] font-semibold tracking-[0.22em]">BADFLY</span>
    </span>
  );
}

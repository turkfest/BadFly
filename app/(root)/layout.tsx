import type { Metadata } from "next";
import type { ReactNode } from "react";
import "../globals.css";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: "BadFly — Custom Apparel Manufacturing for European Brands",
  robots: { index: false, follow: true },
  alternates: { canonical: `${site.url}/en/` },
};

export default function RootRedirectLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-bone-50 font-sans text-ink-900">{children}</body>
    </html>
  );
}

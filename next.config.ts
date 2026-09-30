import type { NextConfig } from "next";

// Set NEXT_PUBLIC_BASE_PATH=/repo-name when hosting under a subpath (e.g. GitHub Pages).
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: basePath || undefined,
  images: {
    loader: "custom",
    loaderFile: "./lib/images/loader.ts",
  },
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;

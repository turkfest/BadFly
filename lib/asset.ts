const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

// next/image and raw <img> don't apply basePath to local src strings, so prefix manually.
export function asset(path: string): string {
  if (/^(https?:)?\/\//.test(path) || path.startsWith("data:")) return path;
  return `${basePath}${path.startsWith("/") ? path : `/${path}`}`;
}

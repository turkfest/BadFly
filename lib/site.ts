export const site = {
  name: "BadFly",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://www.badfly.com").replace(/\/$/, ""),
  email: "info@badfly.com",
  country: "TR",
  areaServed: "Europe",
  // Add verified profile URLs (e.g. { name: "LinkedIn", url: "https://..." }); links render only when listed.
  social: [] as { name: string; url: string }[],
};

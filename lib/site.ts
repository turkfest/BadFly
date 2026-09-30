export const site = {
  name: "BadFly",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://www.badfly.com").replace(/\/$/, ""),
  email: "info@badfly.com",
  country: "TR",
  areaServed: "Europe",
  social: {
    linkedin: "https://www.linkedin.com/company/badfly",
    instagram: "https://www.instagram.com/badfly",
  },
} as const;

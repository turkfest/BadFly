import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", md: "2rem", lg: "3rem" },
      screens: { "2xl": "1360px" },
    },
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0E0E10",
          900: "#0E0E10",
          800: "#1A1A1D",
          700: "#2A2A2E",
          600: "#4A4A50",
          500: "#6B6B72",
          400: "#9A9AA0",
        },
        bone: {
          DEFAULT: "#F6F3EE",
          50: "#FBFAF7",
          100: "#F6F3EE",
          200: "#ECE6DC",
          300: "#DDD4C6",
        },
        clay: {
          DEFAULT: "#B4532A",
          400: "#C96A40",
          500: "#B4532A",
          600: "#963F1C",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(2.75rem, 6.2vw, 6rem)", { lineHeight: "0.98", letterSpacing: "-0.035em" }],
        "display-lg": ["clamp(2.25rem, 4.6vw, 4.25rem)", { lineHeight: "1.02", letterSpacing: "-0.03em" }],
        "display-md": ["clamp(1.75rem, 3vw, 2.75rem)", { lineHeight: "1.08", letterSpacing: "-0.025em" }],
      },
      letterSpacing: {
        eyebrow: "0.18em",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;

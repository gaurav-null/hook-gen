/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Newsprint Monochrome Palette
        newsprint: {
          bg: "#F9F9F7",      // Off-white background
          fg: "#111111",      // Ink black
          border: "#111111",  // Black borders
          accent: "#CC0000",  // Editorial red
          divider: "#E5E5E0", // Light grey divider
        },
        neutral: {
          100: "#F5F5F5",
          200: "#E5E5E5",
          300: "#D4D4D8",
          400: "#A3A3A3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#18181B",
        },
      },
      fontFamily: {
        serif: ["'Playfair Display'", "serif"],
        body: ["'Lora'", "serif"],
        sans: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      fontSize: {
        // Newsprint Type Scale
        "9xl": ["128px", { lineHeight: "0.9", letterSpacing: "-0.02em" }],
        "8xl": ["96px", { lineHeight: "0.95", letterSpacing: "-0.02em" }],
        "7xl": ["72px", { lineHeight: "1", letterSpacing: "-0.01em" }],
        "6xl": ["60px", { lineHeight: "1.1", letterSpacing: "-0.01em" }],
        "5xl": ["48px", { lineHeight: "1.2" }],
        "4xl": ["36px", { lineHeight: "1.3" }],
        "3xl": ["30px", { lineHeight: "1.4" }],
        "2xl": ["24px", { lineHeight: "1.5" }],
        xl: ["20px", { lineHeight: "1.6" }],
        lg: ["18px", { lineHeight: "1.625" }],
        base: ["16px", { lineHeight: "1.625" }],
        sm: ["14px", { lineHeight: "1.7" }],
        xs: ["12px", { lineHeight: "1.5", letterSpacing: "0.05em" }],
      },
      letterSpacing: {
        tighter: "-0.02em",
        tight: "-0.01em",
        normal: "0em",
        wide: "0.025em",
        wider: "0.05em",
        widest: "0.1em",
      },
      lineHeight: {
        tight: "0.9",
        snug: "1.1",
        normal: "1.5",
        relaxed: "1.625",
        loose: "2",
      },
      boxShadow: {
        // Hard newsprint shadows
        "hard": "4px 4px 0px 0px #111111",
        "hard-sm": "2px 2px 0px 0px #111111",
        "hard-lg": "6px 6px 0px 0px #111111",
      },
      maxWidth: {
        newsprint: "1280px",
      },
      gridTemplateColumns: {
        12: "repeat(12, minmax(0, 1fr))",
      },
      transitionDuration: {
        200: "200ms",
        300: "300ms",
      },
      animation: {
        "fade-in": "fadeIn 300ms ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      borderRadius: {
        none: "0px",
      },
    },
  },
  plugins: [],
}
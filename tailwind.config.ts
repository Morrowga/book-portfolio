import type { Config } from "tailwindcss";

/**
 * Colors map to CSS variables declared from data/theme.ts (injected in app/layout.tsx).
 * Change values in data/theme.ts — never here — and the whole site restyles.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        accent: "var(--color-accent)",
        background: "var(--color-background)",
        paper: "var(--color-paper)",
        text: "var(--color-text)",
        muted: "var(--color-text-muted)",
      },
      fontFamily: {
        display: "var(--font-display)",
        body: "var(--font-body)",
      },
      boxShadow: {
        book: "0 18px 40px -12px rgba(0,0,0,0.45), 0 6px 14px -6px rgba(0,0,0,0.3)",
        page: "inset 0 0 24px rgba(0,0,0,0.06)",
      },
    },
  },
  plugins: [],
};
export default config;

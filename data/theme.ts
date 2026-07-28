/**
 * ============================================================
 * THEME — edit this file to restyle the ENTIRE site.
 * ============================================================
 * Every color below becomes a CSS variable on :root (see app/layout.tsx),
 * and every component/Tailwind class reads from those variables.
 * No component code needs to change when you edit these values.
 *
 * To swap FONTS: see app/fonts.ts (next/font requires static imports,
 * so the font *families* are chosen there; sizing/usage stays the same).
 */

export const theme = {
  colors: {
    /** Main brand color — book cover, headings, primary buttons */
    primary: "#2B2B2B",
    /** Supporting color — subheadings, borders, secondary UI */
    secondary: "#4D4D4D",
    /** Highlight color — links, active states, small flourishes */
    accent: "#000000",
    /** App background behind the book / landing screen */
    background: "#e2b27d",
    /** The paper color of book pages */
    paper: "#e2b27d",
    /** Main body text color */
    text: "#2c2015",
    /** Muted/secondary text color (dates, captions) */
    textMuted: "#7a6a4a",
  },
} as const;

/** Maps theme tokens to the CSS variable names used across the app. */
export function themeToCssVars(): string {
  const c = theme.colors;
  return `
    --color-primary: ${c.primary};
    --color-secondary: ${c.secondary};
    --color-accent: ${c.accent};
    --color-background: ${c.background};
    --color-paper: ${c.paper};
    --color-text: ${c.text};
    --color-text-muted: ${c.textMuted};
  `;
}
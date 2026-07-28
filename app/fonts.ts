/**
 * ============================================================
 * FONTS — swap typefaces here.
 * ============================================================
 * next/font needs static imports, so to change fonts:
 *   1. Change the import name (any Google Font works),
 *   2. Update the two constructor calls below.
 * The rest of the app only ever uses the CSS variables
 * --font-display and --font-body, so nothing else changes.
 */
import { Playfair_Display, PT_Serif } from "next/font/google";

export const displayFont = Playfair_Display({
  subsets: ["latin"],
  weight: ["700", "900"],
  variable: "--font-display",
  display: "swap",
});

export const bodyFont = PT_Serif({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-body",
  display: "swap",
});
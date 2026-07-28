import type { Metadata } from "next";
import "./globals.css";
import { displayFont, bodyFont } from "./fonts";
import { themeToCssVars } from "@/data/theme";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: `${profile.name} — Portfolio`,
  description: `The story, work and experience of ${profile.name}.`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <head>
        {/* Theme tokens from data/theme.ts — the single styling source of truth */}
        <style>{`:root{${themeToCssVars()}}`}</style>
      </head>
      <body className="bg-background text-text font-body antialiased">
        {children}
      </body>
    </html>
  );
}

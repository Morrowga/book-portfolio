# Portfolio Book

A gift-style portfolio site: landing screen → open a 3D book → flip through pages.
Built with Next.js (App Router), React, TypeScript, Tailwind CSS, Framer Motion,
and `react-pageflip` for the page-turn physics.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
```

## Edit the content (no code changes needed)

Everything personal lives in `data/`, marked with ⟪PLACEHOLDER⟫ markers:

| File | What it controls |
|---|---|
| `data/profile.ts` | Name, age, location, photos, tagline, bio |
| `data/experiences.ts` | Experience entries (any number — pages auto-generate) |
| `data/certificates.ts` | Certificates grid (4 per page, auto-paginates) |
| `data/socials.ts` | Email, phone, social links |
| `data/theme.ts` | **All colors** — edit once, restyles the whole site |
| `app/fonts.ts` | Display + body typefaces (any Google Font) |

Put real images/PDFs in `public/` and update the paths in the data files.

## How things work

- **Page plan** — `lib/pages.ts` converts the data configs into an ordered list
  of page descriptors and a table of contents. Long experience descriptions are
  split across pages on sentence boundaries (`paginateParagraphs`). Adjust
  `CHARS_FIRST_PAGE` / `CHARS_CONT_PAGE` there if you change page size or font.
- **Flipping** — `components/Book/BookView.tsx` wraps `react-pageflip`
  (drag page corners, click, arrow keys, prev/next buttons).
- **Navigation** — table of contents (`components/Nav/PageMenu.tsx`) jumps to any
  section; a progress bar + page counter sit in the control bar.
- **Autoplay** — toggle in the control bar; flips every 4.5 s and pauses
  automatically on any manual interaction. Change `AUTOPLAY_INTERVAL_MS` in
  `BookView.tsx`.
- **Responsive** — the landing screen stacks on mobile; the book switches to
  single-page portrait mode on narrow screens (`usePortrait` + `size="stretch"`).
- **Reduced motion** — `prefers-reduced-motion` disables the idle float/glint,
  removes flip shadows, and makes navigation jump instead of animate.

## Structure

```
app/            layout (injects theme CSS vars), page, fonts, globals.css
components/
  App.tsx       landing ↔ book transition
  Landing/      split-screen landing + CSS-3D closed book
  Book/         flipbook view, page wrapper, page templates
  Nav/          controls bar + table of contents
data/           ← all editable content and theme tokens
lib/pages.ts    page plan + text pagination
public/         placeholder images (replace these)
```

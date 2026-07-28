/**
 * ============================================================
 * PROFILE — replace every ⟪PLACEHOLDER⟫ with real content.
 * ============================================================
 * `photo` paths point to files in /public. Drop the real photos in
 * /public and update the paths (or keep the same filenames).
 */

export interface Profile {
  name: string;
  age: number;
  location: string;
  /** Large portrait shown on the landing screen (left side). */
  portraitPhoto: string;
  /** Background scene shown behind the closed book (right side). */
  bookBackdropPhoto: string;
  /** Photo used on the book's cover page. Can be the same file. */
  coverPhoto: string;
  /** Short tagline under the name on the cover. */
  tagline: string;
  /** The introduction page paragraph(s). */
  bio: string[];
}

export const profile: Profile = {
  name: "Hannah Sya",
  age: 28,
  location: "Chiang Mai",
  portraitPhoto: "/images/1.JPG", 
  bookBackdropPhoto: "/images/2.JPG", 
  coverPhoto: "/images/3.png",
  tagline: "Finance Officer",
  bio: [
    "Intro paragraph 1 — who she is, what drives her work at the NGO, and what this little book holds.",
    "Intro paragraph 2 (optional) — delete this string or add more; the page adapts to any number of paragraphs.",
  ],
};
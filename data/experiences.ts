/**
 * ============================================================
 * EXPERIENCES — add/remove/edit objects freely.
 * ============================================================
 * Each entry becomes one or MORE book pages automatically:
 * long descriptions are split across pages (see lib/pagination.ts),
 * so you never need to think about page layout here.
 *
 * Optional fields: images (shown on the entry's first page),
 * fileUrl + fileLabel (renders a document/download link).
 */

export interface Experience {
  title: string;
  organization: string;
  /** e.g. "Mar 2022 – Present" */
  dateRange: string;
  /** Paragraphs. Long content is automatically paginated across pages. */
  description: string[];
  /** Optional image paths from /public. First image is featured. */
  images?: string[];
  /** Optional link to a report/PDF (put the file in /public). */
  fileUrl?: string;
  fileLabel?: string;
}

export const experiences: Experience[] = [
  {
    title: "ROLE TITLE",
    organization: "NGO name",
    dateRange: "2023 – Present",
    description: [
      "What she did, who it helped, and what changed because of it. Write as much as you like — if this runs long, it flows onto the next page automatically.⟫",
      "Second paragraph (optional).",
    ],
    images: ["/placeholder-photo.svg"],
    fileUrl: "/sample-report.pdf", 
    fileLabel: "Read the project report (PDF)",
  },
  {
    title: "EARLIER ROLE",
    organization: "Organization",
    dateRange: "2021 – 2023",
    description: [
      "Description. Entries with no images and no file are fine — those sections simply don't render.",
    ],
  },
];

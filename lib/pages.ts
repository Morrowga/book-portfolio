import { profile } from "@/data/profile";
import { experiences, Experience } from "@/data/experiences";
import { certificates, Certificate } from "@/data/certificates";

/**
 * Turns the data configs into a flat, ordered list of page descriptors.
 * The book renders this plan 1:1, and the table of contents is derived
 * from it — so any number of experiences/certificates "just works".
 */

/** Rough amount of description text that fits on one page. */
const CHARS_FIRST_PAGE = 520; // first page also holds title/meta/image
const CHARS_CONT_PAGE = 950; // continuation pages are text-only

export type PageDescriptor =
  | { kind: "cover" }
  | { kind: "intro" }
  | {
      kind: "experience";
      experience: Experience;
      paragraphs: string[];
      part: number;
      totalParts: number;
    }
  | { kind: "certificates"; items: Certificate[]; part: number; totalParts: number }
  | { kind: "gallery"; title: string; part: 1 | 2 }
  | { kind: "contact" }
  | { kind: "blank" }
  | { kind: "backCover" };

export interface TocEntry {
  label: string;
  pageIndex: number;
}

/** Splits paragraphs into page-sized chunks, breaking on sentence boundaries. */
export function paginateParagraphs(paragraphs: string[]): string[][] {
  const pages: string[][] = [];
  let current: string[] = [];
  let used = 0;
  let budget = CHARS_FIRST_PAGE;

  const pushPage = () => {
    if (current.length) pages.push(current);
    current = [];
    used = 0;
    budget = CHARS_CONT_PAGE;
  };

  for (const para of paragraphs) {
    if (para.length + used <= budget) {
      current.push(para);
      used += para.length;
      continue;
    }
    // Paragraph doesn't fit — split it on sentence boundaries.
    const sentences = para.match(/[^.!?]+[.!?]*\s*/g) ?? [para];
    let piece = "";
    for (const sentence of sentences) {
      if (used + piece.length + sentence.length > budget && (piece || current.length)) {
        if (piece) current.push(piece.trim());
        pushPage();
        piece = "";
      }
      piece += sentence;
    }
    if (piece.trim()) {
      current.push(piece.trim());
      used += piece.length;
    }
  }
  pushPage();
  return pages.length ? pages : [[]];
}

const CERTS_PER_PAGE = 4;

export function buildPages(): { pages: PageDescriptor[]; toc: TocEntry[] } {
  const pages: PageDescriptor[] = [];
  const toc: TocEntry[] = [];

  pages.push({ kind: "cover" });
  toc.push({ label: "Cover", pageIndex: 0 });

  toc.push({ label: "Introduction", pageIndex: pages.length });
  pages.push({ kind: "intro" });

  experiences.forEach((experience, i) => {
    const chunks = paginateParagraphs(experience.description);
    if (i === 0) toc.push({ label: "Experience", pageIndex: pages.length });
    chunks.forEach((paragraphs, part) => {
      pages.push({
        kind: "experience",
        experience,
        paragraphs,
        part: part + 1,
        totalParts: chunks.length,
      });
    });
  });

  if (certificates.length) {
    toc.push({ label: "Certificates", pageIndex: pages.length });
    const totalParts = Math.ceil(certificates.length / CERTS_PER_PAGE);
    for (let part = 0; part < totalParts; part++) {
      pages.push({
        kind: "certificates",
        items: certificates.slice(part * CERTS_PER_PAGE, (part + 1) * CERTS_PER_PAGE),
        part: part + 1,
        totalParts,
      });
    }
  }

  toc.push({ label: "Neutral Enjoyer", pageIndex: pages.length });
  pages.push({ kind: "gallery", title: "Neutral Enjoyer", part: 1 });
  pages.push({ kind: "gallery", title: "Neutral Enjoyer", part: 2 });

  toc.push({ label: "Contact", pageIndex: pages.length });
  pages.push({ kind: "contact" });

  // Keep an even total page count so the book closes cleanly onto a back cover.
  if (pages.length % 2 !== 0) {
    pages.push({ kind: "backCover" });
  } else {
    pages.push({ kind: "blank" });
    pages.push({ kind: "backCover" });
  }

  return { pages, toc };
}

export { profile };

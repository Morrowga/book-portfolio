/**
 * ============================================================
 * CERTIFICATES — add as many as you like.
 * ============================================================
 * They render in a grid, 4 per page; extra certificates
 * automatically continue onto additional pages.
 */

export interface Certificate {
  title: string;
  issuer: string;
  /** e.g. "June 2024" */
  date: string;
  /** Thumbnail/scan of the certificate, from /public. */
  imageUrl: string;
}

export const certificates: Certificate[] = [
  {
    title: "Certificate title",
    issuer: "Issuing organization",
    date: "Month Year",
    imageUrl: "/placeholder-certificate.svg", 
  },
  {
    title: "Certificate title",
    issuer: "Issuing organization",
    date: "Month Year",
    imageUrl: "/placeholder-certificate.svg",
  },
];

/**
 * ============================================================
 * CONTACT & SOCIALS — shown on the final Contact page.
 * ============================================================
 * `icon` must be one of the keys handled in
 * components/Book/pages/ContactPage.tsx (linkedin, instagram,
 * facebook, twitter, globe, mail). Add a new icon there if needed.
 */

export interface SocialLink {
  platform: string;
  url: string;
  icon: "linkedin" | "instagram" | "facebook" | "twitter" | "globe" | "mail";
}

export interface ContactInfo {
  email: string;
  /** Optional — delete the property (or set to undefined) to hide. */
  phone?: string;
  socials: SocialLink[];
}

export const contact: ContactInfo = {
  email: "maihannah.sya@gmail.com",
  phone: "+00 000 000 000", 
  socials: [
    { platform: "LinkedIn", url: "https://linkedin.com/in/handle", icon: "linkedin" },
    { platform: "Instagram", url: "https://instagram.com/handle", icon: "instagram" },
    { platform: "Facebook", url: "https://www.facebook.com/HannahsyaP", icon: "facebook" },
  ],
};

import { Mail, Phone, Linkedin, Instagram, Facebook, Twitter, Globe } from "lucide-react";
import { contact, SocialLink } from "@/data/socials";
import { profile } from "@/data/profile";
import Image from "next/image";

const ICONS: Record<SocialLink["icon"], typeof Mail> = {
  linkedin: Linkedin,
  instagram: Instagram,
  facebook: Facebook,
  twitter: Twitter,
  globe: Globe,
  mail: Mail,
};

export default function ContactPage() {
  return (
    <div className="flex h-full flex-col">
      <p className="font-body text-[10px] uppercase tracking-[0.3em] text-secondary">
        Contact
      </p>
      <h2 className="mt-2 font-display text-2xl text-primary md:text-3xl">
        LET&apos;S STAY IN TOUCH
      </h2>
      <div className="mt-3 h-px w-12 bg-accent" />

      <div className="mt-6 space-y-3">
        <a
          href={`mailto:${contact.email}`}
          className="flex items-center gap-3 font-body text-sm text-text transition-colors hover:text-accent"
        >
          <Mail size={16} className="text-secondary" aria-hidden />
          {contact.email}
        </a>
        {contact.phone && (
          
          <a  href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`}
            className="flex items-center gap-3 font-body text-sm text-text transition-colors hover:text-accent"
          >
            <Phone size={16} className="text-secondary" aria-hidden />
            {contact.phone}
          </a>
        )}
        {profile.location && (
          <p className="flex items-center gap-3 font-body text-sm text-text">
            <Globe size={16} className="text-secondary" aria-hidden />
            {profile.location}
          </p>
        )}
      </div>

      <div className="mt-8">
        <p className="font-body text-xs font-semibold uppercase tracking-widest text-muted">
          Elsewhere
        </p>
        <div className="mt-3 flex flex-wrap gap-3">
          {contact.socials.map((social) => {
            const Icon = ICONS[social.icon];
            return (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.platform}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-accent text-paper"
              >
                <Icon size={18} aria-hidden />
              </a>
            );
          })}
        </div>
      </div>

      {/* <div className="mt-auto flex justify-end">
        <Image
          src="/images/coffee-contact2.png"
          alt="Let's meet up for coffee"
          width={420}
          height={420}
          className="h-auto w-full max-w-[260px]"
        />
      </div>
 */}


      {/* <p className="mt-auto font-body text-xs italic text-muted">
        Thank you for reading a story.
      </p> */}
    </div>
  );
}
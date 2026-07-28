import Image from "next/image";
import { Certificate } from "@/data/certificates";

interface CertificatesPageProps {
  items: Certificate[];
  part: number;
  totalParts: number;
}

/** A grid of up to 4 certificates; extras continue on the next page. */
export default function CertificatesPage({
  items,
  part,
  totalParts,
}: CertificatesPageProps) {
  return (
    <div className="flex h-full flex-col">
      <p className="font-body text-[10px] uppercase tracking-[0.3em] text-secondary">
        Certificates{totalParts > 1 ? ` · ${part}/${totalParts}` : ""}
      </p>
      <h2 className="mt-2 font-display text-2xl text-primary">
        LEARNING &amp; RECOGNITION
      </h2>
      <div className="mt-3 h-px w-12 bg-accent" />

      <div className="mt-5 grid flex-1 grid-cols-2 content-start gap-3 overflow-hidden md:gap-4">
        {items.map((cert, i) => (
          <figure
            key={i}
            className="flex flex-col overflow-hidden rounded-md border border-secondary/25 bg-white/50"
          >
            <div className="relative aspect-[10/7] w-full">
              <Image
                src={cert.imageUrl}
                alt={`${cert.title} — ${cert.issuer}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 45vw, 20vw"
              />
            </div>
            <figcaption className="p-2">
              <p className="font-body text-xs font-bold leading-snug text-primary">
                {cert.title}
              </p>
              <p className="font-body text-[11px] text-muted">
                {cert.issuer} · {cert.date}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

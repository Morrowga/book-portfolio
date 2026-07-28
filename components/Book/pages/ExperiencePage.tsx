import Image from "next/image";
import { FileText } from "lucide-react";
import { Experience } from "@/data/experiences";

interface ExperiencePageProps {
  experience: Experience;
  /** Paragraphs belonging to this page only (pre-paginated). */
  paragraphs: string[];
  part: number;
  totalParts: number;
}

/**
 * One page of an experience entry. Long entries span multiple
 * pages: the first page carries the heading, meta, and image;
 * continuation pages carry the remaining text.
 */
export default function ExperiencePage({
  experience,
  paragraphs,
  part,
  totalParts,
}: ExperiencePageProps) {
  const isFirst = part === 1;
  const isLast = part === totalParts;
  const featuredImage = experience.images?.[0];

  return (
    <div className="flex h-full flex-col">
      {isFirst ? (
        <>
          <p className="font-body text-[10px] uppercase tracking-[0.3em] text-secondary">
            Experience
          </p>
          <h2 className="mt-2 font-display text-xl leading-snug text-primary md:text-2xl">
            {experience.title}
          </h2>
          <p className="mt-1 font-body text-sm font-semibold text-secondary">
            {experience.organization}
          </p>
          <p className="font-body text-xs text-muted">{experience.dateRange}</p>
          {featuredImage && (
            <div className="relative mt-4 h-28 w-full overflow-hidden rounded-md md:h-36">
              <Image
                src={featuredImage}
                alt={`${experience.title} at ${experience.organization}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 90vw, 40vw"
              />
            </div>
          )}
        </>
      ) : (
        <p className="font-body text-[10px] uppercase tracking-[0.3em] text-secondary">
          {experience.title} · continued
        </p>
      )}

      <div className="mt-4 flex-1 space-y-3 overflow-hidden">
        {paragraphs.map((paragraph, i) => (
          <p
            key={i}
            className="font-body text-sm leading-relaxed text-text"
          >
            {paragraph}
          </p>
        ))}
      </div>

      {/* {isLast && experience.fileUrl && (
        <a
          href={experience.fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-2 self-start rounded-md border px-3 py-2 font-body text-xs font-semibold transition-colors border-accent text-accent"
        >
          <FileText size={14} aria-hidden />
          {experience.fileLabel ?? "View document"}
        </a>
      )} */}

      {totalParts > 1 && (
        <p className="mt-2 text-right font-body text-[10px] italic text-muted">
          Part {part} of {totalParts}
        </p>
      )}
    </div>
  );
}

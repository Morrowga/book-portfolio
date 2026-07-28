import Image from "next/image";
import { profile } from "@/data/profile";

/** Page 1 — magazine-style cover: full-bleed photo, no text overlay. */
export default function CoverPage() {
  return (
    <div className="relative -m-6 flex h-[calc(100%+3rem)] w-[calc(100%+3rem)] flex-col overflow-hidden md:-m-9 md:h-[calc(100%+4.5rem)] md:w-[calc(100%+4.5rem)]">
      <Image
        src={profile.coverPhoto}
        alt={`Photo of ${profile.name}`}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 90vw, 45vw"
      />
    </div>
  );
}
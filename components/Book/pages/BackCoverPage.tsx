"use client";

import { useState } from "react";
import Image from "next/image";

/** Last page — full-bleed book-end cover photo, no text overlay. */
export default function BackCoverPage() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative -m-6 flex h-[calc(100%+3rem)] w-[calc(100%+3rem)] flex-col overflow-hidden bg-[var(--color-paper)] md:-m-9 md:h-[calc(100%+4.5rem)] md:w-[calc(100%+4.5rem)]">
      {!loaded && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-[var(--color-paper)]">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--color-secondary)] border-t-transparent" />
        </div>
      )}
      <Image
        src="/images/book-end-cover.png"
        alt="Book end cover"
        fill
        className={`object-cover transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        sizes="(max-width: 768px) 90vw, 45vw"
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
"use client";

import { useState } from "react";
import Image from "next/image";

/** Blank page before the back cover — "THE END" over a full-bleed photo. */
export default function EndPage() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative -m-6 flex h-[calc(100%+3rem)] w-[calc(100%+3rem)] flex-col items-center justify-center overflow-hidden bg-[var(--color-paper)] md:-m-9 md:h-[calc(100%+4.5rem)] md:w-[calc(100%+4.5rem)]">
      {!loaded && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-[var(--color-paper)]">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--color-secondary)] border-t-transparent" />
        </div>
      )}
      <Image
        src="/images/5.JPG"
        alt=""
        aria-hidden
        fill
        className={`object-cover transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        sizes="(max-width: 768px) 90vw, 45vw"
        onLoad={() => setLoaded(true)}
      />
      <div aria-hidden className="absolute inset-0 bg-black/40" />
      <p className="relative z-10 font-display text-3xl tracking-[0.2em] text-white md:text-4xl">
        THE END
      </p>
    </div>
  );
}
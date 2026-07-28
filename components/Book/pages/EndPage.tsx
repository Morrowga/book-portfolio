import Image from "next/image";

/** Blank page before the back cover — "THE END" over a full-bleed photo. */
export default function EndPage() {
  return (
    <div className="relative -m-6 flex h-[calc(100%+3rem)] w-[calc(100%+3rem)] flex-col items-center justify-center overflow-hidden md:-m-9 md:h-[calc(100%+4.5rem)] md:w-[calc(100%+4.5rem)]">
      <Image
        src="/images/5.JPG"
        alt=""
        aria-hidden
        fill
        className="object-cover"
        sizes="(max-width: 768px) 90vw, 45vw"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-black/40"
      />
      <p className="relative font-display text-3xl tracking-[0.2em] text-white md:text-4xl">
        THE END
      </p>
    </div>
  );
}
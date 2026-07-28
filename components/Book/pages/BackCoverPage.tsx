import Image from "next/image";

/** Last page — full-bleed book-end cover photo, no text overlay. */
export default function BackCoverPage() {
  return (
    <div className="relative -m-6 flex h-[calc(100%+3rem)] w-[calc(100%+3rem)] flex-col overflow-hidden bg-[var(--color-paper)] md:-m-9 md:h-[calc(100%+4.5rem)] md:w-[calc(100%+4.5rem)]">
      {/* Blurred backdrop fill so side letterbox gaps blend seamlessly */}
      <Image
        src="/images/book-end-cover.png"
        alt=""
        aria-hidden
        fill
        className="scale-110 object-cover blur-2xl opacity-70"
      />
      {/* Full, uncropped image on top */}
      <Image
        src="/images/book-end-cover.png"
        alt="Book end cover"
        fill
        className="relative object-cover"
        sizes="(max-width: 768px) 90vw, 45vw"
      />
    </div>
  );
}
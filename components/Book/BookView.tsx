"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import HTMLFlipBook from "react-pageflip";
import { useReducedMotion } from "framer-motion";
import { buildPages, PageDescriptor } from "@/lib/pages";
import { profile } from "@/data/profile";
import Page from "./Page";
import CoverPage from "./pages/CoverPage";
import IntroPage from "./pages/IntroPage";
import ExperiencePage from "./pages/ExperiencePage";
import CertificatesPage from "./pages/CertificatesPage";
import ContactPage from "./pages/ContactPage";
import BackCoverPage from "./pages/BackCoverPage";
import GalleryPage from "./pages/GalleryPage";
import EndPage from "./pages/EndPage";
/** Minimal typing for the page-flip instance we use. */
interface PageFlipApi {
  flipNext: () => void;
  flipPrev: () => void;
}

interface FlipBookRef {
  pageFlip: () => PageFlipApi | undefined;
}

/** react-pageflip's published prop types are overly strict; relax them. */
const FlipBook = HTMLFlipBook as unknown as React.ComponentType<
  Record<string, unknown>
>;

function renderPageContent(page: PageDescriptor) {
  switch (page.kind) {
    case "cover":
      return <CoverPage />;
    case "intro":
      return <IntroPage />;
    case "gallery":
      return <GalleryPage title={page.title} part={page.part} />;
    case "experience":
      return (
        <ExperiencePage
          experience={page.experience}
          paragraphs={page.paragraphs}
          part={page.part}
          totalParts={page.totalParts}
        />
      );
    case "certificates":
      return (
        <CertificatesPage
          items={page.items}
          part={page.part}
          totalParts={page.totalParts}
        />
      );
    case "contact":
      return <ContactPage />;
    case "backCover":
      return <BackCoverPage />;
    case "blank":
      return <EndPage />;
  }
}

/**
 * Fixed layout, no resize animation, no controls bar: portrait photo
 * always on the left, the book always at the same size on the right
 * (free to overlap the portrait's edge). Navigate via the arrow
 * buttons, keyboard arrows, or the floating open button on the cover.
 */
export default function BookView() {
  const { pages } = useMemo(() => buildPages(), []);
  const bookRef = useRef<FlipBookRef | null>(null);
  const bookRowRef = useRef<HTMLDivElement | null>(null);
  const initialPage = 0;

  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [bookRect, setBookRect] = useState<{
    top: number;
    left: number;
    right: number;
    height: number;
  } | null>(null);
  const ready = mounted && bookRect !== null;


  const reducedMotion = useReducedMotion();
  const isOpen = currentPage > 0;

  useEffect(() => setMounted(true), []);

  // Trigger the fade-in on the next frame after mount so the
  // opacity transition actually animates instead of snapping in.
  useEffect(() => {
    if (!ready) return;
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, [ready]);

  // Measure the book's real rendered box (react-pageflip's own
  // ".stf__parent" element) relative to the row container, WITHOUT
  // adding any wrapper around FlipBook itself — so nothing about its
  // parent chain changes and size="stretch" measures exactly what it
  // always did.
  useEffect(() => {
    if (!mounted) return;
    const row = bookRowRef.current;
    if (!row) return;

    let ro: ResizeObserver | null = null;
    let cancelled = false;

    const measure = (bookEl: HTMLElement) => {
      const bookBox = bookEl.getBoundingClientRect();
      const rowBox = row.getBoundingClientRect();
      setBookRect({
        top: bookBox.top - rowBox.top,
        left: bookBox.left - rowBox.left,
        right: rowBox.right - bookBox.right,
        height: bookBox.height,
      });
    };

    const tryAttach = () => {
      if (cancelled) return;
      const bookEl = row.querySelector<HTMLElement>(".stf__parent");
      if (!bookEl) {
        requestAnimationFrame(tryAttach);
        return;
      }
      measure(bookEl);
      ro = new ResizeObserver(() => measure(bookEl));
      ro.observe(bookEl);
    };

    tryAttach();

    return () => {
      cancelled = true;
      ro?.disconnect();
    };
  }, [mounted]);

  const handleFlip = (e: { data: number }) => {
    setCurrentPage(e.data);
  };

  const goPrev = () => bookRef.current?.pageFlip()?.flipPrev();
  const goNext = () => bookRef.current?.pageFlip()?.flipNext();

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const flip = bookRef.current?.pageFlip();
      if (!flip) return;
      if (e.key === "ArrowRight") flip.flipNext();
      if (e.key === "ArrowLeft") flip.flipPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <main className="relative h-dvh w-full overflow-hidden">
      {/* Full-screen backdrop photo */}
      <Image
        src={profile.bookBackdropPhoto}
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.78) 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Left-side portrait photo — always here, never hidden or resized */}
      <div className="absolute inset-y-0 left-0 hidden w-1/2 overflow-hidden md:block">
        <Image
          src={profile.portraitPhoto}
          alt={`Portrait of ${profile.name}`}
          fill
          priority
          className="object-cover"
          sizes="50vw"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.14) 1px, transparent 1.4px)",
            backgroundSize: "16px 16px",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/45 to-transparent p-10 backdrop-blur-md">
          <h1 className="font-display text-4xl text-white md:text-5xl">
            {profile.name}
          </h1>
          <p className="mt-1 text-sm text-white/80 md:text-base">
            {profile.tagline}
          </p>
          {profile.location && (
            <p className="mt-2 flex items-center gap-1.5 text-sm text-white/70">
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 21c-4.5-4.5-7-8.03-7-11a7 7 0 1 1 14 0c0 2.97-2.5 6.5-7 11z"
                />
                <circle
                  cx="12"
                  cy="10"
                  r="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {profile.location}
            </p>
          )}
        </div>
      </div>

      {/* Compact header — mobile only (no split screen on small screens) */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex flex-col items-center gap-1 px-6 pt-8 pb-2 text-center md:hidden">
        <h1 className="font-display text-3xl text-white">{profile.name}</h1>
        <p className="text-base text-white/80">{profile.tagline}</p>
      </div>

      {/* The book — fixed size always, free to sit over the portrait's edge.
          bookRowRef is attached here (the SAME element that was always
          FlipBook's direct parent) purely to measure, not to wrap. */}
      <div
        ref={bookRowRef}
        className={`absolute inset-0 z-10 flex items-start justify-center px-4 pb-4 pt-32 transition-opacity md:items-center md:justify-end md:px-2 md:pb-0 md:pt-0 md:pr-16 lg:pr-24 ${
          reducedMotion ? "duration-0" : "duration-700"
        } ${visible ? "opacity-100" : "opacity-0"}`}
      >
        {mounted && (
          <FlipBook
            ref={bookRef}
            className="mx-auto"
            width={480}
            height={640}
            size="stretch"
            minWidth={300}
            maxWidth={560}
            minHeight={400}
            maxHeight={760}
            showCover
            usePortrait
            autoSize
            startPage={initialPage}
            mobileScrollSupport={false}
            drawShadow={!reducedMotion}
            maxShadowOpacity={0.4}
            flippingTime={reducedMotion ? 1 : 700}
            showPageCorners={false}
            useMouseEvents={false}
            onFlip={handleFlip}
          >
            {pages.map((page, index) => {
              const isCover =
                page.kind === "cover" || page.kind === "backCover";
              return (
                <Page
                  key={index}
                  side={index % 2 === 0 ? "right" : "left"}
                  variant={isCover ? "cover" : "paper"}
                  pageNumber={isCover ? undefined : index + 1}
                >
                  {renderPageContent(page)}
                </Page>
              );
            })}
          </FlipBook>
        )}

        {/* Prev arrow — half over the book's left edge, half outside it.
            Solid black background, no blur. */}
        {isOpen && bookRect && (
          <button
            type="button"
            aria-label="Previous page"
            onClick={goPrev}
            style={{
              position: "absolute",
              top: bookRect.top + bookRect.height / 2,
              left: bookRect.left,
              transform: "translate(-50%, -50%)",
            }}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white transition hover:bg-black/80 md:h-12 md:w-12"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 md:h-5 md:w-5" fill="none">
              <path
                d="M15 18l-6-6 6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}

        {/* Next arrow — hidden once the user reaches the back cover */}
        {isOpen && currentPage < pages.length - 1 && bookRect && (
          <button
            type="button"
            aria-label="Next page"
            onClick={goNext}
            style={{
              position: "absolute",
              top: bookRect.top + bookRect.height / 2,
              right: bookRect.right,
              transform: "translate(50%, -50%)",
            }}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white transition hover:bg-black/80 md:h-12 md:w-12"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 md:h-5 md:w-5" fill="none">
              <path
                d="M9 18l6-6-6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}

        {/* Floating "open book" button — sits half over the book's right
            edge, half outside it, only visible on the closed cover. */}
        {currentPage === 0 && bookRect && (
          <button
            type="button"
            aria-label="Open book"
            onClick={goNext}
            style={{
              position: "absolute",
              top: bookRect.top + bookRect.height / 2,
              right: bookRect.right,
              transform: "translate(50%, -50%)",
            }}
            className="animate-wave h-10 w-10 rounded-full bg-white/20 backdrop-blur-md transition hover:bg-white/30 md:h-14 md:w-14"
          />
        )}
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-3 z-10 text-center md:hidden">
        <p className="text-[10px] tracking-wide text-white/50">
          © {new Date().getFullYear()} Hannah Sya. All rights reserved.
        </p>
      </div>
    </main>
  );
}
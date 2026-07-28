"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import HTMLFlipBook from "react-pageflip";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { buildPages, PageDescriptor } from "@/lib/pages";
import { profile } from "@/data/profile";
import Page from "@/components/Book/Page";
import CoverPage from "@/components/Book/pages/CoverPage";
import IntroPage from "@/components/Book/pages/IntroPage";
import ExperiencePage from "@/components/Book/pages/ExperiencePage";
import CertificatesPage from "@/components/Book/pages/CertificatesPage";
import ContactPage from "@/components/Book/pages/ContactPage";
import BackCoverPage from "@/components/Book/pages/BackCoverPage";
import Controls from "@/components/Nav/Controls";
import PageMenu from "@/components/Nav/PageMenu";

const AUTOPLAY_INTERVAL_MS = 4500;

/** Minimal typing for the page-flip instance we use. */
interface PageFlipApi {
  flip: (page: number) => void;
  turnToPage: (page: number) => void;
  flipNext: () => void;
  flipPrev: () => void;
  getPageCount: () => number;
  getCurrentPageIndex: () => number;
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
      return null;
  }
}

/**
 * One always-mounted experience, one single FlipBook instance — no
 * separate "closed book" mockup. The book sits small (showing just its
 * cover) inside the split landing layout; opening it removes the
 * portrait panel from the flex layout, and Framer Motion's `layout`
 * prop smoothly animates the book's real resize into full screen while
 * flip() turns the cover — a genuine resize, not a CSS scale illusion,
 * so react-pageflip's internal page math stays correct throughout.
 */
export default function Experience() {
  const { pages, toc } = useMemo(() => buildPages(), []);
  const bookRef = useRef<FlipBookRef | null>(null);
  const initialPage = pages.length > 1 ? 1 : 0;

  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [autoplay, setAutoplay] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => setMounted(true), []);

  const api = useCallback(() => bookRef.current?.pageFlip(), []);
  const pauseAutoplay = useCallback(() => setAutoplay(false), []);

  const handleOpen = useCallback(() => {
    if (open) return;
    setOpen(true);
    const flip = api();
    if (!flip) return;
    if (reducedMotion) flip.turnToPage(initialPage);
    else flip.flip(initialPage);
  }, [open, api, reducedMotion, initialPage]);

  const handleClose = useCallback(() => {
    setOpen(false);
    setAutoplay(false);
    setMenuOpen(false);
    api()?.turnToPage(0);
  }, [api]);

  const goTo = useCallback(
    (pageIndex: number) => {
      pauseAutoplay();
      const flip = api();
      if (!flip) return;
      if (reducedMotion) flip.turnToPage(pageIndex);
      else flip.flip(pageIndex);
    },
    [api, pauseAutoplay, reducedMotion]
  );

  const next = useCallback(() => {
    pauseAutoplay();
    api()?.flipNext();
  }, [api, pauseAutoplay]);

  const prev = useCallback(() => {
    pauseAutoplay();
    api()?.flipPrev();
  }, [api, pauseAutoplay]);

  // Keyboard navigation, only once open
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, next, prev]);

  // Autoplay timer
  useEffect(() => {
    if (!autoplay) return;
    const id = setInterval(() => {
      const flip = api();
      if (!flip) return;
      if (flip.getCurrentPageIndex() >= flip.getPageCount() - 1) {
        setAutoplay(false);
      } else {
        flip.flipNext();
      }
    }, AUTOPLAY_INTERVAL_MS);
    return () => clearInterval(id);
  }, [autoplay, api]);

  return (
    <main className="relative h-dvh w-full overflow-hidden">
      {/* Full-screen backdrop, shared by both looks */}
      <Image
        src={profile.bookBackdropPhoto}
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        animate={{ opacity: open ? 1 : 0.7 }}
        transition={{ duration: 0.5 }}
        style={{
          background:
            "radial-gradient(circle at center, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.75) 100%)",
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

      {/* Compact header — mobile only, closed look only */}
      <motion.div
        className="pointer-events-none absolute inset-x-0 top-0 z-10 flex flex-col items-center gap-1 p-6 text-center md:hidden"
        animate={{ opacity: open ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        aria-hidden={open}
      >
        <h1 className="font-display text-2xl text-white">{profile.name}</h1>
        <p className="text-sm text-white/80">{profile.tagline}</p>
      </motion.div>

      {/* Layout row: portrait (left) + book (right) — the book is the
          SAME element the whole time; only the portrait's presence
          changes the flex layout, which `layout` animates smoothly. */}
      <div className="relative flex h-full w-full items-center">
        <AnimatePresence>
          {!open && (
            <motion.div
              key="portrait"
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative hidden h-full w-1/2 overflow-hidden md:block"
            >
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
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Book column — grows to fill the whole row once the portrait unmounts */}
        <motion.div
          layout
          transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
          className="relative flex h-full flex-1 items-center justify-center px-2"
          onPointerDown={pauseAutoplay}
        >
          <motion.div
            layout
            transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
            className={
              open
                ? "relative"
                : "relative drop-shadow-[0_20px_30px_rgba(0,0,0,0.4)]"
            }
            style={!open ? { width: 320, height: 440 } : undefined}
          >
            {!open && (
              <button
                type="button"
                aria-label="Open the book"
                onClick={handleOpen}
                className="absolute inset-0 z-10"
              />
            )}
            {mounted && (
              <FlipBook
                ref={bookRef}
                className="mx-auto"
                width={480}
                height={640}
                size="stretch"
                minWidth={280}
                maxWidth={540}
                minHeight={360}
                maxHeight={720}
                showCover
                usePortrait
                autoSize
                startPage={0}
                mobileScrollSupport={false}
                useMouseEvents={open}
                clickEventForward={open}
                disableFlipByClick={!open}
                drawShadow={!reducedMotion}
                maxShadowOpacity={0.4}
                flippingTime={reducedMotion ? 1 : 700}
                showPageCorners={open && !reducedMotion}
                onFlip={(e: { data: number }) => setCurrentPage(e.data)}
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
          </motion.div>
        </motion.div>
      </div>

      {/* Controls + menu — only usable once open */}
      <motion.div
        className="absolute inset-x-0 bottom-6 z-10 flex flex-col items-center gap-5"
        animate={{ opacity: open ? 1 : 0 }}
        transition={{ duration: 0.35, delay: open ? 0.4 : 0 }}
        style={{ pointerEvents: open ? "auto" : "none" }}
      >
        <Controls
          currentPage={currentPage}
          totalPages={pages.length}
          autoplay={autoplay}
          onPrev={prev}
          onNext={next}
          onToggleAutoplay={() => setAutoplay((v) => !v)}
          onOpenMenu={() => {
            pauseAutoplay();
            setMenuOpen(true);
          }}
          onCloseBook={handleClose}
        />
      </motion.div>

      <PageMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        toc={toc}
        currentPage={currentPage}
        onJump={goTo}
      />
    </main>
  );
}
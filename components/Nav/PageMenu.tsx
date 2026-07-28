"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { TocEntry } from "@/lib/pages";

interface PageMenuProps {
  open: boolean;
  onClose: () => void;
  toc: TocEntry[];
  currentPage: number;
  onJump: (pageIndex: number) => void;
}

/** Slide-in table of contents; jump straight to any section. */
export default function PageMenu({
  open,
  onClose,
  toc,
  currentPage,
  onJump,
}: PageMenuProps) {
  const reducedMotion = useReducedMotion();

  // The active section = the last TOC entry at or before the current page.
  const activeIndex = toc.reduce(
    (acc, entry, i) => (entry.pageIndex <= currentPage ? i : acc),
    0
  );

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-30 bg-black/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden
          />
          <motion.nav
            className="fixed left-0 top-0 z-40 flex h-full w-72 flex-col bg-paper p-6 shadow-2xl"
            initial={reducedMotion ? { opacity: 0 } : { x: "-100%" }}
            animate={reducedMotion ? { opacity: 1 } : { x: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { x: "-100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
            aria-label="Table of contents"
          >
            <div className="flex items-center justify-between">
              <p className="font-display text-lg text-primary">Contents</p>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close contents"
                className="rounded-full p-2 text-muted transition-colors hover:bg-secondary/10 hover:text-primary"
              >
                <X size={18} aria-hidden />
              </button>
            </div>

            <ul className="mt-6 space-y-1">
              {toc.map((entry, i) => (
                <li key={entry.label}>
                  <button
                    type="button"
                    onClick={() => {
                      onJump(entry.pageIndex);
                      onClose();
                    }}
                    className={`flex w-full items-baseline justify-between rounded-md px-3 py-2.5 text-left font-body text-sm transition-colors ${
                      i === activeIndex
                        ? "bg-primary text-paper"
                        : "text-text hover:bg-secondary/10"
                    }`}
                  >
                    <span>{entry.label}</span>
                    <span
                      className={`text-xs ${
                        i === activeIndex ? "text-paper/70" : "text-muted"
                      }`}
                    >
                      p.{entry.pageIndex + 1}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}

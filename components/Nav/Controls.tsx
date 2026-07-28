"use client";

import {
  ChevronLeft,
  ChevronRight,
  List,
  Pause,
  Play,
  X,
} from "lucide-react";

interface ControlsProps {
  currentPage: number;
  totalPages: number;
  autoplay: boolean;
  onPrev: () => void;
  onNext: () => void;
  onToggleAutoplay: () => void;
  onOpenMenu: () => void;
  onCloseBook: () => void;
}

const buttonClass =
  "flex h-10 w-10 items-center justify-center rounded-full text-primary transition-colors hover:bg-secondary/15 disabled:opacity-30 disabled:hover:bg-transparent";

/** Persistent controls under the book. */
export default function Controls({
  currentPage,
  totalPages,
  autoplay,
  onPrev,
  onNext,
  onToggleAutoplay,
  onOpenMenu,
  onCloseBook,
}: ControlsProps) {
  const progress = totalPages > 1 ? currentPage / (totalPages - 1) : 1;

  return (
    <div className="flex w-full max-w-xl flex-col items-center gap-2 px-4">
      {/* Progress bar */}
      <div
        className="h-1 w-full overflow-hidden rounded-full bg-secondary/20"
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={totalPages}
        aria-valuenow={currentPage + 1}
        aria-label="Reading progress"
      >
        <div
          className="h-full rounded-full bg-accent transition-[width] duration-300"
          style={{ width: `${Math.max(progress * 100, 2)}%` }}
        />
      </div>

      <div className="flex items-center gap-1 rounded-full bg-paper/90 px-2 py-1 shadow-md backdrop-blur">
        <button
          type="button"
          className={buttonClass}
          onClick={onOpenMenu}
          aria-label="Open table of contents"
          title="Contents"
        >
          <List size={18} aria-hidden />
        </button>

        <button
          type="button"
          className={buttonClass}
          onClick={onPrev}
          disabled={currentPage === 0}
          aria-label="Previous page"
          title="Previous page (←)"
        >
          <ChevronLeft size={20} aria-hidden />
        </button>

        <span className="min-w-[72px] text-center font-body text-xs font-semibold tabular-nums text-text">
          {currentPage + 1} / {totalPages}
        </span>

        <button
          type="button"
          className={buttonClass}
          onClick={onNext}
          disabled={currentPage >= totalPages - 1}
          aria-label="Next page"
          title="Next page (→)"
        >
          <ChevronRight size={20} aria-hidden />
        </button>

        <button
          type="button"
          className={buttonClass}
          onClick={onToggleAutoplay}
          aria-label={autoplay ? "Pause autoplay" : "Start autoplay"}
          aria-pressed={autoplay}
          title={autoplay ? "Pause autoplay" : "Autoplay"}
        >
          {autoplay ? <Pause size={18} aria-hidden /> : <Play size={18} aria-hidden />}
        </button>

        <button
          type="button"
          className={buttonClass}
          onClick={onCloseBook}
          aria-label="Close the book"
          title="Back to cover"
        >
          <X size={18} aria-hidden />
        </button>
      </div>
    </div>
  );
}

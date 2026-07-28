import { forwardRef, ReactNode } from "react";

interface PageProps {
  children: ReactNode;
  side: "left" | "right";
  variant?: "paper" | "cover";
  pageNumber?: number;
}

const Page = forwardRef<HTMLDivElement, PageProps>(function Page(
  { children, side, variant = "paper", pageNumber },
  ref
) {
  const gutter = side === "left" ? "page-gutter-left" : "page-gutter-right";
  return (
    <div
      ref={ref}
      className={`paper-texture relative h-full w-full overflow-hidden ${gutter}`}
    >
      <div className="flex h-full w-full flex-col overflow-hidden p-6 md:p-9">
        {children}
      </div>
      {pageNumber !== undefined && variant === "paper" && (
        <span className="absolute bottom-3 left-0 right-0 text-center font-body text-[11px] text-muted">
          {pageNumber}
        </span>
      )}
    </div>
  );
});

export default Page;
interface GalleryPageProps {
  title: string;
  part: 1 | 2;
}

/** Small reusable masthead strip: date/kicker left, red Vol/Issue tag right. */
function MastStrip({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-between pb-2 text-[9px] uppercase tracking-widest text-muted">
      <span>Weekend Edition</span>
      {/* <span>{label}</span> */}
    </div>
  );
}

function PageFooter({ page }: { page: string }) {
  return (
    <span className="mt-auto pt-2 text-right text-[10px] font-semibold text-[#c0392b]">
      {/* Page No : {page} */}
    </span>
  );
}

export default function GalleryPage({ title, part }: GalleryPageProps) {
  if (part === 1) {
    return (
      <div className="flex h-full flex-col">
        <MastStrip label="Field Notes" />

        <h2 className="font-display text-3xl uppercase leading-[0.95] tracking-tight text-primary md:text-4xl">
          {title}
        </h2>

        <div className="mt-3 h-px w-12 bg-accent" />

        {/* <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-[#c0392b]">
          Into the Wild
        </p> */}

        {/* Photo grid: one hero + three small thumbnails */}
        <div className="mt-3 grid flex-1 grid-cols-3 grid-rows-3 gap-1.5 overflow-hidden">
            <div className="relative col-span-2 row-span-2 overflow-hidden">
                <img
                    src="/images/gallery/g0.JPG"
                    alt={title}
                    className="h-full w-full object-cover rounded-lg"
                    style={{ objectPosition: "center 100%" }}
                />
                <svg
                aria-hidden
                viewBox="0 0 24 24"
                className="absolute -left-1.5 -top-1.5 h-7 w-7 rotate-[-18deg] text-zinc-300 drop-shadow-md"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 12V6a4 4 0 118 0v10a2.5 2.5 0 01-5 0V8"
                />
                </svg>
            </div>
            <div className="col-span-1 row-span-1 overflow-hidden">
                <img src="/images/gallery/g1.JPG" alt="" className="h-full w-full rounded-lg object-cover" />
            </div>
            <div className="col-span-1 row-span-1 overflow-hidden">
                <img src="/images/gallery/g2.JPG" alt="" className="h-full w-full rounded-lg object-cover" />
            </div>

            {/* g3 now shares row 3 with the paragraph beside it */}
            <div className="col-span-1 row-span-1 overflow-hidden">
                <img src="/images/gallery/g3.JPG" alt="" className="h-full w-ful rounded-lg object-cover" />
            </div>
            <p className="col-span-2 mt-2 row-span-1 text-[12px] leading-snug text-secondary">
                <span className="font-display float-left mr-1.5 mt-0.5 text-3xl leading-[0.8] text-primary">
                S
                </span>
                omewhere between the tree line and the summit, everything
                slows down. The air changes first, then the light, then the
                quiet — the kind of quiet that only exists a few hours from
                anywhere with a name.
            </p>
        </div>

        <PageFooter page="06" />
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <MastStrip label="On the Trail" />

      <p className="mt-3 text-lg font-bold uppercase leading-tight text-primary md:text-xl">
        Mountain Air, Quiet Mind
      </p>

      {/* Second photo grid: four small/medium images in a row-based layout */}
      <div className="mt-3 grid flex-1 grid-cols-2 grid-rows-2 gap-1.5 overflow-hidden">
        <div className="overflow-hidden">
          <img
            src="/images/gallery/g4.jpg"
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <div className="overflow-hidden">
          <img
            src="/images/gallery/g5.JPG"
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <div className="col-span-2 overflow-hidden">
          <img
            src="/images/gallery/g6.JPG"
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      {/* Two-column body copy, like the reference's article columns */}
      <div className="mt-3 grid grid-cols-2 gap-3 text-[12px] leading-snug text-secondary">
        <p>
            From the balcony, the whole valley lays itself out — red rooftops
            scattered between rice fields, mist still caught in the folds of
            the hills before the light fully arrives.
        </p>
        <p>
            Later, just grass and cosmos flowers as far as the wind reaches.
            Some afternoons ask nothing of you except to lie down in the
            field and watch the clouds take their time.
        </p>
     </div>

      <PageFooter page="07" />
    </div>
  );
}
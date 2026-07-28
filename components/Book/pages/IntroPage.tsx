import { profile } from "@/data/profile";

/** Introduction / about page. */
export default function IntroPage() {
  return (
    <div className="flex h-full flex-col">
      <p className="font-body text-[10px] uppercase tracking-[0.3em] text-secondary">
        Introduction
      </p>
      <h2 className="mt-2 font-display text-2xl text-primary md:text-3xl">
        Hello, I&apos;m {profile.name}
      </h2>
      <div className="mt-3 h-px w-12 bg-accent" />
      <div className="mt-5 space-y-4 overflow-hidden">
        {profile.bio.map((paragraph, i) => (
          <p
            key={i}
            className="font-body text-sm leading-relaxed text-text md:text-[15px]"
          >
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}

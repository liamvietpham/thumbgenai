import Link from 'next/link';

export function AboutCtaSection() {
  return (
    <section className="px-6 pb-14 text-center md:px-8 md:pb-24">
      <div className="mx-auto max-w-4xl">
        <h2 className="font-headline text-4xl font-bold tracking-tight text-[var(--on-surface)] md:text-5xl">
          Ready to evolve your content?
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[var(--on-surface-variant)]">
          Join creators already using Thumbnail AI to sharpen ideas, move faster, and publish
          visuals with stronger first-impression power.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-6 sm:flex-row">
          <Link
            href="/generate"
            className="inline-flex cursor-pointer items-center justify-center rounded-xl bg-gradient-to-br from-[#0058be] to-[#2170e4] px-10 py-4 text-lg font-bold text-white shadow-2xl shadow-[rgba(0,88,190,0.20)] tonal-transition hover:scale-[1.02]"
          >
            Start Creating Now
          </Link>
          <Link
            href="/thumbnails"
            className="inline-flex cursor-pointer items-center justify-center text-lg font-bold text-[var(--primary)] underline decoration-2 underline-offset-8 tonal-transition hover:opacity-80"
          >
            View Thumbnails
          </Link>
        </div>
      </div>
    </section>
  );
}

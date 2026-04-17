import Link from 'next/link';

export function PricingCtaSection() {
  return (
    <section className="px-6 pb-24 pt-32 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[2rem] bg-(--inverse-surface) p-10 text-(--inverse-on-surface) md:p-16">
          <div className="relative z-10 flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="max-w-xl text-center md:text-left">
              <h2 className="font-headline text-4xl font-bold md:text-5xl">
                Ready to dominate the algorithm?
              </h2>
              <p className="mt-6 text-lg leading-relaxed opacity-80">
                Join thousands of creators using Thumbnail AI to sharpen their concepts, move
                faster, and publish visuals that stand out immediately.
              </p>
            </div>

            <Link
              href="/generate"
              className="inline-flex cursor-pointer items-center justify-center rounded-full bg-linear-to-br from-[#0058be] to-[#2170e4] px-10 py-5 text-sm font-bold text-white shadow-2xl shadow-[rgba(0,88,190,0.30)] tonal-transition hover:scale-105"
            >
              Start Creating
            </Link>
          </div>

          <div className="pointer-events-none absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-(--primary) opacity-20 blur-[100px]" />
        </div>
      </div>
    </section>
  );
}

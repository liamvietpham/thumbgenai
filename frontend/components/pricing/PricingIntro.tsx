export function PricingIntro() {
  return (
    <section className="px-6 pb-6 pt-20 md:px-8 md:pt-32">
      <div className="mx-auto max-w-7xl text-center">
        <p className="inline-flex rounded-full bg-(--primary-fixed) px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-(--primary)">
          Credit Store
        </p>
        <h1 className="mt-6 font-headline text-5xl font-bold tracking-tight text-(--on-surface) md:text-7xl">
          Pay only for what you use
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-(--on-surface-variant)">
          No monthly fees. No subscriptions. Just high-quality AI thumbnails when you need them.
        </p>

        {/* 1 Credit = 1 Thumbnail pill */}
        <div className="mt-10 inline-flex items-center gap-4 rounded-2xl border border-(--outline-variant) bg-(--surface-container-low) px-5 py-4 shadow-sm">
          <div className="flex items-center gap-2.5">
            <div className="hidden size-9 shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-[#0058be] to-[#2170e4] text-white shadow sm:flex">
              <svg aria-hidden="true" className="size-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2Zm.75 14.5v.75a.75.75 0 0 1-1.5 0v-.75a3.25 3.25 0 0 1-.75-6.4V9.25a.75.75 0 0 1 1.5 0v.78a3.25 3.25 0 0 1 .75 6.47Zm-.75-1.5a1.75 1.75 0 1 0 0-3.5 1.75 1.75 0 0 0 0 3.5Z" />
              </svg>
            </div>
            <span className="font-headline text-base font-bold text-(--on-surface)">1 Credit</span>
          </div>

          <span className="text-lg font-bold text-(--on-surface-variant)">=</span>

          <div className="flex items-center gap-2.5">
            <div className="hidden size-9 shrink-0 items-center justify-center rounded-lg bg-(--tertiary-fixed) text-(--on-tertiary-fixed-variant) shadow sm:flex">
              <svg aria-hidden="true" className="size-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2ZM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5Z" />
              </svg>
            </div>
            <span className="font-headline text-base font-bold text-(--on-surface)">1 High-Quality Thumbnail</span>
          </div>
        </div>
      </div>
    </section>
  );
}

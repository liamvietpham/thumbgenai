import Image from 'next/image';
import EyeIcon from '@/components/icons/generated/EyeIcon';
import LightningIcon from '@/components/icons/generated/LightningIcon';
import PaletteIcon from '@/components/icons/generated/PaletteIcon';
import { optimizationCards } from '@/components/about/about-data';

const cardIcons = {
  secondary: EyeIcon,
  tertiary: PaletteIcon,
};

const cardIconColors = {
  secondary: 'text-[var(--secondary)]',
  tertiary: 'text-[var(--tertiary)]',
};

export function AboutOptimizationSection() {
  return (
    <section className="px-6 py-12 md:px-8 md:py-40">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-[rgba(194,198,214,0.16)] bg-[var(--surface-container-lowest)] p-6 shadow-[0_32px_64px_-12px_rgba(0,88,190,0.04)] md:rounded-[2.5rem] md:p-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-16">
          <div className="lg:col-span-7">
            <div className="mb-6 flex items-center gap-4">
              <div className="grid size-10 place-items-center rounded-full bg-[rgba(0,88,190,0.10)] text-[var(--primary)]">
                <LightningIcon className="size-5" aria-hidden="true" />
              </div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--primary)]">
                High-Performance Optimization
              </p>
            </div>

            <h2 className="font-headline text-4xl font-bold tracking-tight text-[var(--on-surface)] md:text-5xl">
              The tech behind the magic
            </h2>
            <p className="mt-8 text-lg leading-relaxed text-[var(--on-surface-variant)]">
              Our Gemini-powered workflow turns thumbnail creation from guesswork into a tighter,
              more measurable craft. By studying high-performing visual patterns, Thumbnail AI
              helps creators understand what is likely to stand out before they even publish.
            </p>

            <div className="mt-10 grid gap-8 md:grid-cols-2">
              {optimizationCards.map((card) => {
                const Icon = cardIcons[card.tone];

                return (
                  <article
                    key={card.title}
                    className="rounded-[1.5rem] border border-[rgba(194,198,214,0.18)] bg-[var(--surface-container-low)] p-6"
                  >
                    <h3 className="flex items-center gap-2 font-headline text-xl font-bold text-[var(--on-surface)]">
                      <Icon className={`size-5 ${cardIconColors[card.tone]}`} aria-hidden="true" />
                      {card.title}
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-[var(--on-surface-variant)]">
                      {card.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>

          <figure className="relative lg:col-span-5">
            <div className="relative overflow-hidden rounded-[1.75rem] shadow-2xl">
              <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-tr from-[rgba(0,88,190,0.20)] to-[rgba(87,223,254,0.10)]" />
              <Image
                alt="Abstract visualization of a neural network mapping a creative image with glowing heat points"
                className="aspect-[4/5] h-full w-full object-cover"
                height={1400}
                sizes="(max-width: 1024px) 100vw, 40vw"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVmL4mQoq1hesD_756X6I4tmZc-8j2Zq6oz9EzpAGBAC1g6f1W7T0h36hNwrkJJ4UhubcNSJ8ER9n7x-1cDRt6c4LRc1Fgzv_qDg0_NpZi6gweOFYhsaz1S4Tk4huxXR0quyCs97mfQTG-CkU8nSjC0roPMNDzGtQGKT744OgluQd0vFw_YZjm-L1E91sxdd7HGY6BvCl3P4MZ0Fts9_ZVMUZ3Kt32ofxhIWe59_gBUxig67MwBfkoPIDJ-9EVBRO4A0zx7ext2sUe"
                width={1120}
              />

              <figcaption className="absolute bottom-6 left-6 right-6 z-20 rounded-[1.25rem] border border-white/30 bg-white/80 p-4 backdrop-blur-md">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                    CTR Probability Score
                  </p>
                  <p className="font-bold text-[#0058be]">94.8%</p>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                  <div className="h-full w-[94.8%] rounded-full bg-gradient-to-r from-[#0058be] to-[#2170e4]" />
                </div>
              </figcaption>
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}

import Image from 'next/image';
import { heroAvatars } from '@/components/about/about-data';

export function AboutHero() {
  return (
    <section className="relative overflow-hidden px-6 pb-24 pt-10 md:px-8 md:pb-32 md:pt-16">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[-10%] top-[-12%] h-[26rem] w-[26rem] rounded-full bg-[rgba(87,223,254,0.16)] blur-[120px]" />
        <div className="absolute right-[-10%] top-[10%] h-[28rem] w-[28rem] rounded-full bg-[rgba(33,112,228,0.12)] blur-[140px]" />
      </div>

      <div className="mx-auto max-w-7xl">
        <header className="max-w-4xl">
          <h1 className="font-headline text-5xl font-bold tracking-tight text-(--on-surface) md:text-[5rem] md:leading-[1.05]">
            Empowering creators with the
            <span className="block bg-linear-to-r from-(--primary) to-(--secondary-container) bg-clip-text text-transparent">
              intelligence of Gemini.
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg font-light leading-relaxed text-(--on-surface-variant) md:text-xl">
            Thumbnail AI bridges the gap between raw creative instinct and data-aware execution.
            We build tools that help creators spend less time wrestling with layouts and more time
            shaping ideas that deserve attention.
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-6">
            <div className="flex -space-x-3">
              {heroAvatars.map((avatar) => (
                <Image
                  key={avatar.src}
                  alt={avatar.alt}
                  className="size-12 rounded-full border-2 border-white object-cover shadow-sm"
                  height={48}
                  sizes="48px"
                  src={avatar.src}
                  width={48}
                />
              ))}
              <div className="grid size-12 place-items-center rounded-full border-2 border-white bg-(--primary-fixed) text-sm font-bold text-(--primary) shadow-sm">
                +2k
              </div>
            </div>

            <p className="text-sm font-medium uppercase tracking-[0.22em] text-(--on-surface-variant)">
              Trusted by leading visionaries
            </p>
          </div>
        </header>
      </div>
    </section>
  );
}

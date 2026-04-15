import CheckIcon from '@/components/icons/generated/CheckIcon';
import SparkIcon from '@/components/icons/generated/SparkIcon';
import { architecturePoints } from '@/components/about/about-data';

export function AboutArchitectureSection() {
  return (
    <section className="mx-4 overflow-hidden rounded-[2rem] bg-[var(--surface-container-low)] px-6 py-12 md:rounded-[3rem] md:px-8 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center lg:gap-20">
        <div>
          <p className="inline-flex rounded-full border border-[rgba(0,88,190,0.10)] bg-[rgba(0,88,190,0.05)] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[var(--primary)]">
            Advanced Architecture
          </p>
          <h2 className="mt-8 font-headline text-4xl font-bold tracking-tight text-[var(--on-surface)] md:text-5xl">
            Powered by Gemini intelligence
          </h2>
          <p className="mt-8 text-lg leading-relaxed text-[var(--on-surface-variant)]">
            Gemini&apos;s multimodal reasoning helps Thumbnail AI analyze composition, contrast,
            typography, and emotional emphasis in a single workflow. We are not just generating
            images. We are helping creators make sharper editorial decisions, faster.
          </p>

          <div className="mt-10 space-y-6">
            {architecturePoints.map((point) => (
              <div key={point.title} className="flex items-start gap-4">
                <div className="mt-1 grid size-6 shrink-0 place-items-center rounded-full bg-[var(--secondary-container)] text-[var(--secondary)]">
                  <CheckIcon className="size-3.5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--on-surface)]">{point.title}</h3>
                  <p className="mt-1 text-base leading-relaxed text-[var(--on-surface-variant)]">
                    {point.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <figure className="relative overflow-hidden">
          <div className="absolute -left-12 -top-12 h-64 w-64 rounded-full bg-[rgba(87,223,254,0.20)] blur-[100px]" />
          <div className="absolute -bottom-12 -right-12 h-64 w-64 rounded-full bg-[rgba(33,112,228,0.12)] blur-[100px]" />

          <div className="relative flex items-center justify-center rounded-[1.25rem] border-2 border-dashed border-[rgba(194,198,214,0.35)] py-10 md:py-16">
              <div className="text-center">
                <div className="mx-auto mb-4 grid size-14 place-items-center rounded-[1.2rem] bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] text-white shadow-xl shadow-[rgba(0,88,190,0.20)] md:mb-6 md:size-18 md:rounded-[1.4rem]">
                  <SparkIcon className="size-7 md:size-9" aria-hidden="true" />
                </div>
                <figcaption className="font-headline text-lg font-bold text-[var(--on-surface)] md:text-xl">
                  Gemini Processing Flow
                </figcaption>
                <p className="mt-2 text-xs font-bold uppercase tracking-[0.24em] text-[var(--on-surface-variant)]">
                  Active neural engine
                </p>
              </div>

              <div className="absolute left-6 top-6 size-2.5 animate-pulse rounded-full bg-[var(--primary)] md:left-10 md:top-10 md:size-3" />
              <div className="absolute bottom-6 right-6 size-2.5 animate-pulse rounded-full bg-[var(--secondary)] [animation-delay:700ms] md:bottom-10 md:right-10 md:size-3" />
              <div className="absolute left-[-1px] top-1/2 h-8 w-2 -translate-y-1/2 rounded-full bg-[rgba(194,198,214,0.30)] md:h-10" />
              <div className="absolute right-[-1px] top-1/2 h-8 w-2 -translate-y-1/2 rounded-full bg-[rgba(194,198,214,0.30)] md:h-10" />
          </div>
        </figure>
      </div>
    </section>
  );
}

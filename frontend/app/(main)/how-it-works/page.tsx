import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'How It Works | ThumbnailAI',
  description: 'See how ThumbnailAI transforms your video topic into a high-performance thumbnail in three steps.',
};

function StepBadge({ n }: { n: string }) {
  return (
    <div className="flex size-12 items-center justify-center rounded-full bg-[var(--surface-container-high)] font-headline text-xl font-bold text-[var(--primary)]">
      {n}
    </div>
  );
}

function CheckItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3">
      <svg aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-[var(--primary)]" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2Zm-1 14.4-3.7-3.7 1.4-1.4 2.3 2.3 4.9-4.9 1.4 1.4-6.3 6.3Z" />
      </svg>
      <span className="font-medium text-[var(--on-surface-variant)]">{text}</span>
    </li>
  );
}

export default function HowItWorksPage() {
  return (
    <main className="overflow-hidden pb-24">

      {/* ── Hero ── */}
      <section className="relative mx-auto mb-32 max-w-7xl px-6 pt-16 md:px-8 md:pt-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-40 size-96 opacity-60"
          style={{ background: 'radial-gradient(circle at 50% 50%, rgba(87,223,254,0.15) 0%, transparent 70%)' }}
        />
        <div className="max-w-3xl">
          <span className="mb-6 inline-block rounded-full bg-[var(--secondary-container)] px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[var(--on-secondary-container)]">
            The Process
          </span>
          <h1 className="font-headline mb-8 text-5xl font-bold leading-[1.1] tracking-tight text-[var(--on-surface)] md:text-7xl">
            Crafting{' '}
            <span style={{ background: 'linear-gradient(135deg, #0058be 0%, #2170e4 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Viral Impact
            </span>{' '}
            Through Neural Insight.
          </h1>
          <p className="max-w-2xl text-xl font-light leading-relaxed text-[var(--on-surface-variant)]">
            ThumbnailAI merges professional editorial aesthetics with the Gemini API to transform simple context into high-performance visual assets.
          </p>
        </div>
      </section>

      {/* ── Step 1 ── */}
      <section className="mx-auto mb-48 max-w-7xl px-6 md:px-8">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-12">

          {/* Left */}
          <div className="order-2 lg:order-1 lg:col-span-5">
            <div className="mb-6 flex items-center gap-4">
              <StepBadge n="01" />
              <h2 className="font-headline text-3xl font-bold text-[var(--on-surface)]">Input Context</h2>
            </div>
            <p className="mb-8 text-lg leading-relaxed text-[var(--on-surface-variant)]">
              Begin by defining the core narrative of your content. Our interface allows you to dictate the mood, artistic direction, and platform specifics with surgical precision.
            </p>
            <ul className="mb-8 space-y-4">
              <CheckItem text="Define Topic & Intent" />
              <CheckItem text="Select 'Bold & Graphic' or 'Minimalist'" />
              <CheckItem text="Adaptive Aspect Ratios (16:9, 9:16, 1:1)" />
            </ul>
          </div>

          {/* Right — UI mockup */}
          <div className="order-1 lg:order-2 lg:col-span-7">
            <div className="relative rounded-xl bg-[var(--surface-container-low)] p-8">
              <div className="space-y-6 rounded-lg border border-[var(--outline-variant)]/15 bg-[var(--surface-container-lowest)] p-6 shadow-sm">
                <div>
                  <p className="mb-2 block text-xs font-bold uppercase tracking-wider text-[var(--outline)]">Content Topic</p>
                  <div className="rounded-lg bg-[var(--surface-container-low)] p-4 text-[var(--on-surface-variant)]">
                    The Future of Generative Architecture
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="mb-2 block text-xs font-bold uppercase tracking-wider text-[var(--outline)]">Visual Style</p>
                    <div className="flex items-center gap-2 rounded-lg border border-[var(--primary)]/20 bg-[var(--primary-container)]/10 p-3 font-semibold text-[var(--primary)]">
                      <svg aria-hidden="true" className="size-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24">
                        <path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                      </svg>
                      Bold &amp; Graphic
                    </div>
                  </div>
                  <div>
                    <p className="mb-2 block text-xs font-bold uppercase tracking-wider text-[var(--outline)]">Aspect Ratio</p>
                    <div className="rounded-lg bg-[var(--surface-container-low)] p-3 text-center text-[var(--on-surface-variant)]">
                      16:9 Landscape
                    </div>
                  </div>
                </div>
              </div>
              {/* Floating decoration */}
              <div className="absolute -bottom-6 -right-6 flex size-32 rotate-3 items-center justify-center rounded-xl bg-[var(--secondary-container)] shadow-xl">
                <svg aria-hidden="true" className="size-10 text-[var(--on-secondary-container)]" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4ZM15 5l3 3" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Step 2 ── */}
      <section className="mb-48 bg-[var(--surface-container-low)] py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="mb-16 flex flex-col items-end justify-between gap-8 md:flex-row">
            <div className="max-w-xl">
              <div className="mb-6 flex items-center gap-4">
                <StepBadge n="02" />
                <h2 className="font-headline text-3xl font-bold text-[var(--on-surface)]">Gemini Intelligence</h2>
              </div>
              <p className="text-lg leading-relaxed text-[var(--on-surface-variant)]">
                Our proprietary engine utilises deep neural networks to map visual hierarchies and predict high-engagement focal points. It&apos;s not just generation — it&apos;s sophisticated psychological composition through data-driven insight.
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2 rounded-full bg-[var(--surface-container-lowest)] px-4 py-2 text-xs font-bold text-[var(--primary)] shadow-sm">
              <span className="size-2 animate-pulse rounded-full bg-[var(--primary)]" />
              Neural Processing Active
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Neural Insight Mapping card */}
            <div className="group relative overflow-hidden rounded-xl border border-[var(--outline-variant)]/10 bg-[var(--surface-container-lowest)] p-8 shadow-sm md:col-span-2">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative z-10">
                <div className="mb-12 flex items-start justify-between">
                  <h3 className="font-headline text-xl font-bold text-[var(--on-surface)]">Neural Insight Mapping</h3>
                  {/* Hub icon */}
                  <svg aria-hidden="true" className="size-6 text-[var(--secondary)]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M10 2a2 2 0 1 1 4 0 2 2 0 0 1-4 0Zm2 14a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM4 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm16 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.01-4.23 5.66 3.27M6.35 13l5.66 3.26M6.34 11 12 7.73M17.65 13 12 16.27" />
                  </svg>
                </div>
                {/* Image */}
                <div className="h-64 overflow-hidden rounded-lg border border-[var(--outline-variant)]/20 bg-black shadow-inner">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB04l4GsmPRf-iX6ekrBDDWJ-3JkGLZOBlki1j0pr3c-LXJfEGpq9PJ3XAn9MDHcjCnA0BWKgay5I-oW0vrhbYVh5dHfWWjDnz31b7n0hh7AFFk5jPqEoSn6Q_zm2caiJ63IAj-OeFnCjbV-POzORzf2eY_P79i--OPZsTyNmA8bK3WlXLPmcE3X8j2rJNKnynBjfSmG4xgWzHNH9WGGSA2RZYrTFAhp_s9GqagokfRk61cmoEDSnT3p4mEz3xRgw9xU17lXgOgp0M9"
                    alt="Neural mapping and engagement analysis"
                    className="size-full object-cover"
                  />
                </div>
                <p className="mt-8 text-sm italic text-[var(--on-surface-variant)]">
                  Analyzing neural focal points and engagement heatmaps...
                </p>
              </div>
            </div>

            {/* Aura Semantic Engine card */}
            <div className="flex flex-col justify-between rounded-xl bg-[var(--secondary-container)] p-8">
              <div className="flex size-12 items-center justify-center rounded-lg bg-white/20">
                <svg aria-hidden="true" className="size-6 text-[var(--on-secondary-container)]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2a5 5 0 0 1 5 5c0 2.03-1.2 3.8-2.96 4.61A7.003 7.003 0 0 1 19 18.5V20H5v-1.5a7.003 7.003 0 0 1 4.96-6.89A5 5 0 0 1 7 7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0 0 6 3 3 0 0 0 0-6Zm0 9c-2.67 0-5 1.4-5.74 3.5h11.48C16.99 14.4 14.67 13 12 13Z" />
                </svg>
              </div>
              <div>
                <h3 className="font-headline mb-4 text-xl font-bold text-[var(--on-secondary-container)]">
                  Aura Semantic Engine
                </h3>
                <p className="text-sm leading-relaxed text-[var(--on-secondary-container)]/80">
                  Dynamically adjusts color temperatures to match the emotional core of your video content.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Step 3 ── */}
      <section className="mx-auto mb-48 max-w-7xl px-6 md:px-8">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-12">

          {/* Left — thumbnail preview */}
          <div className="lg:col-span-7">
            <div className="relative">
              <div className="overflow-hidden rounded-xl shadow-2xl transition-transform duration-500 hover:rotate-0 md:-rotate-2">
                <Image
                  src="https://images.thumbnailgo.com/thumbnails/1771600637069.png"
                  alt="Generated AI Thumbnail"
                  width={1280}
                  height={720}
                  className="aspect-video w-full object-cover"
                />
                <div className="absolute left-4 top-4 rounded-full bg-white/30 px-3 py-1 text-[10px] font-bold uppercase tracking-tighter text-white backdrop-blur-md">
                  High CTR Predicted: 12.4%
                </div>
              </div>
              {/* Success chip */}
              <div className="absolute -bottom-8 -left-8 flex items-center gap-3 rounded-xl bg-[var(--tertiary-fixed)] px-6 py-4 shadow-lg">
                <svg aria-hidden="true" className="size-5 text-[var(--on-tertiary-fixed)]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
                </svg>
                <span className="font-bold text-[var(--on-tertiary-fixed)]">Ready for Export</span>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="lg:col-span-5">
            <div className="mb-6 flex items-center gap-4">
              <StepBadge n="03" />
              <h2 className="font-headline text-3xl font-bold text-[var(--on-surface)]">The Result</h2>
            </div>
            <p className="mb-8 text-lg leading-relaxed text-[var(--on-surface-variant)]">
              A pixel-perfect, high-resolution thumbnail designed for maximum engagement. Your content deserves a visual gateway that converts scroll-bys into clicks.
            </p>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="mx-auto mb-24 max-w-5xl px-6 text-center md:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-[var(--outline-variant)]/10 bg-[var(--surface-container-lowest)] p-16 shadow-sm">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-0 top-0 size-64 opacity-30"
            style={{ background: 'radial-gradient(circle at 50% 50%, rgba(87,223,254,0.15) 0%, transparent 70%)' }}
          />
          <h2 className="font-headline mb-6 text-4xl font-bold text-[var(--on-surface)] md:text-5xl">
            Ready to{' '}
            <span style={{ background: 'linear-gradient(135deg, #0058be 0%, #2170e4 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Amplify
            </span>{' '}
            Your Content?
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-lg text-[var(--on-surface-variant)]">
            Join over 15,000 creators using ThumbnailAI to redefine visual storytelling.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/generate"
              className="cursor-pointer rounded-full bg-gradient-to-br from-[#0058be] to-[#2170e4] px-10 py-5 text-lg font-bold text-white shadow-xl tonal-transition hover:scale-[1.02] active:scale-95"
            >
              Get Started
            </Link>
            <Link
              href="/thumbnails"
              className="cursor-pointer rounded-full bg-[var(--surface-container-high)] px-10 py-5 text-lg font-bold text-[var(--on-surface)] tonal-transition hover:bg-[var(--surface-container-highest)]"
            >
              View Showcase
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}

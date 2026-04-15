import Image from 'next/image';
import Link from 'next/link';
import ArrowRightIcon from '@/components/icons/generated/ArrowRightIcon';
import EyeIcon from '@/components/icons/generated/EyeIcon';
import LightningIcon from '@/components/icons/generated/LightningIcon';
import SparkIcon from '@/components/icons/generated/SparkIcon';

export function HeroSection() {
  return (
    <section className="relative flex flex-col items-center overflow-hidden px-8 py-24 text-center md:py-32">
      <div className="pointer-events-none absolute left-1/2 top-0 h-full w-full -translate-x-1/2 -z-10 opacity-30">
        <div className="absolute left-[-10%] top-[-10%] h-[60%] w-[40%] rounded-full bg-[var(--secondary-container)] blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[60%] w-[40%] rounded-full bg-[var(--primary-container)] blur-[120px]" />
      </div>

      <div className="max-w-4xl space-y-6">
        <p className="inline-flex items-center gap-2 rounded-full bg-[rgba(87,223,254,0.28)] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[var(--on-secondary-container)]">
          <LightningIcon className="size-4" aria-hidden="true" />
          New: Thumbnail AI v2.0
        </p>

        <h1 className="font-headline text-5xl font-bold leading-[1.1] tracking-tight text-[var(--on-surface)] md:text-7xl">
          AI-Powered Thumbnails
          <br />
          <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] bg-clip-text text-transparent">
            in Seconds
          </span>
        </h1>

        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-[var(--on-surface-variant)] md:text-xl">
          Stop wasting hours in design tools. Generate polished, click-worthy YouTube thumbnails
          powered by our custom-tuned AI.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 pt-8 sm:flex-row">
          <Link
            href="/generate"
            className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-[#0058be] to-[#2170e4] px-10 py-4 text-lg font-bold text-white shadow-[0_20px_40px_-12px_rgba(0,88,190,0.3)] tonal-transition hover:-translate-y-0.5 active:scale-95 sm:w-auto"
          >
            Get Started
            <ArrowRightIcon className="size-5" aria-hidden="true" />
          </Link>
          <Link
            href="/public-gallery"
            className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[var(--surface-container-low)] px-10 py-4 text-lg font-semibold text-[var(--on-surface)] tonal-transition hover:bg-[var(--surface-container)] sm:w-auto"
          >
            <EyeIcon className="size-5 text-[var(--primary)]" aria-hidden="true" />
            See How It Works
          </Link>
        </div>
      </div>

      <div className="relative mx-auto mt-20 w-full max-w-5xl">
        <div className="glass-card overflow-hidden rounded-2xl border border-white/40 p-4 shadow-2xl">
          <Image
            alt="Modern minimalist aesthetic software interface showing thumbnail generation progress with soft blue and cyan lighting effects"
            className="aspect-video w-full rounded-xl object-cover shadow-inner"
            height={1080}
            priority
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCAZoBKZcFmqHKgTnSaVsw01p4bOmCZHdEUzjB6iTC5kTx6mIt4d4D6SYiANBzS7mf9Gcy8bl81h-7FofUDzF_UUxCv7i45E9LzisfdQ6KZM-srMN91OVnrczsv_Scjvj4H4peK0q2G8tgGh75uvUnQ85zbgD7Be1PSaKhffARQGOpqM9b9CVn2cqOILuuCfRELioZs9lC-QrRciDHGSgGuIZlNagkZPWQNXuhrO1iav0Ii2ez2590HODKViLKKlYzEOxzBTzByOkAP"
            sizes="(max-width: 1280px) 100vw, 1280px"
            width={1920}
          />
        </div>

        <aside className="glass-card absolute -bottom-6 -left-6 hidden max-w-[240px] rounded-2xl p-6 shadow-xl lg:block">
          <div className="mb-3 flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-full bg-[var(--tertiary-fixed)] text-[#102000]">
              <SparkIcon className="size-5" aria-hidden="true" />
            </div>
            <div className="text-left">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--outline)]">
                AI Analysis
              </p>
              <p className="text-sm font-bold text-[var(--on-surface)]">98% Click Depth</p>
            </div>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--surface-container-highest)]">
            <div className="h-full w-[92%] rounded-full bg-[var(--primary)]" />
          </div>
        </aside>

        <aside className="glass-card absolute -right-6 -top-10 hidden rounded-2xl p-5 shadow-xl lg:block">
          <div className="flex items-center gap-4">
            <div className="space-y-1">
              <p className="text-xs font-bold tracking-[0.16em] text-[var(--secondary)]">
                REALTIME
              </p>
              <p className="text-sm font-bold text-[var(--on-surface)]">Generating Variant C…</p>
            </div>
            <div className="size-8 animate-spin rounded-full border-2 border-[var(--primary)] border-t-transparent" />
          </div>
        </aside>
      </div>
    </section>
  );
}

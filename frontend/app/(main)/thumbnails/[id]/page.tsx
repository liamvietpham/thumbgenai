import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ArrowRightIcon from '@/components/icons/generated/ArrowRightIcon';
import CheckIcon from '@/components/icons/generated/CheckIcon';
import ChipIcon from '@/components/icons/generated/ChipIcon';
import DownloadIcon from '@/components/icons/generated/DownloadIcon';
import ImageIcon from '@/components/icons/generated/ImageIcon';
import PaletteIcon from '@/components/icons/generated/PaletteIcon';
import SparkIcon from '@/components/icons/generated/SparkIcon';
import SquareIcon from '@/components/icons/generated/SquareIcon';
import UserIcon from '@/components/icons/generated/UserIcon';
import { CopyUrlButton } from '@/components/thumbnails/CopyUrlButton';
import { COMMUNITY_ITEMS } from '@/components/thumbnails/thumbnails-data';

const COLOR_PALETTES: Record<string, string[]> = {
  ocean:      ['#0058be', '#2170e4', '#57dffe', '#c2c6d6'],
  purple:     ['#6750a4', '#b39ddb', '#57dffe', '#c2c6d6'],
  vibrant:    ['#e53935', '#fb8c00', '#fdd835', '#0058be'],
  neon:       ['#00e676', '#1de9b6', '#0058be', '#111318'],
  pastel:     ['#f8bbd0', '#c5cae9', '#b3e5fc', '#f0f4c3'],
  sunset:     ['#ff6f00', '#e91e63', '#9c27b0', '#0058be'],
  forest:     ['#1b5e20', '#43a047', '#a5d6a7', '#c2c6d6'],
  monochrome: ['#212121', '#616161', '#9e9e9e', '#e0e3e5'],
};

function getColorPalette(color: string): string[] {
  return COLOR_PALETTES[color] ?? ['#0058be', '#2170e4', '#adc6ff', '#c2c6d6'];
}

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const item = COMMUNITY_ITEMS.find((i) => i.id === Number(id));
  if (!item) return { title: 'Thumbnail Not Found' };

  return {
    title: item.title,
    description: `View the AI-generated thumbnail for "${item.title}" by ${item.author}.`,
    openGraph: {
      title: `${item.title} | Thumbnail AI`,
      description: `View the AI-generated thumbnail for "${item.title}" by ${item.author}.`,
      images: [{ url: item.imageUrl, width: 1280, height: 720 }],
    },
  };
}

export default async function ThumbnailDetailPage({ params }: Props) {
  const { id } = await params;
  const item = COMMUNITY_ITEMS.find((i) => i.id === Number(id));

  if (!item) notFound();

  const palette = getColorPalette(item.color);
  const aspectLabel = item.aspect === '16:9' ? `${item.aspect} YouTube` : item.aspect;

  // Reference images: show existing ones, pad with empty slots to fill up to 2, then add button
  const refImages = item.referenceImages ?? [];
  const emptySlots = Math.max(0, 2 - refImages.length);

  return (
    <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 md:pb-24 lg:px-8">
      {/* Back link */}
      <div className="mb-8 pt-8">
        <Link
          href="/thumbnails"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--on-surface-variant)] tonal-transition hover:text-[var(--primary)]"
        >
          <svg aria-hidden="true" className="size-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Back to Thumbnails
        </Link>
      </div>

      {/* Page header */}
      <div className="mb-8 space-y-2">
        <h1 className="font-headline text-3xl font-bold tracking-tight text-[var(--on-surface)] sm:text-4xl">
          {item.title}
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--on-surface-variant)]">
          <span className="flex items-center gap-1.5">
            <svg aria-hidden="true" className="size-4 shrink-0" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} viewBox="0 0 24 24">
              <rect width={18} height={18} x={3} y={4} rx={2} ry={2} />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
            {item.date}
          </span>
          <span className="flex items-center gap-1.5">
            <svg aria-hidden="true" className="size-4 shrink-0" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} viewBox="0 0 24 24">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx={12} cy={7} r={4} />
            </svg>
            {item.author}
          </span>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left column */}
        <div className="space-y-6 lg:col-span-8">
          {/* Thumbnail preview */}
          <div className="relative aspect-video overflow-hidden rounded-[1.75rem] bg-[var(--surface-container-highest)] shadow-[0_8px_40px_rgba(0,88,190,0.10)]">
            <Image
              src={item.imageUrl}
              alt={item.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 66vw"
              className="object-cover object-top"
            />
          </div>

          {/* Action bar */}
          <div className="flex flex-wrap gap-3">
            <a
              href={item.imageUrl}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-[#0058be] to-[#2170e4] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-[rgba(0,88,190,0.20)] tonal-transition hover:scale-[1.02]"
            >
              <DownloadIcon className="size-4" />
              Download
            </a>
            <Link
              href="/regenerate"
              className="inline-flex items-center gap-2 rounded-xl bg-[var(--surface-container-high)] px-5 py-2.5 text-sm font-semibold text-[var(--primary)] tonal-transition hover:bg-[var(--surface-container-highest)]"
            >
              <SparkIcon className="size-4" />
              Regenerate
            </Link>
            <Link
              href="/generate"
              className="inline-flex items-center gap-2 rounded-xl bg-[var(--surface-container-high)] px-5 py-2.5 text-sm font-semibold text-[var(--on-surface-variant)] tonal-transition hover:bg-[var(--surface-container-highest)]"
            >
              Generate New
              <ArrowRightIcon className="size-4" />
            </Link>
            <CopyUrlButton id={item.id} />
          </div>

          {/* Generation Settings Card */}
          <div className="rounded-[1.75rem] border border-[rgba(194,198,214,0.5)] bg-[var(--surface-container-lowest)] p-8 shadow-[0_4px_32px_rgba(0,88,190,0.04)]">

            {/* Header: title left, model right */}
            <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[var(--primary-fixed)]">
                  <svg aria-hidden="true" className="size-5 text-[var(--primary)]" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} viewBox="0 0 24 24">
                    <line x1="4" x2="4" y1="21" y2="14" /><line x1="4" x2="4" y1="10" y2="3" />
                    <line x1="12" x2="12" y1="21" y2="12" /><line x1="12" x2="12" y1="8" y2="3" />
                    <line x1="20" x2="20" y1="21" y2="16" /><line x1="20" x2="20" y1="12" y2="3" />
                    <line x1="2" x2="6" y1="14" y2="14" /><line x1="10" x2="14" y1="8" y2="8" />
                    <line x1="18" x2="22" y1="16" y2="16" />
                  </svg>
                </div>
                <h2 className="font-headline text-xl font-bold text-[var(--on-surface)]">
                  Generation Settings
                </h2>
              </div>

              {/* Model — moved to header */}
              <div className="flex items-center gap-3 rounded-2xl border border-[rgba(194,198,214,0.3)] bg-[var(--surface-container-low)] px-4 py-3">
                <ChipIcon className="size-5 shrink-0 text-[var(--primary)]" />
                <div>
                  <p className="text-sm font-bold text-[var(--on-surface)]">Gemini Flash 2.0</p>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--on-surface-variant)]">
                    Generative AI
                  </p>
                </div>
              </div>
            </div>

            {/* Body: col-7 / col-5 */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-12">

              {/* ── Left col-7 ── */}
              <div className="space-y-8 md:col-span-7">

                {/* Title or Topic */}
                <div>
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[var(--outline)]">
                    Title or Topic
                  </p>
                  <p className="rounded-2xl border border-[rgba(194,198,214,0.2)] bg-[var(--surface-container-low)] p-5 text-sm italic leading-relaxed text-[var(--on-surface-variant)]">
                    &ldquo;{item.title}&rdquo;
                  </p>
                </div>

                {/* Additional Prompts */}
                <div>
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[var(--outline)]">
                    Additional Prompts
                  </p>
                  {item.additionalPrompts ? (
                    <p className="rounded-2xl border border-[rgba(194,198,214,0.2)] bg-[var(--surface-container-low)] p-5 text-sm leading-relaxed text-[var(--on-surface-variant)]">
                      {item.additionalPrompts}
                    </p>
                  ) : (
                    <p className="rounded-2xl border border-[rgba(194,198,214,0.2)] bg-[var(--surface-container-low)] p-5 text-sm italic text-[var(--outline)]">
                      No additional prompts provided.
                    </p>
                  )}
                </div>

                {/* Reference Images */}
                <div>
                  <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[var(--outline)]">
                    Reference Images
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {/* Actual images */}
                    {refImages.map((src, i) => (
                      <div
                        key={src}
                        className="relative aspect-1/1 overflow-hidden rounded-xl border border-[rgba(194,198,214,0.4)]"
                      >
                        <Image
                          src={src}
                          alt={`Reference ${i + 1}`}
                          fill
                          className="object-cover object-top"
                          sizes="(max-width: 1024px) 33vw, 18vw"
                        />
                      </div>
                    ))}
                    {/* Empty placeholder slots */}
                    {Array.from({ length: emptySlots }).map((_, i) => (
                      <div
                        key={`empty-${i}`}
                        className="flex aspect-1/1 flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-[rgba(194,198,214,0.6)] bg-[var(--surface-container-low)] text-[var(--on-surface-variant)]/40"
                      >
                        <ImageIcon className="size-6" />
                        <span className="text-[8px] font-bold uppercase">No image</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── Right col-5 ── */}
              <div className="space-y-6 md:col-span-5">

                {/* User Photo */}
                <div>
                  <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[var(--outline)]">
                    User Photo
                  </p>
                  {item.userPhoto ? (
                    <div className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem] border border-[rgba(194,198,214,0.4)]">
                      <Image
                        src={item.userPhoto}
                        alt="User photo used for generation"
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 50vw, 25vw"
                      />
                    </div>
                  ) : (
                    <div className="flex aspect-[4/5] flex-col items-center justify-center gap-3 rounded-[1.25rem] border-2 border-dashed border-[rgba(194,198,214,0.6)] bg-[var(--surface-container-low)] text-[var(--on-surface-variant)]">
                      <UserIcon className="size-10 opacity-30" />
                      <span className="text-sm font-medium opacity-50">No photo provided</span>
                    </div>
                  )}
                </div>

                {/* Thumbnail Style */}
                <div>
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[var(--outline)]">
                    Thumbnail Style
                  </p>
                  <div className="flex items-center gap-3 rounded-2xl border border-[rgba(172,237,255,0.7)] bg-[rgba(172,237,255,0.2)] p-4 shadow-sm">
                    <PaletteIcon className="size-5 shrink-0 text-[var(--secondary)]" />
                    <span className="text-sm font-bold text-[var(--secondary)]">{item.style}</span>
                  </div>
                </div>

                {/* Aspect Ratio */}
                <div>
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[var(--outline)]">
                    Aspect Ratio
                  </p>
                  <div className="flex items-center gap-3 rounded-2xl border border-[rgba(194,198,214,0.4)] bg-[var(--surface-container-high)] p-4 shadow-sm">
                    <SquareIcon className="size-5 shrink-0 text-[var(--on-surface-variant)]" />
                    <span className="text-sm font-bold text-[var(--on-surface-variant)]">{aspectLabel}</span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6 lg:col-span-4">
          {/* AI Insights card */}
          <div className="rounded-[1.75rem] border border-[rgba(194,198,214,0.5)] bg-[var(--surface-container-lowest)] p-8 shadow-[0_4px_32px_rgba(0,88,190,0.04)]">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[rgba(87,223,254,0.25)]">
                <SparkIcon className="size-5 text-[var(--primary)]" />
              </div>
              <h2 className="font-headline text-lg font-bold text-[var(--on-surface)]">
                AI Insights
              </h2>
            </div>

            {/* CTR Score */}
            <div className="mb-6 rounded-2xl bg-[var(--surface-container-low)] p-5 text-center">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--outline)]">
                CTR Score
              </p>
              <p className="font-headline mt-1 text-5xl font-bold text-[var(--primary)]">94%</p>
              <p className="mt-1 text-xs text-[var(--on-surface-variant)]">Estimated click-through rate</p>
              <span className="mt-3 inline-block rounded-full bg-[var(--tertiary-fixed)] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-[#102000]">
                High Potential
              </span>
            </div>

            {/* Design rationale */}
            <div className="mb-6 space-y-3">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--outline)]">
                Design Rationale
              </p>
              <ul className="space-y-2.5">
                {[
                  'High-contrast composition optimized for mobile feed readability',
                  'Focal point aligned to upper-left eye path for faster recognition',
                  'Color temperature tuned for emotional impact and category contrast',
                ].map((point) => (
                  <li key={point} className="flex items-start gap-2 text-sm text-[var(--on-surface-variant)]">
                    <CheckIcon className="mt-0.5 size-4 shrink-0 text-[var(--secondary)]" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            {/* Color palette */}
            <div className="border-t border-[rgba(194,198,214,0.3)] pt-6">
              <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--outline)]">
                Color Palette
              </p>
              <div className="flex gap-2">
                {palette.map((hex) => (
                  <div key={hex} className="group relative">
                    <div
                      className="size-12 rounded-xl shadow-sm ring-1 ring-black/10"
                      style={{ backgroundColor: hex }}
                    />
                    <span className="pointer-events-none absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[9px] opacity-0 transition-opacity group-hover:opacity-100">
                      {hex}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pro Creator Tip card */}
          <div className="rounded-[1.75rem] bg-gradient-to-br from-[#0058be] to-[#2170e4] p-8 text-white shadow-[0_4px_32px_rgba(0,88,190,0.18)]">
            <div className="mb-3 flex items-center gap-2">
              <SparkIcon className="size-5" />
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/80">
                Pro Creator Tip
              </p>
            </div>
            <p className="text-sm leading-relaxed text-white/90">
              The more specific your prompt, the better the result. Include subject, mood, overlay text, and visual style — clear descriptions lead to outputs that match your vision on the first try.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

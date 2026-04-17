'use client';

import { useState } from 'react';
import { type AspectValue } from '@/components/generator/shared';
import { StudioAspectRatioSelector, StudioPreviewPanel } from '@/components/generator/studio';
import LinkIcon from '@/components/icons/generated/LinkIcon';
import SparkIcon from '@/components/icons/generated/SparkIcon';
import UploadIcon from '@/components/icons/generated/UploadIcon';

const sectionLabelClass =
  'block font-headline text-[11px] font-semibold uppercase tracking-[0.2em] text-(--outline)';
const fieldShellClass = 'form-field w-full px-4 py-3 text-sm';

export default function RegeneratePage() {
  const [inputMode, setInputMode] = useState<'upload' | 'url'>('upload');
  const [aspect, setAspect] = useState<AspectValue>('16 / 9');
  const [imageUrl, setImageUrl] = useState('');
  const [changes, setChanges] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);

  const handleRegenerate = async () => {
    setGeneratedImageUrl(null);
    setIsGenerating(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1800));
      setGeneratedImageUrl('/hero_img.webp');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleExport = () => {
    if (!generatedImageUrl) return;
    const link = document.createElement('a');
    link.href = generatedImageUrl;
    link.download = 'thumbnail-ai-regenerate.webp';
    link.click();
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 pb-16 sm:px-6 md:py-12 md:pb-24 lg:px-8">
      {/* Page header — full width above both columns */}
      <div className="mb-8">
        <h1 className="font-headline text-3xl font-bold tracking-tight text-(--on-surface)">
          Regenerate Studio
        </h1>
        <p className="mt-1 text-lg leading-relaxed text-(--on-surface-variant)">
          Upload a reference thumbnail or paste a URL, then describe how you&apos;d like it restyled.
        </p>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row lg:items-start">

        {/* ─── Canvas — top on mobile, right on desktop ─── */}
        <section className="order-first min-w-0 flex-1 lg:order-last">
          <StudioPreviewPanel
            aspect={aspect}
            hasResult={Boolean(generatedImageUrl)}
            imageUrl={generatedImageUrl ?? undefined}
            isLoading={isGenerating}
            onExport={handleExport}
          />
        </section>

        {/* ─── Left: Config Panel ─── */}
        <aside className="w-full shrink-0 lg:w-[420px]">
          {/* Form */}
          <div className="rounded-[1.75rem] border border-[rgba(194,198,214,0.5)] bg-(--surface-container-lowest) p-6 shadow-[0_12px_36px_rgba(0,88,190,0.06)]">
            <div className="space-y-5">

              {/* Input mode toggle */}
              <div className="flex items-center gap-1 rounded-[0.875rem] bg-(--surface-container-low) p-1">
                {(['upload', 'url'] as const).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setInputMode(mode)}
                    className={`flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-[0.625rem] px-4 py-2 text-sm font-medium tonal-transition ${
                      inputMode === mode
                        ? 'bg-(--surface-container-lowest) text-(--on-surface) shadow-sm'
                        : 'text-(--on-surface-variant) hover:text-(--on-surface)'
                    }`}
                  >
                    {mode === 'upload' ? (
                      <UploadIcon className="size-4" aria-hidden="true" />
                    ) : (
                      <LinkIcon className="size-4" aria-hidden="true" />
                    )}
                    {mode === 'upload' ? 'Upload' : 'Image URL'}
                  </button>
                ))}
              </div>

              {/* Image input */}
              {inputMode === 'upload' ? (
                <label className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-[1rem] border border-dashed border-[rgba(194,198,214,0.7)] bg-(--surface-container-low) py-10 tonal-transition hover:bg-(--surface-container)">
                  <div className="grid size-12 place-items-center rounded-2xl bg-(--surface-container-highest) text-(--primary) shadow-sm">
                    <UploadIcon className="size-5" aria-hidden="true" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-(--on-surface)">Click to upload image</p>
                    <p className="mt-0.5 text-xs text-(--outline)">PNG, JPG up to 10MB</p>
                  </div>
                  <input accept=".png,.jpg,.jpeg,image/png,image/jpeg" hidden type="file" />
                </label>
              ) : (
                <div className="space-y-2">
                  <label className={sectionLabelClass}>Image URL</label>
                  <input
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://..."
                    className={fieldShellClass}
                  />
                </div>
              )}

              {/* Aspect Ratio */}
              <div className="border-t border-(--surface-container) pt-5">
                <StudioAspectRatioSelector value={aspect} onChange={setAspect} />
              </div>

              {/* What to change */}
              <div className="space-y-2 border-t border-(--surface-container) pt-5">
                <label className={sectionLabelClass}>What do you want to change?</label>
                <textarea
                  rows={4}
                  placeholder="Change text, colors, expressions, style..."
                  className={`${fieldShellClass} resize-none`}
                  value={changes}
                  onChange={(e) => setChanges(e.target.value)}
                />
              </div>

              {/* Regenerate button */}
              <div className="space-y-3 border-t border-(--surface-container) pt-5">
                <button
                  type="button"
                  onClick={handleRegenerate}
                  disabled={isGenerating}
                  className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-[1rem] bg-linear-to-br from-[#0058be] to-[#2170e4] px-6 py-4 font-bold text-white shadow-[0_16px_32px_-16px_rgba(0,88,190,0.42)] tonal-transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <SparkIcon className="size-5" aria-hidden="true" />
                  {isGenerating ? 'Regenerating…' : 'Regenerate Thumbnail'}
                </button>
                <p className="text-center text-xs text-(--outline)">
                  <span className="font-semibold text-(--on-surface-variant)">1 Credit</span>{' '}
                  per generation
                </p>
              </div>

            </div>
          </div>
        </aside>

      </div>
    </div>
  );
}

'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { ColorSchemePicker, type ColorSchemeLabel } from '@/components/generator/ColorSchemePicker';
import { ModelDropdown, type ModelLabel } from '@/components/generator/ModelDropdown';
import { RecreateWorkflowBanner } from '@/components/generator/RecreateWorkflowBanner';
import { type AspectValue } from '@/components/generator/shared';
import { PlusIcon, StudioAspectRatioSelector, StudioPreviewPanel } from '@/components/generator/studio';
import { StyleDropdown, type StyleLabel } from '@/components/generator/StyleDropdown';
import SparkIcon from '@/components/icons/generated/SparkIcon';
import UploadIcon from '@/components/icons/generated/UploadIcon';

const sectionLabelClass =
  'block font-headline text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--outline)]';
const fieldShellClass =
  'w-full rounded-[1rem] border border-[rgba(194,198,214,0.55)] bg-[var(--surface-container-low)] px-4 py-3 text-[var(--on-surface)] placeholder:text-[var(--outline)] focus:outline-none focus:ring-2 focus:ring-[rgba(0,88,190,0.16)]';

export default function GeneratePage() {
  const [title, setTitle] = useState('');
  const [aspect, setAspect] = useState<AspectValue>('16 / 9');
  const [style, setStyle] = useState<StyleLabel>('Minimalist');
  const [model, setModel] = useState<ModelLabel>('Premium');
  const [userPhotoPreview, setUserPhotoPreview] = useState<string | null>(null);
  const [refImages, setRefImages] = useState<{ url: string; name: string }[]>([]);
  const [scheme, setScheme] = useState<ColorSchemeLabel>('vibrant');
  const [additionalPrompts, setAdditionalPrompts] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const refInputRef = useRef<HTMLInputElement>(null);

  const handleUserPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUserPhotoPreview(URL.createObjectURL(file));
  };

  const handleAddRef = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setRefImages((prev) => [...prev, { url, name: file.name }].slice(0, 2));
    // reset so same file can be re-added after delete
    e.target.value = '';
  };

  const removeRef = (index: number) => {
    setRefImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleGenerate = async () => {
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
    link.download = 'thumbnail-ai-export.webp';
    link.click();
  };

  return (
    <div className="py-8 md:py-12">
      {/* Alternate workflow banner — top of page */}
      <div className="mb-6">
        <RecreateWorkflowBanner />
      </div>

      {/* Page header — full width above both columns */}
      <div className="mb-8">
        <h1 className="font-headline text-3xl font-bold tracking-tight text-[var(--on-surface)]">
          Design Studio
        </h1>
        <p className="mt-1 text-lg leading-relaxed text-[var(--on-surface-variant)]">
          Transform your video topic into a polished, click-worthy thumbnail.
        </p>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row lg:items-start">

        {/* ─── Left: Config Panel ─── */}
        <aside className="w-full shrink-0 lg:w-[420px]">
          <div className="rounded-[1.75rem] border border-[rgba(194,198,214,0.5)] bg-[var(--surface-container-lowest)] p-6 shadow-[0_12px_36px_rgba(0,88,190,0.06)]">
            <div className="space-y-5">

              {/* Title */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className={sectionLabelClass}>Title or Topic</label>
                  <span className="text-xs text-[var(--outline)]">{title.length}/100</span>
                </div>
                <input
                  maxLength={100}
                  placeholder="e.g., 10 Tips for Better Sleep"
                  className={fieldShellClass}
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              {/* Style */}
              <div className="border-t border-[var(--surface-container)] pt-5">
                <StyleDropdown value={style} onChange={setStyle} />
              </div>

              {/* Model */}
              <div className="border-t border-[var(--surface-container)] pt-5">
                <ModelDropdown value={model} onChange={setModel} />
              </div>

              {/* Aspect Ratio */}
              <div className="border-t border-[var(--surface-container)] pt-5">
                <StudioAspectRatioSelector value={aspect} onChange={setAspect} />
              </div>

              {/* Color Scheme */}
              <div className="border-t border-[var(--surface-container)] pt-5">
                <ColorSchemePicker value={scheme} onChange={setScheme} />
              </div>

              {/* User Photo */}
              <div className="space-y-2 border-t border-[var(--surface-container)] pt-5">
                <label className={sectionLabelClass}>User Photo</label>
                <div className="relative size-32 overflow-hidden rounded-[1rem]">
                  {/* Upload state */}
                  <label className={`absolute rounded-[1rem] inset-0 flex cursor-pointer flex-col items-center justify-center gap-2 border-2 border-dashed border-[rgba(194,198,214,0.7)] bg-[var(--surface-container-low)] tonal-transition hover:bg-[var(--surface-container)] ${userPhotoPreview ? 'pointer-events-none opacity-0' : 'opacity-100'}`}>
                    <div className="grid size-10 place-items-center rounded-xl bg-white text-[var(--primary)] shadow-sm">
                      <UploadIcon className="size-5" aria-hidden="true" />
                    </div>
                    <p className="text-sm font-medium text-[var(--on-surface)]">Upload photo</p>
                    <p className="text-xs text-[var(--outline)]">Face reference</p>
                    <input accept="image/*" className="hidden" type="file" onChange={handleUserPhoto} />
                  </label>

                  {/* Preview state */}
                  {userPhotoPreview && (
                    <>
                      <Image src={userPhotoPreview} alt="User photo preview" fill className="object-cover object-top rounded-[1rem]" sizes="128px" unoptimized />
                      <button
                        type="button"
                        onClick={() => setUserPhotoPreview(null)}
                        className="absolute -right-1.5 -top-1.5 grid size-4.5 cursor-pointer place-items-center rounded-full bg-[rgba(25,28,30,0.55)] text-white backdrop-blur-sm tonal-transition hover:bg-[rgba(25,28,30,0.75)]"
                        aria-label="Remove photo"
                      >
                        <XIcon className="size-3.5" />
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Reference Images — max 2 */}
              <div className="space-y-2 border-t border-[rgba(194,198,214,0.7)] pt-5">
                <label className={sectionLabelClass}>Reference Images</label>
                <div className="flex gap-3">
                  {refImages.map((img, i) => (
                    <div key={i} className="group relative h-32 w-32 shrink-0 rounded-[1rem] bg-[var(--surface-container)]">
                      <Image src={img.url} alt={`Reference ${i + 1}`} fill className="object-cover rounded-[1rem] object-top" sizes="128px" unoptimized />
                      <button
                        type="button"
                        onClick={() => removeRef(i)}
                        className="absolute -right-1.5 -top-1.5 grid size-4.5 cursor-pointer place-items-center rounded-full bg-[rgba(25,28,30,0.55)] text-white backdrop-blur-sm tonal-transition hover:bg-[rgba(25,28,30,0.75)]"
                        aria-label={`Remove reference ${i + 1}`}
                      >
                        <XIcon className="size-3.5" />
                      </button>
                    </div>
                  ))}
                  {refImages.length < 2 && (
                    <label className="flex h-32 w-32 shrink-0 cursor-pointer flex-col items-center justify-center gap-1 rounded-[1rem] border-2 border-dashed border-[rgba(194,198,214,0.7)] bg-[var(--surface-container-low)] text-[var(--outline)] tonal-transition hover:bg-[var(--surface-container)]">
                      <PlusIcon className="size-5" />
                      <span className="text-[10px] font-medium">Add image</span>
                      <input ref={refInputRef} accept="image/*" hidden type="file" onChange={handleAddRef} />
                    </label>
                  )}
                </div>
              </div>

              {/* Additional Prompts */}
              <div className="space-y-2 border-t border-[var(--surface-container)] pt-5">
                <label className={sectionLabelClass}>Additional Prompts</label>
                <textarea
                  rows={3}
                  placeholder="Describe specific lighting, objects, mood..."
                  className={`${fieldShellClass} resize-none`}
                  value={additionalPrompts}
                  onChange={(e) => setAdditionalPrompts(e.target.value)}
                />
              </div>

              {/* Generate button */}
              <div className="space-y-3 border-t border-[var(--surface-container)] pt-5">
                <button
                  type="button"
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-[1rem] bg-gradient-to-br from-[#0058be] to-[#2170e4] px-6 py-4 font-bold text-white shadow-[0_16px_32px_-16px_rgba(0,88,190,0.42)] tonal-transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <SparkIcon className="size-5" aria-hidden="true" />
                  {isGenerating ? 'Generating…' : 'Generate Thumbnail'}
                </button>
                <div className="flex items-center justify-center gap-2 rounded-full bg-[rgba(63,103,0,0.08)] px-4 py-2">
                  <span className="size-2 animate-pulse rounded-full bg-[var(--tertiary)]" />
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--tertiary)]">
                    AI Engine Ready
                  </span>
                </div>
              </div>

            </div>
          </div>
        </aside>

        {/* ─── Right: Canvas ─── */}
        <section className="min-w-0 flex-1">
          <StudioPreviewPanel
            aspect={aspect}
            hasResult={Boolean(generatedImageUrl)}
            imageUrl={generatedImageUrl ?? undefined}
            isLoading={isGenerating}
            onExport={handleExport}
          />
        </section>

      </div>
    </div>
  );
}

function XIcon({ className = '' }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 6 6 18M6 6l12 12" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

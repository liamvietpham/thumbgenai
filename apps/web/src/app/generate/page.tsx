'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { AspectRatioSelector, AspectValue, PreviewPanel } from '@/components/generator/shared';

const styleOptions = [
  {
    label: 'Bold & Graphic',
    desc: 'High contrast, bold typography, striking visuals',
    icon: 'spark',
  },
  { label: 'Minimalist', desc: 'Clean, simple, lots of white space', icon: 'square' },
  { label: 'Photorealistic', desc: 'Photo-based, natural looking', icon: 'image' },
  { label: 'Illustrated', desc: 'Hand-drawn, artistic, creative', icon: 'pen' },
  { label: 'Tech/Futuristic', desc: 'Modern, sleek, tech-inspired', icon: 'chip' },
] as const;

const colorOptions = [
  { label: 'vibrant', colors: ['#ff6b6b', '#4ecdc4', '#45b7d1'] },
  { label: 'sunset', colors: ['#ff8c42', '#ff3c38', '#a23b72'] },
  { label: 'ocean', colors: ['#0077b6', '#00b4d8', '#90e0ef'] },
  { label: 'forest', colors: ['#2d6a4f', '#40916c', '#95d5b2'] },
  { label: 'purple', colors: ['#7b2cbf', '#9d4edd', '#c77dff'] },
  { label: 'monochrome', colors: ['#212529', '#495057', '#adb5bd'] },
  { label: 'neon', colors: ['#ff00ff', '#00ffff', '#ffff00'] },
  { label: 'pastel', colors: ['#ffb5a7', '#fcd5ce', '#f8edeb'] },
] as const;

const modelOptions = [
  { label: 'Basic', credits: 5 },
  { label: 'Premium', credits: 10 },
] as const;

export default function GeneratePage() {
  const [title, setTitle] = useState('');
  const [aspect, setAspect] = useState<AspectValue>('16 / 9');
  const [style, setStyle] = useState<(typeof styleOptions)[number]['label']>('Minimalist');
  const [styleOpen, setStyleOpen] = useState(false);
  const [model, setModel] = useState<(typeof modelOptions)[number]['label']>('Premium');
  const [modelOpen, setModelOpen] = useState(false);
  const [userPhotoName, setUserPhotoName] = useState('');
  const [scheme, setScheme] = useState<(typeof colorOptions)[number]['label']>('vibrant');
  const styleRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<HTMLDivElement>(null);

  const selectedStyle = useMemo(() => styleOptions.find((s) => s.label === style), [style]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (styleRef.current && !styleRef.current.contains(event.target as Node)) setStyleOpen(false);
      if (modelRef.current && !modelRef.current.contains(event.target as Node)) setModelOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const getStyleIcon = (icon: (typeof styleOptions)[number]['icon']) => {
    if (icon === 'spark') {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="h-5 w-5"
        >
          <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z" />
        </svg>
      );
    }
    if (icon === 'square') {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="h-5 w-5"
        >
          <rect x="4" y="4" width="16" height="16" rx="2" />
        </svg>
      );
    }
    if (icon === 'image') {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="h-5 w-5"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="9" cy="9" r="2" />
          <path d="m21 15-3.5-3.5a2 2 0 0 0-2.8 0L6 20" />
        </svg>
      );
    }
    if (icon === 'pen') {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="h-5 w-5"
        >
          <path d="m12 20-7 2 2-7L16 6l5 5-9 9z" />
        </svg>
      );
    }
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="h-5 w-5"
      >
        <rect x="7" y="7" width="10" height="10" rx="2" />
        <path d="M4 10V8M4 16v-2M20 10V8M20 16v-2M10 4H8M16 4h-2M10 20H8M16 20h-2" />
      </svg>
    );
  };

  return (
    <div className="flex flex-col w-full gap-8">
      <div className="w-full">
        <section className="mx-auto flex max-w-272 items-center justify-between rounded-xl border border-[#8eaedf] bg-[#dbe8fb]/75 px-4 py-8 sm:px-6 lg:px-8">
          <div>
            <p className="bg-linear-to-r from-[#1f3f75] to-[#5d83bf] bg-clip-text text-2xl font-semibold text-transparent md:text-2xl md:leading-10">
              Recreate Thumbnails with AI
            </p>
            <p className="mt-1 max-w-sm text-[13px] text-[#4f6f9f]">
              Upload a thumbnail or paste a URL, add your changes, and get a similar AI-recreated
              version instantly.
            </p>
          </div>
          <Link
            href="/recreate"
            className="flex items-center gap-1 rounded-full bg-[#2f5ea5] px-8 py-2 text-sm font-medium text-white transition-colors hover:bg-[#244a82]"
          >
            Try Now
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </Link>
        </section>
      </div>

      <main className="w-full">
        <div className="grid gap-8 lg:grid-cols-[400px_1fr]">
          <div className="space-y-6">
            <div className="space-y-6 rounded-2xl border border-[#8eaedf] bg-[#dbe8fb]/75 p-6 shadow-xl">
              <div>
                <h2 className="mb-1 text-xl font-bold text-[#1d447f]">Create Your Thumbnail</h2>
                <p className="text-sm text-[#4f6f9f]">
                  Describe your vision and let AI bring it to life
                </p>
              </div>

              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-[#2f4f82]">Title or Topic</label>
                  <input
                    maxLength={100}
                    placeholder="e.g., 10 Tips for Better Sleep"
                    className="w-full rounded-lg border border-[#8eaedf] bg-[#dbe8fb]/80 px-4 py-3 text-[#1d447f] placeholder:text-[#6b88b5] focus:outline-none focus:ring-2 focus:ring-[#2f5ea5]"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <div className="flex justify-end">
                    <span className="text-xs text-[#6b88b5]">{title.length}/100</span>
                  </div>
                </div>

                <AspectRatioSelector value={aspect} onChange={setAspect} />

                <div ref={styleRef} className="relative space-y-3">
                  <label className="block text-sm font-medium text-[#2f4f82]">
                    Thumbnail Style
                  </label>
                  <button
                    type="button"
                    onClick={() => setStyleOpen((v) => !v)}
                    className="flex w-full items-center justify-between rounded-md border border-[#8eaedf] bg-[#dbe8fb]/85 px-4 py-3 text-left text-[#1d447f] transition hover:bg-[#d5e4fb]"
                  >
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 text-[#2f5ea5]">
                        {getStyleIcon(selectedStyle?.icon ?? 'square')}
                      </span>
                      <div>
                        <p className="font-medium">{selectedStyle?.label}</p>
                        <p className="text-xs text-[#6b88b5]">{selectedStyle?.desc}</p>
                      </div>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className={`h-5 w-5 text-[#6b88b5] transition-transform ${styleOpen ? 'rotate-180' : ''}`}
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>

                  {styleOpen ? (
                    <div className="absolute z-20 w-full rounded-xl border border-[#8eaedf] bg-[#dbe8fb]/95 p-2 shadow-[0_12px_24px_rgba(31,63,117,0.16)] backdrop-blur-md">
                      {styleOptions.map((option) => (
                        <button
                          key={option.label}
                          type="button"
                          onClick={() => {
                            setStyle(option.label);
                            setStyleOpen(false);
                          }}
                          className="flex w-full items-start gap-3 rounded-lg px-3 py-2 text-left transition hover:bg-[#cfe0fa]"
                        >
                          <span className="mt-0.5 text-[#2f5ea5]">{getStyleIcon(option.icon)}</span>
                          <div>
                            <p className="font-medium text-[#1d447f]">{option.label}</p>
                            <p className="text-xs text-[#6b88b5]">{option.desc}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : null}
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-medium text-[#2f4f82]">Color Scheme</label>
                  <div className="grid grid-cols-6 gap-3">
                    {colorOptions.map((option) => {
                      const active = option.label === scheme;
                      return (
                        <button
                          key={option.label}
                          className={`relative rounded-lg transition-all ${active ? 'ring-2 ring-[#2f5ea5]' : ''}`}
                          title={option.label}
                          onClick={() => setScheme(option.label)}
                          type="button"
                        >
                          <div className="flex h-10 overflow-hidden rounded-lg">
                            {option.colors.map((c) => (
                              <div key={c} className="flex-1" style={{ backgroundColor: c }} />
                            ))}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-xs text-[#6b88b5]">Selected: {scheme}</p>
                </div>

                <div ref={modelRef} className="relative space-y-2">
                  <label className="block text-sm font-medium text-[#2f4f82]">Model</label>
                  <button
                    type="button"
                    onClick={() => setModelOpen((v) => !v)}
                    className={`flex w-full items-center justify-between rounded-lg border px-4 py-3 text-left transition ${
                      modelOpen
                        ? 'border-[#5d83bf] bg-[#dbe8fb] text-[#1d447f]'
                        : 'border-[#8eaedf] bg-[#dbe8fb]/85 text-[#1d447f] hover:bg-[#d5e4fb]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="capitalize">{model}</span>
                      <span className="text-[#6b88b5]">
                        ({modelOptions.find((m) => m.label === model)?.credits} credits)
                      </span>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className={`h-5 w-5 text-[#6b88b5] transition-transform ${modelOpen ? 'rotate-180' : ''}`}
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>

                  {modelOpen ? (
                    <div className="absolute z-20 w-full overflow-hidden rounded-xl border border-[#8eaedf] bg-[#dbe8fb]/95 shadow-[0_12px_24px_rgba(31,63,117,0.16)]">
                      {modelOptions.map((option) => {
                        const active = option.label === model;
                        return (
                          <button
                            key={option.label}
                            type="button"
                            onClick={() => {
                              setModel(option.label);
                              setModelOpen(false);
                            }}
                            className={`flex w-full items-center justify-between px-4 py-3 text-left transition ${
                              active
                                ? 'bg-[#cfe0fa] text-[#1d447f]'
                                : 'text-[#2f4f82] hover:bg-[#d5e4fb]'
                            }`}
                          >
                            <span>{option.label}</span>
                            <span className={active ? 'text-[#2f5ea5]' : 'text-[#6b88b5]'}>
                              {option.credits} credits
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  ) : null}
                </div>

                <label
                  htmlFor="userPhoto"
                  className="inline-block text-sm font-medium text-[#2f4f82]"
                >
                  <div className="flex flex-wrap items-start gap-3">
                    <div className="flex size-16 items-center justify-center rounded-xl border border-dashed border-[#8eaedf] bg-[#dbe8fb]/55 text-[#6b88b5]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="h-6 w-6"
                      >
                        <circle cx="12" cy="8" r="4"></circle>
                        <path d="M4 20a8 8 0 0 1 16 0"></path>
                      </svg>
                    </div>
                    <div className="space-y-2">
                      <p>
                        User Photo <span className="text-xs text-[#6b88b5]">(optional)</span>
                      </p>
                      <span className="inline-block cursor-pointer rounded-lg bg-[#cfe0fa] px-4 py-1.5 text-xs text-[#1d447f] transition-colors hover:bg-[#bdd3f5]">
                        Upload Photo
                      </span>
                      {userPhotoName ? (
                        <p className="text-xs text-[#6b88b5]">{userPhotoName}</p>
                      ) : null}
                    </div>
                  </div>
                </label>
                <input
                  id="userPhoto"
                  accept="image/*"
                  className="hidden"
                  type="file"
                  onChange={(e) => setUserPhotoName(e.target.files?.[0]?.name ?? '')}
                />

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-[#2f4f82]">
                    Additional Prompts <span className="text-xs text-[#6b88b5]">(optional)</span>
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Add any specific elements, mood, or style preferences..."
                    className="w-full resize-none rounded-lg border border-[#8eaedf] bg-[#dbe8fb]/80 px-4 py-3 text-[#1d447f] placeholder:text-[#6b88b5] focus:outline-none focus:ring-2 focus:ring-[#2f5ea5]"
                  />
                </div>
              </div>

              <button className="w-full rounded-xl bg-linear-to-b from-[#2f5ea5] to-[#244a82] py-3.5 text-[15px] font-medium text-white transition-colors hover:from-[#244a82] cursor-pointer">
                Generate Thumbnail
              </button>
            </div>
          </div>
          
          <PreviewPanel aspect={aspect} />
        </div>
      </main>
    </div>
  );
}

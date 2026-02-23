'use client';

import { useState } from 'react';
import { AspectRatioSelector, AspectValue, PreviewPanel } from '@/components/generator/shared';

export default function RecreatePage() {
  const [inputMode, setInputMode] = useState<'upload' | 'url'>('upload');
  const [aspect, setAspect] = useState<AspectValue>('16 / 9');
  const [imageUrl, setImageUrl] = useState('');
  const [changes, setChanges] = useState('');

  return (
    <main className="px-4">
      <div className="grid gap-8 lg:grid-cols-[400px_1fr]">
        <div className="space-y-6">
          <div className="space-y-6 rounded-2xl border border-[#8eaedf] bg-[#dbe8fb]/75 p-6">
            <div>
              <h2 className="text-xl font-bold text-[#1d447f]">Recreate Thumbnail</h2>
              <p className="text-sm text-[#4f6f9f]">
                Upload an image or paste a URL and describe your changes
              </p>
            </div>

            <div className="flex gap-2">
              <button
                className={`rounded-lg px-4 py-2 text-sm cursor-pointer ${inputMode === 'upload' ? 'bg-[#2f5ea5] text-white' : 'bg-[#cfe0fa] text-[#2f4f82]'}`}
                onClick={() => setInputMode('upload')}
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-1 inline"
                  aria-hidden="true"
                >
                  <path d="M12 3v12"></path>
                  <path d="m17 8-5-5-5 5"></path>
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                </svg>
                Upload
              </button>
              <button
                className={`rounded-lg px-4 py-2 text-sm cursor-pointer ${inputMode === 'url' ? 'bg-[#2f5ea5] text-white' : 'bg-[#cfe0fa] text-[#2f4f82]'}`}
                onClick={() => setInputMode('url')}
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-1 inline"
                  aria-hidden="true"
                >
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                </svg>
                Image URL
              </button>
            </div>

            {inputMode === 'upload' ? (
              <label className="block">
                <input accept=".png, .jpg, .jpeg, image/png, image/jpeg" hidden type="file" />
                <div className="cursor-pointer rounded-xl border border-dashed border-[#8eaedf] p-4 text-center">
                  <p className="text-sm text-[#4f6f9f]">Click to upload image</p>
                </div>
              </label>
            ) : (
              <div>
                <label className="mb-1 block text-sm font-medium text-[#2f4f82]">Image URL</label>
                <input
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full rounded-lg border border-[#8eaedf] bg-[#dbe8fb]/85 px-4 py-3 text-[#1d447f] placeholder:text-[#6b88b5] focus:outline-none focus:ring-2 focus:ring-[#2f5ea5]"
                />
              </div>
            )}

            <div>
              <label className="mb-1 block text-sm font-medium text-[#2f4f82]">
                What do you want to change?
              </label>
              <textarea
                rows={4}
                placeholder="Change text, colors, expressions, style..."
                className="w-full resize-none rounded-lg border border-[#8eaedf] bg-[#dbe8fb]/85 px-4 py-3 text-[#1d447f] placeholder:text-[#6b88b5] focus:outline-none focus:ring-2 focus:ring-[#2f5ea5] transition"
                value={changes}
                onChange={(e) => setChanges(e.target.value)}
              />
            </div>

            <AspectRatioSelector value={aspect} onChange={setAspect} />

            <p className="text-center text-xs text-[#4f6f9f]">
              <span className="font-semibold">10 Credits</span> / per thumbnail generation
            </p>

            <button className="w-full rounded-xl bg-[#2f5ea5] py-3 text-white hover:bg-[#244a82] cursor-pointer">
              Recreate Thumbnail
            </button>
          </div>
        </div>

        <PreviewPanel aspect={aspect} />
      </div>
    </main>
  );
}

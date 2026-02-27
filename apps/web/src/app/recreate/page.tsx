'use client';

import { useState } from 'react';
import { AspectRatioSelector, AspectValue, PreviewPanel } from '@/components/generator/shared';
import LinkIcon from '@/assets/icons/link.svg';
import UploadIcon from '@/assets/icons/upload.svg';

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
                <UploadIcon className="mr-1 inline h-4 w-4" aria-hidden="true" />
                Upload
              </button>
              <button
                className={`rounded-lg px-4 py-2 text-sm cursor-pointer ${inputMode === 'url' ? 'bg-[#2f5ea5] text-white' : 'bg-[#cfe0fa] text-[#2f4f82]'}`}
                onClick={() => setInputMode('url')}
                type="button"
              >
                <LinkIcon className="mr-1 inline h-4 w-4" aria-hidden="true" />
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

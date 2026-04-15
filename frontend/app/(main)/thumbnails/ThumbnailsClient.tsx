'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import DownloadIcon from '@/components/icons/generated/DownloadIcon';
import ExternalLinkIcon from '@/components/icons/generated/ExternalLinkIcon';
import { CopyUrlButton } from './CopyUrlButton';
import { type CommunityItem, PAGE_SIZE } from './thumbnails-data';

function ThumbnailCard({ item }: { item: CommunityItem }) {
  return (
    <article
      key={`${item.title}-${item.imageUrl}`}
      className="group relative overflow-hidden rounded-[1.25rem] border border-[rgba(194,198,214,0.5)] bg-[var(--surface-container-lowest)] shadow-[0_4px_16px_rgba(0,88,190,0.06)] tonal-transition hover:shadow-[0_8px_28px_rgba(0,88,190,0.12)]"
      title={item.title}
    >
      <Link href={`/thumbnails/${item.id}`} className="block">
        <div className="relative aspect-video overflow-hidden bg-[var(--surface-container-highest)]">
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1536px) 33vw, 25vw"
            className="object-cover object-top"
          />
          <div className="absolute bottom-2 right-2 rounded-full bg-black/60 px-3 py-1 text-xs text-white opacity-0 backdrop-blur-sm tonal-transition group-hover:opacity-100">
            {item.author}
          </div>
        </div>
      </Link>

      <div className="space-y-2.5 p-4">
        <h3 className="truncate text-sm font-semibold text-[var(--on-surface)]">
          {item.title}
        </h3>
        <div className="flex flex-wrap gap-1.5 text-xs">
          {[item.style, item.color, item.aspect].map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-[var(--surface-container)] px-2 py-0.5 text-[var(--on-surface-variant)]"
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="text-xs text-[var(--outline)]">{item.date}</p>
      </div>

      <div className="absolute bottom-[3.5rem] right-2 flex gap-1.5 opacity-0 tonal-transition group-hover:opacity-100 max-sm:opacity-100">
        <button
          type="button"
          className="grid size-7 cursor-pointer place-items-center rounded-lg bg-black/55 text-white backdrop-blur-sm tonal-transition hover:bg-[var(--primary)]"
          onClick={async () => {
            const response = await fetch(item.imageUrl);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${item.title}.png`;
            a.click();
            window.URL.revokeObjectURL(url);
          }}
          aria-label="Download thumbnail"
        >
          <DownloadIcon className="size-3.5" />
        </button>
        <Link
          target="_blank"
          href={item.imageUrl}
          className="grid size-7 cursor-pointer place-items-center rounded-lg bg-black/55 text-white backdrop-blur-sm tonal-transition hover:bg-[var(--primary)]"
          aria-label="Open image"
        >
          <ExternalLinkIcon className="size-3.5" />
        </Link>
        <CopyUrlButton id={item.id} variant="card" />
      </div>
    </article>
  );
}

export function ThumbnailsClient({
  initialItems,
  remainingItems,
}: {
  initialItems: CommunityItem[];
  remainingItems: CommunityItem[];
}) {
  const [extraCount, setExtraCount] = useState(0);

  const visibleExtra = remainingItems.slice(0, extraCount);
  const hasMore = extraCount < remainingItems.length;

  return (
    <>
      <div className="grid grid-cols-1 items-start gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {/* SSR-rendered initial items */}
        {initialItems.map((item) => (
          <ThumbnailCard key={`${item.title}-${item.imageUrl}`} item={item} />
        ))}
        {/* Client-loaded additional items */}
        {visibleExtra.map((item) => (
          <ThumbnailCard key={`${item.title}-${item.imageUrl}`} item={item} />
        ))}
      </div>

      {remainingItems.length > 0 && (
        <div className="mt-12 flex justify-center">
          <button
            type="button"
            onClick={() => setExtraCount((prev) => prev + PAGE_SIZE)}
            disabled={!hasMore}
            className="cursor-pointer rounded-full border border-[rgba(194,198,214,0.5)] bg-[var(--surface-container-lowest)] px-8 py-3 text-sm font-medium text-[var(--on-surface-variant)] tonal-transition hover:bg-[var(--surface-container-low)] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {hasMore ? 'Load More' : 'No More Items'}
          </button>
        </div>
      )}
    </>
  );
}

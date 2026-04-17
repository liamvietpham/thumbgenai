'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import DownloadIcon from '@/components/icons/generated/DownloadIcon';
import SparkIcon from '@/components/icons/generated/SparkIcon';
import { type CommunityItem } from '@/components/thumbnails/thumbnails-data';

function SearchIcon({ className = '' }) {
  return (
    <svg aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24">
      <circle cx={11} cy={11} r={8} /><path d="m21 21-4.35-4.35" />
    </svg>
  );
}
function FilterIcon({ className = '' }) {
  return (
    <svg aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24">
      <path d="M3 6h18M7 12h10M11 18h2" />
    </svg>
  );
}

export function CreationsSection({ items }: { items: CommunityItem[] }) {
  const [search, setSearch] = useState('');

  const filteredItems = items.filter((i) =>
    i.title.toLowerCase().includes(search.toLowerCase()),
  );

  if (items.length === 0) {
    return (
      <section className="mb-16">
        <h2 className="font-headline mb-12 text-3xl font-bold tracking-tight text-(--on-surface)">
          Your Creations
        </h2>
        <div className="mx-auto max-w-md text-center">
          <div className="relative mb-8 inline-block">
            <div className="relative mx-auto flex size-64 items-center justify-center overflow-hidden rounded-full bg-(--surface-container) opacity-50">
              <SparkIcon className="size-28 text-(--primary)/20" />
            </div>
            <div className="absolute -bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full bg-(--surface-container-lowest) px-6 py-2 text-xs font-bold shadow-md">
              <span className="size-2 animate-pulse rounded-full bg-(--tertiary)" />
              AI Engine Ready to Create
            </div>
          </div>
          <h3 className="font-headline mb-4 mt-4 text-3xl font-bold tracking-tight text-(--on-surface)">
            No creations yet
          </h3>
          <p className="mb-8 text-sm leading-relaxed text-(--on-surface-variant)">
            Your studio is prepped and your credits are fueled. Start your creative journey by generating your first thumbnail.
          </p>
          <Link
            href="/generate"
            className="mx-auto inline-flex cursor-pointer items-center gap-3 rounded-xl bg-linear-to-r from-[#0058be] to-[#2170e4] px-8 py-4 font-bold text-white shadow-xl tonal-transition hover:scale-105"
          >
            <svg aria-hidden="true" className="size-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24">
              <circle cx={12} cy={12} r={10} /><path d="M12 8v8M8 12h8" />
            </svg>
            Create Your First Thumbnail
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mb-16">
      <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h2 className="font-headline text-3xl font-bold tracking-tight text-(--on-surface)">
            Your Creations
          </h2>
          <p className="font-medium text-(--on-surface-variant)">The visual legacy of Thumbnail AI</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              className="form-field w-64 py-3 pl-10 pr-4 text-sm"
              placeholder="Search gallery..."
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-(--outline)" />
          </div>
          <button
            type="button"
            className="cursor-pointer rounded-xl bg-(--surface-container-lowest) p-3 shadow-sm tonal-transition hover:text-(--primary)"
          >
            <FilterIcon className="size-5 text-(--on-surface-variant)" />
          </button>
        </div>
      </div>

      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-2xl bg-(--surface-container-lowest) p-2 shadow-sm tonal-transition hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="relative mb-3 aspect-video overflow-hidden rounded-xl">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 flex items-center justify-center gap-3 bg-[rgba(0,88,190,0.2)] opacity-0 transition-opacity group-hover:opacity-100">
                  <Link
                    href={`/thumbnails/${item.id}`}
                    className="flex size-10 items-center justify-center rounded-full bg-white text-(--primary) shadow-lg tonal-transition hover:scale-110"
                    aria-label="View thumbnail"
                  >
                    <svg aria-hidden="true" className="size-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z" /><circle cx={12} cy={12} r={3} />
                    </svg>
                  </Link>
                  <a
                    href={item.imageUrl}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex size-10 items-center justify-center rounded-full bg-white text-(--primary) shadow-lg tonal-transition hover:scale-110"
                    aria-label="Download"
                  >
                    <DownloadIcon className="size-5" />
                  </a>
                </div>
              </div>
              <div className="px-2 pb-2">
                <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-(--outline)">
                  Generated · {item.date}
                </p>
                <h4 className="truncate text-sm font-bold text-(--on-surface)">{item.title}</h4>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center py-24 text-center">
          <SparkIcon className="mb-4 size-12 text-(--outline-variant)" />
          <p className="text-(--on-surface-variant)">No creations match your search.</p>
        </div>
      )}
    </section>
  );
}

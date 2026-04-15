import type { Metadata } from 'next';
import { ThumbnailsClient } from '@/components/thumbnails/ThumbnailsClient';
import { COMMUNITY_ITEMS, PAGE_SIZE } from '@/components/thumbnails/thumbnails-data';

export const metadata: Metadata = {
  title: 'Thumbnails',
  description: 'Browse AI-generated thumbnails created by the ThumbnailAI community.',
  openGraph: {
    title: 'Thumbnails | Thumbnail AI',
    description: 'Browse AI-generated thumbnails created by the ThumbnailAI community.',
    images: [{ url: '/hero_img.webp', width: 1200, height: 630 }],
  },
};

export default function ThumbnailsPage() {
  const initialItems = COMMUNITY_ITEMS.slice(0, PAGE_SIZE);
  const remainingItems = COMMUNITY_ITEMS.slice(PAGE_SIZE);

  return (
    <div className="mx-auto max-w-6xl px-4 pb-16 pt-10 sm:px-6 md:pb-24 md:pt-20 lg:px-8">
      <div className="mb-10 space-y-2">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-[var(--on-surface)]">
          Thumbnails
        </h1>
        <p className="max-w-md text-lg leading-relaxed text-[var(--on-surface-variant)]">
          Browse AI-generated thumbnails created by the community and share your own.
        </p>
      </div>

      <ThumbnailsClient initialItems={initialItems} remainingItems={remainingItems} />
    </div>
  );
}

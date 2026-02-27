'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import DownloadIcon from '@/assets/icons/download.svg';
import ExternalLinkIcon from '@/assets/icons/external-link.svg';

type CommunityItem = {
  title: string;
  imageUrl: string;
  author: string;
  style: string;
  color: string;
  aspect: string;
  date: string;
};

const PAGE_SIZE = 12;

const COMMUNITY_ITEMS: CommunityItem[] = [
  { title: 'deep seek vs chat gpt', imageUrl: 'https://images.thumbnailgo.com/thumbnails/1771600637069.png', author: 'Younes Belhadi', style: 'Bold & Graphic', color: 'ocean', aspect: '16:9', date: 'Fri Feb 20 2026' },
  { title: 'Learn Python in 5 Hours', imageUrl: 'https://images.thumbnailgo.com/thumbnails/1771512815527.png', author: 'Mohammad Alhef', style: 'Bold & Graphic', color: 'purple', aspect: '16:9', date: 'Thu Feb 19 2026' },
  { title: 'Imran Khan Loses 85% Vision in One Eye - Shocking Update!', imageUrl: 'https://images.thumbnailgo.com/thumbnails/1771393942053.png', author: 'Wendosen ak', style: 'Bold & Graphic', color: 'vibrant', aspect: '16:9', date: 'Wed Feb 18 2026' },
  { title: 'Create a dramatic, high-quality YouTube thumbnail featuring Imran Khan.', imageUrl: 'https://images.thumbnailgo.com/thumbnails/1771393794264.png', author: 'Wendosen ak', style: 'Bold & Graphic', color: 'vibrant', aspect: '16:9', date: 'Wed Feb 18 2026' },
  { title: 'Naveen and nithya', imageUrl: 'https://images.thumbnailgo.com/thumbnails/1771315858173.png', author: 'GP Nithyapriya', style: 'Photorealistic', color: 'pastel', aspect: '16:9', date: 'Tue Feb 17 2026' },
  { title: 'What has expired dates actually means', imageUrl: 'https://images.thumbnailgo.com/thumbnails/1771281959717.png', author: 'MIRACLE Ekwueme', style: 'Bold & Graphic', color: 'vibrant', aspect: '16:9', date: 'Tue Feb 17 2026' },
  { title: 'best moisturizer for oily skin', imageUrl: 'https://images.thumbnailgo.com/thumbnails/1771244395826.png', author: 'Piyush Patil', style: 'Bold & Graphic', color: 'neon', aspect: '16:9', date: 'Mon Feb 16 2026' },
  { title: 'Best laptop for programming', imageUrl: 'https://images.thumbnailgo.com/thumbnails/1771082629753.png', author: 'next js', style: 'Tech/Futuristic', color: 'ocean', aspect: '16:9', date: 'Sat Feb 14 2026' },
  { title: 'thing', imageUrl: 'https://images.thumbnailgo.com/thumbnails/1770903646286.png', author: 'Bisboyx 222', style: 'Bold & Graphic', color: 'vibrant', aspect: '16:9', date: 'Thu Feb 12 2026' },
  { title: 'best cricketing shots', imageUrl: 'https://images.thumbnailgo.com/thumbnails/1770888004849.png', author: 'PRIME YTN', style: 'Bold & Graphic', color: 'vibrant', aspect: '16:9', date: 'Thu Feb 12 2026' },
  { title: 'HOW TO GET INTERNSHIP', imageUrl: 'https://images.thumbnailgo.com/thumbnails/1770723328251.png', author: 'Sahil Guruji', style: 'Bold & Graphic', color: 'sunset', aspect: '16:9', date: 'Tue Feb 10 2026' },
  { title: 'Recreated Thumbnail', imageUrl: 'https://images.thumbnailgo.com/thumbnails/1770649004139.png', author: 'businessayan', style: 'Recreate', color: '-', aspect: '16:9', date: 'Mon Feb 09 2026' },
  { title: '10 dicas para ficar milionario', imageUrl: 'https://images.thumbnailgo.com/thumbnails/1770640177284.png', author: 'yuld chissico', style: 'Bold & Graphic', color: 'forest', aspect: '16:9', date: 'Mon Feb 09 2026' },
  { title: 'awrestrdtfyguhjoo', imageUrl: 'https://images.thumbnailgo.com/thumbnails/1770623271533.png', author: 'Aditya Mundhe', style: 'Bold & Graphic', color: 'ocean', aspect: '16:9', date: 'Mon Feb 09 2026' },
  { title: '10 ai tools for working professional', imageUrl: 'https://images.thumbnailgo.com/thumbnails/1770604666764.png', author: 'mawaddd', style: 'Tech/Futuristic', color: 'ocean', aspect: '16:9', date: 'Mon Feb 09 2026' },
  { title: 'School boys story', imageUrl: 'https://images.thumbnailgo.com/thumbnails/1770599314710.png', author: 'Nikita', style: 'Bold & Graphic', color: 'vibrant', aspect: '9:16', date: 'Mon Feb 09 2026' },
  { title: 'Free English Spoken Course', imageUrl: 'https://images.thumbnailgo.com/thumbnails/1770558459945.png', author: 'S M Shamim H T Hatiandaha GPS', style: 'Bold & Graphic', color: 'vibrant', aspect: '16:9', date: 'Sun Feb 08 2026' },
  { title: 'thumbnail for vlog my house tour', imageUrl: 'https://images.thumbnailgo.com/thumbnails/1770542545699.png', author: 'Md Suhail', style: 'Photorealistic', color: 'neon', aspect: '9:16', date: 'Sun Feb 08 2026' },
  { title: 'DIY: Rice Water toner', imageUrl: 'https://images.thumbnailgo.com/thumbnails/1770528900689.png', author: 'Rohit G', style: 'Bold & Graphic', color: 'pastel', aspect: '16:9', date: 'Sun Feb 08 2026' },
  { title: 'generate a burn phoenix for college fest.', imageUrl: 'https://images.thumbnailgo.com/thumbnails/1770492682115.png', author: 'VIVEK RAKESH TIWARY', style: 'Illustrated', color: 'sunset', aspect: '16:9', date: 'Sun Feb 08 2026' },
  { title: 'thumbnail for a music cover video for song zamana', imageUrl: 'https://images.thumbnailgo.com/thumbnails/1770483407337.png', author: 'VIVEK RAKESH TIWARY', style: 'Bold & Graphic', color: 'monochrome', aspect: '16:9', date: 'Sat Feb 07 2026' },
  { title: 'Conamatic Vlog', imageUrl: 'https://images.thumbnailgo.com/thumbnails/1770404122624.png', author: 'Chandrakant Maurya', style: 'Bold & Graphic', color: 'sunset', aspect: '16:9', date: 'Sat Feb 07 2026' },
  { title: 'Digital clock animation', imageUrl: 'https://images.thumbnailgo.com/thumbnails/1770395322497.png', author: 'Mohit Singh', style: 'Bold & Graphic', color: 'vibrant', aspect: '9:16', date: 'Fri Feb 06 2026' },
  { title: 'Recreated Thumbnail (Community)', imageUrl: 'https://images.thumbnailgo.com/thumbnails/1770382205153.png', author: 'GreatStack Dev', style: 'Recreate', color: '-', aspect: '16:9', date: 'Fri Feb 06 2026' },
];

export default function CommunityPage() {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const visibleItems = useMemo(() => COMMUNITY_ITEMS.slice(0, visibleCount), [visibleCount]);
  const hasMore = visibleCount < COMMUNITY_ITEMS.length;

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-start justify-between max-sm:mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-[#1d447f]">Community</h1>
            <span className="sr-only mt-1 text-xs text-[#4f6f9f]">({COMMUNITY_ITEMS.length}) Images</span>
          </div>
          <p className="mt-1 max-w-md text-sm text-[#4f6f9f]">
            Browse AI-generated thumbnails created by the community and share your own
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 items-start gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {visibleItems.map((item) => (
          <article
            key={`${item.title}-${item.imageUrl}`}
            className="group relative overflow-hidden rounded-2xl border border-[#8eaedf] bg-[#dbe8fb]/70 shadow-xl transition"
            title={item.title}
          >
            <div className="relative overflow-hidden rounded-t-2xl bg-black">
              <img alt={item.title} loading="lazy" className="aspect-video object-cover object-top" src={item.imageUrl} />
              <div className="absolute bottom-2 right-2 rounded-full bg-[#1b3f75]/70 px-6 py-1.5 text-xs text-white opacity-0 backdrop-blur transition-all group-hover:opacity-100">
                {item.author}
              </div>
            </div>

            <div className="space-y-2 p-4">
              <h3 className="truncate text-sm font-semibold text-[#1d447f]">
                {item.title}
              </h3>
              <div className="flex flex-wrap gap-2 text-xs text-[#4f6f9f]">
                <span className="rounded bg-[#c7d8f3] px-2 py-0.5">{item.style}</span>
                <span className="rounded bg-[#c7d8f3] px-2 py-0.5">{item.color}</span>
                <span className="rounded bg-[#c7d8f3] px-2 py-0.5">{item.aspect}</span>
              </div>
              <p className="text-xs text-[#6785b1]">{item.date}</p>
            </div>

            <div className="absolute bottom-2 right-2 flex gap-1.5 max-sm:flex sm:hidden group-hover:flex">
              <button
                type="button"
                className="flex h-6 w-6 cursor-pointer items-center justify-center rounded bg-black/50 text-white transition-all hover:bg-[#2f5ea5]"
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
                <DownloadIcon className="size-4" />
              </button>

              <Link
                target="_blank"
                href={`/preview?thumbnail_url=${encodeURIComponent(item.imageUrl)}&title=${encodeURIComponent(item.title)}`}
                className="flex h-6 w-6 items-center justify-center rounded bg-black/50 text-white transition-all hover:bg-[#2f5ea5]"
                aria-label="Open preview"
              >
                <ExternalLinkIcon className="size-4" />
              </Link>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <button
          type="button"
          className="flex items-center gap-2 rounded-full border border-[#8eaedf] bg-[#dbe8fb]/80 px-8 py-3 text-sm font-medium text-[#2f4f82] transition-all hover:bg-[#cfe0fa] disabled:opacity-50"
          onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
          disabled={!hasMore}
        >
          {hasMore ? 'Load More' : 'No More Items'}
        </button>
      </div>
    </div>
  );
}

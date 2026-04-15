import type { Metadata } from 'next';
import { HomeMain } from '@/components/home/HomeMain';

export const metadata: Metadata = {
  title: 'AI-Powered Thumbnails in Seconds',
  description:
    'Create sharper, higher-converting YouTube thumbnails with Thumbnail AI. Explore the public gallery, compare plans, and launch new concepts in seconds.',
  keywords: [
    'thumbnail ai',
    'youtube thumbnail generator',
    'ai thumbnail maker',
    'thumbnail design tool',
    'creator software',
  ],
  openGraph: {
    title: 'Thumbnail AI',
    description:
      'Generate polished, click-worthy thumbnails with AI-powered creative direction and fast export workflows.',
    type: 'website',
    images: [
      {
        url: '/hero_img.webp',
        width: 1280,
        height: 720,
        alt: 'Thumbnail AI hero preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Thumbnail AI',
    description:
      'Generate polished, click-worthy thumbnails with AI-powered creative direction and fast export workflows.',
    images: ['/hero_img.webp'],
  },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Thumbnail AI',
  applicationCategory: 'DesignApplication',
  operatingSystem: 'Web',
  description:
    'AI-powered thumbnail generator for creators who want polished YouTube visuals, faster iteration, and better click-through rates.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  featureList: [
    'AI thumbnail generation',
    'Public gallery inspiration',
    'Fast creator workflow',
    'High CTR visual direction',
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <HomeMain />
    </>
  );
}

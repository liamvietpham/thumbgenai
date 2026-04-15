import type { Metadata } from 'next';
import { AboutMain } from '@/components/about/AboutMain';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn how Thumbnail AI helps creators move faster with Gemini-powered thumbnail workflows, audience insight, and visual optimization tools.',
  openGraph: {
    title: 'About | Thumbnail AI',
    description: 'Learn how Thumbnail AI helps creators move faster with Gemini-powered thumbnail workflows, audience insight, and visual optimization tools.',
    images: [{ url: '/hero_img.webp', width: 1200, height: 630 }],
  },
};

export default function AboutPage() {
  return <AboutMain />;
}

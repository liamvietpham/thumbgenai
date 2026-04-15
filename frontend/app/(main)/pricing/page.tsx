import type { Metadata } from 'next';
import { PricingMain } from '@/components/pricing/PricingMain';

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Buy credits and generate AI thumbnails on demand. No subscriptions — pay only for what you use.',
  openGraph: {
    title: 'Pricing | Thumbnail AI',
    description: 'Buy credits and generate AI thumbnails on demand. No subscriptions — pay only for what you use.',
    images: [{ url: '/hero_img.webp', width: 1200, height: 630 }],
  },
};

export default function PricingPage() {
  return <PricingMain />;
}

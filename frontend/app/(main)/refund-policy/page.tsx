import type { Metadata } from 'next';
import { RefundPolicyMain } from '@/components/legal/RefundPolicyMain';

export const metadata: Metadata = {
  title: 'Refund Policy',
  description:
    'Read the Refund Policy for ThumbnailAI — covering credit purchases, non-refundable items, and how to request a review.',
};

export default function RefundPolicyPage() {
  return <RefundPolicyMain />;
}

import type { Metadata } from 'next';
import { TermsMain } from '@/components/legal/TermsMain';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'Read the Terms of Service for ThumbnailAI — covering usage rights, payments, content ownership, and account policies.',
};

export default function TermsOfServicePage() {
  return <TermsMain />;
}

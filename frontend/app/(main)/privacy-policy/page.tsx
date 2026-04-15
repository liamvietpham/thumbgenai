import type { Metadata } from 'next';
import { PrivacyPolicyMain } from '@/components/legal/PrivacyPolicyMain';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Understand how Thumbnail AI collects, uses, protects, and retains account data, uploaded assets, and product usage information.',
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyMain />;
}

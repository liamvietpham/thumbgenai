export type CreditPack = {
  name: string;
  tagline: string;
  price: number;
  credits: number;
  pricePerCredit: string;
  features: string[];
  cta: string;
  href: string;
  highlighted?: boolean;
  badge?: string;
};

export type PricingFaq = {
  question: string;
  answer: string;
};

export const creditPacks: CreditPack[] = [
  {
    name: 'Starter',
    tagline: 'Try it out, no commitment needed.',
    price: 1,
    credits: 12,
    pricePerCredit: '$0.08',
    features: [
      '12 thumbnail generations',
      'High-resolution output',
      'All styles & models',
      'No watermarks',
      'Credits never expire',
    ],
    cta: 'Buy Starter Pack',
    href: '/register',
  },
  {
    name: 'Standard',
    tagline: 'Great for consistent creators.',
    price: 10,
    credits: 149,
    pricePerCredit: '$0.067',
    features: [
      '149 thumbnail generations',
      'High-resolution output',
      'All styles & models',
      'No watermarks',
      'Credits never expire',
    ],
    cta: 'Buy Standard Pack',
    href: '/register',
    highlighted: true,
    badge: 'Most Popular',
  },
  {
    name: 'Value Pack',
    tagline: 'Best rate for high-volume creators.',
    price: 500,
    credits: 12500,
    pricePerCredit: '$0.04',
    features: [
      '12,500 thumbnail generations',
      'High-resolution output',
      'All styles & models',
      'No watermarks',
      'Credits never expire',
    ],
    cta: 'Buy Value Pack',
    href: '/register',
    badge: 'Best Value',
  },
];

export const pricingLogos = ['CREATORX', 'STUDIO_01', 'VIRALFLOW', 'THUMBMASTER'];

export const pricingFaqs: PricingFaq[] = [
  {
    question: 'How does pay-as-you-go work?',
    answer:
      'You buy a credit pack once and use it at your own pace. Each thumbnail generation costs 1 credit. There are no subscriptions, no monthly fees, and no expiry dates — credits stay in your account until you use them.',
  },
  {
    question: 'Can I buy more credits after I run out?',
    answer:
      'Yes. You can top up your account at any time by purchasing any credit pack. The credits are added instantly to your balance.',
  },
  {
    question: 'Do you offer discounts for educational use?',
    answer:
      'Yes. We offer discounted access for verified students and educators. Reach out through the contact page and we can help set that up.',
  },
];

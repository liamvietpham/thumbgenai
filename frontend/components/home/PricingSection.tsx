import Link from 'next/link';
import CheckIcon from '@/components/icons/generated/CheckIcon';

const packs = [
  {
    name: 'Starter',
    price: '$2',
    credits: 25,
    pricePerCredit: '$0.08/credit',
    features: ['25 thumbnail generations', 'High-resolution output', 'All styles & models', 'No watermarks', 'Credits never expire'],
    cta: 'Buy Starter Pack',
    href: '/register',
  },
  {
    name: 'Standard',
    price: '$8',
    credits: 120,
    pricePerCredit: '$0.067/credit',
    features: ['120 thumbnail generations', 'High-resolution output', 'All styles & models', 'No watermarks', 'Credits never expire'],
    cta: 'Buy Standard Pack',
    href: '/register',
    highlighted: true,
    badge: 'MOST POPULAR',
  },
  {
    name: 'Value Pack',
    price: '$20',
    credits: 375,
    pricePerCredit: '$0.053/credit',
    features: ['375 thumbnail generations', 'High-resolution output', 'All styles & models', 'No watermarks', 'Credits never expire'],
    cta: 'Buy Value Pack',
    href: '/register',
    badge: 'BEST VALUE',
  },
];

export function PricingSection({ className = '' }: { className?: string }) {
  return (
    <section
      id="pricing"
      aria-labelledby="pricing-title"
      className={`relative bg-[var(--surface-container-lowest)] px-6 py-32 md:px-8 ${className}`}
    >
      <div className="mx-auto max-w-7xl">
        <header className="mx-auto mb-4 max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--primary)]">
            Pricing
          </p>
          <h2
            id="pricing-title"
            className="mt-4 font-headline text-4xl font-bold tracking-tight text-[var(--on-surface)] md:text-5xl"
          >
            Pay as you go
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-[var(--on-surface-variant)]">
            Buy credits once, use them at your own pace. No subscriptions, no monthly fees.
          </p>
        </header>

        <p className="mb-16 text-center text-base text-[var(--on-surface-variant)]">
          1 image = 1 credit &nbsp;·&nbsp; Credits never expire
        </p>

        <div className="grid gap-8 md:grid-cols-3">
          {packs.map((pack) => (
            <article
              key={pack.name}
              className={`relative flex h-full flex-col rounded-[2rem] border p-10 tonal-transition ${
                pack.highlighted
                  ? 'z-10 scale-[1.02] border-[var(--primary)] bg-white shadow-[0_24px_64px_-32px_rgba(0,88,190,0.32)]'
                  : 'border-[rgba(194,198,214,0.5)] bg-[var(--surface)] shadow-sm'
              }`}
            >
              {pack.badge ? (
                <p className="absolute right-0 top-0 rounded-bl-2xl rounded-tr-[2rem] bg-[var(--primary)] px-4 py-1.5 text-[10px] font-bold tracking-[0.16em] text-white">
                  {pack.badge}
                </p>
              ) : null}

              <div className="mb-8">
                <h3
                  className={`text-lg font-bold ${
                    pack.highlighted ? 'text-[var(--primary)]' : 'text-[var(--on-surface-variant)]'
                  }`}
                >
                  {pack.name}
                </h3>
                <p className="mt-2 font-headline text-4xl font-bold text-[var(--on-surface)]">
                  {pack.price}
                </p>
                <p className="mt-1 text-[var(--on-surface-variant)]">
                  <span className="text-xl font-bold text-[var(--primary)]">{pack.credits}</span>
                  {' '}credits
                  <span className="ml-2 text-sm opacity-70">({pack.pricePerCredit})</span>
                </p>
              </div>

              <ul className="flex-grow space-y-4">
                {pack.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-[var(--on-surface-variant)]">
                    <CheckIcon className="mt-0.5 size-5 shrink-0 text-[var(--primary)]" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={pack.href}
                className={`mt-10 inline-flex cursor-pointer items-center justify-center rounded-xl px-6 py-4 font-bold tonal-transition ${
                  pack.highlighted
                    ? 'bg-gradient-to-r from-[#0058be] to-[#2170e4] text-white shadow-lg shadow-[rgba(0,88,190,0.18)] hover:-translate-y-0.5'
                    : 'border border-[rgba(0,88,190,0.18)] text-[var(--primary)] hover:bg-[rgba(0,88,190,0.04)]'
                }`}
              >
                {pack.cta}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

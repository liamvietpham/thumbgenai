import Link from 'next/link';
import { CheckCircleIcon } from '@/components/pricing/PricingIcons';
import { type CreditPack, creditPacks } from '@/components/pricing/pricing-data';

export function PricingPlansSection() {
  return (
    <section className="px-6 pb-8 pt-16 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 mt-4 text-center">
          <p className="text-base text-[var(--on-surface-variant)]">
            1 image = 1 credit &nbsp;·&nbsp; No subscriptions &nbsp;·&nbsp; Credits never expire
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {creditPacks.map((pack) => (
            <CreditPackCard key={pack.name} pack={pack} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CreditPackCard({ pack }: { pack: CreditPack }) {
  return (
    <article
      className={`relative flex h-full flex-col rounded-[1.5rem] p-10 tonal-transition ${
        pack.highlighted
          ? 'border-2 border-[var(--primary)] bg-[var(--surface-container-lowest)] shadow-2xl shadow-[rgba(0,88,190,0.10)] md:-translate-y-4'
          : 'bg-[var(--surface-container-low)] hover:bg-[var(--surface-container)]'
      }`}
    >
      {pack.badge ? (
        <p className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#0058be] px-4 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white">
          {pack.badge}
        </p>
      ) : null}

      <header className="mb-8">
        <h2 className="font-headline text-2xl font-bold text-[var(--on-surface)]">
          {pack.name}
        </h2>
        <p className="mt-2 text-base text-[var(--on-surface-variant)]">{pack.tagline}</p>
      </header>

      {/* Price + credits */}
      <div className="mb-8">
        <p className="font-headline text-5xl font-bold text-[var(--on-surface)]">
          ${pack.price}
        </p>
        <p className="mt-2 text-[var(--on-surface-variant)]">
          <span className="text-2xl font-bold text-[var(--primary)]">{pack.credits}</span>
          {' '}credits
          <span className="ml-2 text-sm opacity-70">({pack.pricePerCredit}/credit)</span>
        </p>
      </div>

      <ul className="mb-10 flex-grow space-y-4">
        {pack.features.map((feature) => (
          <li key={feature} className="flex items-center gap-3 text-base text-[var(--on-surface)]">
            <CheckCircleIcon className="size-5 shrink-0 text-[var(--primary)]" />
            {feature}
          </li>
        ))}
      </ul>

      <Link
        href={pack.href}
        className={`inline-flex cursor-pointer items-center justify-center rounded-xl py-4 text-sm font-bold tonal-transition ${
          pack.highlighted
            ? 'bg-gradient-to-br from-[#0058be] to-[#2170e4] text-white shadow-lg shadow-[rgba(0,88,190,0.18)] hover:scale-[1.02]'
            : 'bg-[var(--surface-container-highest)] text-[var(--primary)] hover:bg-[var(--surface-container-high)]'
        }`}
      >
        {pack.cta}
      </Link>
    </article>
  );
}

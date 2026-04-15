import { pricingLogos } from '@/components/pricing/pricing-data';

export function PricingLogoCloud() {
  return (
    <section className="px-6 py-24 text-center md:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="mb-10 text-xs font-bold uppercase tracking-[0.2em] text-[rgba(66,71,84,0.6)]">
          Trusted by the next generation of content giants
        </p>
        <ul className="flex flex-wrap items-center justify-center gap-12 opacity-55 grayscale tonal-transition hover:grayscale-0">
          {pricingLogos.map((logo) => (
            <li
              key={logo}
              className="font-headline text-xl font-bold tracking-wide text-[var(--on-surface)]"
            >
              {logo}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

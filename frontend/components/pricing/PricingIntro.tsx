export function PricingIntro() {
  return (
    <section className="px-6 pb-6 pt-20 md:px-8 md:pt-32">
      <div className="mx-auto max-w-7xl text-center">
        <p className="inline-flex rounded-full bg-[var(--primary-fixed)] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[var(--primary)]">
          Pricing Plans
        </p>
        <h1 className="mt-6 font-headline text-5xl font-bold tracking-tight text-[var(--on-surface)] md:text-7xl">
          Simple, transparent pricing
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-[var(--on-surface-variant)]">
          Choose the plan that fits your publishing rhythm, from solo experiments to full-scale
          team workflows.
        </p>
      </div>
    </section>
  );
}

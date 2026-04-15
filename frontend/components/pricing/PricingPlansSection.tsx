'use client';

import Link from 'next/link';
import { useState } from 'react';
import { CheckCircleIcon } from '@/components/pricing/PricingIcons';
import { type CreditPack, creditPacks } from '@/components/pricing/pricing-data';

/* ── Preset cards (unchanged) ─────────────────────────────────── */
function CreditPackCard({ pack }: { pack: CreditPack }) {
  return (
    <article
      className={`relative flex h-full flex-col rounded-[1.5rem] p-10 tonal-transition ${
        pack.highlighted
          ? 'border-2 border-[var(--primary)] bg-[var(--surface-container-lowest)] shadow-2xl shadow-[rgba(0,88,190,0.10)] md:-translate-y-4'
          : 'bg-[var(--surface-container-low)] hover:bg-[var(--surface-container)]'
      }`}
    >
      {pack.badge && (
        <p className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#0058be] px-4 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white">
          {pack.badge}
        </p>
      )}
      <header className="mb-8">
        <h2 className="font-headline text-2xl font-bold text-[var(--on-surface)]">{pack.name}</h2>
        <p className="mt-2 text-base text-[var(--on-surface-variant)]">{pack.tagline}</p>
      </header>
      <div className="mb-8">
        <p className="font-headline text-5xl font-bold text-[var(--on-surface)]">${pack.price}</p>
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

/* ── Credit calculator ────────────────────────────────────────── */
function calculateCredits(amount: number): number {
  if (amount < 1)    return 0;
  if (amount >= 500) return Math.round(amount / 0.04);
  if (amount >= 50)  return Math.round(amount / 0.045);
  if (amount >= 20)  return Math.round(amount / 0.053);
  if (amount >= 10)  return Math.round(amount / 0.067);
  return Math.round(amount / 0.08);
}

function pricePerCredit(amount: number): string {
  if (amount >= 500) return '$0.04';
  if (amount >= 50)  return '$0.045';
  if (amount >= 20)  return '$0.053';
  if (amount >= 10)  return '$0.067';
  return '$0.08';
}

function CustomCreditCard() {
  const [raw, setRaw] = useState('2');
  const amount  = Math.max(0, parseInt(raw || '0', 10));
  const valid   = amount >= 2;
  const credits = valid ? calculateCredits(amount) : 0;

  const nudge = (delta: number) => {
    setRaw(String(Math.max(2, (parseInt(raw || '0', 10) || 2) + delta)));
  };

  return (
    <div className="rounded-[1.5rem] border border-[rgba(194,198,214,0.4)] bg-[var(--surface-container-lowest)] p-8 md:p-10">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_auto_1fr] md:items-center">

        {/* Left: input */}
        <div>
          <p className="mb-1 text-lg font-bold text-[var(--on-surface)]">Custom Amount</p>
          <p className="mb-6 text-sm text-[var(--on-surface-variant)]">Top up exactly what you need.</p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => nudge(-1)}
              disabled={amount <= 2}
              className="grid size-10 shrink-0 cursor-pointer place-items-center rounded-xl bg-[var(--surface-container-low)] text-lg font-bold text-[var(--on-surface-variant)] tonal-transition hover:bg-[var(--surface-container-high)] disabled:cursor-not-allowed disabled:opacity-30"
            >−</button>

            <div className="relative flex-1">
              <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-lg font-bold text-[var(--outline)]">$</span>
              <input
                type="text"
                inputMode="numeric"
                value={raw}
                onChange={(e) => { if (/^\d*$/.test(e.target.value)) setRaw(e.target.value); }}
                className="w-full rounded-xl border border-[rgba(194,198,214,0.55)] bg-[var(--surface-container)] py-3 pl-8 pr-3 text-center text-xl font-bold text-[var(--on-surface)] transition-all focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[rgba(0,88,190,0.15)]"
              />
            </div>

            <button
              type="button"
              onClick={() => nudge(1)}
              className="grid size-10 shrink-0 cursor-pointer place-items-center rounded-xl bg-[var(--surface-container-low)] text-lg font-bold text-[var(--on-surface-variant)] tonal-transition hover:bg-[var(--surface-container-high)]"
            >+</button>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden h-24 w-px bg-[var(--surface-container-high)] md:block" />

        {/* Right: credits + CTA */}
        <div>
          <div className="mb-4 rounded-2xl bg-[var(--surface-container-low)] p-4 text-center">
            <p className="font-headline text-4xl font-bold text-[var(--primary)]">
              {valid ? credits.toLocaleString() : '—'}
            </p>
            <p className="mt-1 text-sm font-medium text-[var(--on-surface-variant)]">
              credits
              {valid && <span className="ml-2 opacity-60">{pricePerCredit(amount)}/credit</span>}
            </p>
          </div>

          <button
            type="button"
            disabled={!valid}
            className="w-full cursor-pointer rounded-xl bg-gradient-to-br from-[#0058be] to-[#2170e4] py-3.5 text-sm font-bold text-white shadow-lg shadow-[rgba(0,88,190,0.18)] tonal-transition hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {valid ? `Get ${credits.toLocaleString()} credits for $${amount}` : 'Enter an amount'}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Section ──────────────────────────────────────────────────── */
export function PricingPlansSection() {
  return (
    <section className="px-6 pb-8 pt-16 md:px-8">
      <div className="mx-auto max-w-7xl">


        {/* Preset packs */}
        <div className="mb-8 grid gap-8 md:grid-cols-3">
          {creditPacks.map((pack) => (
            <CreditPackCard key={pack.name} pack={pack} />
          ))}
        </div>

        {/* Custom card */}
        <div id="custom" className="scroll-mt-24">
          <CustomCreditCard />
        </div>
      </div>
    </section>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { BILLING, BILLING_PREVIEW_COUNT } from './profile-data';


function XIcon({ className = '' }) {
  return (
    <svg aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

function BillingRow({ b }: { b: typeof BILLING[number] }) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-(--surface-container-lowest) px-4 py-3">
      <p className="text-[11px] font-medium uppercase tracking-tight text-(--outline)">{b.date}</p>
      <div className="text-right">
        <p className="text-sm font-bold text-(--tertiary)">{b.credits}</p>
        <p className="text-xs font-medium text-(--on-surface-variant)">{b.amount}</p>
      </div>
    </div>
  );
}

export function BillingHistory() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const preview = BILLING.slice(0, BILLING_PREVIEW_COUNT);

  return (
    <>
      <div className="rounded-xl bg-(--surface-container-low) p-5 md:p-8">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="font-headline text-2xl font-bold tracking-tight text-(--on-surface)">
            Billing History
          </h2>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="cursor-pointer text-sm font-bold text-(--primary) hover:underline"
          >
            View All
          </button>
        </div>
        <div className="space-y-4">
          {preview.map((b) => <BillingRow key={b.id} b={b} />)}
        </div>
      </div>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Billing History"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Panel */}
          <div className="relative z-10 w-full max-w-lg rounded-2xl bg-(--surface-container-lowest) shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-(--surface-container-high) px-6 py-5">
              <h3 className="font-headline text-lg font-bold text-(--on-surface)">Billing History</h3>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="grid size-8 cursor-pointer place-items-center rounded-lg text-(--outline) tonal-transition hover:bg-(--surface-container-high) hover:text-(--on-surface)"
                aria-label="Close"
              >
                <XIcon className="size-4" />
              </button>
            </div>

            {/* List */}
            <div className="max-h-[60vh] space-y-3 overflow-y-auto p-6">
              {BILLING.map((b) => <BillingRow key={b.id} b={b} />)}
            </div>

            {/* Footer */}
            <div className="border-t border-(--surface-container-high) px-6 py-4 text-right">
              <p className="text-xs text-(--outline)">{BILLING.length} transactions</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

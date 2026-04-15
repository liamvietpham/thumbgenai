'use client';

import { useState } from 'react';
import { PlusIcon } from '@/components/pricing/PricingIcons';
import { pricingFaqs } from '@/components/pricing/pricing-data';

export function PricingFaqSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section className="px-6 py-8 md:px-8">
      <div className="mx-auto max-w-4xl">
        <header className="mb-16 text-center">
          <h2 className="font-headline text-3xl font-bold text-[var(--on-surface)] md:text-4xl">
            Frequently asked questions
          </h2>
        </header>

        <div className="space-y-6">
          {pricingFaqs.map((faq, index) => {
            const isOpen = openFaq === index;

            return (
              <article
                key={faq.question}
                className="rounded-[1.25rem] bg-[var(--surface-container-low)] p-8"
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="flex w-full cursor-pointer items-center justify-between gap-4 text-left"
                >
                  <h3 className="font-headline text-lg font-semibold text-[var(--on-surface)]">
                    {faq.question}
                  </h3>
                  <PlusIcon
                    className={`size-5 shrink-0 text-[var(--primary)] tonal-transition ${
                      isOpen ? 'rotate-45' : ''
                    }`}
                  />
                </button>
                {isOpen ? (
                  <p className="mt-4 text-base leading-relaxed text-[var(--on-surface-variant)]">
                    {faq.answer}
                  </p>
                ) : null}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

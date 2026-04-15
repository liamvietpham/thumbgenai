import Link from 'next/link';
import SparkIcon from '@/components/icons/generated/SparkIcon';
import VerifyBadgeIcon from '@/components/icons/generated/VerifyBadgeIcon';

export function RefundPolicyArticle() {
  return (
    <article className="mt-16 space-y-16">
      {/* 1. Overview */}
      <section className="space-y-4">
        <SectionHeading number="1" title="Overview" />
        <div className="rounded-2xl bg-[var(--surface-container-low)] p-6 text-lg leading-relaxed text-[var(--on-surface-variant)]">
          <p>
            Thank you for using{' '}
            <strong className="font-semibold text-[var(--on-surface)]">ThumbnailAI</strong>.
            Because our service provides digital credits that are delivered instantly and can be
            used immediately, all purchases are final and non-refundable except in the limited
            cases outlined below.
          </p>
        </div>
      </section>

      {/* 2. Non-Refundable Purchases */}
      <section className="space-y-4">
        <SectionHeading number="2" title="Non-Refundable Purchases" />
        <div className="space-y-4 text-lg leading-relaxed text-[var(--on-surface-variant)]">
          <p>We do not issue refunds for:</p>
          <BulletList
            items={[
              'Change of mind after purchase',
              'Unused or partially used credits',
              'Dissatisfaction with generated thumbnails or designs',
              'Purchasing the wrong plan or credit package',
              'Account inactivity or failure to use credits',
            ]}
          />
          <p>
            Once credits are added to your account, they cannot be exchanged for cash or
            transferred.
          </p>
        </div>
      </section>

      {/* 3. Refunds Due to Technical Issues */}
      <section className="space-y-4">
        <SectionHeading number="3" title="Refunds Due to Technical Issues" />
        <div className="space-y-4 text-lg leading-relaxed text-[var(--on-surface-variant)]">
          <p>
            A refund or credit re-issue may be considered only if all of the following conditions
            are met:
          </p>
          <BulletList
            items={[
              'Payment was successfully processed and deducted',
              'Credits were not added due to a verified system error',
              'Our internal systems confirm the failure',
            ]}
          />
          <p>
            If approved, we may restore the missing credits or issue a refund to the original
            payment method at our discretion.
          </p>
        </div>
      </section>

      {/* 4. How to Request */}
      <section className="space-y-4">
        <SectionHeading number="4" title="How to Request Support or a Refund Review" />
        <div className="space-y-4 text-lg leading-relaxed text-[var(--on-surface-variant)]">
          <p>
            If you believe a technical error has occurred, please contact us at{' '}
            <a
              href="mailto:support@thumbnailai.com"
              className="font-semibold text-[var(--primary)] hover:underline"
            >
              support@thumbnailai.com
            </a>{' '}
            and include:
          </p>
          <BulletList
            items={[
              'Your registered account email',
              'Transaction ID or receipt',
              'Date of payment',
              'Description of the issue',
              'Screenshots or supporting evidence (if available)',
            ]}
          />
        </div>
      </section>

      {/* 5. Fraudulent Payments */}
      <section className="space-y-4">
        <SectionHeading number="5" title="Fraudulent or Unauthorized Payments" />
        <div className="rounded-2xl border-l-4 border-[var(--primary)] bg-[var(--surface-container-low)] p-8 text-lg leading-relaxed text-[var(--on-surface-variant)]">
          If we detect fraud, abuse, chargebacks, or suspicious activity, we reserve the right to
          suspend or restrict the associated account, deny refund requests, and report the activity
          to the payment provider or relevant authorities.
        </div>
      </section>

      {/* 6. Changes */}
      <section className="space-y-4">
        <SectionHeading number="6" title="Changes to This Policy" />
        <div className="rounded-2xl bg-[var(--surface-container-low)] p-6 text-lg leading-relaxed text-[var(--on-surface-variant)]">
          We may update this Refund Policy from time to time. Continued use of ThumbnailAI after
          changes take effect constitutes acceptance of the updated policy.
        </div>
      </section>

      {/* Warning box */}
      <div className="flex items-start gap-4 rounded-xl border border-[rgba(186,26,26,0.20)] bg-[rgba(186,26,26,0.06)] p-5">
        <VerifyBadgeIcon className="mt-1 size-5 shrink-0 text-[#ba1a1a]" />
        <div>
          <p className="mb-1 text-sm font-semibold text-[#ba1a1a]">All Sales Final</p>
          <p className="text-sm leading-relaxed text-[var(--on-surface-variant)]">
            Credits are non-refundable except in the event of a verified technical failure. By
            completing a purchase, you acknowledge and agree to this policy.
          </p>
        </div>
      </div>

      {/* Footer CTA */}
      <footer className="rounded-2xl bg-gradient-to-br from-[var(--surface-container-low)] to-[var(--surface-container-high,var(--surface-container))] p-10 text-center">
        <p className="font-headline text-xl font-bold text-[var(--on-surface)]">
          Have a question about billing?
        </p>
        <p className="mt-2 text-sm text-[var(--on-surface-variant)]">
          Our support team is happy to help.
        </p>
        <Link
          href="/contact"
          className="mt-6 inline-flex cursor-pointer items-center gap-2 rounded-full bg-gradient-to-br from-[#0058be] to-[#2170e4] px-10 py-3 font-bold text-white shadow-xl shadow-[rgba(0,88,190,0.20)] tonal-transition hover:scale-[1.03]"
        >
          <SparkIcon className="size-4" />
          Contact Support
        </Link>
      </footer>
    </article>
  );
}

function SectionHeading({ number, title }: { number: string; title: string }) {
  return (
    <h2 className="flex items-center gap-3 font-headline text-3xl font-bold tracking-tight text-[var(--on-surface)]">
      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[var(--secondary-container)] text-sm font-bold text-[var(--on-secondary-container)]">
        {number}
      </span>
      {title}
    </h2>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-4 rounded-xl p-4 tonal-transition hover:bg-[var(--surface-container-lowest)]"
        >
          <div className="mt-2 size-2 shrink-0 rounded-full bg-[var(--primary)]" />
          <p className="text-base leading-relaxed text-[var(--on-surface-variant)]">{item}</p>
        </li>
      ))}
    </ul>
  );
}

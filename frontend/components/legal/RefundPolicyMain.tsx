import DownloadIcon from '@/components/icons/generated/DownloadIcon';
import SparkIcon from '@/components/icons/generated/SparkIcon';
import VerifyBadgeIcon from '@/components/icons/generated/VerifyBadgeIcon';
import { RefundPolicyArticle } from '@/components/legal/RefundPolicyArticle';

export function RefundPolicyMain() {
  return (
    <main className="mx-auto max-w-4xl px-6 pb-24 pt-16 md:px-8 md:pt-24">
      <section className="mb-16 space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-[rgba(63,103,0,0.10)] px-3 py-1 text-xs font-bold uppercase tracking-wider text-(--tertiary)">
          <SparkIcon className="size-3.5" />
          Legal Framework
        </div>

        <h1 className="font-headline text-5xl font-bold tracking-tight text-(--on-surface) md:text-6xl">
          Refund <span className="text-(--primary)">Policy</span>
        </h1>

        <p className="max-w-2xl text-xl leading-relaxed text-(--on-surface-variant)">
          We want you to have a clear understanding of how purchases and refunds work on
          ThumbnailAI.
        </p>

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <div className="flex items-center gap-2 rounded-full bg-(--surface-container-low) px-3 py-1.5 shadow-sm">
            <VerifyBadgeIcon className="size-4 text-(--primary)" />
            <span className="text-sm font-medium text-(--on-surface-variant)">
              Last updated: 06-01-2026
            </span>
          </div>
          <a
            href="/refund-policy/refund-policy.pdf"
            className="inline-flex items-center gap-2 rounded-xl bg-(--surface-container-lowest) px-5 py-2 text-sm font-medium text-(--primary) shadow-sm tonal-transition hover:shadow-md"
          >
            <DownloadIcon className="size-4" />
            Download as PDF
          </a>
        </div>
      </section>

      <div className="h-px bg-linear-to-r from-[rgba(194,198,214,0.6)] via-[rgba(194,198,214,0.3)] to-transparent" />

      <RefundPolicyArticle />
    </main>
  );
}

import DownloadIcon from '@/components/icons/generated/DownloadIcon';
import LockIcon from '@/components/icons/generated/LockIcon';
import VerifyBadgeIcon from '@/components/icons/generated/VerifyBadgeIcon';
import { TermsArticle } from '@/components/legal/TermsArticle';

export function TermsMain() {
  return (
    <main className="mx-auto max-w-4xl px-6 pb-24 pt-16 md:px-8 md:pt-24">
      <section className="mb-16 space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-[rgba(63,103,0,0.10)] px-3 py-1 text-xs font-bold uppercase tracking-wider text-(--tertiary)">
          <LockIcon className="size-3.5" />
          Legal Framework
        </div>

        <h1 className="font-headline text-5xl font-bold tracking-tight text-(--on-surface) md:text-6xl">
          Terms of <span className="text-(--primary)">Service</span>
        </h1>

        <p className="max-w-2xl text-xl leading-relaxed text-(--on-surface-variant)">
          These terms govern your access to and use of ThumbnailAI. By using our platform, you
          agree to these conditions in their entirety.
        </p>

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <div className="flex items-center gap-2 rounded-full bg-(--surface-container-low) px-3 py-1.5 shadow-sm">
            <VerifyBadgeIcon className="size-4 text-(--primary)" />
            <span className="text-sm font-medium text-(--on-surface-variant)">
              Last updated: 06-01-2026
            </span>
          </div>
          <a
            href="/terms/terms.pdf"
            className="inline-flex items-center gap-2 rounded-xl bg-(--surface-container-lowest) px-5 py-2 text-sm font-medium text-(--primary) shadow-sm tonal-transition hover:shadow-md"
          >
            <DownloadIcon className="size-4" />
            Download as PDF
          </a>
        </div>
      </section>

      <div className="h-px bg-linear-to-r from-[rgba(194,198,214,0.6)] via-[rgba(194,198,214,0.3)] to-transparent" />

      <TermsArticle />
    </main>
  );
}

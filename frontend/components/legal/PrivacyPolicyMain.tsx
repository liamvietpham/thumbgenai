import LockIcon from '@/components/icons/generated/LockIcon';
import VerifyBadgeIcon from '@/components/icons/generated/VerifyBadgeIcon';
import { PrivacyPolicyArticle } from '@/components/legal/PrivacyPolicyArticle';

export function PrivacyPolicyMain() {
  return (
    <main className="mx-auto max-w-4xl px-6 pb-24 pt-16 md:px-8 md:pt-24">
      <section className="mb-16 space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-[rgba(63,103,0,0.10)] px-3 py-1 text-xs font-bold uppercase tracking-wider text-(--tertiary)">
          <LockIcon className="size-3.5" />
          Legal Framework
        </div>

        <h1 className="font-headline text-5xl font-bold tracking-tight text-(--on-surface) md:text-6xl">
          Privacy <span className="text-(--primary)">Policy</span>
        </h1>

        <p className="max-w-2xl text-xl leading-relaxed text-(--on-surface-variant)">
          Understand how Thumbnail AI collects, uses, protects, and retains account data, uploaded
          assets, and product usage information.
        </p>

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <div className="flex items-center gap-2 rounded-full bg-(--surface-container-low) px-3 py-1.5 shadow-sm">
            <VerifyBadgeIcon className="size-4 text-(--primary)" />
            <span className="text-sm font-medium text-(--on-surface-variant)">
              Last updated: April 13, 2026
            </span>
          </div>
        </div>
      </section>

      <div className="h-px bg-linear-to-r from-[rgba(194,198,214,0.6)] via-[rgba(194,198,214,0.3)] to-transparent" />

      <PrivacyPolicyArticle />
    </main>
  );
}

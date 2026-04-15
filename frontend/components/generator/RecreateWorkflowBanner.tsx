import Link from 'next/link';
import ArrowRightIcon from '@/components/icons/generated/ArrowRightIcon';

export function RecreateWorkflowBanner() {
  return (
    <section className="relative overflow-hidden rounded-[1.75rem] border border-[rgba(194,198,214,0.5)] bg-[var(--surface-container-lowest)] p-6 shadow-[0_12px_36px_rgba(0,88,190,0.08)] sm:p-8">
      <div className="pointer-events-none absolute inset-y-0 right-[-12%] w-1/2 rounded-full bg-[radial-gradient(circle,_rgba(87,223,254,0.18),_rgba(87,223,254,0)_70%)]" />
      <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--primary)]">
            Alternate Workflow
          </p>
          <h2 className="mt-3 font-headline text-2xl font-bold tracking-tight text-[var(--on-surface)] md:text-3xl">
            Need to regenerate an existing thumbnail instead?
          </h2>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-[var(--on-surface-variant)]">
            Upload a reference thumbnail or paste a video link, then ask AI to restyle or refine
            it without rebuilding everything from scratch.
          </p>
        </div>
        <Link
          href="/regenerate"
          className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-[#0058be] to-[#2170e4] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[rgba(0,88,190,0.18)] tonal-transition hover:scale-[1.01]"
        >
          Open Regenerate
          <ArrowRightIcon className="size-4.5" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}

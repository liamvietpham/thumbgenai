import Link from 'next/link';

export function Footer() {
  return (
    <footer className="site-footer border-t border-[rgba(114,119,133,0.14)] bg-slate-50">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-12 md:flex-row md:items-start md:justify-between lg:px-8">
        <div className="max-w-sm space-y-3">
          <Link href="/" className="cursor-pointer font-headline text-xl font-bold text-[var(--on-surface)]">
            Thumbnail AI
          </Link>
          <p className="text-sm leading-relaxed text-[var(--on-surface-variant)]">
            AI-powered thumbnail creation for creators who want sharper concepts, faster output,
            and cleaner publishing workflows.
          </p>
        </div>

        <nav aria-label="Footer product" className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--outline)]">
            Product
          </h2>
          <ul className="space-y-2 text-sm text-[var(--on-surface-variant)]">
            <li>
              <Link href="/generate" className="cursor-pointer tonal-transition hover:text-[var(--primary)]">
                Generate
              </Link>
            </li>
            <li>
              <Link href="/thumbnails" className="cursor-pointer tonal-transition hover:text-[var(--primary)]">
                Thumbnails
              </Link>
            </li>
            <li>
              <Link href="/pricing" className="cursor-pointer tonal-transition hover:text-[var(--primary)]">
                Pricing
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Footer company" className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--outline)]">
            Company
          </h2>
          <ul className="space-y-2 text-sm text-[var(--on-surface-variant)]">
            <li>
              <Link href="/about" className="cursor-pointer tonal-transition hover:text-[var(--primary)]">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="cursor-pointer tonal-transition hover:text-[var(--primary)]">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/" className="cursor-pointer tonal-transition hover:text-[var(--primary)]">
                Home
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Footer legal" className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--outline)]">
            Legal
          </h2>
          <ul className="space-y-2 text-sm text-[var(--on-surface-variant)]">
            <li>
              <Link
                href="/terms"
                className="cursor-pointer tonal-transition hover:text-[var(--primary)]"
              >
                Terms
              </Link>
            </li>
            <li>
              <Link
                href="/privacy-policy"
                className="cursor-pointer tonal-transition hover:text-[var(--primary)]"
              >
                Privacy
              </Link>
            </li>
            <li>
              <Link
                href="/refund-policy"
                className="cursor-pointer tonal-transition hover:text-[var(--primary)]"
              >
                Refunds
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="border-t border-[rgba(114,119,133,0.14)]">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-6 py-5 text-sm text-[var(--on-surface-variant)] md:flex-row md:items-center md:justify-between lg:px-8">
          <small>© {new Date().getFullYear()} Thumbnail AI. All rights reserved.</small>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/terms" className="cursor-pointer tonal-transition hover:text-[var(--primary)]">
              Terms
            </Link>
            <Link
              href="/privacy-policy"
              className="cursor-pointer tonal-transition hover:text-[var(--primary)]"
            >
              Privacy
            </Link>
            <Link href="/thumbnails" className="cursor-pointer tonal-transition hover:text-[var(--primary)]">
              Thumbnails
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

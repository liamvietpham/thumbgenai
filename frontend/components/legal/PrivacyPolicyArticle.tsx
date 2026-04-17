import Link from 'next/link';
import {
  ApiIcon,
  CookieIcon,
  CopyrightIcon,
  DatabaseIcon,
} from '@/components/legal/LegalIcons';
import { privacySections } from '@/components/legal/legal-data';

const sectionIcons = {
  'data-collection': DatabaseIcon,
  'usage-rights': CopyrightIcon,
  'api-policy': ApiIcon,
  cookies: CookieIcon,
} as const;

export function PrivacyPolicyArticle() {
  return (
    <article className="mt-16 space-y-16">
      <section>
        <p className="mb-8 text-lg leading-relaxed text-(--on-surface-variant)">
          Transparency matters in creator software. This policy explains what information Thumbnail
          AI collects, how it is used, how long it may be kept, and what controls you have over
          your data.
        </p>
        <div className="h-px bg-linear-to-r from-transparent via-[rgba(194,198,214,0.45)] to-transparent opacity-70" />
      </section>

      {privacySections.map((section) => {
        const Icon = sectionIcons[section.id];

        return (
          <section key={section.id} id={section.id} className="space-y-4 scroll-mt-24">
            <h2 className="flex items-center gap-3 font-headline text-3xl font-bold tracking-tight text-(--on-surface)">
              <span className="grid size-10 place-items-center rounded-xl bg-[rgba(0,88,190,0.06)] text-(--primary)">
                <Icon className="size-5" />
              </span>
              {section.title}
            </h2>

            <p className="text-lg leading-relaxed text-(--on-surface-variant)">
              {section.summary}
            </p>

            <div className="mt-5 space-y-5">
              {section.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-lg leading-relaxed text-(--on-surface-variant)"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {section.bullets ? (
              <ul className="mt-6 space-y-3">
                {section.bullets.map((bullet) => (
                  <li key={bullet.label} className="flex items-start gap-3">
                    <span className="mt-1 text-(--primary)">→</span>
                    <p className="text-lg leading-relaxed text-(--on-surface-variant)">
                      <strong className="text-(--on-surface)">{bullet.label}:</strong>{' '}
                      {bullet.text}
                    </p>
                  </li>
                ))}
              </ul>
            ) : null}

            {section.callout ? (
              <div className="mt-8 rounded-[1.5rem] border-l-4 border-(--primary) bg-(--surface-container-low) p-6">
                <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-(--primary)">
                  {section.callout.title}
                </p>
                <p className="text-[15px] leading-[1.8] text-(--on-surface)">
                  {section.callout.body}
                </p>
              </div>
            ) : null}
          </section>
        );
      })}

      <footer className="mt-20 border-t border-[rgba(194,198,214,0.20)] pt-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm text-(--outline)">Still have questions about privacy?</p>
            <a
              href="mailto:privacy@thumbnailai.app"
              className="mt-1 inline-block font-bold text-(--primary) hover:underline"
            >
              privacy@thumbnailai.app
            </a>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex cursor-pointer items-center justify-center rounded-full border border-(--outline-variant) px-6 py-2 text-sm font-semibold tonal-transition hover:bg-(--surface-container-low)"
            >
              Contact Support
            </Link>
            <Link
              href="/terms"
              className="inline-flex cursor-pointer items-center justify-center rounded-full bg-linear-to-br from-[#0058be] to-[#2170e4] px-6 py-2 text-sm font-semibold text-white shadow-md tonal-transition hover:opacity-90"
            >
              View Terms
            </Link>
          </div>
        </div>
      </footer>
    </article>
  );
}

import Link from 'next/link';
import LockIcon from '@/components/icons/generated/LockIcon';
import SparkIcon from '@/components/icons/generated/SparkIcon';
import VerifyBadgeIcon from '@/components/icons/generated/VerifyBadgeIcon';

export function TermsArticle() {
  return (
    <article className="mt-16 space-y-16">
      {/* 1. Introduction */}
      <section className="space-y-4">
        <SectionHeading number="1" title="Introduction" />
        <div className="rounded-2xl bg-[var(--surface-container-low)] p-6 text-lg leading-relaxed text-[var(--on-surface-variant)]">
          <p>
            Welcome to <strong className="font-semibold text-[var(--on-surface)]">ThumbnailAI</strong>{' '}
            (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;). These Terms of Service
            (&ldquo;Terms&rdquo;) govern your access to and use of our website, tools, and services
            (the &ldquo;Service&rdquo;). By creating an account or using the Service, you agree to
            these Terms. If you do not agree, please do not use the Service.
          </p>
        </div>
      </section>

      {/* 2. Eligibility */}
      <section className="space-y-4">
        <SectionHeading number="2" title="Eligibility" />
        <div className="space-y-4 text-lg leading-relaxed text-[var(--on-surface-variant)]">
          <p>To use the Service, you must:</p>
          <NumberedList
            items={[
              'Be at least 18 years old (or the legal age in your country)',
              'Have the authority to enter into this agreement',
              'Provide accurate and complete account information',
            ]}
          />
          <p>You are responsible for maintaining the security of your account and credentials.</p>
        </div>
      </section>

      {/* 3. Description of the Service */}
      <section className="space-y-4">
        <SectionHeading number="3" title="Description of the Service" />
        <p className="text-lg leading-relaxed text-[var(--on-surface-variant)]">
          ThumbnailAI allows users to enter prompts, select configuration options, and generate
          AI-powered thumbnails (&ldquo;Generated Content&rdquo;). Credits are required to generate
          thumbnails.
        </p>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            'Added after successful payment',
            'Only usable for thumbnail generation',
            'Have no cash value',
            'Non-transferable',
          ].map((item) => (
            <div
              key={item}
              className="rounded-xl bg-[var(--surface-container-low)] p-4 text-sm leading-relaxed text-[var(--on-surface-variant)]"
            >
              <SparkIcon className="mb-2 size-4 text-[var(--primary)]" />
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* 4. Use of the Service */}
      <section className="space-y-4">
        <SectionHeading number="4" title="Use of the Service" />
        <div className="space-y-4 text-lg leading-relaxed text-[var(--on-surface-variant)]">
          <p>You agree not to use the Service to:</p>
          <NumberedList
            items={[
              'Generate illegal, harmful, abusive, or misleading content',
              'Violate copyright or intellectual property rights',
              'Hack, disrupt, reverse-engineer, or overload the system',
              'Misuse the platform in a way that impacts other users or infrastructure',
            ]}
          />
          <p>We reserve the right to suspend or terminate accounts that violate these Terms.</p>
        </div>
      </section>

      {/* 5. Generated Content & IP */}
      <section className="space-y-4">
        <SectionHeading number="5" title="Generated Content & Intellectual Property" />
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl bg-[var(--surface-container-low)] p-6">
            <h4 className="mb-3 flex items-center gap-2 font-semibold text-[var(--on-surface)]">
              <SparkIcon className="size-4 text-[var(--primary)]" />
              Your Rights
            </h4>
            <p className="text-base leading-relaxed text-[var(--on-surface-variant)]">
              You own the rights to the thumbnails you generate, subject to applicable copyright
              laws, compliance with these Terms, and limitations imposed by AI training data or
              licensing rules.
            </p>
          </div>
          <div className="rounded-2xl bg-[var(--surface-container-low)] p-6">
            <h4 className="mb-3 flex items-center gap-2 font-semibold text-[var(--on-surface)]">
              <LockIcon className="size-4 text-[var(--primary)]" />
              Our Policy
            </h4>
            <p className="text-base leading-relaxed text-[var(--on-surface-variant)]">
              You are responsible for ensuring your Generated Content does not infringe any laws or
              third-party rights. We may temporarily store content to improve performance, but we do
              not sell your content.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Payments & Credits */}
      <section className="space-y-4">
        <SectionHeading number="6" title="Payments & Credits" />
        <div className="space-y-4 text-lg leading-relaxed text-[var(--on-surface-variant)]">
          <p>
            All payments are processed securely through third-party payment providers. Prices may
            change at any time.
          </p>
          <NumberedList
            items={[
              'Credits are delivered digitally after payment',
              'Credits are non-refundable except as outlined in our Refund Policy',
              'Failed or fraudulent transactions may result in account suspension',
            ]}
          />
        </div>
      </section>

      {/* 7. No Warranty */}
      <section className="space-y-4">
        <SectionHeading number="7" title="No Warranty" />
        <div className="rounded-2xl bg-[var(--surface-container)] p-8 text-lg leading-relaxed text-[var(--on-surface-variant)]">
          <p className="mb-4 font-medium italic text-[var(--on-surface)]">
            &ldquo;The Service is provided &lsquo;as is&rsquo; and &lsquo;as
            available&rsquo;&mdash;without any warranties of any kind.&rdquo;
          </p>
          <p>
            We do not guarantee uninterrupted access, error-free operation, or accuracy and
            suitability of generated content. You use the Service at your own risk.
          </p>
        </div>
      </section>

      {/* 8. Limitation of Liability */}
      <section className="space-y-4">
        <SectionHeading number="8" title="Limitation of Liability" />
        <div className="rounded-2xl border-l-4 border-[var(--primary)] bg-[var(--surface-container-low)] p-8 text-lg leading-relaxed text-[var(--on-surface-variant)]">
          To the fullest extent permitted by law, we are not liable for lost profits, loss of data,
          indirect or consequential damages, or issues caused by misuse or third-party services. Our
          total liability will not exceed the amount you paid to us in the last three (3) months.
        </div>
      </section>

      {/* 9. Account Termination */}
      <section className="space-y-4">
        <SectionHeading number="9" title="Account Termination" />
        <div className="space-y-4 text-lg leading-relaxed text-[var(--on-surface-variant)]">
          <p>
            We may suspend or terminate your account if you violate these Terms, misuse the Service,
            or engage in fraud or abuse. You may stop using the Service at any time by closing your
            account.
          </p>
          <div className="flex items-start gap-4 rounded-xl border border-[rgba(186,26,26,0.20)] bg-[rgba(186,26,26,0.06)] p-5">
            <VerifyBadgeIcon className="mt-1 size-5 shrink-0 text-[#ba1a1a]" />
            <div>
              <p className="mb-1 text-sm font-semibold text-[#ba1a1a]">Account Deletion Policy</p>
              <p className="text-sm leading-relaxed text-[var(--on-surface-variant)]">
                Upon termination, your right to use the Service will immediately cease. All data
                associated with your account will be archived for 30 days before permanent deletion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Changes */}
      <section className="space-y-4">
        <SectionHeading number="10" title="Changes to These Terms" />
        <div className="rounded-2xl bg-[var(--surface-container-low)] p-6 text-lg leading-relaxed text-[var(--on-surface-variant)]">
          We may update these Terms from time to time. Continued use of the Service after changes
          take effect constitutes acceptance of the updated Terms.
        </div>
      </section>

      {/* 11. Contact */}
      <section className="space-y-4">
        <SectionHeading number="11" title="Contact" />
        <div className="rounded-2xl bg-[var(--surface-container-low)] p-6 text-lg leading-relaxed text-[var(--on-surface-variant)]">
          If you have questions about these Terms, please contact us at{' '}
          <a
            href="mailto:support@thumbnailai.com"
            className="font-semibold text-[var(--primary)] hover:underline"
          >
            support@thumbnailai.com
          </a>
          .
        </div>
      </section>

      {/* Footer CTA */}
      <footer className="rounded-2xl bg-gradient-to-br from-[var(--surface-container-low)] to-[var(--surface-container-high,var(--surface-container))] p-10 text-center">
        <p className="font-headline text-xl font-bold text-[var(--on-surface)]">
          Ready to start creating?
        </p>
        <p className="mt-2 text-sm text-[var(--on-surface-variant)]">
          Join 50,000+ creators building the future of video content.
        </p>
        <Link
          href="/generate"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--primary)] px-10 py-3 font-bold text-white shadow-xl shadow-[rgba(0,88,190,0.20)] tonal-transition hover:scale-[1.03]"
        >
          <SparkIcon className="size-4" />
          Get Started Now
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

function NumberedList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li
          key={item}
          className="flex items-start gap-4 rounded-xl p-4 tonal-transition hover:bg-[var(--surface-container-lowest)]"
        >
          <div className="grid size-8 shrink-0 place-items-center rounded-full bg-[var(--secondary-container)] text-sm font-bold text-[var(--on-secondary-container)]">
            {String(i + 1).padStart(2, '0')}
          </div>
          <p className="mt-1 text-base leading-relaxed text-[var(--on-surface-variant)]">{item}</p>
        </li>
      ))}
    </ul>
  );
}

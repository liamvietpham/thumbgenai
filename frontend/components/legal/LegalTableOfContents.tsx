'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  ApiIcon,
  ArrowNarrowIcon,
  CookieIcon,
  CopyrightIcon,
  DatabaseIcon,
} from '@/components/legal/LegalIcons';
import { type PrivacySection, type PrivacySectionId } from '@/components/legal/legal-data';

type LegalTableOfContentsProps = {
  sections: PrivacySection[];
};

const iconClasses = 'size-5 text-[var(--primary)]';

export function LegalTableOfContents({ sections }: LegalTableOfContentsProps) {
  const [activeId, setActiveId] = useState<PrivacySectionId>(sections[0]?.id ?? 'data-collection');

  useEffect(() => {
    if (!sections.length) {
      return;
    }

    const activationOffset = 140;
    const validIds = new Set(sections.map((section) => section.id));
    const getSectionPositions = () =>
      sections
        .map((section) => {
          const element = document.getElementById(section.id);

          if (!element) {
            return null;
          }

          const anchorElement = element.querySelector('h2') ?? element;

          return {
            id: section.id,
            top: anchorElement.getBoundingClientRect().top + window.scrollY,
          };
        })
        .filter(
          (
            value
          ): value is {
            id: PrivacySectionId;
            top: number;
          } => value !== null
        );

    let sectionPositions = getSectionPositions();

    const updateActiveSection = () => {
      const currentScrollLine = window.scrollY + activationOffset;
      let nextActiveId = sectionPositions[0]?.id;

      for (const section of sectionPositions) {
        if (section.top <= currentScrollLine) {
          nextActiveId = section.id;
        } else {
          break;
        }
      }

      if (nextActiveId) {
        setActiveId((current) => (current === nextActiveId ? current : nextActiveId));
      }
    };

    const updateFromHash = () => {
      const hash = window.location.hash.replace('#', '') as PrivacySectionId;

      if (validIds.has(hash)) {
        setActiveId(hash);
      } else {
        updateActiveSection();
      }
    };

    const recomputeSectionPositions = () => {
      sectionPositions = getSectionPositions();
      updateActiveSection();
    };

    updateFromHash();
    let ticking = false;

    const scheduleUpdate = () => {
      if (ticking) {
        return;
      }

      ticking = true;
      window.requestAnimationFrame(() => {
        updateActiveSection();
        ticking = false;
      });
    };

    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', recomputeSectionPositions);
    window.addEventListener('load', recomputeSectionPositions);
    window.addEventListener('hashchange', updateFromHash);

    return () => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', recomputeSectionPositions);
      window.removeEventListener('load', recomputeSectionPositions);
      window.removeEventListener('hashchange', updateFromHash);
    };
  }, [sections]);

  return (
    <aside className="md:w-72 md:flex-shrink-0">
      <nav aria-label="Privacy policy table of contents" className="sticky top-32 space-y-2">
        <p className="mb-4 text-xs font-black uppercase tracking-[0.22em] text-[var(--outline)]">
          Table of Contents
        </p>

        {sections.map((section) => {
          const active = section.id === activeId;

          return (
            <Link
              key={section.id}
              href={`#${section.id}`}
              aria-current={active ? 'location' : undefined}
              onClick={() => setActiveId(section.id)}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 tonal-transition ${
                active
                  ? 'bg-[var(--surface-container-lowest)] font-semibold text-[var(--primary)] shadow-sm'
                  : 'font-medium text-[var(--on-surface-variant)] hover:bg-[var(--surface-container-low)]'
              }`}
            >
              <SectionIcon id={section.id} className={iconClasses} />
              <span>{section.title}</span>
            </Link>
          );
        })}

        <div className="mt-12 rounded-[1.5rem] border border-[rgba(87,223,254,0.35)] bg-[rgba(87,223,254,0.20)] p-6">
          <h2 className="font-bold text-[var(--on-secondary-container)]">Need clarity?</h2>
          <p className="mt-2 text-sm leading-relaxed text-[rgba(0,97,114,0.84)]">
            If you have questions about data handling, retention, or account requests, our support
            flow can point you to the right team.
          </p>
          <Link
            href="/contact"
            className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-[var(--secondary)] tonal-transition hover:gap-2"
          >
            Contact support
            <ArrowNarrowIcon className="size-4" />
          </Link>
        </div>
      </nav>
    </aside>
  );
}

function SectionIcon({
  id,
  className,
}: {
  id: PrivacySectionId;
  className?: string;
}) {
  switch (id) {
    case 'data-collection':
      return <DatabaseIcon className={className} />;
    case 'usage-rights':
      return <CopyrightIcon className={className} />;
    case 'api-policy':
      return <ApiIcon className={className} />;
    case 'cookies':
      return <CookieIcon className={className} />;
    default:
      return <DatabaseIcon className={className} />;
  }
}

import ImageIcon from '@/components/icons/generated/ImageIcon';
import SparkIcon from '@/components/icons/generated/SparkIcon';
import UserIcon from '@/components/icons/generated/UserIcon';
import { impactItems } from '@/components/about/about-data';

const toneClasses = {
  secondary: 'bg-[var(--secondary-container)] text-[var(--secondary)]',
  primary: 'bg-[var(--primary-fixed)] text-[var(--primary)]',
  tertiary: 'bg-[var(--tertiary-fixed)] text-[var(--tertiary)]',
};

const icons = [ImageIcon, SparkIcon, UserIcon];

export function AboutImpactSection() {
  return (
    <section className="px-6 py-12 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <header className="mb-10 flex flex-col gap-4 md:mb-16 md:flex-row md:items-end">
          <h2 className="font-headline text-4xl font-bold tracking-tight text-[var(--on-surface)]">
            Community impact
          </h2>
          <div className="hidden h-px flex-1 bg-[rgba(194,198,214,0.35)] md:block" />
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--on-surface-variant)]">
            Empowering the future
          </p>
        </header>

        <div className="grid gap-8 md:grid-cols-3">
          {impactItems.map((item, index) => {
            const Icon = icons[index];

            return (
              <article
                key={item.title}
                className={`rounded-[1.5rem] p-6 tonal-transition hover:-translate-y-1.5 md:p-10 ${
                  item.tone === 'primary'
                    ? 'border border-[rgba(194,198,214,0.25)] bg-[var(--surface-container-lowest)] shadow-[0_28px_56px_-24px_rgba(0,88,190,0.12)]'
                    : 'bg-[var(--surface-container-low)] shadow-[0_28px_56px_-24px_rgba(0,88,190,0.08)]'
                }`}
              >
                <div
                  className={`mb-5 grid size-12 place-items-center rounded-full md:mb-8 md:size-14 ${toneClasses[item.tone]}`}
                >
                  <Icon className="size-7" aria-hidden="true" />
                </div>
                <h3 className="font-headline text-2xl font-bold text-[var(--on-surface)]">
                  {item.title}
                </h3>
                <p className="mt-4 leading-relaxed text-[var(--on-surface-variant)]">
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import ChipIcon from '@/components/icons/generated/ChipIcon';
import FeatureEyeCatchingIcon from '@/components/icons/generated/FeatureEyeCatchingIcon';
import LightningIcon from '@/components/icons/generated/LightningIcon';

const features = [
  {
    title: 'Faster Generation',
    description:
      'Move from prompt to export in seconds with a streamlined workflow that keeps ideation, previewing, and publishing in one place.',
    icon: LightningIcon,
  },
  {
    title: 'Smarter Creative Direction',
    description:
      'Use AI assistance that understands visual hierarchy, contrast, and headline balance so your thumbnails feel intentional right away.',
    icon: ChipIcon,
  },
  {
    title: 'High CTR Design Language',
    description:
      'Every output is tuned for clarity on small screens, stronger focal points, and cleaner storytelling that helps creators win the click.',
    icon: FeatureEyeCatchingIcon,
  },
];

export function FeaturesSection() {
  return (
    <section
      aria-labelledby="home-value-title"
      className="bg-(--surface-container-low) px-6 py-24 md:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <header className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-(--primary)">
            Why Creators Choose Us
          </p>
          <h2
            id="home-value-title"
            className="mt-4 font-headline text-4xl font-bold tracking-tight text-(--on-surface) md:text-5xl"
          >
            Built for speed, clarity, and better clicks
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-(--on-surface-variant)">
            Thumbnail AI helps creators move from rough idea to polished visual without losing
            momentum. The interface is simple, but the output still feels studio-ready.
          </p>
        </header>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {features.map(({ title, description, icon: Icon }) => (
            <article
              key={title}
              className="group rounded-[2rem] bg-(--surface-container-lowest) p-8 shadow-sm ring-1 ring-[rgba(194,198,214,0.42)] tonal-transition hover:-translate-y-1 hover:shadow-[0_24px_48px_-28px_rgba(0,88,190,0.22)]"
            >
              <div className="grid size-16 place-items-center rounded-2xl bg-(--surface) text-(--primary) shadow-sm tonal-transition group-hover:scale-105 group-hover:shadow-md">
                <Icon className="size-8" aria-hidden="true" />
              </div>
              <h3 className="mt-6 font-headline text-2xl font-bold text-(--on-surface)">
                {title}
              </h3>
              <p className="mt-4 leading-relaxed text-(--on-surface-variant)">
                {description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

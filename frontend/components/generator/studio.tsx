import Image from 'next/image';
import { aspectOptions, type AspectValue } from '@/components/generator/shared';
import DownloadIcon from '@/components/icons/generated/DownloadIcon';
import PlaceholderImageIcon from '@/components/icons/generated/PlaceholderImageIcon';
import SpinnerIcon from '@/components/icons/generated/SpinnerIcon';

const sectionLabelClass =
  'block font-headline text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--outline)]';

export function StudioAspectRatioSelector({
  value,
  onChange,
  label = 'Aspect Ratio',
}: {
  value: AspectValue;
  onChange: (value: AspectValue) => void;
  label?: string;
}) {
  return (
    <div className="space-y-3">
      <label className={sectionLabelClass}>{label}</label>
      <div className="flex flex-wrap gap-2">
        {aspectOptions.map((item) => {
          const active = value === item.value;

          return (
            <button
              key={item.label}
              type="button"
              onClick={() => onChange(item.value)}
              className={`cursor-pointer rounded-full px-4 py-2 text-sm tracking-[0.18em] tonal-transition ${
                active
                  ? 'bg-[var(--primary)] text-white shadow-lg shadow-[rgba(0,88,190,0.18)]'
                  : 'bg-[var(--surface-container-low)] text-[var(--on-surface-variant)] hover:bg-[var(--surface-container)]'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function StudioPreviewPanel({
  aspect,
  isLoading = false,
  hasResult = false,
  imageUrl,
  onExport,
}: {
  aspect: AspectValue;
  isLoading?: boolean;
  hasResult?: boolean;
  imageUrl?: string;
  onExport: () => void;
}) {
  return (
    <section>
      <div className="rounded-[1.75rem] border border-[rgba(194,198,214,0.5)] bg-[var(--surface-container-lowest)] p-4 shadow-[0_18px_42px_rgba(0,88,190,0.08)]">
        <div
          className="group relative overflow-hidden rounded-[1.35rem] bg-[var(--surface-container-highest)]"
          style={{ aspectRatio: aspect }}
        >
          {hasResult && imageUrl ? (
            <Image
              src={imageUrl}
              alt="Generated thumbnail preview"
              fill
              unoptimized
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover"
            />
          ) : isLoading ? (
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAmAbwX2GmkDsr6pEq8ZWMPzyfNj1tDlwOosxdmVMLZI2ZdziS05VKEmSBjfYgKCTVp-Bgs_8B8_Grc04ZZFV83zQiVQi6SXxQZVhOJ4VzvZqJXGGr8PLa7lSj2QQr9neTKquXzPTs38mZzmNmLiwY4NwxUuHw0AD6hjwqnxESPMvGKcwLvwkzzBuUaMyZ7nZgE42LtI4bsxOqnnQr7cf9gRpAhZyQtrp5sq_MJ2TeImlcSXbBC6R9OBzkBNAh8qSaxOjCjdoVlmwRS"
              alt="Thumbnail generation canvas preview"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover opacity-80"
            />
          ) : null}

          {!hasResult && !isLoading ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center">
              <div className="grid size-14 shrink-0 place-items-center rounded-full bg-[var(--surface-container-highest)] text-[var(--outline)] shadow-sm">
                <PlaceholderImageIcon className="size-7" aria-hidden="true" />
              </div>
              <p className="font-headline text-lg font-semibold text-[var(--on-surface)]">
                Your canvas is ready
              </p>
              <p className="text-sm leading-relaxed text-[var(--outline)]">
                Fill out the form below, then hit Generate.
              </p>
            </div>
          ) : null}

          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center bg-[rgba(25,28,30,0.48)] backdrop-blur-[2px]">
              <div className="text-center text-white">
                <div className="mx-auto mb-5 grid size-16 place-items-center rounded-full border-4 border-white/18 border-t-[var(--secondary-container)] bg-white/8">
                  <SpinnerIcon className="size-7 animate-spin text-white" aria-hidden="true" />
                </div>
                <p className="font-headline text-xl font-semibold tracking-wide">
                  Analyzing video composition...
                </p>
                <p className="mt-2 text-sm text-white/70">
                  Building the first concept for your thumbnail.
                </p>
              </div>
            </div>
          ) : null}

          {/* Download button — visible on hover when result is ready */}
          {hasResult && imageUrl ? (
            <div className="absolute inset-0 flex items-end justify-end p-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              <button
                type="button"
                onClick={onExport}
                className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-white/90 px-4 py-2.5 text-sm font-semibold text-[var(--on-surface)] shadow-lg backdrop-blur-sm tonal-transition hover:bg-white"
              >
                <DownloadIcon className="size-4" aria-hidden="true" />
                Download
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export function PreviewTile({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[0.75rem] bg-[var(--surface-container)] shadow-sm">
      <Image src={src} alt={alt} fill unoptimized sizes="120px" className="object-cover grayscale tonal-transition hover:grayscale-0" />
    </div>
  );
}


export function PlusIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 5v14M5 12h14"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

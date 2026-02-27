import DownloadIcon from '@/assets/icons/download.svg';
import PlaceholderImageIcon from '@/assets/icons/placeholder-image.svg';
import SpinnerIcon from '@/assets/icons/spinner.svg';

type AspectOption = {
  label: string;
  value: string;
};

export const aspectOptions: AspectOption[] = [
  { label: '16:9', value: '16 / 9' },
  { label: '1:1', value: '1 / 1' },
  { label: '9:16', value: '9 / 16' },
];

export type AspectValue = (typeof aspectOptions)[number]['value'];

export function AspectRatioSelector({
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
      <label className="block text-sm font-medium text-[#2f4f82]">{label}</label>
      <div className="flex flex-wrap gap-2">
        {aspectOptions.map((item) => {
          const active = value === item.value;
          return (
            <button
              key={item.label}
              type="button"
              onClick={() => onChange(item.value)}
              className={`rounded-md border px-5 py-2.5 text-sm transition cursor-pointer ${
                active
                  ? 'border-[#5d83bf] bg-[#c7d8f3] text-[#1d447f]'
                  : 'border-[#8eaedf] text-[#2f4f82] hover:bg-[#d5e4fb]'
              }`}
            >
              <span className="tracking-widest">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function PreviewPanel({
  aspect,
  isLoading = false,
  hasResult = false,
  imageUrl,
}: {
  aspect: AspectValue;
  isLoading?: boolean;
  hasResult?: boolean;
  imageUrl?: string;
}) {
  return (
    <div className="rounded-2xl border border-[#8eaedf] bg-[#dbe8fb]/75 p-6 shadow-xl h-fit">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-[#1d447f]">Preview</h2>
        {hasResult ? (
          <button
            type="button"
            className="rounded-2xl bg-linear-to-b from-[#ff0f94] to-[#d5007b] px-6 py-2 text-sm font-medium text-white transition hover:brightness-110"
          >
            Publish
          </button>
        ) : null}
      </div>

      <div className="relative mx-auto w-full max-w-2xl">
        <div className="relative w-full overflow-hidden" style={{ aspectRatio: aspect }}>
          {hasResult && imageUrl ? (
            <div className="group absolute inset-0 m-2 overflow-hidden rounded-lg">
              <img src={imageUrl} alt="Generated thumbnail" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-black/25 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
              <button
                type="button"
                className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-xl border border-white/30 bg-[#6f83b9]/85 px-7 py-3 text-sm font-semibold text-white opacity-0 backdrop-blur-sm transition-all duration-200 group-hover:opacity-100"
              >
                <DownloadIcon className="h-5 w-5" aria-hidden="true" />
                <span>Download Thumbnail</span>
              </button>
            </div>
          ) : (
            <div className="absolute inset-0 m-2 flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-[#8eaedf] bg-[#bcd0ef]/35">
              <div className="hidden size-20 items-center justify-center rounded-full bg-[#dbe8fb]/70 max-sm:hidden sm:flex">
                <PlaceholderImageIcon className="h-10 w-10 text-[#6b88b5]" aria-hidden="true" />
              </div>
              <div className="px-4 text-center">
                <p className="text-[#1d447f]">Generate your first thumbnail</p>
                <p className="mt-1 text-xs text-[#6b88b5]">Fill out the form and click Generate</p>
              </div>
            </div>
          )}

          {isLoading ? (
            <div className="absolute inset-0 z-10 m-2 flex items-center justify-center rounded-lg bg-[radial-gradient(circle_at_top,_rgba(75,11,25,0.75),_rgba(5,7,16,0.95))]">
              <div className="flex flex-col items-center px-6 text-center">
                <SpinnerIcon className="mb-6 h-11 w-11 animate-spin text-white/80" aria-hidden="true" />
                <p className="text-xl font-semibold text-white">AI is creating your thumbnail...</p>
                <p className="mt-2 text-sm text-white/60">This may take 10-20 seconds</p>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

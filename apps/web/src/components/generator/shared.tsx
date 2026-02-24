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

export function PreviewPanel({ aspect }: { aspect: AspectValue }) {
  return (
    <div className="rounded-2xl border border-[#8eaedf] bg-[#dbe8fb]/75 p-6 shadow-xl h-fit">
      <h2 className="mb-4 text-lg font-semibold text-[#1d447f]">Preview</h2>

      <div className="relative mx-auto w-full max-w-2xl">
        <div className="relative w-full overflow-hidden" style={{ aspectRatio: aspect }}>
          <div className="absolute inset-0 m-2 flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-[#8eaedf] bg-[#bcd0ef]/35">
            <div className="hidden size-20 items-center justify-center rounded-full bg-[#dbe8fb]/70 max-sm:hidden sm:flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-10 text-[#6b88b5]"
                aria-hidden="true"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                <circle cx="9" cy="9" r="2"></circle>
                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
              </svg>
            </div>
            <div className="px-4 text-center">
              <p className="text-[#1d447f]">Generate your first thumbnail</p>
              <p className="mt-1 text-xs text-[#6b88b5]">Fill out the form and click Generate</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

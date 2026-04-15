'use client';

const colorOptions = [
  { label: 'vibrant', colors: ['#ff6b6b', '#4ecdc4', '#45b7d1'] },
  { label: 'sunset', colors: ['#ff8c42', '#ff3c38', '#a23b72'] },
  { label: 'ocean', colors: ['#0077b6', '#00b4d8', '#90e0ef'] },
  { label: 'forest', colors: ['#2d6a4f', '#40916c', '#95d5b2'] },
  { label: 'purple', colors: ['#7b2cbf', '#9d4edd', '#c77dff'] },
  { label: 'monochrome', colors: ['#212529', '#495057', '#adb5bd'] },
  { label: 'neon', colors: ['#ff00ff', '#00ffff', '#ffff00'] },
  { label: 'pastel', colors: ['#ffb5a7', '#fcd5ce', '#f8edeb'] },
] as const;

export type ColorSchemeLabel = (typeof colorOptions)[number]['label'];

const sectionLabelClass =
  'block font-headline text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--outline)]';

export function ColorSchemePicker({
  value,
  onChange,
}: {
  value: ColorSchemeLabel;
  onChange: (value: ColorSchemeLabel) => void;
}) {
  return (
    <div className="space-y-3">
      <label className={sectionLabelClass}>Color Scheme</label>
      <div className="grid grid-cols-4 gap-3">
        {colorOptions.map((option) => {
          const active = option.label === value;

          return (
            <button
              key={option.label}
              type="button"
              title={option.label}
              onClick={() => onChange(option.label)}
              className={`relative cursor-pointer overflow-hidden rounded-[1rem] p-1 tonal-transition ${
                active
                  ? 'bg-white shadow-[0_10px_24px_rgba(0,88,190,0.16)] ring-2 ring-[var(--primary)]'
                  : 'bg-transparent hover:bg-white/70'
              }`}
            >
              <div className="flex h-11 overflow-hidden rounded-[0.8rem]">
                {option.colors.map((color) => (
                  <div key={color} className="flex-1" style={{ backgroundColor: color }} />
                ))}
              </div>
            </button>
          );
        })}
      </div>
      <p className="text-xs text-[var(--outline)]">Selected palette: {value}</p>
    </div>
  );
}

'use client';

import { useState } from 'react';
import ChevronDownIcon from '@/components/icons/generated/ChevronDownIcon';
import { useClickOutside } from '@/hooks/useClickOutside';

const modelOptions = [
  { label: 'Basic', credits: 5 },
  { label: 'Premium', credits: 10 },
] as const;

export type ModelLabel = (typeof modelOptions)[number]['label'];

const sectionLabelClass =
  'block font-headline text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--outline)]';

export function ModelDropdown({
  value,
  onChange,
}: {
  value: ModelLabel;
  onChange: (value: ModelLabel) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useClickOutside<HTMLDivElement>(() => setOpen(false));
  const selected = modelOptions.find((o) => o.label === value);

  return (
    <div ref={ref} className="relative space-y-3">
      <label className={sectionLabelClass}>Model</label>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`flex w-full cursor-pointer items-center justify-between rounded-[1rem] border px-4 py-3 text-left tonal-transition ${
          open
            ? 'border-[var(--primary)] bg-white text-[var(--on-surface)]'
            : 'border-[rgba(194,198,214,0.55)] bg-[var(--surface-container-low)] text-[var(--on-surface)] hover:bg-[var(--surface-container)]'
        }`}
      >
        <div className="flex items-center gap-2">
          <span className="capitalize">{value}</span>
          <span className="text-[var(--outline)]">({selected?.credits} credits)</span>
        </div>
        <ChevronDownIcon
          className={`size-5 text-[var(--outline)] tonal-transition ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="absolute z-20 w-full overflow-hidden rounded-[1.25rem] border border-[rgba(194,198,214,0.65)] bg-white/95 shadow-[0_20px_40px_rgba(25,28,30,0.12)] backdrop-blur-xl">
          {modelOptions.map((option) => {
            const active = option.label === value;

            return (
              <button
                key={option.label}
                type="button"
                onClick={() => {
                  onChange(option.label);
                  setOpen(false);
                }}
                className={`flex w-full cursor-pointer items-center justify-between px-4 py-3 text-left tonal-transition ${
                  active
                    ? 'bg-[var(--surface-container-low)] text-[var(--on-surface)]'
                    : 'text-[var(--on-surface)] hover:bg-[var(--surface-container-low)]'
                }`}
              >
                <span>{option.label}</span>
                <span className={active ? 'text-[var(--primary)]' : 'text-[var(--outline)]'}>
                  {option.credits} credits
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

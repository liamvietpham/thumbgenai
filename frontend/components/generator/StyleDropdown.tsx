'use client';

import { useState } from 'react';
import ChevronDownIcon from '@/components/icons/generated/ChevronDownIcon';
import ChipIcon from '@/components/icons/generated/ChipIcon';
import ImageIcon from '@/components/icons/generated/ImageIcon';
import PenIcon from '@/components/icons/generated/PenIcon';
import SparkIcon from '@/components/icons/generated/SparkIcon';
import SquareIcon from '@/components/icons/generated/SquareIcon';
import { useClickOutside } from '@/hooks/useClickOutside';

const styleOptions = [
  { label: 'Bold & Graphic', desc: 'High contrast, bold typography, striking visuals', icon: 'spark' },
  { label: 'Minimalist', desc: 'Clean, simple, lots of white space', icon: 'square' },
  { label: 'Photorealistic', desc: 'Photo-based, natural looking', icon: 'image' },
  { label: 'Illustrated', desc: 'Hand-drawn, artistic, creative', icon: 'pen' },
  { label: 'Tech/Futuristic', desc: 'Modern, sleek, tech-inspired', icon: 'chip' },
] as const;

export type StyleLabel = (typeof styleOptions)[number]['label'];

const sectionLabelClass =
  'block font-headline text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--outline)]';

function StyleIcon({ icon }: { icon: (typeof styleOptions)[number]['icon'] }) {
  if (icon === 'spark') return <SparkIcon className="size-5" />;
  if (icon === 'square') return <SquareIcon className="size-5" />;
  if (icon === 'image') return <ImageIcon className="size-5" />;
  if (icon === 'pen') return <PenIcon className="size-5" />;
  return <ChipIcon className="size-5" />;
}

export function StyleDropdown({
  value,
  onChange,
}: {
  value: StyleLabel;
  onChange: (value: StyleLabel) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useClickOutside<HTMLDivElement>(() => setOpen(false));
  const selected = styleOptions.find((s) => s.label === value);

  return (
    <div ref={ref} className="relative space-y-3">
      <label className={sectionLabelClass}>Thumbnail Style</label>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full cursor-pointer items-center justify-between rounded-[1rem] border border-[rgba(194,198,214,0.55)] bg-[var(--surface-container-low)] px-4 py-3 text-left tonal-transition hover:bg-[var(--surface-container)]"
      >
        <div className="flex items-start gap-3">
          <span className="mt-0.5 text-[var(--primary)]">
            <StyleIcon icon={selected?.icon ?? 'square'} />
          </span>
          <div>
            <p className="font-medium text-[var(--on-surface)]">{selected?.label}</p>
            <p className="text-xs text-[var(--outline)]">{selected?.desc}</p>
          </div>
        </div>
        <ChevronDownIcon
          className={`size-5 text-[var(--outline)] tonal-transition ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="absolute z-20 w-full rounded-[1.25rem] border border-[rgba(194,198,214,0.35)] bg-[var(--surface-container-lowest)] p-2 shadow-[0_20px_40px_rgba(25,28,30,0.18)]">
          {styleOptions.map((option) => (
            <button
              key={option.label}
              type="button"
              onClick={() => {
                onChange(option.label);
                setOpen(false);
              }}
              className="flex w-full cursor-pointer items-start gap-3 rounded-[1rem] px-3 py-3 text-left tonal-transition hover:bg-[var(--surface-container-low)]"
            >
              <span className="mt-0.5 text-[var(--primary)]">
                <StyleIcon icon={option.icon} />
              </span>
              <div>
                <p className="font-medium text-[var(--on-surface)]">{option.label}</p>
                <p className="text-xs leading-relaxed text-[var(--outline)]">{option.desc}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

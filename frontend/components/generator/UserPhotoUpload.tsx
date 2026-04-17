'use client';

import UploadIcon from '@/components/icons/generated/UploadIcon';
import UserIcon from '@/components/icons/generated/UserIcon';

const sectionLabelClass =
  'block font-headline text-[11px] font-semibold uppercase tracking-[0.2em] text-(--outline)';

export function UserPhotoUpload({
  value,
  onChange,
}: {
  value: string;
  onChange: (fileName: string) => void;
}) {
  return (
    <div className="space-y-3">
      <label htmlFor="userPhoto" className={sectionLabelClass}>
        User Photo
      </label>
      <label
        htmlFor="userPhoto"
        className="flex cursor-pointer items-start gap-4 rounded-[1rem] border border-dashed border-[rgba(194,198,214,0.7)] bg-(--surface-container-low) p-4 tonal-transition hover:bg-(--surface-container)"
      >
        <div className="grid size-14 shrink-0 place-items-center rounded-[1rem] bg-white text-(--primary) shadow-sm">
          {value ? <UploadIcon className="size-5" /> : <UserIcon className="size-5" />}
        </div>
        <div className="space-y-1">
          <p className="font-medium text-(--on-surface)">
            {value ? 'Photo selected' : 'Upload a subject photo'}
          </p>
          <p className="text-sm leading-relaxed text-(--outline)">
            Optional. Add a face or subject reference so the generation can emphasize the main
            focal point.
          </p>
          <span className="inline-flex rounded-full bg-(--primary-fixed) px-3 py-1 text-xs font-semibold text-(--primary)">
            {value || 'Choose image'}
          </span>
        </div>
      </label>
      <input
        id="userPhoto"
        accept="image/*"
        className="hidden"
        type="file"
        onChange={(e) => onChange(e.target.files?.[0]?.name ?? '')}
      />
    </div>
  );
}

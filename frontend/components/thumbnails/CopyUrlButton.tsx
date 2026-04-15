'use client';

import { useState } from 'react';
import CheckIcon from '@/components/icons/generated/CheckIcon';
import LinkIcon from '@/components/icons/generated/LinkIcon';

export function CopyUrlButton({
  id,
  variant = 'action',
}: {
  id: number;
  variant?: 'action' | 'card';
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const url = `${window.location.origin}/thumbnails/${id}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (variant === 'card') {
    return (
      <button
        type="button"
        onClick={handleCopy}
        className="grid size-7 cursor-pointer place-items-center rounded-lg bg-black/55 text-white backdrop-blur-sm tonal-transition hover:bg-[var(--primary)]"
        aria-label={copied ? 'Link copied' : 'Copy link'}
      >
        {copied
          ? <CheckIcon className="size-3.5" />
          : <LinkIcon className="size-3.5" />}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold tonal-transition sm:py-2.5 ${
        copied
          ? 'bg-[var(--surface-container-high)] text-[var(--tertiary)]'
          : 'bg-[var(--surface-container-high)] text-[var(--on-surface-variant)] hover:bg-[var(--surface-container-highest)]'
      }`}
    >
      {copied
        ? <CheckIcon className="size-4" />
        : <LinkIcon className="size-4" />}
      {copied ? 'Copied!' : 'Copy Link'}
    </button>
  );
}

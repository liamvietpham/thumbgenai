'use client';

import { USAGE } from './profile-data';

function downloadCsv() {
  const header = 'Time,Description,Cost';
  const rows = USAGE.map((u) => `"${u.time}","${u.label}","${u.cost}"`);
  const csv = [header, ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'usage-history.csv';
  a.click();
  URL.revokeObjectURL(url);
}

export function UsageHistory() {
  return (
    <div className="rounded-xl bg-(--surface-container-low) p-5 md:p-8">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="font-headline text-2xl font-bold tracking-tight text-(--on-surface)">
          Usage History
        </h2>
        <button
          type="button"
          onClick={downloadCsv}
          className="cursor-pointer text-sm font-bold text-(--primary) hover:underline"
        >
          Download CSV
        </button>
      </div>
      <div className="space-y-1">
        {USAGE.map((u) => (
          <div
            key={u.time + u.label}
            className="flex items-center justify-between border-b border-(--surface-container-highest)/50 py-3 last:border-0"
          >
            <div className="flex min-w-0 flex-1 items-center gap-4">
              <span className="w-16 shrink-0 text-xs font-bold text-(--outline)">{u.time}</span>
              <p className="truncate text-sm font-medium text-(--on-surface)">{u.label}</p>
            </div>
            <p className="ml-4 shrink-0 text-sm font-bold text-(--error)">{u.cost}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

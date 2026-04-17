function CreditIcon({ className = '' }) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24">
      <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2Zm.75 14.5v.75a.75.75 0 0 1-1.5 0v-.75a3.25 3.25 0 0 1-.75-6.4V9.25a.75.75 0 0 1 1.5 0v.78a3.25 3.25 0 0 1 .75 6.47Zm-.75-1.5a1.75 1.75 0 1 0 0-3.5 1.75 1.75 0 0 0 0 3.5Z" fill="currentColor" />
    </svg>
  );
}

const STATS = [
  {
    icon: <CreditIcon className="size-6" />,
    accent: 'border-(--secondary-container)',
    iconBg: 'bg-[rgba(87,223,254,0.15)] text-(--secondary)',
    label: 'Active Credits',
    value: '42',
    sub: 'Remaining Credits',
  },
  {
    icon: (
      <svg aria-hidden="true" className="size-6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24">
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /><path d="M12 7v5l4 2" />
      </svg>
    ),
    accent: 'border-(--primary)',
    iconBg: 'bg-[rgba(0,88,190,0.10)] text-(--primary)',
    label: 'Generation Velocity',
    value: '588',
    sub: 'Total Used',
  },
  {
    icon: (
      <svg aria-hidden="true" className="size-6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24">
        <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" /><path d="M7 7h.01" />
      </svg>
    ),
    accent: 'border-(--tertiary)',
    iconBg: 'bg-[rgba(63,103,0,0.10)] text-(--tertiary)',
    label: 'Masterpieces',
    value: '102',
    sub: 'Total Created',
  },
];

export function StatsSection() {
  return (
    <section className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-3">
      {STATS.map((stat) => (
        <div
          key={stat.label}
          className={`rounded-xl border-l-4 bg-(--surface-container-low) p-5 shadow-sm md:p-8 ${stat.accent}`}
        >
          <div className="mb-4 flex items-start justify-between">
            <span className={`rounded-lg p-2 ${stat.iconBg}`}>{stat.icon}</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-(--outline)">
              {stat.label}
            </span>
          </div>
          <p className="font-headline mb-1 text-4xl font-bold text-(--on-surface)">{stat.value}</p>
          <p className="text-sm font-medium text-(--on-surface-variant)">{stat.sub}</p>
        </div>
      ))}
    </section>
  );
}

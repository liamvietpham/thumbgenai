import Link from 'next/link';

const logos = ['CREATOR LABS', 'TUBE INSIDER', 'VOX MEDIA', 'PIXEL GROUP'];

export function CtaSection() {
  return (
    <section className="bg-gradient-to-b from-[var(--surface-container-lowest)] to-[var(--surface)] px-6 py-24 text-center md:px-8">
      <div className="mx-auto max-w-4xl space-y-10">
        <header className="space-y-4">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--primary)]">
            Ready to Launch
          </p>
          <h2 className="font-headline text-4xl font-bold tracking-tight text-[var(--on-surface)] md:text-6xl">
            Ready to double your CTR?
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-[var(--on-surface-variant)]">
            Iterate faster and turn every new upload into a stronger first impression.
          </p>
        </header>

        <Link
          href="/generate"
          className="inline-flex cursor-pointer items-center justify-center rounded-2xl bg-gradient-to-br from-[#0058be] to-[#2170e4] px-12 py-5 text-xl font-bold text-white shadow-2xl shadow-[rgba(0,88,190,0.22)] tonal-transition hover:scale-[1.02]"
        >
          Start Creating Now
        </Link>

        <ul className="flex flex-wrap justify-center gap-8 opacity-45 grayscale">
          {logos.map((logo) => (
            <li key={logo} className="font-headline text-xl font-bold tracking-wide text-[var(--on-surface)]">
              {logo}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

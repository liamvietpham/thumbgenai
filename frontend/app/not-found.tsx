import Image from 'next/image';
import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-12 md:px-8">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-5rem] top-1/4 h-96 w-96 rounded-full bg-[rgba(87,223,254,0.18)] blur-[120px]" />
        <div className="absolute bottom-1/4 right-[-6rem] h-[30rem] w-[30rem] rounded-full bg-[rgba(33,112,228,0.12)] blur-[150px]" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(172,237,255,0.55),transparent_40%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(216,226,255,0.8),transparent_42%)]" />
        </div>
      </div>

      <div className="relative z-10 flex w-full max-w-4xl flex-col items-center text-center">
        <figure className="group relative mb-12">
          <div className="absolute inset-0 rounded-full bg-[rgba(172,237,255,0.28)] blur-3xl tonal-transition group-hover:scale-110" />

          <div className="relative flex h-64 w-64 items-center justify-center md:h-80 md:w-80">
            <Image
              alt="Abstract glowing mascot floating in a soft digital sky"
              className="h-full w-full rounded-full object-contain opacity-85 mix-blend-multiply"
              height={800}
              priority
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-LP-5rAe80-Uiwlu0pikwfezSkUZ-n57fma16BO--6K-dkxgU1jA_rh-lZeQtugR0Khqds4MMmqcf4m-nTNrGPALzGa93I3vOLicAMVt_K2p5rMF6RT5ygKLP4Xv-miwBqEDBi2Jajj9Rfki-H9cKRfgythGWB8twBBCZnZZceZKjKpZPuthZAbjUSYB5jh1J6O4HfuBxqvJTBlIc9Ct7RYmPATxcWXrVIW8yIMlJ8sNWsNnIcM_L1sFo4BzAuu4WsD0Jbei0E0-2"
              sizes="(max-width: 768px) 16rem, 20rem"
              width={800}
            />

            <div className="glass-card absolute -right-4 -top-4 flex h-12 w-12 items-center justify-center rounded-2xl shadow-2xl">
              <WarningIcon className="size-6 text-[var(--secondary)]" />
            </div>

            <div className="glass-card absolute bottom-8 -left-8 flex h-16 w-16 items-center justify-center rounded-[1.25rem] shadow-2xl">
              <RocketIcon className="size-8 text-[var(--primary)]" />
            </div>
          </div>
        </figure>

        <header className="max-w-2xl">
          <p className="mb-4 font-headline text-sm font-semibold uppercase tracking-[0.28em] text-[var(--outline)]">
            Status: Error_404
          </p>
          <h1 className="font-headline text-5xl font-bold leading-tight tracking-tight text-[var(--on-surface)] [text-shadow:0_0_20px_rgba(0,88,190,0.14)] md:text-7xl">
            This page drifted
            <span className="block text-[var(--primary)]">out of frame.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-[var(--outline)] md:text-xl">
            The link may be outdated, the page may have moved, or it never made it into the final
            cut. Let&apos;s get you back to the studio and into something useful.
          </p>
        </header>

        <div className="mt-12 flex flex-col items-center gap-5 sm:flex-row">
          <Link
            href="/"
            className="inline-flex cursor-pointer items-center gap-3 rounded-xl bg-gradient-to-r from-[#0058be] to-[#2170e4] px-10 py-5 font-headline text-lg font-bold text-[var(--on-primary)] shadow-xl shadow-[rgba(0,88,190,0.24)] tonal-transition hover:opacity-95"
          >
            <SparklesIcon className="size-5" />
            Back to Home
          </Link>

          <Link
            href="/thumbnails"
            className="inline-flex cursor-pointer items-center gap-2 rounded-xl px-6 py-5 font-headline text-lg font-bold text-[var(--primary)] tonal-transition hover:bg-[rgba(0,88,190,0.05)] hover:underline hover:underline-offset-8"
          >
            Go to Thumbnails
            <ArrowRightIcon className="size-5" />
          </Link>
        </div>

        <p className="mt-24 font-headline text-sm font-medium uppercase tracking-[0.3em] text-[var(--outline-variant)]">
          Connection lost. Route unavailable.
        </p>
      </div>
    </section>
  );
}

function ArrowRightIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 12h14m0 0-5-5m5 5-5 5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function SparklesIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m12 3 1.42 4.58L18 9l-4.58 1.42L12 15l-1.42-4.58L6 9l4.58-1.42L12 3Zm6.5 11 .87 2.63L22 17.5l-2.63.87L18.5 21l-.87-2.63L15 17.5l2.63-.87L18.5 14ZM5.5 14l.87 2.63L9 17.5l-2.63.87L5.5 21l-.87-2.63L2 17.5l2.63-.87L5.5 14Z"
        fill="currentColor"
      />
    </svg>
  );
}

function WarningIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.29 4.86a2 2 0 0 1 3.42 0l7.03 11.93A2 2 0 0 1 19.03 20H4.97a2 2 0 0 1-1.71-3.21L10.29 4.86ZM12 9.25v4.5m0 2.75h.01"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function RocketIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.5 4.5c2.42 1.09 5 4.76 5 9.5-4.74 0-8.41-2.58-9.5-5 1.24-2.3 3.2-3.87 4.5-4.5Zm0 0L9 10l-3 .5.5-3 5.5-3Zm1.75 6.25a1.25 1.25 0 1 0-2.5 0 1.25 1.25 0 0 0 2.5 0ZM8.5 13l-3 3m4 1.5L8 19l-3 1 1-3 1.5-1.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

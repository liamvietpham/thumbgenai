import Link from 'next/link';
import ArrowRightIcon from '@/components/icons/generated/ArrowRightIcon';
import MailIcon from '@/components/icons/generated/MailIcon';

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-6">
      {/* Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(87,223,254,0.08) 0%, rgba(33,112,228,0.02) 50%, transparent 100%)',
        }}
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute right-[10%] top-[15%] h-64 w-64 rounded-full bg-[rgba(87,223,254,0.10)] blur-[100px]" />
        <div className="absolute bottom-[20%] left-[5%] h-96 w-96 rounded-full bg-[rgba(33,112,228,0.05)] blur-[120px]" />
      </div>

      <div className="w-full max-w-md">
        <div className="flex flex-col items-center rounded-[2rem] bg-(--surface-container-lowest) p-8 shadow-[0_32px_64px_-16px_rgba(0,88,190,0.08)]">

          {/* Icon */}
          <div className="mb-6 grid size-16 place-items-center rounded-2xl bg-(--surface-container-low) text-(--primary)">
            <LockOpenIcon className="size-8" />
          </div>

          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="mb-3 font-headline text-2xl font-bold tracking-tight text-(--on-surface)">
              Lost your way?
            </h1>
            <p className="max-w-[280px] text-sm leading-relaxed text-(--on-surface-variant)">
              Enter your email and we&apos;ll send you a link to reset your password and get back to
              the studio.
            </p>
          </div>

          {/* Form */}
          <form className="w-full space-y-4">
            <div className="relative">
              <label className="sr-only" htmlFor="email">
                Email Address
              </label>
              <MailIcon className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-(--outline)" />
              <input
                required
                id="email"
                name="email"
                type="email"
                placeholder="your@studio.com"
                className="form-field w-full py-3.5 pl-12 pr-4 text-sm"
              />
            </div>

            <button
              type="submit"
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-linear-to-br from-[#0058be] to-[#2170e4] py-3.5 font-bold text-white shadow-lg shadow-[rgba(0,88,190,0.20)] tonal-transition hover:scale-[0.98] active:scale-95"
            >
              Send Reset Link
              <ArrowRightIcon className="size-5" aria-hidden="true" />
            </button>
          </form>

          {/* Back to Login */}
          <div className="mt-6 w-full border-t border-(--surface-container) pt-6 text-center">
            <Link
              href="/login"
              className="inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-(--on-surface-variant) tonal-transition hover:text-(--primary)"
            >
              <ArrowLeftIcon className="size-4" />
              Back to Login
            </Link>
          </div>
        </div>

        <div className="mt-5 text-center">
          <Link
            href="/"
            className="cursor-pointer text-sm text-(--on-surface-variant) tonal-transition hover:text-(--primary)"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

function LockOpenIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 11V7a4 4 0 0 1 7.75-1.4M12 11v2m0 2h.01M5 11h14a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function ArrowLeftIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19 12H5m0 0 5-5m-5 5 5 5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

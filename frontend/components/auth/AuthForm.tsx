import Link from 'next/link';
import ArrowRightIcon from '@/components/icons/generated/ArrowRightIcon';
import LockIcon from '@/components/icons/generated/LockIcon';
import MailIcon from '@/components/icons/generated/MailIcon';
import UserIcon from '@/components/icons/generated/UserIcon';

type AuthMode = 'login' | 'register';

export function AuthForm({ mode }: { mode: AuthMode }) {
  const isLogin = mode === 'login';

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
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 opacity-20"
      >
        <div className="absolute inset-0 animate-pulse rounded-full border-[0.5px] border-[rgba(0,104,122,0.2)]" />
        <div className="absolute inset-20 animate-pulse rounded-full border-[0.5px] border-[rgba(0,88,190,0.1)]" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Card */}
        <div className="rounded-[2rem] bg-[var(--surface-container-lowest)] p-8 shadow-[0_32px_64px_-16px_rgba(0,88,190,0.08)]">
          <div className="mb-6 text-center">
            <h1 className="mb-1 font-headline text-2xl font-bold tracking-tight text-[var(--on-surface)]">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-sm text-[var(--on-surface-variant)]">
              {isLogin
                ? 'Enter your credentials to access your studio.'
                : 'Sign up to start generating thumbnails.'}
            </p>
          </div>

          <form className="space-y-4">
            {/* Name (register only) */}
            {!isLogin && (
              <div className="space-y-1">
                <label className="ml-1 block text-xs font-bold uppercase tracking-widest text-[var(--outline)]">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    required
                    name="name"
                    type="text"
                    placeholder="Your name"
                    className="w-full rounded-xl border border-[rgba(194,198,214,0.55)] bg-[var(--surface-container)] px-4 py-3 pr-12 text-sm text-[var(--on-surface)] placeholder:text-[var(--outline)] transition-all focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[rgba(0,88,190,0.15)]"
                  />
                  <UserIcon className="absolute right-4 top-1/2 size-5 -translate-y-1/2 text-[var(--outline)]" />
                </div>
              </div>
            )}

            {/* Email */}
            <div className="space-y-1">
              <label className="ml-1 block text-xs font-bold uppercase tracking-widest text-[var(--outline)]">
                Email Address
              </label>
              <div className="relative">
                <input
                  required
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  className="w-full rounded-xl border border-[rgba(194,198,214,0.55)] bg-[var(--surface-container)] px-4 py-3 pr-12 text-sm text-[var(--on-surface)] placeholder:text-[var(--outline)] transition-all focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[rgba(0,88,190,0.15)]"
                />
                <MailIcon className="absolute right-4 top-1/2 size-5 -translate-y-1/2 text-[var(--outline)]" />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <div className="flex items-center justify-between px-1">
                <label className="block text-xs font-bold uppercase tracking-widest text-[var(--outline)]">
                  Password
                </label>
                {isLogin && (
                  <Link
                    href="/forgot-password"
                    className="cursor-pointer text-xs font-semibold text-[var(--primary)] hover:underline"
                  >
                    Forgot password?
                  </Link>
                )}
              </div>
              <div className="relative">
                <input
                  required
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-[rgba(194,198,214,0.55)] bg-[var(--surface-container)] px-4 py-3 pr-12 text-sm text-[var(--on-surface)] placeholder:text-[var(--outline)] transition-all focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[rgba(0,88,190,0.15)]"
                />
                <LockIcon className="absolute right-4 top-1/2 size-5 -translate-y-1/2 text-[var(--outline)]" />
              </div>
            </div>

            {/* Remember me (login only) */}
            {isLogin && (
              <div className="flex items-center gap-3 px-1">
                <input
                  id="remember"
                  type="checkbox"
                  className="size-4 cursor-pointer rounded border-[var(--outline-variant)] bg-[var(--surface-container-low)] accent-[var(--primary)]"
                />
                <label
                  htmlFor="remember"
                  className="cursor-pointer text-sm font-medium text-[var(--on-surface-variant)]"
                >
                  Remember me
                </label>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-[#0058be] to-[#2170e4] py-3.5 text-base font-semibold text-white shadow-lg shadow-[rgba(0,88,190,0.20)] tonal-transition hover:scale-[0.98] active:scale-95"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
              <ArrowRightIcon className="size-5" aria-hidden="true" />
            </button>
          </form>

          {/* Footer link */}
          <div className="mt-5 flex items-center justify-center gap-2 border-t border-[var(--surface-container)] pt-5">
            <p className="text-sm text-[var(--on-surface-variant)]">
              {isLogin ? 'New to ThumbnailAI?' : 'Already have an account?'}
            </p>
            <Link
              href={isLogin ? '/register' : '/login'}
              className="cursor-pointer text-sm font-bold text-[var(--primary)] tonal-transition hover:underline"
            >
              {isLogin ? 'Register' : 'Login'}
            </Link>
          </div>
        </div>

        <div className="mt-5 text-center">
          <Link
            href="/"
            className="cursor-pointer text-sm text-[var(--on-surface-variant)] tonal-transition hover:text-[var(--primary)]"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

import Link from 'next/link';
import type { InputHTMLAttributes, ReactNode } from 'react';

type AuthMode = 'login' | 'register';

export function AuthForm({ mode }: { mode: AuthMode }) {
  const isLogin = mode === 'login';

  return (
    <div className="flex items-center justify-center p-2 md:p-3">
      <form className="w-full rounded-[1.25rem] border border-[#b8cbe9] bg-[#ccdaf0] px-3.5 text-center shadow-[0_10px_22px_rgba(40,77,126,0.2)] sm:max-w-[346px] sm:px-5">
        <h2 className="mt-5 text-[1.35rem] font-semibold text-[#1f2d49] sm:text-[1.45rem]">{isLogin ? 'Login' : 'Sign up'}</h2>
        <p className="mt-1.5 text-xs text-[#4b5f7d] sm:text-sm">Please sign in to continue</p>

        <button
          type="button"
          className="mt-4 flex h-9 w-full items-center justify-center gap-2 rounded-lg border border-[#d5d9e2] bg-white text-xs font-semibold text-[#2c3d59] transition hover:bg-[#f6f8fc] sm:h-[38px] sm:text-sm"
        >
          <span className="flex size-5 items-center justify-center rounded-sm bg-[#24364f] text-[9px] font-bold text-[#f9b233]">
            G
          </span>
          Continue with Google
        </button>

        <div className="my-3.5 flex items-center gap-2 text-xs text-[#6b7b94] sm:text-sm">
          <span className="h-px flex-1 bg-[#b7c6df]" />
          <span>or</span>
          <span className="h-px flex-1 bg-[#b7c6df]" />
        </div>

        {!isLogin ? (
          <InputRow
            type="text"
            name="name"
            placeholder="Name"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-[#8a9bb6]" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="5" />
                <path d="M20 21a8 8 0 0 0-16 0" />
              </svg>
            }
            className="mt-0"
          />
        ) : null}

        <InputRow
          type="email"
          name="email"
          placeholder="Email id"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-[#8a9bb6]" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
              <rect x="2" y="4" width="20" height="16" rx="2" />
            </svg>
          }
          className={isLogin ? '' : 'mt-3'}
        />

        <InputRow
          type="password"
          name="password"
          placeholder="Password"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-[#8a9bb6]" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          }
          className="mt-3"
        />

        <div className="mt-3 text-right">
          <button type="button" className="cursor-pointer text-[11px] leading-none text-[#2e5ea6] hover:underline sm:text-xs">
            Forgot password?
          </button>
        </div>

        <button
          type="submit"
          className="mt-3 h-9 w-full rounded-lg bg-[#4b78b8] text-xs font-semibold text-white transition hover:bg-[#3e679f] cursor-pointer sm:h-[38px] sm:text-sm"
        >
          {isLogin ? 'Login' : 'Sign up'}
        </button>

        <p className="mb-6 mt-4 text-[11px] text-[#4b5f7d] sm:text-xs">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}
          <Link href={isLogin ? '/register' : '/login'} className="ml-2 text-[#2e5ea6] font-semibold hover:underline">
            Click here
          </Link>
        </p>
      </form>
    </div>
  );
}

function InputRow({
  icon,
  className,
  ...inputProps
}: InputHTMLAttributes<HTMLInputElement> & {
  icon: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex h-9 w-full items-center gap-1.5 overflow-hidden rounded-lg border border-[#c7d4ea] bg-[#e5edf8] px-3 text-[#7f91ae] transition-all focus-within:border-[#8eaedf] focus-within:bg-[#edf3fb] sm:h-[38px] sm:px-3.5 ${className ?? ''}`}
    >
      {icon}
      <input
        className="w-full border-none bg-transparent text-xs text-[#516583] placeholder-[#7f91ae] outline-none sm:text-sm"
        required
        {...inputProps}
      />
    </div>
  );
}

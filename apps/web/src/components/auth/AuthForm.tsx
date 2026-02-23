import Link from 'next/link';
import type { InputHTMLAttributes, ReactNode } from 'react';

type AuthMode = 'login' | 'register';

export function AuthForm({ mode }: { mode: AuthMode }) {
  const isLogin = mode === 'login';

  return (
    <div className="flex items-center justify-center p-4">
      <form className="w-full rounded-2xl border border-[#8eaedf] bg-[#2e5c99]/56 px-8 text-center shadow-[0_14px_30px_rgba(24,52,94,0.22)] backdrop-blur-md sm:w-87.5">
        <h2 className="mt-10 text-3xl font-medium text-[#f3f8ff]">{isLogin ? 'Login' : 'Sign up'}</h2>
        <p className="mt-2 text-sm text-[#d2e0f6]">Please sign in to continue</p>

        <div className="mt-6 flex w-full max-w-full justify-center overflow-hidden rounded-full opacity-85 transition-all hover:opacity-100">
          <button
            type="button"
            className="h-11 w-full rounded-full border border-[#7f9fce] bg-[#dbe8fb] text-sm font-medium text-[#1f3f75] transition hover:bg-[#cfe0fa]"
          >
            Continue with Google
          </button>
        </div>

        <p className="my-4 text-sm text-[#c7d8f3]">or</p>

        {!isLogin ? (
          <InputRow
            type="text"
            name="name"
            placeholder="Name"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-[#c8daf6]" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="5" />
                <path d="M20 21a8 8 0 0 0-16 0" />
              </svg>
            }
            className="mt-6"
          />
        ) : null}

        <InputRow
          type="email"
          name="email"
          placeholder="Email id"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-[#c8daf6]" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
              <rect x="2" y="4" width="20" height="16" rx="2" />
            </svg>
          }
          className="mt-4"
        />

        <InputRow
          type="password"
          name="password"
          placeholder="Password"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-[#c8daf6]" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          }
          className="mt-4"
        />

        <div className="mt-4 text-left">
          <button type="button" className="text-sm text-[#c8daf6] hover:underline cursor-pointer">
            Forget password?
          </button>
        </div>

        <button
          type="submit"
          className="mt-2 h-11 w-full rounded-full bg-[#4b78b8] text-white transition hover:bg-[#3e679f] cursor-pointer"
        >
          {isLogin ? 'Login' : 'Sign up'}
        </button>

        <p className="mb-11 mt-3 text-sm text-[#d2e0f6]">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}
          <Link href={isLogin ? '/register' : '/login'} className="ml-1 text-[#c8daf6] hover:underline">
            click here
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
      className={`flex h-12 w-full items-center gap-2 overflow-hidden rounded-full bg-[#3a66a1]/38 pl-6 ring-2 ring-[#8eaedf]/70 transition-all focus-within:ring-[#c8daf6] ${className ?? ''}`}
    >
      {icon}
      <input
        className="w-full border-none bg-transparent text-[#f3f8ff] placeholder-[#bfd1ee] outline-none"
        required
        {...inputProps}
      />
    </div>
  );
}

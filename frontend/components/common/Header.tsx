'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import CloseIcon from '@/components/icons/generated/CloseIcon';
import MenuIcon from '@/components/icons/generated/MenuIcon';
import { ThemeToggle } from '@/components/common/ThemeToggle';

const navItems = [
  { label: 'Home', href: '/', matches: ['/'] },
  { label: 'Public Gallery', href: '/public-gallery', matches: ['/public-gallery'] },
  { label: 'Pricing', href: '/pricing', matches: ['/pricing'] },
  { label: 'About', href: '/about', matches: ['/about'] },
  {
    label: 'Privacy',
    href: '/privacy-policy',
    matches: ['/privacy-policy'],
  },
];

// Mock auth state — replace with real auth context when available
const isLoggedIn = true;
const CREDITS = 42;

const currentUser = {
  name: 'Alex Creator',
  avatar:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBP5JL-q8S81neZg6rhbnJ-m92v7tcUi4_IMmOl0p9_h0xL4EnrYnhShra1gL84xckpINItAUEHp-6JhFjSLN2Fo5Y6Ggn2oCQ4yMPppwcXE6KxUNQycJgP7UCdunTGcSS8k4mzx09ZE_7MFIt9Ecwldc-LHbD_3jDyWf5A8wV_I2euDLPIMiPW5YxaGbo21VZO_TL6CkSeASrBMM-5hwzg4rV7VytBRkdWQqnSauggr5eB2IbNNs1lKw5lzoYeXnV_gzy4vf5ncYhW',
};

export function Header() {
  const [open, setOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const mobileRef = useRef<HTMLDivElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (mobileRef.current && !mobileRef.current.contains(target)) {
        setOpen(false);
      }

      if (accountRef.current && !accountRef.current.contains(target)) {
        setAccountOpen(false);
      }
    };

    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/40 bg-white/70 shadow-[0_8px_32px_rgba(0,88,190,0.04)] backdrop-blur-xl">
      <div className="relative mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="cursor-pointer font-headline text-2xl font-bold tracking-tight text-[var(--primary)]"
        >
          Thumbnail AI
        </Link>

        <nav
          aria-label="Primary"
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-6 md:flex"
        >
          {navItems.map((item) => {
            const active = item.matches.includes(pathname);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={`cursor-pointer border-b-2 py-1 text-sm font-semibold tonal-transition ${
                  active
                    ? 'border-[var(--primary)] text-[var(--primary)]'
                    : 'border-transparent text-[var(--on-surface-variant)] hover:text-[var(--primary)]'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <ThemeToggle />

          {!isLoggedIn && (
            <Link
              href="/login"
              className="hidden cursor-pointer text-sm font-semibold text-[var(--on-surface-variant)] tonal-transition hover:text-[var(--primary)] md:inline-block"
            >
              Log in
            </Link>
          )}

          <Link
            href="/generate"
            className="hidden cursor-pointer rounded-xl bg-gradient-to-br from-[#0058be] to-[#2170e4] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-[rgba(0,88,190,0.20)] tonal-transition hover:scale-[1.02] md:inline-block"
          >
            Start Creating
          </Link>

          {isLoggedIn && (
            <div ref={accountRef} className="relative hidden md:block">
              <button
                type="button"
                onClick={() => setAccountOpen((value) => !value)}
                aria-haspopup="menu"
                aria-expanded={accountOpen}
                className="cursor-pointer rounded-full ring-2 ring-[rgba(0,88,190,0.12)] ring-offset-2 tonal-transition hover:ring-[rgba(0,88,190,0.28)]"
              >
                <Image
                  alt={`${currentUser.name} avatar`}
                  className="size-10 rounded-full object-cover"
                  height={40}
                  src={currentUser.avatar}
                  width={40}
                />
              </button>

              <div
                role="menu"
                aria-label="Account menu"
                className={`absolute right-0 top-[calc(100%+0.75rem)] w-64 rounded-2xl border border-[rgba(194,198,214,0.5)] bg-[var(--surface-container-lowest)] p-2 shadow-[0_20px_40px_rgba(25,28,30,0.12)] tonal-transition ${
                  accountOpen
                    ? 'translate-y-0 opacity-100'
                    : 'pointer-events-none -translate-y-2 opacity-0'
                }`}
              >
                {/* User info */}
                <div className="mb-2 flex items-center gap-3 border-b border-[var(--surface-container-high)] px-3 pb-3 pt-2">
                  <Image
                    alt={currentUser.name}
                    className="size-9 rounded-full object-cover"
                    height={36}
                    src={currentUser.avatar}
                    width={36}
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-[var(--on-surface)]">{currentUser.name}</p>
                    <p className="text-xs text-[var(--outline)]">Pro Plan</p>
                  </div>
                </div>

                {/* Credits */}
                <div className="mx-1 mb-2 flex items-center justify-between rounded-xl bg-[var(--surface-container-low)] px-3 py-2.5">
                  <div className="flex items-center gap-2">
                    <CreditIcon className="size-4 text-[var(--primary)]" />
                    <span className="text-sm font-semibold text-[var(--on-surface)]">Credits</span>
                  </div>
                  <span className="rounded-full bg-[#0058be] px-2.5 py-0.5 text-xs font-bold text-white">
                    {CREDITS} left
                  </span>
                </div>

                {/* Profile */}
                <Link
                  href="/profile"
                  role="menuitem"
                  className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-[var(--on-surface)] tonal-transition hover:bg-[var(--surface-container-low)]"
                  onClick={() => setAccountOpen(false)}
                >
                  <ProfileIcon className="size-4 text-[var(--on-surface-variant)]" />
                  Profile
                </Link>

                {/* Logout */}
                <button
                  type="button"
                  role="menuitem"
                  className="mt-1 flex w-full cursor-pointer items-center gap-3 rounded-xl border-t border-[var(--surface-container-high)] px-3 py-2.5 pt-3 text-sm font-medium text-[#ba1a1a] tonal-transition hover:bg-[rgba(186,26,26,0.06)]"
                  onClick={() => setAccountOpen(false)}
                >
                  <LogoutIcon className="size-4" />
                  Log out
                </button>
              </div>
            </div>
          )}

          <div ref={mobileRef} className="relative">
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              className="mobile-menu-btn inline-flex size-11 cursor-pointer items-center justify-center rounded-2xl border border-[var(--outline-variant)] bg-white/80 text-[var(--primary)] shadow-sm tonal-transition hover:bg-white md:hidden"
              aria-label="Toggle menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              {open ? <CloseIcon className="size-5" /> : <MenuIcon className="size-5" />}
            </button>

            <div
              id="mobile-menu"
              className={`absolute right-0 top-14 w-80 overflow-hidden rounded-3xl border border-white/60 bg-white/92 p-3 shadow-[0_18px_40px_rgba(25,28,30,0.12)] backdrop-blur-2xl tonal-transition ${
                open ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-2 opacity-0'
              }`}
            >
              {isLoggedIn && (
                <div className="mb-3 rounded-2xl bg-[var(--surface-container-low)] p-4">
                  <div className="flex items-center gap-3">
                    <Image
                      alt={`${currentUser.name} avatar`}
                      className="size-11 rounded-full object-cover ring-2 ring-[rgba(0,88,190,0.1)]"
                      height={44}
                      src={currentUser.avatar}
                      width={44}
                    />
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--outline)]">
                        Account
                      </p>
                      <p className="text-sm font-bold text-[var(--on-surface)]">
                        {currentUser.name}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <nav className="flex flex-col gap-1" aria-label="Mobile primary">
                {navItems.map((item) => {
                  const active = item.matches.includes(pathname);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`cursor-pointer rounded-2xl px-4 py-3 text-sm font-medium tonal-transition ${
                        active
                          ? 'bg-[rgba(33,112,228,0.12)] text-[var(--primary)]'
                          : 'text-[var(--on-surface-variant)] hover:bg-[var(--surface-container-low)] hover:text-[var(--primary)]'
                      }`}
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>

              <div className="mt-3 space-y-1 border-t border-[var(--surface-container-high)] pt-3">
                {isLoggedIn ? (
                  <>
                    <div className="flex items-center justify-between rounded-2xl bg-[var(--surface-container-low)] px-4 py-3">
                      <div className="flex items-center gap-2 text-sm font-semibold text-[var(--on-surface)]">
                        <CreditIcon className="size-4 text-[var(--primary)]" />
                        Credits
                      </div>
                      <span className="rounded-full bg-[#0058be] px-2.5 py-0.5 text-xs font-bold text-white">
                        {CREDITS} left
                      </span>
                    </div>
                    <Link
                      href="/profile"
                      className="flex cursor-pointer items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-[var(--on-surface)] tonal-transition hover:bg-[var(--surface-container-low)]"
                      onClick={() => setOpen(false)}
                    >
                      <ProfileIcon className="size-4 text-[var(--on-surface-variant)]" />
                      Profile
                    </Link>
                    <button
                      type="button"
                      className="flex w-full cursor-pointer items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-[#ba1a1a] tonal-transition hover:bg-[rgba(186,26,26,0.06)]"
                      onClick={() => setOpen(false)}
                    >
                      <LogoutIcon className="size-4" />
                      Log out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="flex cursor-pointer items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold text-[var(--on-surface)] tonal-transition hover:bg-[var(--surface-container-low)]"
                      onClick={() => setOpen(false)}
                    >
                      Log in
                    </Link>
                    <Link
                      href="/generate"
                      className="flex cursor-pointer items-center justify-center rounded-2xl bg-gradient-to-br from-[#0058be] to-[#2170e4] px-4 py-3 text-sm font-bold text-white shadow-md tonal-transition hover:scale-[1.02]"
                      onClick={() => setOpen(false)}
                    >
                      Start Creating
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}



function CreditIcon({ className = '' }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2Zm.75 14.5v.75a.75.75 0 0 1-1.5 0v-.75a3.25 3.25 0 0 1-.75-6.4V9.25a.75.75 0 0 1 1.5 0v.78a3.25 3.25 0 0 1 .75 6.47Zm-.75-1.5a1.75 1.75 0 1 0 0-3.5 1.75 1.75 0 0 0 0 3.5Z" fill="currentColor" />
    </svg>
  );
}

function ProfileIcon({ className = '' }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 4.75a3.25 3.25 0 1 0 0 6.5 3.25 3.25 0 0 0 0-6.5Zm-5 9.5a1 1 0 0 0-1 1c0 1.97 1.03 3.38 2.56 4.27C10.06 20.44 11.02 20.75 12 20.75s1.94-.31 3.44-1.23C16.97 18.63 18 17.22 18 15.25a1 1 0 0 0-1-1H7Z" fill="currentColor" />
    </svg>
  );
}

function LogoutIcon({ className = '' }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.25 4.75h-4.5a1 1 0 0 0-1 1v12.5a1 1 0 0 0 1 1h4.5m3.5-13.5 4.5 4.5-4.5 4.5m4.5-4.5H9.75" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  );
}

'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import CloseIcon from '@/assets/icons/close.svg';
import MenuIcon from '@/assets/icons/menu.svg';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Generate', href: '/generate' },
  { label: 'Community', href: '/community' },
  { label: 'About', href: '/about' },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const mobileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      if (!mobileRef.current) return;
      if (!mobileRef.current.contains(event.target as Node)) setOpen(false);
    };

    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-linear-to-b from-[#cfe0fa]/95 to-[#bdd3f5]/92 backdrop-blur-md md:sticky">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4">
        <Link href="/" className="text-lg font-semibold tracking-tight text-[#1f3f75]">
          Thumbgen<span className="text-[#2f5ea5]">AI</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-[#2f4f82] transition hover:text-[#1f3f75]">
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/login"
          className="hidden rounded-full bg-[#2f5ea5] px-4 py-2 text-sm font-semibold text-white shadow-[0_6px_16px_rgba(47,94,165,0.28)] transition hover:bg-[#244a82] md:inline-block"
        >
          Get Started
        </Link>

        <div ref={mobileRef} className="relative md:hidden">
          <button
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[#6f93c8] bg-[#c8daf6] text-[#2f5ea5]"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? (
              <CloseIcon className="h-5 w-5" />
            ) : (
              <MenuIcon className="h-5 w-5" />
            )}
          </button>

          <div
            className={`absolute right-0 top-12 w-64 overflow-hidden rounded-xl border border-[#7f9fce] bg-[#dbe8fb]/95 shadow-[0_14px_28px_rgba(41,79,136,0.2)] transition-all duration-300 ease-out
            ${open ? 'max-h-96 translate-y-0 opacity-100' : 'pointer-events-none max-h-0 -translate-y-2 opacity-0'}`}
          >
            <nav className="flex flex-col gap-1 p-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-md px-3 py-2 text-sm text-[#2f4f82] hover:bg-[#cfe0fa] hover:text-[#1f3f75]"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/get-started"
                className="mt-2 rounded-full bg-[#2f5ea5] px-4 py-2 text-center text-sm font-semibold text-white hover:bg-[#244a82]"
                onClick={() => setOpen(false)}
              >
                Get Started
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}

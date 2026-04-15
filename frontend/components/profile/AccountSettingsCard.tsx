'use client';

import Image from 'next/image';
import { useState } from 'react';
import LockIcon from '@/components/icons/generated/LockIcon';
import { AVATAR } from './profile-data';

function EditIcon({ className = '' }) {
  return (
    <svg aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="m18.5 2.5 3 3L12 15H9v-3Z" />
    </svg>
  );
}
function EyeIcon({ className = '' }) {
  return (
    <svg aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z" /><circle cx={12} cy={12} r={3} />
    </svg>
  );
}
function EyeOffIcon({ className = '' }) {
  return (
    <svg aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <path d="m1 1 22 22" />
    </svg>
  );
}

const fieldClass =
  'w-full rounded-xl border border-[rgba(194,198,214,0.55)] bg-[var(--surface-container)] px-4 py-3 text-sm text-[var(--on-surface)] placeholder:text-[var(--outline)] focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[rgba(0,88,190,0.15)]';

function PasswordField({ label, placeholder, value, onChange }: { label: string; placeholder?: string; value: string; onChange: (v: string) => void }) {
  const [show, setShow] = useState(false);
  return (
    <div className="space-y-2">
      <label className="ml-1 block text-xs font-bold uppercase tracking-wider text-[var(--on-surface-variant)]">
        {label}
      </label>
      <div className="relative">
        <input
          className={`${fieldClass} pr-11`}
          type={show ? 'text' : 'password'}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete="new-password"
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-[var(--outline)] hover:text-[var(--on-surface-variant)]"
          tabIndex={-1}
        >
          {show ? <EyeOffIcon className="size-4" /> : <EyeIcon className="size-4" />}
        </button>
      </div>
    </div>
  );
}

export function AccountSettingsCard() {
  const [name, setName] = useState('Alex Creator');
  const [email, setEmail] = useState('alex@thumbnailai.io');
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');

  const handleCancelPassword = () => {
    setShowPasswordForm(false);
    setCurrentPw('');
    setNewPw('');
    setConfirmPw('');
  };

  const passwordMismatch = confirmPw.length > 0 && newPw !== confirmPw;

  return (
    <div className="rounded-3xl border border-[rgba(194,198,214,0.4)] bg-[var(--surface-container-lowest)] p-8 shadow-sm">
      <div className="mb-8 flex items-center gap-2 font-bold text-[var(--primary)]">
        <svg aria-hidden="true" className="size-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx={12} cy={7} r={4} />
        </svg>
        <h2 className="font-headline text-xl tracking-tight text-[var(--on-surface)]">Account Settings</h2>
      </div>

      {/* Avatar */}
      <div className="mb-8 flex flex-col items-start gap-6 md:flex-row">
        <div className="relative shrink-0">
          <Image
            alt="Profile avatar"
            className="size-24 rounded-2xl object-cover shadow-lg"
            height={96}
            src={AVATAR}
            width={96}
          />
          <button
            type="button"
            className="absolute -bottom-2 -right-2 flex size-8 cursor-pointer items-center justify-center rounded-full bg-[var(--primary)] text-white shadow-lg tonal-transition hover:scale-110"
          >
            <EditIcon className="size-3.5" />
          </button>
        </div>
        <div className="pt-1">
          <h3 className="font-bold text-[var(--on-surface)]">Profile Picture</h3>
          <p className="mt-1 text-xs text-[var(--on-surface-variant)]">
            Recommended size 400×400 px. JPG or PNG.
          </p>
        </div>
      </div>

      {/* Name + email */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label className="ml-1 block text-xs font-bold uppercase tracking-wider text-[var(--on-surface-variant)]">
            Full Name
          </label>
          <input
            className={fieldClass}
            type="text"
            placeholder="Your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="ml-1 block text-xs font-bold uppercase tracking-wider text-[var(--on-surface-variant)]">
            Email Address
          </label>
          <input
            className={fieldClass}
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      {/* Password row */}
      <div className="rounded-xl bg-[var(--surface-container-low)] p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex size-10 items-center justify-center rounded-lg bg-[var(--surface-container-lowest)] shadow-sm">
              <LockIcon className="size-5 text-[var(--outline)]" />
            </div>
            <div>
              <p className="text-sm font-bold text-[var(--on-surface)]">Password</p>
              <p className="text-[11px] font-medium uppercase tracking-tight text-[var(--outline)]">
                Last changed 3 months ago
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowPasswordForm((s) => !s)}
            className="cursor-pointer text-sm font-bold text-[var(--primary)] hover:underline"
          >
            {showPasswordForm ? 'Cancel' : 'Change Password'}
          </button>
        </div>

        {/* Inline password form */}
        {showPasswordForm && (
          <div className="mt-5 space-y-4 border-t border-[var(--surface-container-highest)] pt-5">
            <PasswordField label="Current Password" placeholder="Enter current password" value={currentPw} onChange={setCurrentPw} />
            <PasswordField label="New Password" placeholder="Min. 8 characters" value={newPw} onChange={setNewPw} />
            <div className="space-y-1">
              <PasswordField label="Confirm New Password" placeholder="Repeat new password" value={confirmPw} onChange={setConfirmPw} />
              {passwordMismatch && (
                <p className="ml-1 text-xs font-medium text-[var(--error)]">Passwords do not match.</p>
              )}
            </div>
            <div className="flex gap-3 pt-1">
              <button
                type="button"
                disabled={!currentPw || !newPw || !confirmPw || passwordMismatch}
                className="cursor-pointer rounded-xl bg-gradient-to-r from-[#0058be] to-[#2170e4] px-5 py-2.5 text-sm font-bold text-white tonal-transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Update Password
              </button>
              <button
                type="button"
                onClick={handleCancelPassword}
                className="cursor-pointer rounded-xl bg-[var(--surface-container-high)] px-5 py-2.5 text-sm font-bold text-[var(--on-surface-variant)] tonal-transition hover:bg-[var(--surface-container-highest)]"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

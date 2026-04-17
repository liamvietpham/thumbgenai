"use client";

import { useState } from "react";
import { useThemeStore } from "@/store";

function SunIcon({ className = "" }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <circle cx={12} cy={12} r={4} />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}
function MoonIcon({ className = "" }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9" />
    </svg>
  );
}
function MonitorIcon({ className = "" }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <rect x={2} y={3} width={20} height={14} rx={2} />
      <path d="M8 21h8M12 17v4" />
    </svg>
  );
}

export function PreferencesCard() {
  const { theme, setTheme } = useThemeStore();
  const [savedTheme, setSavedTheme] = useState(theme);
  const preferencesDirty = theme !== savedTheme;

  const handleSavePreferences = () => {
    setSavedTheme(theme);
  };

  return (
    <div className="flex flex-col rounded-3xl border border-[rgba(194,198,214,0.4)] bg-(--surface-container-lowest) p-5 shadow-sm md:p-8">
      <div className="mb-8 flex items-center gap-2 font-bold text-(--primary)">
        <svg
          aria-hidden="true"
          className="size-5"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" />
          <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
        <h2 className="font-headline text-xl tracking-tight text-(--on-surface)">
          Preferences
        </h2>
      </div>

      <div className="flex-1 space-y-6">
        {/* Theme selector */}
        <div>
          <label className="mb-4 block text-sm font-bold text-(--on-surface-variant)">
            App Theme
          </label>
          <div className="grid grid-cols-3 gap-2 rounded-2xl bg-(--surface-container-low) p-1.5">
            {(
              [
                { key: "light", label: "Light", Icon: SunIcon },
                { key: "dark", label: "Dark", Icon: MoonIcon },
                { key: "system", label: "System", Icon: MonitorIcon },
              ] as const
            ).map(({ key, label, Icon }) => (
              <button
                key={key}
                type="button"
                onClick={() => setTheme(key)}
                className={`flex cursor-pointer flex-col items-center gap-2 rounded-xl px-2 py-3 text-xs font-bold transition-all tonal-transition ${
                  theme === key
                    ? "bg-(--surface-container-lowest) text-(--primary) shadow-sm"
                    : "text-(--on-surface-variant) hover:bg-(--surface-container-highest)/50"
                }`}
              >
                <Icon className="size-5" />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Language — hidden for now */}
      </div>

      {/* Save */}
      <div className="mt-8 border-t border-(--surface-container-high) pt-6">
        <button
          type="button"
          onClick={handleSavePreferences}
          disabled={!preferencesDirty}
          className="inline-flex w-full cursor-pointer items-center justify-center rounded-xl bg-linear-to-r from-[#0058be] to-[#2170e4] px-5 py-4 font-bold text-white shadow-lg shadow-[rgba(0,88,190,0.20)] tonal-transition hover:scale-[1.01] active:scale-[0.98] disabled:cursor-not-allowed disabled:scale-100 disabled:opacity-45"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}

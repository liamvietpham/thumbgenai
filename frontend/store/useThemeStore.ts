"use client";

import { create } from "zustand";

export type Theme = "light" | "dark" | "system";

interface ThemeState {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

function resolveIsDark(theme: Theme): boolean {
  if (theme === "system") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  return theme === "dark";
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", resolveIsDark(theme));
  localStorage.setItem("theme", theme);
  const resolved = resolveIsDark(theme) ? "dark" : "light";
  document.cookie = `theme=${resolved}; path=/; max-age=31536000; SameSite=Lax`;
}


export const useThemeStore = create<ThemeState>((set, get) => ({
  theme: "light",
  toggleTheme: () => {
    const next = get().theme === "light" ? "dark" : "light";
    set({ theme: next });
    applyTheme(next);
  },
  setTheme: (theme: Theme) => {
    set({ theme });
    applyTheme(theme);
  },
}));

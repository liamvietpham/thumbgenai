"use client";

import { useThemeStore } from "@/store";
import { type Theme } from "@/store/useThemeStore";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

const themeOptions: Array<{
    value: Theme;
    label: string;
    icon: ReactNode;
}> = [
    { value: "light", label: "Light", icon: <SunIcon /> },
    { value: "dark", label: "Dark", icon: <MoonIcon /> },
    { value: "system", label: "System", icon: <MonitorIcon /> }
];

export function ThemeToggle() {
    const { theme, setTheme } = useThemeStore();
    const [open, setOpen] = useState(false);
    const rootRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (theme !== "system") return;

        const mq = window.matchMedia("(prefers-color-scheme: dark)");

        const handler = () => {
            const isDark = mq.matches;
            document.documentElement.classList.toggle("dark", isDark);
            document.cookie = `theme=${theme}; path=/; max-age=31536000; SameSite=Lax`;
        };

        mq.addEventListener("change", handler);

        return () => mq.removeEventListener("change", handler);
    }, [theme]);

    useEffect(() => {
        const stored = localStorage.getItem("theme") as Theme | null;
        const prefersDark = window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches;
        setTheme(stored || (prefersDark ? "dark" : "light"));
    }, [setTheme]);

    useEffect(() => {
        const onPointerDown = (event: MouseEvent) => {
            const target = event.target as Node;

            if (rootRef.current && !rootRef.current.contains(target)) {
                setOpen(false);
            }
        };

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", onPointerDown);
        document.addEventListener("keydown", onKeyDown);

        return () => {
            document.removeEventListener("mousedown", onPointerDown);
            document.removeEventListener("keydown", onKeyDown);
        };
    }, []);

    const currentTheme =
        themeOptions.find((option) => option.value === theme) ??
        themeOptions[0];

    return (
        <div ref={rootRef} className="relative">
            <button
                type="button"
                onClick={() => setOpen((value) => !value)}
                aria-haspopup="menu"
                aria-expanded={open}
                aria-label={`Theme: ${currentTheme.label}`}
                className="cursor-pointer inline-flex h-9 items-center justify-center gap-2 rounded-xl border border-(--outline-variant) bg-(--surface-container-low) size-9 text-(--on-surface-variant) tonal-transition hover:bg-(--surface-container) hover:text-(--on-surface)"
            >
                {currentTheme.icon}
            </button>

            <div
                role="menu"
                aria-label="Theme options"
                className={`absolute right-0 top-[calc(100%+0.75rem)] w-44 rounded-2xl border border-[rgba(194,198,214,0.5)] bg-(--surface-container-lowest) p-2 shadow-[0_20px_40px_rgba(25,28,30,0.12)] tonal-transition ${
                    open
                        ? "translate-y-0 opacity-100"
                        : "pointer-events-none -translate-y-2 opacity-0"
                }`}
            >
                {themeOptions.map((option) => {
                    const active = option.value === theme;

                    return (
                        <button
                            key={option.value}
                            type="button"
                            role="menuitemradio"
                            aria-checked={active}
                            onClick={() => {
                                setTheme(option.value);
                                setOpen(false);
                            }}
                            className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm tonal-transition ${
                                active
                                    ? "bg-(--surface-container-low) font-semibold text-(--primary)"
                                    : "text-(--on-surface) hover:bg-(--surface-container-low) cursor-pointer"
                            }`}
                        >
                            <span
                                className={
                                    active
                                        ? "text-(--primary)"
                                        : "text-(--on-surface-variant)"
                                }
                            >
                                {option.icon}
                            </span>
                            <span className="flex-1">{option.label}</span>
                            {active && (
                                <span className="text-xs font-semibold text-(--primary)">
                                    Active
                                </span>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

function SunIcon() {
    return (
        <svg
            aria-hidden="true"
            className="size-4"
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M12 3v1m0 16v1M4.22 4.22l.7.7m12.16 12.16.7.7M3 12h1m16 0h1M4.92 19.08l.7-.7M18.36 5.64l.7-.7M12 7a5 5 0 1 0 0 10A5 5 0 0 0 12 7Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
            />
        </svg>
    );
}

function MoonIcon() {
    return (
        <svg
            aria-hidden="true"
            className="size-4"
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
            />
        </svg>
    );
}

function MonitorIcon() {
    return (
        <svg
            aria-hidden="true"
            className="size-4"
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect
                height="14"
                rx="2"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
                width="20"
                x="2"
                y="3"
            />
            <path
                d="M8 21h8M12 17v4"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
            />
        </svg>
    );
}

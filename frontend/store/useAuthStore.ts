"use client";

import { create } from "zustand";

type User = {
  id: string;
  name: string;
  email: string;
  credits: number;
  createdAt?: string;
  updatedAt?: string;
  lastLoginAt?: string;
  pwdUpdatedAt?: string;
};

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));

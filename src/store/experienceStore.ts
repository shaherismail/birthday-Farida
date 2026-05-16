"use client";

// ============================================================
// EXPERIENCE STORE — Global cinematic experience state
//
// WHY ZUSTAND:
//   Manages cross-component state without prop drilling.
//   The intro phase, card open state, and confetti trigger
//   need to be accessible from multiple disconnected components.
//   Zustand gives atomic, performant subscriptions — components
//   only re-render when their specific slice changes.
// ============================================================

import { create } from "zustand";
import { persist } from "zustand/middleware";

// === Types ===
export type ExperiencePhase =
  | "intro"        // Fullscreen pink intro with orbs
  | "cake"         // Birthday cake scene with confetti
  | "hero"         // Main hero section visible
  | "experience";  // Full scroll experience unlocked

interface ExperienceStore {
  // Current cinematic phase
  phase: ExperiencePhase;
  setPhase: (phase: ExperiencePhase) => void;

  // Card/envelope state
  isCardOpen: boolean;
  isCardFullyOpen: boolean;
  openCard: () => void;
  setCardFullyOpen: () => void;
  closeCard: () => void;

  // Confetti state
  confettiActive: boolean;
  triggerConfetti: () => void;
  clearConfetti: () => void;

  // Scroll lock state
  scrollLocked: boolean;
  lockScroll: () => void;
  unlockScroll: () => void;

  // Music state
  musicPlaying: boolean;
  toggleMusic: () => void;
  setMusicPlaying: (playing: boolean) => void;
}

export const useExperienceStore = create<ExperienceStore>((set) => ({
  // === Phase ===
  phase: "intro",
  setPhase: (phase) => set({ phase }),

  // === Card ===
  isCardOpen: false,
  isCardFullyOpen: false,
  openCard: () => set({ isCardOpen: true }),
  setCardFullyOpen: () => set({ isCardFullyOpen: true }),
  closeCard: () => set({ isCardOpen: false, isCardFullyOpen: false }),

  // === Confetti ===
  confettiActive: false,
  triggerConfetti: () => set({ confettiActive: true }),
  clearConfetti: () => set({ confettiActive: false }),

  // === Scroll ===
  scrollLocked: false,
  lockScroll: () => {
    if (typeof document !== 'undefined') {
      document.body.classList.add("scroll-locked");
    }
    set({ scrollLocked: true });
  },
  unlockScroll: () => {
    if (typeof document !== 'undefined') {
      document.body.classList.remove("scroll-locked");
    }
    set({ scrollLocked: false });
  },

  // === Music ===
  musicPlaying: false,
  toggleMusic: () => set((state) => ({ musicPlaying: !state.musicPlaying })),
  setMusicPlaying: (playing) => set({ musicPlaying: playing }),
}));

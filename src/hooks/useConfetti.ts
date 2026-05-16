"use client";

// ============================================================
// useConfetti — Wraps canvas-confetti library
//
// WHY A HOOK:
//   Isolates confetti logic from component render logic.
//   canvas-confetti is a side-effect — it imperatively draws
//   on a canvas. Keeping it in a hook prevents misuse and
//   makes it reusable from any component or event handler.
// ============================================================

import { useCallback, useRef } from "react";

interface ConfettiOptions {
  /**
   * Duration of the full confetti burst in milliseconds
   * Default: 3000ms (3 seconds)
   */
  duration?: number;

  /**
   * Number of confetti particles per burst
   * Default: 150
   */
  particleCount?: number;

  /**
   * Confetti colors — defaults to the site palette
   * (red, pink, white, dark pink)
   */
  colors?: string[];
}

export function useConfetti() {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fire = useCallback(async (options: ConfettiOptions = {}) => {
    const {
      duration = 3500,
      particleCount = 60,
      colors = ["#cc2936", "#e8717a", "#ffffff", "#c94b57", "#f09a9d", "#ff6b7a"],
    } = options;

    // Dynamic import — canvas-confetti is only loaded when needed
    // This keeps the initial bundle smaller
    const confetti = (await import("canvas-confetti")).default;

    const end = Date.now() + duration;

    // Clear any existing confetti interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Fire confetti in short bursts from both sides
    // This creates the "celebration" feel seen in the screenshots
    intervalRef.current = setInterval(() => {
      if (Date.now() > end) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        return;
      }

      // Left side burst
      confetti({
        particleCount: Math.floor(particleCount / 3),
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors,
        gravity: 0.8,
        drift: 0.5,
      });

      // Right side burst
      confetti({
        particleCount: Math.floor(particleCount / 3),
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors,
        gravity: 0.8,
        drift: -0.5,
      });
    }, 250);
  }, []);

  /**
   * Single explosive burst — for the cake reveal moment
   * One big explosion from the top center
   */
  const burst = useCallback(async (options: ConfettiOptions = {}) => {
    const {
      particleCount = 200,
      colors = ["#cc2936", "#e8717a", "#ffffff", "#c94b57", "#f09a9d", "#ff6b7a"],
    } = options;

    const confetti = (await import("canvas-confetti")).default;

    confetti({
      particleCount,
      angle: 90,
      spread: 120,
      origin: { x: 0.5, y: 0 },
      colors,
      gravity: 0.6,
      scalar: 1.2,
    });
  }, []);

  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  return { fire, burst, stop };
}

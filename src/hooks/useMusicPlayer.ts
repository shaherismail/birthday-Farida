"use client";

// ============================================================
// useMusicPlayer — Audio management for background music (Singleton)
//
// WHY SINGLETON:
//   By maintaining a single global audio instance, we prevent
//   overlapping playback when multiple components invoke the hook.
//   It allows any component (e.g. IntroLoader start button) to trigger
//   playback, and the floating MusicPlayer toggle will automatically
//   sync with the playing state.
// ============================================================

import { useCallback, useEffect, useState } from "react";

interface UseMusicPlayerOptions {
  src: string;
  volume?: number;
  loop?: boolean;
  fadeDuration?: number; // milliseconds for fade in/out
}

interface MusicPlayerReturn {
  isPlaying: boolean;
  toggle: () => void;
  fadeIn: () => void;
  fadeOut: () => void;
  setVolume: (vol: number) => void;
}

// Singleton state outside hook
let globalAudio: HTMLAudioElement | null = null;
let globalFadeInterval: ReturnType<typeof setInterval> | null = null;
const subscribers = new Set<(playing: boolean) => void>();

export function useMusicPlayer({
  src,
  volume = 0.35,
  loop = true,
  fadeDuration = 1500,
}: UseMusicPlayerOptions): MusicPlayerReturn {
  const [isPlaying, setIsPlaying] = useState(false);

  // Sync state with global subscribers
  useEffect(() => {
    const handleUpdate = (playing: boolean) => {
      setIsPlaying(playing);
    };
    subscribers.add(handleUpdate);

    if (globalAudio) {
      setIsPlaying(!globalAudio.paused);
    }

    return () => {
      subscribers.delete(handleUpdate);
    };
  }, []);

  // Initialize global audio element and handle global window events
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!globalAudio) {
      globalAudio = new Audio(src);
      globalAudio.loop = loop;
      globalAudio.volume = 0; // Start silent for fade-in
      globalAudio.preload = "auto";
    }

    let hasStarted = false;
    const startAudio = () => {
      if (hasStarted || !globalAudio || !globalAudio.paused) return;
      hasStarted = true;

      globalAudio.play().then(() => {
        subscribers.forEach((sub) => sub(true));
        
        // Fade in
        const targetVolume = volume;
        const steps = 30;
        const stepDuration = fadeDuration / steps;
        const volumeStep = targetVolume / steps;
        let currentStep = 0;

        if (globalFadeInterval) clearInterval(globalFadeInterval);
        globalFadeInterval = setInterval(() => {
          currentStep++;
          if (globalAudio && currentStep <= steps) {
            globalAudio.volume = Math.min(currentStep * volumeStep, targetVolume);
          } else {
            if (globalFadeInterval) {
              clearInterval(globalFadeInterval);
              globalFadeInterval = null;
            }
          }
        }, stepDuration);

        cleanupListeners();
      }).catch(() => {
        hasStarted = false;
      });
    };

    const cleanupListeners = () => {
      window.removeEventListener("click", startAudio);
      window.removeEventListener("touchstart", startAudio);
      window.removeEventListener("keydown", startAudio);
    };

    // Attempt autoplay immediately
    startAudio();

    // Setup global interaction listeners
    window.addEventListener("click", startAudio);
    window.addEventListener("touchstart", startAudio);
    window.addEventListener("keydown", startAudio);

    return () => {
      cleanupListeners();
    };
  }, [src, loop, volume, fadeDuration]);

  const clearFadeInterval = useCallback(() => {
    if (globalFadeInterval) {
      clearInterval(globalFadeInterval);
      globalFadeInterval = null;
    }
  }, []);

  const fadeIn = useCallback(() => {
    if (!globalAudio) return;
    clearFadeInterval();

    globalAudio.play().then(() => {
      subscribers.forEach((sub) => sub(true));
    }).catch(() => {});

    const targetVolume = volume;
    const steps = 30;
    const stepDuration = fadeDuration / steps;
    const volumeStep = targetVolume / steps;
    let currentStep = 0;

    globalFadeInterval = setInterval(() => {
      currentStep++;
      if (globalAudio && currentStep <= steps) {
        globalAudio.volume = Math.min(currentStep * volumeStep, targetVolume);
      } else {
        clearFadeInterval();
      }
    }, stepDuration);
  }, [volume, fadeDuration, clearFadeInterval]);

  const fadeOut = useCallback(() => {
    if (!globalAudio) return;
    clearFadeInterval();

    const startVolume = globalAudio.volume;
    const steps = 30;
    const stepDuration = fadeDuration / steps;
    const volumeStep = startVolume / steps;
    let currentStep = 0;

    globalFadeInterval = setInterval(() => {
      currentStep++;
      if (globalAudio && currentStep <= steps) {
        globalAudio.volume = Math.max(startVolume - currentStep * volumeStep, 0);
      } else {
        if (globalAudio) globalAudio.pause();
        subscribers.forEach((sub) => sub(false));
        clearFadeInterval();
      }
    }, stepDuration);
  }, [fadeDuration, clearFadeInterval]);

  const toggle = useCallback(() => {
    if (globalAudio && !globalAudio.paused) {
      fadeOut();
    } else {
      fadeIn();
    }
  }, [fadeIn, fadeOut]);

  const setVolume = useCallback((vol: number) => {
    if (globalAudio) {
      globalAudio.volume = Math.max(0, Math.min(1, vol));
    }
  }, []);

  return { isPlaying, toggle, fadeIn, fadeOut, setVolume };
}

"use client";

// ============================================================
// useMusicPlayer — Audio management for background music
//
// WHY A HOOK:
//   Audio is a browser API side-effect. Encapsulating it in a
//   hook prevents hydration issues (server doesn't have Audio).
//   Handles: autoplay policy, fade in/out, mobile restrictions,
//   and cleanup on unmount.
// ============================================================

import { useCallback, useEffect, useRef, useState } from "react";

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

export function useMusicPlayer({
  src,
  volume = 0.35,
  loop = true,
  fadeDuration = 1500,
}: UseMusicPlayerOptions): MusicPlayerReturn {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Initialize audio element and handle autoplay on mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    const audio = new Audio(src);
    audio.loop = loop;
    audio.volume = 0; // Start silent for fade-in
    audio.preload = "auto";

    audioRef.current = audio;

    let hasStarted = false;
    const startAudio = () => {
      if (hasStarted || !audioRef.current) return;
      hasStarted = true;

      audio.play().then(() => {
        setIsPlaying(true);
        // Fade in volume
        const targetVolume = volume;
        const steps = 30;
        const stepDuration = fadeDuration / steps;
        const volumeStep = targetVolume / steps;
        let currentStep = 0;

        if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
        fadeIntervalRef.current = setInterval(() => {
          currentStep++;
          if (audioRef.current && currentStep <= steps) {
            audioRef.current.volume = Math.min(currentStep * volumeStep, targetVolume);
          } else {
            if (fadeIntervalRef.current) {
              clearInterval(fadeIntervalRef.current);
              fadeIntervalRef.current = null;
            }
          }
        }, stepDuration);

        // Remove listeners once successfully playing
        cleanupListeners();
      }).catch(() => {
        // Reset flag if play was blocked so it can retry on next interaction
        hasStarted = false;
      });
    };

    const cleanupListeners = () => {
      window.removeEventListener("click", startAudio);
      window.removeEventListener("touchstart", startAudio);
      window.removeEventListener("keydown", startAudio);
    };

    // Try to play immediately (some browser settings allow this)
    startAudio();

    // Set up listeners for the first interaction to bypass autoplay restrictions
    window.addEventListener("click", startAudio);
    window.addEventListener("touchstart", startAudio);
    window.addEventListener("keydown", startAudio);

    // Cleanup on unmount
    return () => {
      cleanupListeners();
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, [src, loop, volume, fadeDuration]);

  const clearFadeInterval = useCallback(() => {
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
      fadeIntervalRef.current = null;
    }
  }, []);

  const fadeIn = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    clearFadeInterval();

    // Play first (may be blocked by browser autoplay policy)
    audio.play().catch(() => {
      // Autoplay blocked — user must interact first
      // This is handled by the music toggle button
    });

    const targetVolume = volume;
    const steps = 30;
    const stepDuration = fadeDuration / steps;
    const volumeStep = targetVolume / steps;

    let currentStep = 0;
    fadeIntervalRef.current = setInterval(() => {
      currentStep++;
      if (audio && currentStep <= steps) {
        audio.volume = Math.min(currentStep * volumeStep, targetVolume);
      } else {
        clearFadeInterval();
      }
    }, stepDuration);

    setIsPlaying(true);
  }, [volume, fadeDuration, clearFadeInterval]);

  const fadeOut = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    clearFadeInterval();

    const startVolume = audio.volume;
    const steps = 30;
    const stepDuration = fadeDuration / steps;
    const volumeStep = startVolume / steps;

    let currentStep = 0;
    fadeIntervalRef.current = setInterval(() => {
      currentStep++;
      if (audio && currentStep <= steps) {
        audio.volume = Math.max(startVolume - currentStep * volumeStep, 0);
      } else {
        audio.pause();
        clearFadeInterval();
        setIsPlaying(false);
      }
    }, stepDuration);
  }, [fadeDuration, clearFadeInterval]);

  const toggle = useCallback(() => {
    if (isPlaying) {
      fadeOut();
    } else {
      fadeIn();
    }
  }, [isPlaying, fadeIn, fadeOut]);

  const setVolume = useCallback((vol: number) => {
    if (audioRef.current) {
      audioRef.current.volume = Math.max(0, Math.min(1, vol));
    }
  }, []);

  return { isPlaying, toggle, fadeIn, fadeOut, setVolume };
}

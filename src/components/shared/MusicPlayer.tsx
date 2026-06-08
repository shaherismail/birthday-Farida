"use client";

// ============================================================
// MusicPlayer — Floating music toggle button
//
// WHY CLIENT COMPONENT:
//   Audio API is browser-only. This component must be a Client
//   Component to use the useMusicPlayer hook safely.
//
// POSITION:
//   Fixed bottom-right corner — always accessible, never intrusive.
//   Uses z-index 9999 to float above all content.
//
// VISUAL:
//   Circular pink button with music note / pause icon.
//   Animated waveform bars when playing.
//   Pulse glow animation draws attention without being annoying.
//
// BEHAVIOR:
//   - First click: user gesture enables audio → fade in
//   - Second click: fade out
//   - Uses the confirmed music note styling from the reference
// ============================================================

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMusicPlayer } from "@/hooks/useMusicPlayer";
import { siteConfig } from "@/config/site";

// Waveform bars animation — shows when music is playing
function WaveformBars() {
  return (
    <div className="flex items-end gap-0.5" style={{ height: "18px" }}>
      {[1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          style={{
            width: "3px",
            background: "white",
            borderRadius: "2px",
          }}
          animate={{
            height: ["4px", `${6 + i * 4}px`, "4px"],
          }}
          transition={{
            duration: 0.6 + i * 0.1,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.1,
          }}
        />
      ))}
    </div>
  );
}

// Music note icon (when paused)
function MusicNoteIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
      <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
    </svg>
  );
}

export function MusicPlayer() {
  // Plays the background song configured in siteConfig, defaulting to videoplayback.m4a
  const { isPlaying, toggle } = useMusicPlayer({
    src: siteConfig.musicUrl || "/audio/videoplayback.m4a",
    volume: 0.3,
    loop: true,
    fadeDuration: 1500,
  });

  return (
    <motion.button
      className="music-btn"
      onClick={toggle}
      title={isPlaying ? "Pause music" : "Play music"}
      aria-label={isPlaying ? "Pause background music" : "Play background music"}
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.92 }}
      animate={{
        boxShadow: isPlaying
          ? [
              "0 4px 20px rgba(232, 113, 122, 0.5)",
              "0 4px 35px rgba(232, 113, 122, 0.8)",
              "0 4px 20px rgba(232, 113, 122, 0.5)",
            ]
          : "0 4px 20px rgba(232, 113, 122, 0.5)",
      }}
      transition={
        isPlaying
          ? { duration: 2, repeat: Infinity, ease: "easeInOut" }
          : { duration: 0.3 }
      }
    >
      <AnimatePresence mode="wait">
        {isPlaying ? (
          <motion.div
            key="waveform"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <WaveformBars />
          </motion.div>
        ) : (
          <motion.div
            key="note"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <MusicNoteIcon />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

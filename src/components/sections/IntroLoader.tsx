"use client";

// ============================================================
// IntroLoader — Phase 1: Pink screen with starting card & floating orbs
//
// WHAT IT IS:
//   The first view of the site. Displays a premium welcome card
//   prompting the user to click "Open surprise" to start. This
//   bypasses browser autoplay restrictions for the background music.
// ============================================================

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlowOrbs } from "@/components/birthday/FloatingDecorations";
import { useExperienceStore } from "@/store/experienceStore";
import { sleep } from "@/lib/utils";
import { useMusicPlayer } from "@/hooks/useMusicPlayer";
import { siteConfig } from "@/config/site";

export function IntroLoader() {
  const { phase, setPhase } = useExperienceStore();
  const isVisible = phase === "intro";
  const [isStarted, setIsStarted] = useState(false);

  // Instantiates the global singleton player
  const { fadeIn } = useMusicPlayer({
    src: siteConfig.musicUrl || "/audio/videoplayback.m4a",
  });

  // Cinematic timing sequence runs only after user initiates the entry
  useEffect(() => {
    if (phase !== "intro" || !isStarted) return;

    const sequence = async () => {
      // Wait for the loading bar animation cycle
      await sleep(2400);
      // Transition to cake scene
      setPhase("cake");
    };

    sequence();
  }, [phase, setPhase, isStarted]);

  const handleStart = () => {
    setIsStarted(true);
    fadeIn(); // Start the background music singleton
  };

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          key="intro-loader"
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, #d45f6a 0%, #e8717a 40%, #c94b57 100%)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] },
          }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* === Floating Glow Orbs === */}
          <GlowOrbs />

          {/* === Center Starting Card or Loader Line === */}
          <div className="relative z-10 flex flex-col items-center gap-6 px-4">
            {!isStarted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/95 p-8 md:p-10 rounded-[2.5rem] shadow-2xl max-w-sm text-center border border-pink-100/50 flex flex-col items-center"
              >
                <motion.div
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="text-5xl mb-4"
                >
                  🎁
                </motion.div>
                <h1 className="font-display text-[#c94b57] text-3xl mb-2">
                  You Have a Surprise!
                </h1>
                <p className="text-slate-500 text-xs font-semibold mb-6 leading-relaxed">
                  A beautiful cinematic experience has been crafted with love just for you. Click below to open.
                </p>
                <button
                  onClick={handleStart}
                  className="px-8 py-4 bg-gradient-to-r from-[#e8717a] to-[#c94b57] text-white font-bold rounded-2xl shadow-xl shadow-pink-200 hover:scale-[1.03] active:scale-95 transition-all cursor-pointer text-sm animate-pulse-glow"
                >
                  Open surprise 💖
                </button>
              </motion.div>
            ) : (
              /* The thin horizontal loading line */
              <motion.div
                style={{
                  width: "180px",
                  height: "2px",
                  background: "rgba(255, 255, 255, 0.75)",
                  borderRadius: "2px",
                  transformOrigin: "left center",
                }}
                initial={{ scaleX: 0, opacity: 0.5 }}
                animate={{
                  scaleX: [0, 1, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2.2,
                  times: [0, 0.7, 1],
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

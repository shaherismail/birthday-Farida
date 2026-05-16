"use client";

// ============================================================
// IntroLoader — Phase 1: Pink screen with floating orbs
//
// WHAT IT IS:
//   The very first thing the user sees. A fullscreen warm-rose
//   pink background with 4 large floating blur orbs (matching
//   screenshot 1 exactly) and a thin loading line in the center.
//
// EMOTIONAL GOAL:
//   Warm, soft, inviting. The pink immediately sets the emotional
//   palette — love, celebration, birthday joy.
//
// CINEMATIC PURPOSE:
//   Creates a "cinema curtain opening" feeling. The smooth fade-in
//   of the pink background followed by orbs drifting into position
//   gives the experience a theatrical weight.
//
// TIMING:
//   - Background fades in: 0.8s
//   - Orbs drift in: staggered 0.3s apart
//   - Loading line pulses: 1.8s cycle
//   - Total display: ~2.5s before transitioning to cake scene
//
// TRANSITION OUT:
//   The entire intro fades out (opacity: 0, scale: slightly up)
//   as the cake scene fades in behind it.
// ============================================================

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlowOrbs } from "@/components/birthday/FloatingDecorations";
import { useExperienceStore } from "@/store/experienceStore";
import { sleep } from "@/lib/utils";

export function IntroLoader() {
  const { phase, setPhase } = useExperienceStore();
  const isVisible = phase === "intro";

  // Cinematic timing sequence
  useEffect(() => {
    if (phase !== "intro") return;

    const sequence = async () => {
      // Wait for the intro to be visible and orbs to settle
      await sleep(2800);
      // Transition to cake scene
      setPhase("cake");
    };

    sequence();
  }, [phase, setPhase]);

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
          {/* === Floating Glow Orbs — matches screenshot 1 exactly === */}
          <GlowOrbs />

          {/* === Center Loading Indicator === */}
          <div className="relative z-10 flex flex-col items-center gap-6">
            {/* The thin horizontal loading line from screenshot 1 */}
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
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

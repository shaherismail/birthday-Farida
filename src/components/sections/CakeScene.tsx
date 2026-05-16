"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlowOrbs } from "@/components/birthday/FloatingDecorations";
import { useExperienceStore } from "@/store/experienceStore";
import { useConfetti } from "@/hooks/useConfetti";
import { sleep } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { useConfigStore } from "@/store/configStore";

// Birthday Cake SVG — hand-crafted to match the screenshot
function BirthdayCakeSVG({ size = 120 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
      <ellipse cx="60" cy="98" rx="48" ry="6" fill="rgba(255,255,255,0.3)" />
      <rect x="18" y="72" width="84" height="26" rx="6" fill="white" />
      <rect x="18" y="72" width="84" height="8" rx="4" fill="#f8c4c7" />
      <rect x="30" y="48" width="60" height="26" rx="6" fill="white" />
      <rect x="30" y="48" width="60" height="8" rx="4" fill="#f09a9d" />
      <path d="M18 80 Q24 76 30 80 Q36 84 42 80 Q48 76 54 80 Q60 84 66 80 Q72 76 78 80 Q84 84 90 80 Q96 76 102 80" stroke="#e8717a" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M30 56 Q36 52 42 56 Q48 60 54 56 Q60 52 66 56 Q72 60 78 56 Q84 52 90 56" stroke="#c94b57" strokeWidth="2" fill="none" strokeLinecap="round" />
      <circle cx="40" cy="86" r="3" fill="#cc2936" />
      <circle cx="60" cy="86" r="3" fill="#cc2936" />
      <circle cx="80" cy="86" r="3" fill="#cc2936" />
      <rect x="56" y="32" width="8" height="18" rx="4" fill="#e8717a" />
      <line x1="56" y1="38" x2="64" y2="38" stroke="white" strokeWidth="1.5" />
      <line x1="56" y1="43" x2="64" y2="43" stroke="white" strokeWidth="1.5" />
      <motion.path
        d="M60 30 C60 30 56 25 56 22 C56 18 58 16 60 14 C62 16 64 18 64 22 C64 25 60 30 60 30Z"
        fill="#FFD700"
        animate={{ d: ["M60 30 C60 30 56 25 56 22 C56 18 58 16 60 14 C62 16 64 18 64 22 C64 25 60 30 60 30Z", "M60 30 C60 30 55 24 55 21 C55 17 57 15 60 13 C63 15 65 17 65 21 C65 24 60 30 60 30Z", "M60 30 C60 30 56 25 56 22 C56 18 58 16 60 14 C62 16 64 18 64 22 C64 25 60 30 60 30Z"], fill: ["#FFD700", "#FFA500", "#FFD700"] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
      />
      <circle cx="60" cy="20" r="5" fill="rgba(255, 215, 0, 0.3)" />
    </svg>
  );
}

export function CakeScene() {
  const [mounted, setMounted] = useState(false);
  const { phase, setPhase } = useExperienceStore();
  const cakeHeading = useConfigStore((s) => s.cakeHeading);
  const { burst } = useConfetti();
  const isVisible = phase === "cake";

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    if (phase !== "cake") return;
    const sequence = async () => {
      await sleep(600);
      burst({ particleCount: 180, colors: ["#cc2936", "#e8717a", "#ffffff", "#c94b57", "#f09a9d"] });
      await sleep(3000);
      setPhase("hero");
    };
    sequence();
  }, [phase, setPhase, burst]);

  if (!mounted) return null;

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          key="cake-scene"
          className="fixed inset-0 z-[90] flex flex-col items-center justify-center gap-6"
          style={{ background: "linear-gradient(135deg, #d45f6a 0%, #e8717a 40%, #c94b57 100%)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1, ease: [0.43, 0.13, 0.23, 0.96] } }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <GlowOrbs />
          <motion.div className="relative z-10" initial={{ opacity: 0, scale: 0.4, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.34, 1.56, 0.64, 1], delay: 0.2 }}>
            <BirthdayCakeSVG size={130} />
          </motion.div>
          <motion.p
            className="relative z-10 font-script text-white text-center"
            style={{ fontSize: "clamp(1.8rem, 5vw, 3rem)", textShadow: "0 2px 20px rgba(0,0,0,0.15)", letterSpacing: "0.02em" }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.43, 0.13, 0.23, 0.96], delay: 0.7 }}
          >
            {cakeHeading}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

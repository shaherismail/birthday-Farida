"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { FloatingHearts, GlowOrbs } from "@/components/birthday/FloatingDecorations";
import { useConfetti } from "@/hooks/useConfetti";
import { siteConfig } from "@/config/site";
import { useConfigStore } from "@/store/configStore";
import { staggerContainer, fadeInUp, scaleBounce } from "@/animations/presets";

export function FinalSection() {
  const [mounted, setMounted] = useState(false);
  const personNameDisplay = useConfigStore((s) => s.personNameDisplay);
  const finalMessage = useConfigStore((s) => s.finalMessage);
  const ref = useRef<HTMLDivElement>(null);

  // Use a very lenient trigger for confetti
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const { fire } = useConfetti();
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Trigger confetti when this section enters view
  useEffect(() => {
    if (isInView && !hasTriggeredRef.current) {
      hasTriggeredRef.current = true;
      fire({ duration: 5000, particleCount: 80 });
    }
  }, [isInView, fire]);

  if (!mounted) return null;

  return (
    <section
      id="final"
      ref={ref}
      className="section-fullscreen flex items-center justify-center relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #d45f6a 0%, #e8717a 40%, #c94b57 100%)",
        zIndex: 5
      }}
    >
      {/* Background orbs */}
      <GlowOrbs />

      {/* Floating hearts - using white/light pink for visibility */}
      <FloatingHearts count={20} colors={["#ffffff", "#f8c4c7", "#ffd6d8", "#f09a9d"]} />

      {/* Content - Using animate="visible" to ensure it shows regardless of scroll margin */}
      <motion.div
        className="relative z-20 flex flex-col items-center text-center px-6"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Cake emoji */}
        <motion.div
          className="text-6xl mb-6"
          variants={scaleBounce}
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          🎂
        </motion.div>

        {/* Main heading */}
        <motion.h2
          className="font-display text-white"
          style={{
            fontSize: "clamp(2.5rem, 7vw, 5rem)",
            textShadow: "0 4px 20px rgba(0,0,0,0.2)"
          }}
          variants={fadeInUp}
        >
          Happy Birthday, {personNameDisplay || siteConfig.personNameDisplay}!
        </motion.h2>

        {/* Subheading */}
        <motion.p
          className="font-script text-white mt-3 opacity-90"
          style={{ fontSize: "clamp(1.3rem, 3vw, 2rem)" }}
          variants={fadeInUp}
        >
          {siteConfig.final.subheading}
        </motion.p>

        {/* Message */}
        <motion.p
          className="font-body text-white/90 mt-4 max-w-2xl mx-auto leading-relaxed text-center"
          style={{
            fontSize: "clamp(1.1rem, 2vw, 1.3rem)",
            textAlign: "center",
            width: "100%"
          }}
          variants={fadeInUp}
        >
          {finalMessage || siteConfig.final.message}
        </motion.p>

        {/* Replay CTA */}
        <motion.button
          className="mt-12 px-12 py-5 rounded-full font-body font-bold relative group overflow-hidden"
          style={{
            background: "rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(15px)",
            WebkitBackdropFilter: "blur(15px)",
            color: "white",
            border: "1px solid rgba(255, 255, 255, 0.4)",
            cursor: "pointer",
            fontSize: "1.1rem",
            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.2), inset 0 0 20px rgba(255,255,255,0.1)",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.85rem",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
          }}
          variants={scaleBounce}
          whileHover={{
            scale: 1.05,
            y: -5,
            background: "rgba(255, 255, 255, 0.25)",
            boxShadow: "0 20px 50px rgba(0, 0, 0, 0.25), 0 0 15px rgba(255,255,255,0.4)"
          }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          {/* Rotating Icon */}
          <motion.div
            style={{ fontSize: "1.3rem" }}
            animate={{ rotate: 360 }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
              <polyline points="21 3 21 8 16 8" />
            </svg>
          </motion.div>

          <span className="relative z-10">{siteConfig.final.cta}</span>

          {/* Animated Glow Overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            style={{ skewX: -20, left: "-150%" }}
            animate={{ left: "150%" }}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
          />
        </motion.button>

        {/* Heart decoration */}
        <motion.p
          className="mt-8 text-white/60 font-script"
          style={{ fontSize: "1.1rem" }}
          variants={fadeInUp}
        >
          Made with ❤️ for {personNameDisplay || siteConfig.personNameDisplay}
        </motion.p>
      </motion.div>
    </section>
  );
}

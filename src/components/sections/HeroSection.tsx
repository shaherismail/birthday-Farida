"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  staggerContainer,
  fadeInUp,
  scaleBounce,
  EASE_CINEMATIC,
  EASE_SPRING,
} from "@/animations/presets";
import { useExperienceStore } from "@/store/experienceStore";
import { useConfigStore } from "@/store/configStore";
import { siteConfig } from "@/config/site";

// ============================================================
// FONT MATCH: الصور بتستخدم "Lilita One" — خط كارتون ثقيل
// ============================================================

function PartyHatIcon({ size = 52 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <polygon points="50,5 90,85 10,85" fill="#e8717a" />
      <clipPath id="hatClip"><polygon points="50,5 90,85 10,85" /></clipPath>
      <g clipPath="url(#hatClip)">
        <line x1="20" y1="0" x2="0" y2="100" stroke="white" strokeWidth="8" opacity="0.4" />
        <line x1="45" y1="0" x2="25" y2="100" stroke="white" strokeWidth="8" opacity="0.4" />
        <line x1="70" y1="0" x2="50" y2="100" stroke="white" strokeWidth="8" opacity="0.4" />
        <line x1="95" y1="0" x2="75" y2="100" stroke="white" strokeWidth="8" opacity="0.4" />
      </g>
      <ellipse cx="50" cy="85" rx="42" ry="9" fill="#c94b57" />
      <circle cx="50" cy="8" r="9" fill="#ffd6d8" stroke="white" strokeWidth="2" />
      <circle cx="50" cy="8" r="5" fill="#f09a9d" />
    </svg>
  );
}

function Balloon({ color, size = 70, delay = 0 }: { color: string; size?: number; delay?: number }) {
  const highlight = "rgba(255,255,255,0.35)";
  return (
    <motion.div style={{ display: "inline-block" }} animate={{ rotate: [-4, 4, -4], y: [0, -6, 0] }} transition={{ duration: 2.5 + delay * 0.5, repeat: Infinity, ease: "easeInOut", delay }}>
      <svg width={size} height={Math.round(size * 1.45)} viewBox="0 0 70 102" fill="none">
        <ellipse cx="35" cy="36" rx="28" ry="32" fill={color} />
        <ellipse cx="26" cy="23" rx="9" ry="11" fill={highlight} />
        <ellipse cx="44" cy="52" rx="4" ry="3" fill={highlight} opacity="0.5" />
        <polygon points="35,68 31,76 39,76" fill={color} />
        <path d="M35 76 Q30 85 35 92 Q40 96 35 102" stroke="rgba(0,0,0,0.25)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </svg>
    </motion.div>
  );
}

function SmileyFace({ size = 52 }: { size?: number }) {
  return (
    <motion.div animate={{ rotate: [0, 4, -4, 0], scale: [1, 1.04, 1] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}>
      <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
        <circle cx="30" cy="30" r="27" stroke="#2d1b1e" strokeWidth="3" fill="none" />
        <circle cx="21" cy="24" r="3.5" fill="#2d1b1e" />
        <circle cx="39" cy="24" r="3.5" fill="#2d1b1e" />
        <path d="M17 36 Q30 48 43 36" stroke="#2d1b1e" strokeWidth="3" fill="none" strokeLinecap="round" />
      </svg>
    </motion.div>
  );
}

const DECO_ITEMS = [
  { type: "star4", x: "6%", y: "8%", color: "#e8717a", size: 15 },
  { type: "star4", x: "88%", y: "12%", color: "#cc2936", size: 13 },
  { type: "star4", x: "15%", y: "72%", color: "#c94b57", size: 17 },
  { type: "star4", x: "75%", y: "80%", color: "#e8717a", size: 12 },
  { type: "star4", x: "55%", y: "6%", color: "#c94b57", size: 11 },
  { type: "star4", x: "92%", y: "55%", color: "#cc2936", size: 14 },
  { type: "star4", x: "35%", y: "88%", color: "#e8717a", size: 12 },
  { type: "star4", x: "70%", y: "35%", color: "#c94b57", size: 10 },
  { type: "plus", x: "20%", y: "18%", color: "#1a1a1a", size: 15 },
  { type: "plus", x: "80%", y: "22%", color: "#1a1a1a", size: 17 },
  { type: "plus", x: "10%", y: "50%", color: "#1a1a1a", size: 13 },
  { type: "plus", x: "90%", y: "75%", color: "#1a1a1a", size: 15 },
  { type: "plus", x: "48%", y: "92%", color: "#1a1a1a", size: 12 },
  { type: "plus", x: "62%", y: "15%", color: "#1a1a1a", size: 14 },
  { type: "dot", x: "30%", y: "10%", color: "#e8717a", size: 9 },
  { type: "dot", x: "65%", y: "60%", color: "#cc2936", size: 8 },
  { type: "dot", x: "4%", y: "85%", color: "#e8717a", size: 10 },
  { type: "dot", x: "85%", y: "45%", color: "#c94b57", size: 8 },
  { type: "dot", x: "50%", y: "78%", color: "#cc2936", size: 9 },
  { type: "dot", x: "22%", y: "40%", color: "#e8717a", size: 7 },
] as const;

function DecoShape({ type, size, color }: { type: "star4" | "plus" | "dot"; size: number; color: string }) {
  if (type === "star4") return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill={color}>
      <path d="M10 0 L11.5 8.5 L20 10 L11.5 11.5 L10 20 L8.5 11.5 L0 10 L8.5 8.5 Z" />
    </svg>
  );
  if (type === "plus") return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <line x1="10" y1="1" x2="10" y2="19" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="1" y1="10" x2="19" y2="10" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
  return (
    <svg width={size} height={size} viewBox="0 0 10 10">
      <circle cx="5" cy="5" r="4" fill={color} />
    </svg>
  );
}

function ScatteredDecorations() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true" style={{ zIndex: 1 }}>
      {DECO_ITEMS.map((item, i) => (
        <motion.div key={i} className="absolute" style={{ left: item.x, top: item.y }} animate={{ y: [0, item.type === "plus" ? -4 : -7, 0], rotate: item.type === "star4" ? [0, 20, 0] : [0, 0, 0], scale: [1, 1.1, 1] }} transition={{ duration: 3 + (i % 4) * 0.7, repeat: Infinity, ease: "easeInOut", delay: (i % 6) * 0.4 }}>
          <DecoShape type={item.type} size={item.size} color={item.color} />
        </motion.div>
      ))}
    </div>
  );
}

function ProfilePhoto() {
  const config = useConfigStore();
  return (
    <div className="relative" style={{ width: "clamp(190px, 26vw, 300px)", height: "clamp(190px, 26vw, 300px)" }}>
      <div className="w-full h-full rounded-full overflow-hidden" style={{ border: "5px solid white", boxShadow: "0 0 0 4px #e8717a, 0 10px 40px rgba(232, 113, 122, 0.35)", background: "linear-gradient(135deg, #f8c4c7 0%, #e8717a 100%)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
        {config.profileImage ? (
          <img src={config.profileImage} alt={config.personNameDisplay} className="w-full h-full object-cover" />
        ) : (
          <svg width="55%" height="55%" viewBox="0 0 100 100" fill="none" style={{ opacity: 0.45 }}>
            <circle cx="50" cy="32" r="20" fill="white" />
            <path d="M12 90 Q12 62 50 62 Q88 62 88 90" fill="white" />
          </svg>
        )}
      </div>
      <div className="absolute bottom-5 left-0 right-0 flex justify-center">
        <span style={{ fontFamily: "'Dancing Script', cursive", fontSize: "1.25rem", color: "white", fontWeight: 700, textShadow: "0 1px 6px rgba(0,0,0,0.25)" }}>
          {config.personNameDisplay}
        </span>
      </div>
    </div>
  );
}

export function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const { phase, openCard } = useExperienceStore();
  
  const heroLine1 = useConfigStore((s) => s.heroLine1);
  const heroLine2 = useConfigStore((s) => s.heroLine2);
  const birthdayDate = useConfigStore((s) => s.birthdayDate);
  const personNameDisplay = useConfigStore((s) => s.personNameDisplay);

  const isVisible = phase === "hero" || phase === "experience";

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.section key="hero-section" id="hero" className="min-h-screen w-full relative overflow-hidden flex items-center" style={{ background: "#ffffff" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}>
          <ScatteredDecorations />
          <motion.div className="absolute bottom-0 left-0" style={{ width: "clamp(55px, 7vw, 90px)", height: "clamp(36px, 4.5vw, 65px)", background: "#cc2936", borderTopRightRadius: "10px" }} initial={{ opacity: 0, x: -30, y: 30 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ delay: 0.9, duration: 0.7, ease: EASE_CINEMATIC }} />
          <div id="hero-grid" className="section-content relative z-10 w-full py-12" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", alignItems: "center", gap: "4rem" }}>
            <motion.div className="flex flex-col items-start text-left" style={{ gap: "clamp(0.8rem, 2vw, 1.4rem)" }} variants={staggerContainer} initial="hidden" animate="visible">
              <motion.div variants={fadeInUp} className="flex flex-col items-start">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start", gap: "0.5rem", lineHeight: 1 }}>
                  <span className="hero-title" style={{ fontFamily: "'Lilita One', 'Boogaloo', cursive", fontSize: "clamp(3.5rem, 11vw, 8rem)", color: "#1a1a1a", lineHeight: 1, letterSpacing: "-0.01em", display: "block" }}>
                    {heroLine1}
                  </span>
                  <motion.div style={{ marginBottom: "clamp(0.5rem, 1.5vw, 1.2rem)", flexShrink: 0 }} animate={{ rotate: [-8, 8, -8], y: [0, -4, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
                    <PartyHatIcon size={70} />
                  </motion.div>
                </div>
                <div style={{ marginTop: "-0.1em" }}>
                  <span className="hero-title" style={{ fontFamily: "'Lilita One', 'Boogaloo', cursive", fontSize: "clamp(3.5rem, 11vw, 8rem)", color: "#e8717a", lineHeight: 1, letterSpacing: "-0.01em", display: "block", WebkitTextStroke: "3px #c94b57", paintOrder: "stroke fill" }}>
                    {heroLine2}
                  </span>
                </div>
              </motion.div>
              <motion.div variants={scaleBounce} className="hero-badge-container">
                <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.45rem 1.25rem", borderRadius: "50px", border: "2px solid #e8717a", background: "rgba(232, 113, 122, 0.08)", color: "#c94b57", fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "0.95rem" }}>
                  <span style={{ fontSize: "0.85rem" }}>⭐</span>
                  <span>{birthdayDate}</span>
                  <span style={{ fontSize: "0.85rem" }}>⭐</span>
                </div>
              </motion.div>
              <motion.div variants={fadeInUp} className="hero-buttons" style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "flex-start" }}>
                {/* CTA 1 — Glass Pink */}
                <motion.button 
                  onClick={openCard} 
                  whileHover={{ scale: 1.05, y: -3, boxShadow: "0 15px 40px rgba(232, 113, 122, 0.4)" }} 
                  whileTap={{ scale: 0.96 }} 
                  className="relative group overflow-hidden"
                  style={{ 
                    display: "inline-flex", 
                    alignItems: "center", 
                    gap: "0.75rem", 
                    padding: "0.85rem 1.8rem", 
                    borderRadius: "100px", 
                    border: "none", 
                    background: "linear-gradient(135deg, #e8717a 0%, #c94b57 100%)", 
                    color: "white", 
                    fontFamily: "Inter, sans-serif", 
                    fontWeight: 700, 
                    fontSize: "0.95rem", 
                    cursor: "pointer", 
                    boxShadow: "0 8px 25px rgba(232, 113, 122, 0.3)" 
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                  {siteConfig.hero.cta1Label}
                  
                  {/* Shimmer */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    style={{ skewX: -20, left: "-150%" }}
                    animate={{ left: "150%" }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
                  />
                </motion.button>

                {/* CTA 2 — Outline/Glass */}
                <motion.button 
                  whileHover={{ scale: 1.05, y: -3, background: "rgba(232, 113, 122, 0.1)" }} 
                  whileTap={{ scale: 0.96 }} 
                  onClick={() => document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" })} 
                  style={{ 
                    display: "inline-flex", 
                    alignItems: "center", 
                    gap: "0.75rem", 
                    padding: "0.85rem 1.8rem", 
                    borderRadius: "100px", 
                    border: "2px solid #e8717a", 
                    background: "transparent", 
                    color: "#c94b57", 
                    fontFamily: "Inter, sans-serif", 
                    fontWeight: 700, 
                    fontSize: "0.95rem", 
                    cursor: "pointer", 
                    transition: "background 0.3s ease"
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                  {siteConfig.hero.cta2Label}
                </motion.button>
              </motion.div>
              <motion.div variants={scaleBounce} style={{ marginTop: "0.25rem" }}><SmileyFace size={50} /></motion.div>
            </motion.div>
            <div className="relative flex flex-col items-center" style={{ gap: "0.5rem" }}>
              <motion.div style={{ display: "flex", alignItems: "flex-end", gap: "0.25rem" }} initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 1, ease: EASE_SPRING }}>
                <Balloon color="#e8717a" size={62} delay={0} />
                <Balloon color="#cc2936" size={72} delay={0.25} />
                <Balloon color="#f4b8bc" size={58} delay={0.5} />
              </motion.div>
              <motion.div initial={{ opacity: 0, scale: 0.8, x: 50 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ delay: 0.4, duration: 1.1, ease: EASE_CINEMATIC }}><ProfilePhoto /></motion.div>
              <motion.p style={{ fontFamily: "'Dancing Script', cursive", color: "#c94b57", fontSize: "1.35rem", fontWeight: 700, marginTop: "0.25rem", textAlign: "center" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3, duration: 0.9 }}>
                Dear {personNameDisplay} ❤️
              </motion.p>
            </div>
          </div>
          <style>{`
            @media (max-width: 850px) {
              #hero-grid { grid-template-columns: 1fr !important; justify-items: center; text-align: center; gap: 2.5rem !important; }
              #hero-grid > div:last-child { order: -1; }
              #hero-grid > div:first-child { align-items: center !important; text-align: center !important; }
              .hero-title { font-size: clamp(3rem, 15vw, 5rem) !important; }
              #hero-grid > div:first-child > div.hero-buttons, .hero-badge-container { display: flex; justify-content: center !important; width: 100%; }
            }
          `}</style>
        </motion.section>
      )}
    </AnimatePresence>
  );
}

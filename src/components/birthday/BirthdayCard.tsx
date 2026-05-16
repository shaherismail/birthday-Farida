"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useExperienceStore } from "@/store/experienceStore";
import { useConfigStore } from "@/store/configStore";
import { useConfetti } from "@/hooks/useConfetti";
import { EASE_CINEMATIC, EASE_SPRING } from "@/animations/presets";
import { sleep } from "@/lib/utils";

// Small red heart decoration
function HeartDecor({ className = "" }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#cc2936" className={className}>
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

// Profile photo circle — small version inside the card
function CardProfilePhoto({ size = 72 }: { size?: number }) {
  const profileImage = useConfigStore((s) => s.profileImage);
  const personNameDisplay = useConfigStore((s) => s.personNameDisplay);
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        overflow: "hidden",
        border: "3px solid #e8717a",
        boxShadow: "0 4px 16px rgba(232, 113, 122, 0.4)",
        background: "linear-gradient(135deg, #f8c4c7 0%, #e8717a 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {profileImage ? (
        <img src={profileImage} alt={personNameDisplay} className="w-full h-full object-cover" />
      ) : (
        <svg width="55%" height="55%" viewBox="0 0 100 100" fill="none" style={{ opacity: 0.5 }}>
          <circle cx="50" cy="35" r="22" fill="white" />
          <path d="M10 90 Q10 65 50 65 Q90 65 90 90" fill="white" />
        </svg>
      )}
    </div>
  );
}

function CardLeftPage() {
  const personNameDisplay = useConfigStore((s) => s.personNameDisplay);
  const cardTeaser = useConfigStore((s) => s.cardTeaser);
  return (
    <div
      style={{
        flex: 1,
        padding: "2rem",
        background: "linear-gradient(160deg, #fff0f2 0%, #fde8ea 100%)",
        borderRight: "2px solid rgba(232, 113, 122, 0.2)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        minHeight: "380px",
        position: "relative",
        borderRadius: "16px 0 0 16px",
      }}
    >
      <HeartDecor className="absolute top-4 right-4" />
      <div style={{ textAlign: "center", width: "100%" }}>
        <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "0.9rem", color: "#5a3040", marginBottom: "0.5rem" }}>
          Dear {personNameDisplay}
        </p>
        <p className="font-script" style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)", color: "#e8717a", fontWeight: 700, transform: "rotate(-3deg)", lineHeight: 1.2 }}>
          Happy<br />Birthday!
        </p>
      </div>
      <CardProfilePhoto size={80} />
      <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8rem", color: "#8b5563", textAlign: "center", fontStyle: "italic" }}>
        {cardTeaser}
      </p>
      <HeartDecor className="absolute bottom-4 left-4" />
    </div>
  );
}

function CardRightPage() {
  const personNameDisplay = useConfigStore((s) => s.personNameDisplay);
  const cardMessage = useConfigStore((s) => s.cardMessage);
  return (
    <motion.div
      style={{
        flex: 1,
        padding: "2rem",
        background: "white",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        minHeight: "380px",
        position: "relative",
        borderRadius: "0 16px 16px 0",
        transformOrigin: "left center",
        perspective: "1200px",
      }}
      initial={{ rotateY: -90, opacity: 0 }}
      animate={{ rotateY: 0, opacity: 1 }}
      transition={{ rotateY: { duration: 0.9, ease: EASE_CINEMATIC }, opacity: { duration: 0.4 }, delay: 0.9 }}
    >
      <HeartDecor className="absolute top-4 left-4" />
      <h3 style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "#2d1b1e", textAlign: "center", marginTop: "0.5rem" }}>
        To You!
      </h3>
      <div style={{ flex: 1, fontFamily: "Inter, sans-serif", fontSize: "clamp(0.78rem, 1.2vw, 0.9rem)", color: "#5a3040", lineHeight: 1.75, whiteSpace: "pre-line" }}>
        <p className="font-script" style={{ color: "#e8717a", fontSize: "clamp(1rem, 1.8vw, 1.3rem)", fontWeight: 700, marginBottom: "0.75rem" }}>
          Happy Birthday, {personNameDisplay} ❤️
        </p>
        <p style={{ color: "#5a3040", textAlign: "center", width: "100%" }}>
          {cardMessage}
        </p>
      </div>
      <p className="font-script" style={{ color: "#c94b57", fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)", fontWeight: 600, textAlign: "center", width: "100%" }}>
        Your Best Friend.
      </p>
      <HeartDecor className="absolute bottom-4 right-4" />
    </motion.div>
  );
}

export function BirthdayCard() {
  const [mounted, setMounted] = useState(false);
  const { isCardOpen, isCardFullyOpen, closeCard, setCardFullyOpen, lockScroll, unlockScroll } = useExperienceStore();
  const { fire } = useConfetti();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isCardOpen) return;
    const sequence = async () => {
      lockScroll();
      await sleep(1000);
      setCardFullyOpen();
      await sleep(600);
      fire({ duration: 4000, particleCount: 50 });
    };
    sequence();
  }, [isCardOpen, lockScroll, setCardFullyOpen, fire]);

  const handleClose = () => {
    closeCard();
    unlockScroll();
  };

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isCardOpen && (
        <>
          <motion.div
            key="card-backdrop"
            className="fixed inset-0 z-[50]"
            style={{ background: "rgba(45, 27, 30, 0.4)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            onClick={handleClose}
          />
          <motion.div
            key="birthday-card"
            className="fixed inset-0 z-[51] flex items-center justify-center p-4"
            style={{ pointerEvents: "none" }}
          >
            <motion.div
              style={{
                pointerEvents: "auto",
                maxWidth: isCardFullyOpen ? "780px" : "340px",
                width: "100%",
                borderRadius: "20px",
                boxShadow: "0 24px 80px rgba(45, 27, 30, 0.3), 0 8px 30px rgba(232, 113, 122, 0.2)",
                overflow: "hidden",
              }}
              initial={{ opacity: 0, scale: 0.85, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0, maxWidth: isCardFullyOpen ? "780px" : "340px" }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{
                opacity: { duration: 0.6, ease: EASE_CINEMATIC },
                scale: { duration: 0.8, ease: EASE_SPRING },
                y: { duration: 0.8, ease: EASE_SPRING },
                maxWidth: { duration: 0.8, ease: EASE_CINEMATIC },
              }}
            >
              <div style={{ display: "flex", width: "100%" }}>
                <CardLeftPage />
                <AnimatePresence>
                  {isCardFullyOpen && <CardRightPage key="right-page" />}
                </AnimatePresence>
              </div>
            </motion.div>
            <motion.button
              onClick={handleClose}
              className="absolute top-4 right-4"
              style={{
                pointerEvents: "auto",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.9)",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
                color: "#c94b57",
                fontSize: "1.1rem",
                fontWeight: "bold",
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              ✕
            </motion.button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

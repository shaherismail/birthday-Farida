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
      className="flex-1 p-6 md:p-8 bg-gradient-to-br from-[#fff0f2] to-[#fde8ea] border-b md:border-b-0 md:border-r border-[#e8717a]/20 flex flex-col items-center justify-between min-h-[260px] md:min-h-[380px] relative rounded-t-[20px] md:rounded-l-[20px] md:rounded-tr-none w-full"
    >
      <HeartDecor className="absolute top-4 right-4" />
      <div className="text-center w-full">
        <p className="font-body font-semibold text-xs md:text-sm text-[#5a3040] mb-1">
          Dear {personNameDisplay}
        </p>
        <p className="font-script text-3xl md:text-4xl text-[#e8717a] font-bold -rotate-2 leading-tight">
          Happy<br />Birthday!
        </p>
      </div>
      <CardProfilePhoto size={80} />
      <p className="font-body text-xs text-[#8b5563] text-center italic mt-2 px-4 leading-relaxed">
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
      className="flex-1 p-6 md:p-8 bg-white flex flex-col gap-4 min-h-[350px] md:min-h-[380px] relative rounded-b-[20px] md:rounded-r-[20px] md:rounded-bl-none origin-top md:origin-left w-full"
      style={{
        perspective: "1200px",
      }}
      initial={{ rotateY: -90, opacity: 0 }}
      animate={{ rotateY: 0, opacity: 1 }}
      transition={{ rotateY: { duration: 0.9, ease: EASE_CINEMATIC }, opacity: { duration: 0.4 }, delay: 0.9 }}
    >
      <HeartDecor className="absolute top-4 left-4" />
      <h3 className="font-body font-bold text-base md:text-lg text-[#2d1b1e] text-center mt-2 md:mt-0">
        To You!
      </h3>
      
      {/* Scrollable message container */}
      <div className="flex-1 overflow-y-auto max-h-[220px] md:max-h-[260px] font-body text-sm text-[#5a3040] leading-relaxed whitespace-pre-line px-6 pr-4 custom-scrollbar">
        <p className="font-script text-[#e8717a] text-lg md:text-xl font-bold mb-2 text-center md:text-left">
          Happy Birthday, {personNameDisplay} ❤️
        </p>
        <p className="text-left text-[#5a3040] text-sm md:text-base leading-relaxed">
          {cardMessage}
        </p>
      </div>

      <p className="font-script text-[#c94b57] text-base md:text-lg font-semibold text-center mt-1">
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
            className="fixed inset-0 z-[51] flex items-center justify-center p-6 md:p-4"
            style={{ pointerEvents: "none" }}
          >
            <motion.div
              className={`pointer-events-auto w-full overflow-hidden transition-all duration-500 ease-in-out ${
                isCardFullyOpen ? "max-w-[340px] md:max-w-[780px]" : "max-w-[340px]"
              }`}
              style={{
                borderRadius: "20px",
                boxShadow: "0 24px 80px rgba(45, 27, 30, 0.3), 0 8px 30px rgba(232, 113, 122, 0.2)",
              }}
              initial={{ opacity: 0, scale: 0.85, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{
                opacity: { duration: 0.6, ease: EASE_CINEMATIC },
                scale: { duration: 0.8, ease: EASE_SPRING },
                y: { duration: 0.8, ease: EASE_SPRING },
              }}
            >
              <div className="flex flex-col md:flex-row w-full max-h-[85vh] md:max-h-none overflow-y-auto md:overflow-visible rounded-[20px]">
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

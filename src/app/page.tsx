"use client";

// ============================================================
// page.tsx — The Main Birthday Experience Orchestrator
//
// WHY CLIENT COMPONENT:
//   The entire experience is phase-driven by Zustand state.
//   Phase transitions (intro → cake → hero → experience) are
//   client-side imperative animations. This page is the
//   "cinema projector" — it shows the right film reel at each
//   phase.
//
// RENDERING STRATEGY:
//   All heavy sections are lazy-loaded with dynamic() imports.
//   Only the intro loader loads eagerly (it's the first thing seen).
//   This keeps Time-to-Interactive fast while the rest loads.
//
// LAYOUT:
//   - IntroLoader: fixed fullscreen (z-100), fades out after 2.8s
//   - CakeScene: fixed fullscreen (z-90), fades out after 3.6s
//   - HeroSection: shows in phase "hero" and "experience"
//   - BirthdayCard: fixed overlay, triggered by CTA button
//   - MusicPlayer: always fixed bottom-right
//   - FinalSection: scroll reveal at bottom
// ============================================================

import React from "react";
import dynamic from "next/dynamic";
import { IntroLoader } from "@/components/sections/IntroLoader";
import { CakeScene } from "@/components/sections/CakeScene";
import { HeroSection } from "@/components/sections/HeroSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { BirthdayCard } from "@/components/birthday/BirthdayCard";
import { FinalSection } from "@/components/sections/FinalSection";
import { MusicPlayer } from "@/components/shared/MusicPlayer";
import { useExperienceStore } from "@/store/experienceStore";

// Lazy load heavy sections — loaded only after hero is visible
// const GallerySection = dynamic(() => import("@/components/sections/GallerySection"), { ssr: false });
// const GallerySection = dynamic(() => import("@/components/sections/GallerySection"), { ssr: false });

export default function BirthdayPage() {
  const phase = useExperienceStore((s) => s.phase);

  return (
    <main>
      {/* ============================================
          PHASE 1: Pink intro with orbs
          Fixed fullscreen, z-100
      ============================================ */}
      <IntroLoader />

      {/* ============================================
          PHASE 2: Birthday cake reveal + confetti
          Fixed fullscreen, z-90
      ============================================ */}
      <CakeScene />

      {/* ============================================
          PHASE 3+: Main scrollable experience
          Visible once phase = "hero" or "experience"
      ============================================ */}
      <HeroSection />

      {/* ============================================
          GALLERY: Memories section
      ============================================ */}
      {(phase === "hero" || phase === "experience") && (
        <GallerySection />
      )}

      {/* ============================================
          CARD OVERLAY: Opens on CTA click
          Fixed overlay over hero, z-50
      ============================================ */}
      <BirthdayCard />

      {/* ============================================
          FINAL SECTION: Scroll-reveal ending
      ============================================ */}
      {(phase === "hero" || phase === "experience") && (
        <FinalSection />
      )}

      {/* ============================================
          MUSIC PLAYER: Always visible, fixed bottom-right
      ============================================ */}
      <MusicPlayer />
    </main>
  );
}

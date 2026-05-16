// ============================================================
// ANIMATION PRESETS — Centralized Framer Motion variants
//
// WHY THIS FILE EXISTS:
//   Every animation in the site is defined here once.
//   Components import these presets instead of defining inline variants.
//   This ensures: consistent timing, consistent easing, consistent
//   emotional pacing across all sections.
//
// ENGINEERING DECISION:
//   Using Framer Motion Variants (not just motion props) because
//   variants propagate automatically through the component tree
//   via AnimatePresence + stagger support. This enables
//   orchestrated cinematic sequences without prop drilling.
// ============================================================

import type { Variants, Transition } from "framer-motion";

// ============================================================
// EASING CURVES — Emotional timing definitions
// ============================================================

/**
 * Cinematic ease — slow start, dramatic deceleration
 * Used for: section entrances, hero reveals, important moments
 * Emotional purpose: creates a sense of weight and importance
 */
export const EASE_CINEMATIC = [0.43, 0.13, 0.23, 0.96] as const;

/**
 * Spring ease — overshoots slightly, feels alive
 * Used for: decorative elements, floating things, hover states
 * Emotional purpose: playful, joyful, birthday energy
 */
export const EASE_SPRING = [0.34, 1.56, 0.64, 1] as const;

/**
 * Soft ease — smooth and gentle
 * Used for: opacity fades, background transitions, soft reveals
 * Emotional purpose: dreamy, tender, emotional moments
 */
export const EASE_SOFT = [0.25, 0.46, 0.45, 0.94] as const;

/**
 * Out expo — fast then slow
 * Used for: CTA buttons, badges, small reveals
 * Emotional purpose: confident, premium feel
 */
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

// ============================================================
// TRANSITION PRESETS
// ============================================================

export const transitions = {
  cinematic: {
    duration: 1.2,
    ease: EASE_CINEMATIC,
  } satisfies Transition,

  slow: {
    duration: 1.6,
    ease: EASE_SOFT,
  } satisfies Transition,

  medium: {
    duration: 0.8,
    ease: EASE_SOFT,
  } satisfies Transition,

  fast: {
    duration: 0.4,
    ease: EASE_SOFT,
  } satisfies Transition,

  spring: {
    type: "spring",
    stiffness: 300,
    damping: 24,
  } satisfies Transition,

  springGentle: {
    type: "spring",
    stiffness: 120,
    damping: 20,
  } satisfies Transition,

  springBouncy: {
    type: "spring",
    stiffness: 400,
    damping: 15,
  } satisfies Transition,
} as const;

// ============================================================
// FADE VARIANTS — Core opacity transitions
// ============================================================

/**
 * Simple fade in — used for overlays, backgrounds, subtle reveals
 * Timing: 1.2s cinematic ease — creates emotional weight
 */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: transitions.cinematic,
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.8, ease: EASE_SOFT },
  },
};

/**
 * Fade in from below — primary content reveal pattern
 * The 24px upward travel creates a "rising" emotional feel
 * Used for: headings, paragraphs, cards
 */
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.cinematic,
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: transitions.fast,
  },
};

/**
 * Fade in from above — used for navbar, floating elements
 */
export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.cinematic,
  },
};

/**
 * Scale reveal — card entrances, modal appearances
 * Scale from 0.92 feels like camera focus pulling in
 */
export const scaleReveal: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: transitions.cinematic,
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    transition: transitions.fast,
  },
};

/**
 * Scale bounce reveal — for decorative elements, badges, icons
 * Uses spring to feel energetic and birthday-ish
 */
export const scaleBounce: Variants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: transitions.springBouncy,
  },
};

// ============================================================
// STAGGER CONTAINER VARIANTS
// Used to orchestrate child animations in sequence
// ============================================================

/**
 * Stagger container — wraps groups of staggered children
 * staggerChildren: 0.12s = cinematic, not too fast, not too slow
 * This timing was chosen to feel like reading — each word/line
 * has just enough pause to register emotionally
 */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

/**
 * Slower stagger — for section-level orchestration
 * Used when sections contain larger, heavier elements
 */
export const staggerContainerSlow: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

/**
 * Fast stagger — for lists, pills, small badges
 */
export const staggerContainerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
};

// ============================================================
// LETTER-BY-LETTER TEXT REVEAL
// Used in intro loader and special text moments
// ============================================================

export const letterReveal: Variants = {
  hidden: { opacity: 0, y: 20, rotateX: -40 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.6,
      ease: EASE_OUT_EXPO,
    },
  },
};

// ============================================================
// FLOATING ELEMENT VARIANTS
// Used for hearts, sparkles, balloons, orbs
// ============================================================

/**
 * Float in — decorative element entrance
 * Comes from slightly below, floats up with a gentle bounce
 */
export const floatIn: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.8 },
  visible: (custom: number = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: custom * 0.15,
      duration: 0.9,
      ease: EASE_SPRING,
    },
  }),
};

// ============================================================
// SLIDE VARIANTS — for directional reveals
// ============================================================

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1, ease: EASE_CINEMATIC },
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1, ease: EASE_CINEMATIC },
  },
};

// ============================================================
// CARD ANIMATION VARIANTS
// Specifically for the birthday card open/close sequence
// ============================================================

/**
 * Card entrance — the greeting card floating in over blurred bg
 * scale from 0.85 + y from below gives "letter appearing" feel
 */
export const cardEntrance: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.85,
    y: 40,
    rotateX: 8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 1.2,
      ease: EASE_CINEMATIC,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: -20,
    transition: { duration: 0.6, ease: EASE_SOFT },
  },
};

/**
 * Card right page reveal — page flips open after card appears
 * Perspective-based transform gives physical "opening" sensation
 */
export const cardPageOpen: Variants = {
  hidden: {
    opacity: 0,
    rotateY: -90,
    transformOrigin: "left center",
  },
  visible: {
    opacity: 1,
    rotateY: 0,
    transformOrigin: "left center",
    transition: {
      duration: 1,
      ease: EASE_CINEMATIC,
      delay: 0.4,
    },
  },
};

// ============================================================
// INTRO LOADER VARIANTS
// ============================================================

/**
 * Intro background — the pink screen that fades in first
 * Duration 0.8s — fast enough to feel immediate
 */
export const introBackground: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: EASE_SOFT },
  },
  exit: {
    opacity: 0,
    transition: { duration: 1.2, ease: EASE_CINEMATIC, delay: 0.2 },
  },
};

/**
 * Intro orb — the large soft circles floating in the background
 * Delayed to appear after background is visible
 */
export const introOrb: Variants = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: (custom: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: custom * 0.2 + 0.3,
      duration: 1.5,
      ease: EASE_SOFT,
    },
  }),
};

/**
 * Loading line — the thin white horizontal line
 * Width animates from 0 to full in ~1.5s
 */
export const loadingLine: Variants = {
  hidden: { scaleX: 0, opacity: 0.6 },
  visible: {
    scaleX: 1,
    opacity: [0.6, 1, 0.6],
    transition: {
      duration: 1.8,
      ease: EASE_SOFT,
      repeat: Infinity,
      repeatType: "reverse",
    },
  },
};

// ============================================================
// CONFETTI TRIGGER VARIANTS
// ============================================================
export const confettiReveal: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: EASE_SPRING },
  },
};

// ============================================================
// SCROLL REVEAL WRAPPER
// Used with useInView for scroll-triggered animations
// ============================================================
export const scrollReveal: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: EASE_CINEMATIC,
    },
  },
};

export const scrollRevealSlow: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.4,
      ease: EASE_CINEMATIC,
    },
  },
};

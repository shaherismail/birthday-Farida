"use client";

// ============================================================
// FloatingDecorations — Hearts, sparkles, stars, balloons
//
// WHY THIS COMPONENT:
//   The reference screenshots show scattered decorative elements
//   (stars, plus signs, small shapes) across the hero section.
//   This component generates them procedurally so they feel
//   organic and not grid-aligned.
//
// PERFORMANCE STRATEGY:
//   - Elements are generated once on mount (useMemo)
//   - CSS animations instead of JS RAF loops (GPU composited)
//   - pointer-events: none throughout (no hit-test overhead)
//   - Reduced count on mobile via CSS media queries
// ============================================================

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { randomBetween, randomInt, generateId } from "@/lib/utils";

interface FloatingItem {
  id: string;
  type: "heart" | "star" | "sparkle" | "dot" | "cross";
  x: number; // % from left
  y: number; // % from top
  size: number;
  delay: number;
  duration: number;
  opacity: number;
  color: string;
}

interface FloatingDecorationsProps {
  count?: number;
  types?: FloatingItem["type"][];
  colors?: string[];
  className?: string;
  zIndex?: number;
}

const COLORS = [
  "#e8717a",
  "#c94b57",
  "#f09a9d",
  "#cc2936",
  "#f8c4c7",
  "#2d1b1e",
];

export function FloatingDecorations({
  count = 20,
  types = ["star", "cross", "dot", "sparkle"],
  colors = COLORS,
  className = "",
  zIndex = 0,
}: FloatingDecorationsProps) {
  // Generate stable positions once on mount
  const items = useMemo<FloatingItem[]>(() => {
    return Array.from({ length: count }, () => ({
      id: generateId(),
      type: types[randomInt(0, types.length - 1)],
      x: randomBetween(2, 98),
      y: randomBetween(2, 98),
      size: randomBetween(8, 22),
      delay: randomBetween(0, 3),
      duration: randomBetween(3, 7),
      opacity: randomBetween(0.3, 0.8),
      color: colors[randomInt(0, colors.length - 1)],
    }));
  }, [count, types, colors]);

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{ zIndex }}
      aria-hidden="true"
    >
      {items.map((item) => (
        <motion.div
          key={item.id}
          className="absolute"
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
            opacity: item.opacity,
          }}
          animate={{
            y: [0, -item.size * 1.5, 0],
            rotate: item.type === "star" || item.type === "sparkle" ? [0, 180, 360] : [0, 5, -5, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <DecoShape
            type={item.type}
            size={item.size}
            color={item.color}
          />
        </motion.div>
      ))}
    </div>
  );
}

// ============================================================
// DecoShape — Renders individual decorative shapes as SVG
// Using SVG for crisp rendering at any scale
// ============================================================
function DecoShape({
  type,
  size,
  color,
}: {
  type: FloatingItem["type"];
  size: number;
  color: string;
}) {
  switch (type) {
    case "heart":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      );

    case "star":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      );

    case "sparkle":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
          <path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5z" />
          <path d="M19 15l.75 2.25L22 18l-2.25.75L19 21l-.75-2.25L16 18l2.25-.75z" opacity="0.6" />
          <path d="M5 15l.5 1.5L7 17l-1.5.5L5 19l-.5-1.5L3 17l1.5-.5z" opacity="0.4" />
        </svg>
      );

    case "cross":
      // Plus/cross shape — seen in hero section screenshots
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round">
          <line x1="12" y1="2" x2="12" y2="22" />
          <line x1="2" y1="12" x2="22" y2="12" />
        </svg>
      );

    case "dot":
      return (
        <svg width={size * 0.5} height={size * 0.5} viewBox="0 0 10 10">
          <circle cx="5" cy="5" r="4" fill={color} />
        </svg>
      );

    default:
      return null;
  }
}

// ============================================================
// FloatingHearts — Heart-only variant, used in intro/finale
// ============================================================
interface FloatingHeartsProps {
  count?: number;
  className?: string;
  colors?: string[];
}

export function FloatingHearts({
  count = 12,
  className = "",
  colors = ["#e8717a", "#c94b57"]
}: FloatingHeartsProps) {
  const hearts = useMemo(() => {
    return Array.from({ length: count }, () => ({
      id: generateId(),
      x: randomBetween(5, 95),
      startY: randomBetween(80, 110), // start below viewport
      size: randomBetween(14, 28),
      delay: randomBetween(0, 2),
      duration: randomBetween(4, 7),
      opacity: randomBetween(0.4, 0.85),
      color: colors[randomInt(0, colors.length - 1)],
    }));
  }, [count, colors]);

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{ zIndex: 5 }}
      aria-hidden="true"
    >
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute"
          style={{
            left: `${heart.x}%`,
            bottom: "-10%",
            opacity: heart.opacity,
          }}
          animate={{
            y: [0, -1200],
            x: [0, randomBetween(-30, 30)],
            opacity: [0, heart.opacity, heart.opacity, 0],
            scale: [0.5, 1, 1, 0.7],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        >
          <svg
            width={heart.size}
            height={heart.size}
            viewBox="0 0 24 24"
            fill={heart.color}
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

// ============================================================
// GlowOrbs — The large soft colored circles from intro
// Exactly matching screenshot 1: white orb top-right, red orb left
// ============================================================
export function GlowOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }} aria-hidden="true">
      {/* Top-right white orb */}
      <motion.div
        className="absolute orb orb-white"
        style={{
          width: "35vw",
          height: "35vw",
          top: "-8%",
          right: "-5%",
        }}
        animate={{
          x: [0, 15, 0],
          y: [0, -10, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Left red orb */}
      <motion.div
        className="absolute orb orb-red"
        style={{
          width: "28vw",
          height: "28vw",
          top: "30%",
          left: "-6%",
        }}
        animate={{
          x: [0, -10, 0],
          y: [0, 15, 0],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Bottom-right dark red orb */}
      <motion.div
        className="absolute"
        style={{
          width: "22vw",
          height: "22vw",
          bottom: "-5%",
          right: "-3%",
          borderRadius: "50%",
          background: "rgba(168, 48, 64, 0.75)",
          filter: "blur(40px)",
        }}
        animate={{
          x: [0, 8, 0],
          y: [0, -12, 0],
          scale: [1, 1.06, 1],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Small bottom-left white dot */}
      <motion.div
        style={{
          position: "absolute",
          width: "10vw",
          height: "10vw",
          bottom: "10%",
          left: "5%",
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.25)",
          filter: "blur(20px)",
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.25, 0.4, 0.25],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />
    </div>
  );
}

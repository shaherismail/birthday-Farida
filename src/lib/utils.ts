import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * cn() — utility for conditional className merging
 * Combines clsx (conditional logic) with tailwind-merge (conflict resolution)
 * This is the industry standard pattern for Tailwind + React projects.
 *
 * @example
 * cn("text-pink-500", isActive && "font-bold", "hover:text-pink-700")
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * sleep() — promise-based delay for animation sequencing
 * Used in imperative animation sequences (intro → cake → hero)
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * clampNumber() — clamp a value between min and max
 */
export function clampNumber(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * randomBetween() — generate random float between min and max
 * Used for particle positions, confetti physics, floating element delays
 */
export function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

/**
 * randomInt() — generate random integer between min and max (inclusive)
 */
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * formatDate() — format a date object into readable string
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/**
 * generateId() — lightweight unique ID generator
 * Used for particle keys, confetti piece keys
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

import { RatingLevel } from "../types";

const HIGH_THRESHOLD = 75;
const MEDIUM_THRESHOLD = 50;

/**
 * Determine rating color based on score
 */
export const getRatingColor = (score: number): RatingLevel => {
  if (score >= HIGH_THRESHOLD) return "high";
  if (score >= MEDIUM_THRESHOLD) return "medium";
  return "low";
};

/**
 * Get human-readable rating label
 */
export const getRatingLabel = (score: number): string => {
  if (score >= HIGH_THRESHOLD) return "High";
  if (score >= MEDIUM_THRESHOLD) return "Medium";
  return "Low";
};


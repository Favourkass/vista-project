import { Weights } from "../types";

/**
 * Calculate the total weight from all indicators
 */
export const calculateTotalWeight = (weights: Weights): number => {
  return weights.economic + weights.impact + weights.infrastructure;
};

/**
 * Calculate percentage of a weight relative to total weight
 */
export const calculatePercentage = (weight: number, totalWeight: number): number => {
  if (totalWeight === 0) return 0;
  return Math.round((weight / totalWeight) * 100);
};

/**
 * Calculate percentage for each indicator
 */
export const calculatePercentages = (weights: Weights) => {
  const total = calculateTotalWeight(weights);
  return {
    economic: calculatePercentage(weights.economic, total),
    impact: calculatePercentage(weights.impact, total),
    infrastructure: calculatePercentage(weights.infrastructure, total),
  };
};


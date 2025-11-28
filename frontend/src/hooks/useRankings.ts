import { useState, useEffect, useCallback } from "react";
import { LGAData, Weights } from "../types";
import { calculateRankings } from "../services/api";

interface UseRankingsReturn {
  rankings: LGAData[];
  loading: boolean;
  error: Error | null;
  recalculate: () => Promise<void>;
}

/**
 * Custom hook for managing rankings data
 */
export const useRankings = (weights: Weights): UseRankingsReturn => {
  const [rankings, setRankings] = useState<LGAData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const recalculate = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await calculateRankings(weights);
      setRankings(response.rankings);
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Failed to calculate rankings");
      setError(error);
      console.error("Error calculating rankings:", error);
    } finally {
      setLoading(false);
    }
  }, [weights]);

  useEffect(() => {
    recalculate();
  }, [recalculate]);

  return { rankings, loading, error, recalculate };
};


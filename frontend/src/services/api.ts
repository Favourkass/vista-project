import axios from "axios";
import { Weights, RankingResponse } from "../types";

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:8000/api";

const apiClient = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Fetch all LGA scores
 */
export const fetchLGAScores = async () => {
  const response = await apiClient.get("/lga-scores/");
  return response.data;
};

/**
 * Calculate rankings with given weights
 */
export const calculateRankings = async (weights: Weights): Promise<RankingResponse> => {
  try {
    const response = await apiClient.post<RankingResponse>("/calculate-rankings/", {
      economic_weight: weights.economic,
      impact_weight: weights.impact,
      infrastructure_weight: weights.infrastructure,
    });
    return response.data;
  } catch (error) {
    console.error("Error calculating rankings:", error);
    throw error;
  }
};


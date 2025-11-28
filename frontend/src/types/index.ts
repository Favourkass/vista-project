export interface LGAData {
  id: number;
  name: string;
  economic: number;
  impact: number;
  infrastructure: number;
  weighted_score: number;
  rank: number;
}

export interface Weights {
  economic: number;
  impact: number;
  infrastructure: number;
}

export interface RankingResponse {
  rankings: LGAData[];
  weights: Weights;
}

export type IndicatorType = "economic" | "impact" | "infrastructure";

export type RatingLevel = "high" | "medium" | "low";

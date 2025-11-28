import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";

// Mock the API service
jest.mock("./services/api", () => ({
  calculateRankings: jest.fn(),
}));

// Mock the hooks
jest.mock("./hooks/useRankings", () => ({
  useRankings: jest.fn(),
}));

import { calculateRankings } from "./services/api";
import { useRankings } from "./hooks/useRankings";

const mockCalculateRankings = calculateRankings as jest.MockedFunction<typeof calculateRankings>;
const mockUseRankings = useRankings as jest.MockedFunction<typeof useRankings>;

describe("App Component", () => {
  const mockRankings = [
    {
      id: 1,
      name: "Lagos Island",
      economic: 95,
      impact: 88,
      infrastructure: 93,
      weighted_score: 92.5,
      rank: 1,
    },
    {
      id: 2,
      name: "Ikeja",
      economic: 89,
      impact: 85,
      infrastructure: 91,
      weighted_score: 88.3,
      rank: 2,
    },
  ];

  beforeEach(() => {
    mockUseRankings.mockReturnValue({
      rankings: mockRankings,
      loading: false,
      error: null,
      recalculate: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders header title", () => {
    render(<App />);
    const headerElement = screen.getByText(
      /Local Government Ranking Dashboard/i
    );
    expect(headerElement).toBeInTheDocument();
  });

  test("renders indicator cards", () => {
    render(<App />);
    expect(screen.getByText(/Economic & Financial/i)).toBeInTheDocument();
    expect(screen.getByText(/Impact/i)).toBeInTheDocument();
    expect(screen.getByText(/Infrastructure & Cost/i)).toBeInTheDocument();
  });

  test("renders weight sliders section", () => {
    render(<App />);
    expect(screen.getByText(/Adjust Indicator Weights/i)).toBeInTheDocument();
  });

  test("renders rankings section", () => {
    render(<App />);
    expect(screen.getByText(/LGA Rankings/i)).toBeInTheDocument();
  });

  test("renders formula section", () => {
    render(<App />);
    expect(screen.getByText(/Scoring Formula/i)).toBeInTheDocument();
  });

  test("displays rankings data", () => {
    render(<App />);
    expect(screen.getByText("Lagos Island")).toBeInTheDocument();
    expect(screen.getByText("Ikeja")).toBeInTheDocument();
  });

  test("displays loading state", () => {
    mockUseRankings.mockReturnValue({
      rankings: [],
      loading: true,
      error: null,
      recalculate: jest.fn(),
    });
    render(<App />);
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  test("displays error message", () => {
    const error = new Error("API Error");
    mockUseRankings.mockReturnValue({
      rankings: [],
      loading: false,
      error,
      recalculate: jest.fn(),
    });
    render(<App />);
    expect(screen.getByText(/Error loading rankings/i)).toBeInTheDocument();
  });
});

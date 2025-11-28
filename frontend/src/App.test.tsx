import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";

// Mock axios
const mockPost = jest.fn();
jest.mock("axios", () => ({
  __esModule: true,
  default: {
    post: mockPost,
  },
}));

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
    mockPost.mockResolvedValue({
      data: { rankings: mockRankings },
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

  test("displays default weight values", () => {
    render(<App />);
    expect(screen.getByText("40")).toBeInTheDocument(); // Economic weight
    expect(screen.getByText("0")).toBeInTheDocument(); // Impact weight
    expect(screen.getByText("65")).toBeInTheDocument(); // Infrastructure weight
  });

  test("updates weight when slider is moved", async () => {
    render(<App />);
    const sliders = screen.getAllByRole("slider");
    const economicSlider = sliders[0];

    fireEvent.change(economicSlider, { target: { value: "50" } });

    await waitFor(() => {
      expect(screen.getByText("50")).toBeInTheDocument();
    });
  });

  test("calls API when weights change", async () => {
    render(<App />);
    const sliders = screen.getAllByRole("slider");
    const economicSlider = sliders[0];

    fireEvent.change(economicSlider, { target: { value: "50" } });

    await waitFor(() => {
      expect(mockPost).toHaveBeenCalledWith(
        expect.stringContaining("/calculate-rankings/"),
        {
          economic_weight: 50,
          impact_weight: 0,
          infrastructure_weight: 65,
        }
      );
    });
  });

  test("displays rankings data", async () => {
    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByText("Lagos Island")).toBeInTheDocument();
      expect(screen.getByText("Ikeja")).toBeInTheDocument();
    });
  });

  test("calculates and displays percentages correctly", () => {
    render(<App />);
    // With default weights: Economic=40, Impact=0, Infrastructure=65
    // Total = 105
    // Economic % = 40/105 * 100 = 38%
    // Impact % = 0/105 * 100 = 0%
    // Infrastructure % = 65/105 * 100 = 62%
    expect(screen.getByText(/38%/)).toBeInTheDocument(); // Economic percentage
    expect(screen.getByText(/62%/)).toBeInTheDocument(); // Infrastructure percentage
  });

  test("handles API errors gracefully", async () => {
    mockPost.mockRejectedValueOnce(new Error("API Error"));
    render(<App />);

    await waitFor(() => {
      // App should still render without crashing
      expect(screen.getByText(/Local Government Ranking Dashboard/i)).toBeInTheDocument();
    });
  });
});

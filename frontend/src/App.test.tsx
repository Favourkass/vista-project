import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App Component", () => {
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
});

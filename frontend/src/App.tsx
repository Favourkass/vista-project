import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./App.css";

interface LGAData {
  id: number;
  name: string;
  economic: number;
  impact: number;
  infrastructure: number;
  weighted_score: number;
  rank: number;
}

interface Weights {
  economic: number;
  impact: number;
  infrastructure: number;
}

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:8000/api";

function App() {
  const [rankings, setRankings] = useState<LGAData[]>([]);
  const [weights, setWeights] = useState<Weights>({
    economic: 40,
    impact: 0,
    infrastructure: 65,
  });
  const [loading, setLoading] = useState(true);

  const calculateRankings = useCallback(async () => {
    try {
      const response = await axios.post(`${API_BASE}/calculate-rankings/`, {
        economic_weight: weights.economic,
        impact_weight: weights.impact,
        infrastructure_weight: weights.infrastructure,
      });
      setRankings(response.data.rankings);
      setLoading(false);
    } catch (error) {
      console.error("Error calculating rankings:", error);
      setLoading(false);
    }
  }, [weights]);

  useEffect(() => {
    calculateRankings();
  }, [calculateRankings]);

  const handleWeightChange = (indicator: keyof Weights, value: number) => {
    setWeights((prev) => ({ ...prev, [indicator]: value }));
  };

  const totalWeight =
    weights.economic + weights.impact + weights.infrastructure;

  const getPercentage = (weight: number) => {
    if (totalWeight === 0) return 0;
    return Math.round((weight / totalWeight) * 100);
  };

  const getRatingColor = (score: number) => {
    if (score >= 75) return "high";
    if (score >= 50) return "medium";
    return "low";
  };

  const getRatingLabel = (score: number) => {
    if (score >= 75) return "High";
    if (score >= 50) return "Medium";
    return "Low";
  };

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <span className="logo-icon">📊</span>
            <span className="logo-text">Lagos LGA Rankings</span>
          </div>
          <h1>Local Government Ranking Dashboard</h1>
          <p className="subtitle">Interactive Weighted Scoring System</p>
        </div>
      </header>

      <main className="main-content">
        {/* Indicator Cards */}
        <section className="indicator-cards">
          <div className="indicator-card economic">
            <div className="card-icon">💰</div>
            <div className="card-content">
              <h3>Economic & Financial</h3>
              <div className="percentage">
                {getPercentage(weights.economic)}%
              </div>
            </div>
          </div>
          <div className="indicator-card impact">
            <div className="card-icon">🎯</div>
            <div className="card-content">
              <h3>Impact</h3>
              <div className="percentage">{getPercentage(weights.impact)}%</div>
            </div>
          </div>
          <div className="indicator-card infrastructure">
            <div className="card-icon">🏗️</div>
            <div className="card-content">
              <h3>Infrastructure & Cost</h3>
              <div className="percentage">
                {getPercentage(weights.infrastructure)}%
              </div>
            </div>
          </div>
        </section>

        {/* Weight Sliders */}
        <section className="sliders-section">
          <h2>Adjust Indicator Weights</h2>
          <div className="sliders-container">
            <div className="slider-group">
              <label>
                <span className="slider-label">
                  Economic & Financial Weight
                </span>
                <span className="slider-value">{weights.economic}</span>
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={weights.economic}
                onChange={(e) =>
                  handleWeightChange("economic", Number(e.target.value))
                }
                className="slider economic-slider"
              />
            </div>
            <div className="slider-group">
              <label>
                <span className="slider-label">Impact Weight</span>
                <span className="slider-value">{weights.impact}</span>
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={weights.impact}
                onChange={(e) =>
                  handleWeightChange("impact", Number(e.target.value))
                }
                className="slider impact-slider"
              />
            </div>
            <div className="slider-group">
              <label>
                <span className="slider-label">
                  Infrastructure & Cost Weight
                </span>
                <span className="slider-value">{weights.infrastructure}</span>
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={weights.infrastructure}
                onChange={(e) =>
                  handleWeightChange("infrastructure", Number(e.target.value))
                }
                className="slider infrastructure-slider"
              />
            </div>
          </div>
        </section>

        {/* Rankings Table */}
        <section className="rankings-section">
          <h2>LGA Rankings</h2>
          {loading ? (
            <div className="loading">Loading...</div>
          ) : (
            <div className="table-container">
              <table className="rankings-table">
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>LGA Name</th>
                    <th>Economic</th>
                    <th>Impact</th>
                    <th>Infrastructure</th>
                    <th>Final Score</th>
                    <th>Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {rankings.map((lga) => (
                    <tr
                      key={lga.id}
                      className={`rank-row ${getRatingColor(
                        lga.weighted_score
                      )}`}
                    >
                      <td className="rank-cell">
                        <span className="rank-badge">{lga.rank}</span>
                      </td>
                      <td className="name-cell">{lga.name}</td>
                      <td>{lga.economic}</td>
                      <td>{lga.impact}</td>
                      <td>{lga.infrastructure}</td>
                      <td className="score-cell">
                        <span className="score">
                          {lga.weighted_score.toFixed(1)}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`rating-badge ${getRatingColor(
                            lga.weighted_score
                          )}`}
                        >
                          {getRatingLabel(lga.weighted_score)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Formula Info */}
        <section className="formula-section">
          <h3>Scoring Formula</h3>
          <div className="formula">
            <code>
              Final Score = (Economic × {weights.economic}) + (Impact ×{" "}
              {weights.impact}) + (Infrastructure × {weights.infrastructure}) ÷{" "}
              {totalWeight || 1}
            </code>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>Lagos State Local Government Ranking System © 2024</p>
      </footer>
    </div>
  );
}

export default App;

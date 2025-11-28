import React from "react";
import { LGAData } from "../types";
import { getRatingColor, getRatingLabel } from "../utils/ratings";
import "./RankingsTable.css";

interface RankingsTableProps {
  rankings: LGAData[];
  loading: boolean;
}

const RankingsTable: React.FC<RankingsTableProps> = ({ rankings, loading }) => {
  if (loading) {
    return (
      <div className="rankings-section">
        <h2>LGA Rankings</h2>
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <section className="rankings-section">
      <h2>LGA Rankings</h2>
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
            {rankings.map((lga) => {
              const ratingColor = getRatingColor(lga.weighted_score);
              const ratingLabel = getRatingLabel(lga.weighted_score);
              
              return (
                <tr key={lga.id} className={`rank-row ${ratingColor}`}>
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
                    <span className={`rating-badge ${ratingColor}`}>
                      {ratingLabel}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default RankingsTable;


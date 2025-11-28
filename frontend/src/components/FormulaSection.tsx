import React from "react";
import { Weights } from "../types";
import { calculateTotalWeight } from "../utils/calculations";
import "./FormulaSection.css";

interface FormulaSectionProps {
  weights: Weights;
}

const FormulaSection: React.FC<FormulaSectionProps> = ({ weights }) => {
  const totalWeight = calculateTotalWeight(weights);

  return (
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
  );
};

export default FormulaSection;


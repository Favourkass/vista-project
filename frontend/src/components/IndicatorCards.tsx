import React from "react";
import { Weights } from "../types";
import { calculatePercentages } from "../utils/calculations";
import IndicatorCard from "./IndicatorCard";
import "./IndicatorCards.css";

interface IndicatorCardsProps {
  weights: Weights;
}

const IndicatorCards: React.FC<IndicatorCardsProps> = ({ weights }) => {
  const percentages = calculatePercentages(weights);

  return (
    <section className="indicator-cards">
      <IndicatorCard
        type="economic"
        title="Economic & Financial"
        icon="💰"
        percentage={percentages.economic}
      />
      <IndicatorCard
        type="impact"
        title="Impact"
        icon="🎯"
        percentage={percentages.impact}
      />
      <IndicatorCard
        type="infrastructure"
        title="Infrastructure & Cost"
        icon="🏗️"
        percentage={percentages.infrastructure}
      />
    </section>
  );
};

export default IndicatorCards;


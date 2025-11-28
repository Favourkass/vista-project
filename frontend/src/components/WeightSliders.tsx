import React from "react";
import { Weights, IndicatorType } from "../types";
import WeightSlider from "./WeightSlider";
import "./WeightSliders.css";

interface WeightSlidersProps {
  weights: Weights;
  onWeightChange: (type: IndicatorType, value: number) => void;
}

const WeightSliders: React.FC<WeightSlidersProps> = ({
  weights,
  onWeightChange,
}) => {
  return (
    <section className="sliders-section">
      <h2>Adjust Indicator Weights</h2>
      <div className="sliders-container">
        <WeightSlider
          type="economic"
          label="Economic & Financial Weight"
          value={weights.economic}
          onChange={(value) => onWeightChange("economic", value)}
        />
        <WeightSlider
          type="impact"
          label="Impact Weight"
          value={weights.impact}
          onChange={(value) => onWeightChange("impact", value)}
        />
        <WeightSlider
          type="infrastructure"
          label="Infrastructure & Cost Weight"
          value={weights.infrastructure}
          onChange={(value) => onWeightChange("infrastructure", value)}
        />
      </div>
    </section>
  );
};

export default WeightSliders;


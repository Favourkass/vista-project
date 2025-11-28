import React from "react";
import { IndicatorType } from "../types";
import "./WeightSlider.css";

interface WeightSliderProps {
  type: IndicatorType;
  label: string;
  value: number;
  onChange: (value: number) => void;
}

const WeightSlider: React.FC<WeightSliderProps> = ({
  type,
  label,
  value,
  onChange,
}) => {
  return (
    <div className="slider-group">
      <label>
        <span className="slider-label">{label}</span>
        <span className="slider-value">{value}</span>
      </label>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={`slider ${type}-slider`}
        aria-label={`${label} weight slider`}
      />
    </div>
  );
};

export default WeightSlider;


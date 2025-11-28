import React from "react";
import { IndicatorType } from "../types";
import "./IndicatorCard.css";

interface IndicatorCardProps {
  type: IndicatorType;
  title: string;
  icon: string;
  percentage: number;
}

const IndicatorCard: React.FC<IndicatorCardProps> = ({
  type,
  title,
  icon,
  percentage,
}) => {
  return (
    <div className={`indicator-card ${type}`}>
      <div className="card-icon">{icon}</div>
      <div className="card-content">
        <h3>{title}</h3>
        <div className="percentage">{percentage}%</div>
      </div>
    </div>
  );
};

export default IndicatorCard;


import React from "react";
import "./Header.css";

const Header: React.FC = () => {
  return (
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
  );
};

export default Header;


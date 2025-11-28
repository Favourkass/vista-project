import React, { useState } from "react";
import { Weights, IndicatorType } from "./types";
import { useRankings } from "./hooks/useRankings";
import Header from "./components/Header";
import IndicatorCards from "./components/IndicatorCards";
import WeightSliders from "./components/WeightSliders";
import RankingsTable from "./components/RankingsTable";
import FormulaSection from "./components/FormulaSection";
import Footer from "./components/Footer";
import "./App.css";

const DEFAULT_WEIGHTS: Weights = {
  economic: 40,
  impact: 0,
  infrastructure: 65,
};

function App() {
  const [weights, setWeights] = useState<Weights>(DEFAULT_WEIGHTS);
  const { rankings, loading, error } = useRankings(weights);

  const handleWeightChange = (type: IndicatorType, value: number) => {
    setWeights((prev) => ({ ...prev, [type]: value }));
  };

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <IndicatorCards weights={weights} />
        <WeightSliders weights={weights} onWeightChange={handleWeightChange} />
        {error && (
          <div className="error-message">
            Error loading rankings: {error.message}
          </div>
        )}
        <RankingsTable rankings={rankings} loading={loading} />
        <FormulaSection weights={weights} />
      </main>
      <Footer />
    </div>
  );
}

export default App;

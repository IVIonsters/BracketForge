/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "./BracketPage.css"; // Import new styles

const BracketPage = ({ drivers }) => {
  const [bracket, setBracket] = useState([]);

  useEffect(() => {
    const savedDrivers = JSON.parse(localStorage.getItem("qualifyingDrivers"));
    if (savedDrivers && savedDrivers.length >= 32) {
      generateBracket(savedDrivers);
    }
  }, []);

  const generateBracket = (driversToUse) => {
    const top32 = driversToUse.slice(0, 32);
    const newBracket = [];

    for (let i = 0; i < 16; i++) {
      newBracket.push({
        top: top32[i],
        bottom: top32[31 - i],
      });
    }

    setBracket(newBracket);
  };

  return (
    <div className="bracket-container">
      <h2 className="bracket-title">Drift Battle Bracket</h2>

      <button className="refresh-button" onClick={() => generateBracket(JSON.parse(localStorage.getItem("qualifyingDrivers")))}>
        Refresh Bracket
      </button>

      <div className="bracket">
        {/* Left Side */}
        <div className="bracket-side left">
          {bracket.slice(0, 8).map((pair, index) => (
            <div key={index} className="match">
              <div className="team">{pair.bottom?.name || "TBD"}</div>
              <div className="connector"></div>
              <div className="team">{pair.top?.name || "TBD"}</div>
            </div>
          ))}
        </div>

        {/* Center Section for Finals */}
        <div className="bracket-center">
          <div className="finals">
            <div className="team empty"></div>
            <div className="connector"></div>
            <div className="team empty"></div>
          </div>
        </div>

        {/* Right Side */}
        <div className="bracket-side right">
          {bracket.slice(8, 16).map((pair, index) => (
            <div key={index} className="match">
              <div className="team">{pair.top?.name || "TBD"}</div>
              <div className="connector"></div>
              <div className="team">{pair.bottom?.name || "TBD"}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BracketPage;

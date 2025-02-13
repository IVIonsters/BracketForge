/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

const BracketPage = ({ qualifiedDrivers }) => {
  const [bracket, setBracket] = useState([]);

  useEffect(() => {
    if (qualifiedDrivers.length > 0) {
      setBracket(qualifiedDrivers.slice(0, 32)); // Take the top 32
    }
  }, [qualifiedDrivers]);

  // Swap positions in the bracket
  const swapDrivers = (indexA, indexB) => {
    const newBracket = [...bracket];
    [newBracket[indexA], newBracket[indexB]] = [newBracket[indexB], newBracket[indexA]];
    setBracket(newBracket);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Bracket</h2>
      <div className="grid grid-cols-2 gap-4">
        {bracket.map((driver, index) => (
          <div key={index} className="p-2 border rounded flex justify-between">
            <span>{driver.name}</span>
            <button 
              onClick={() => swapDrivers(index, index - 1)}
              disabled={index === 0}
              className="bg-gray-300 px-2 py-1 rounded"
            >
              ↑
            </button>
            <button 
              onClick={() => swapDrivers(index, index + 1)}
              disabled={index === bracket.length - 1}
              className="bg-gray-300 px-2 py-1 rounded"
            >
              ↓
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BracketPage;

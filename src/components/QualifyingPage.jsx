/* eslint-disable react/prop-types */
import { useState } from "react";
import "./QualifyingPage.css"; // Import the new styles

const QualifyingPage = ({ setDrivers }) => {
  const [drivers, setLocalDrivers] = useState([]);

  // Function to add multiple drivers
  const addDrivers = (count) => {
    const newDrivers = Array.from({ length: count }, () => ({
      name: "",
      runs: [[0, 0, 0], [0, 0, 0]],
    }));
    setLocalDrivers([...drivers, ...newDrivers]);
  };

  // Handle input change
  const handleChange = (index, type, value, runIndex = 0, judgeIndex = 0) => {
    const updatedDrivers = [...drivers];

    if (type === "name") {
      updatedDrivers[index].name = value;
    } else {
      updatedDrivers[index].runs[runIndex][judgeIndex] = parseFloat(value) || 0;
    }

    setLocalDrivers(updatedDrivers);
  };

  // Function to save data manually
  const saveQualifyingData = () => {
    const sortedDrivers = [...drivers]
      .map(driver => ({
        ...driver,
        highestScore: Math.max(
          driver.runs[0].reduce((a, b) => a + b, 0),
          driver.runs[1].reduce((a, b) => a + b, 0)
        ),
      }))
      .sort((a, b) => b.highestScore - a.highestScore);

    localStorage.setItem("qualifyingDrivers", JSON.stringify(sortedDrivers)); // ✅ Store data
    setDrivers(sortedDrivers);
    alert("Qualifying Data Saved! Go to the Bracket Page and refresh to update.");
  };

  return (
    <div className="qualifying-container">
      <h2 className="qualifying-title">Qualifying Scores</h2>

      {/* Add multiple drivers */}
      <div className="button-group">
        {[1, 5, 10].map(count => (
          <button key={count} onClick={() => addDrivers(count)} className="add-driver-button">
            Add {count} Driver{count > 1 ? "s" : ""}
          </button>
        ))}
      </div>

      {/* Save Data Button */}
      <button onClick={saveQualifyingData} className="save-button">
        Save Qualifying Data
      </button>

      {/* Display Inputs */}
      <div className="qualifying-table-container">
        <table className="qualifying-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Driver Name</th>
              <th colSpan="3">Run 1 Scores</th>
              <th colSpan="3">Run 2 Scores</th>
              <th>Best Score</th>
            </tr>
          </thead>
          <tbody>
            {drivers.map((driver, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <input
                    type="text"
                    value={driver.name}
                    onChange={(e) => handleChange(index, "name", e.target.value)}
                    className="input-text"
                  />
                </td>
                {[0, 1, 2].map(judgeIndex => (
                  <td key={`r1-${judgeIndex}`}>
                    <input
                      type="number"
                      value={driver.runs[0][judgeIndex]}
                      onChange={(e) => handleChange(index, "score", e.target.value, 0, judgeIndex)}
                      className="input-number"
                    />
                  </td>
                ))}
                {[0, 1, 2].map(judgeIndex => (
                  <td key={`r2-${judgeIndex}`}>
                    <input
                      type="number"
                      value={driver.runs[1][judgeIndex]}
                      onChange={(e) => handleChange(index, "score", e.target.value, 1, judgeIndex)}
                      className="input-number"
                    />
                  </td>
                ))}
                <td className="best-score">
                  {Math.max(driver.runs[0].reduce((a, b) => a + b, 0), driver.runs[1].reduce((a, b) => a + b, 0))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QualifyingPage;

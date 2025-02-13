import { useState } from "react";

const QualifyingPage = () => {
  const [drivers, setDrivers] = useState([{ name: "", runs: [[0, 0, 0], [0, 0, 0]] }]);

  // Function to add multiple drivers at once
  const addDrivers = (count) => {
    const newDrivers = Array.from({ length: count }, () => ({
      name: "",
      runs: [[0, 0, 0], [0, 0, 0]],
    }));
    setDrivers([...drivers, ...newDrivers]);
  };

  // Handle input change
  const handleChange = (index, type, value, runIndex = 0, judgeIndex = 0) => {
    const updatedDrivers = [...drivers];

    if (type === "name") {
      updatedDrivers[index].name = value;
    } else {
      updatedDrivers[index].runs[runIndex][judgeIndex] = parseFloat(value) || 0;
    }

    setDrivers(updatedDrivers); // Do NOT sort here to prevent jumpy behavior
  };

  // Compute and sort final results without affecting the input table
  const getSortedResults = () => {
    return [...drivers]
      .map(driver => {
        const scores = driver.runs.map(run => run.reduce((a, b) => a + b, 0));
        return { ...driver, highestScore: Math.max(...scores) };
      })
      .sort((a, b) => b.highestScore - a.highestScore);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-6 text-red-500">Qualifying Scores</h2>

      {/* Add multiple drivers at once */}
      <div className="mb-6 flex space-x-4">
        {[1, 5, 10].map(count => (
          <button
            key={count}
            onClick={() => addDrivers(count)}
            className="bg-gradient-to-r from-red-600 to-red-800 text-white px-5 py-2 rounded-lg font-semibold hover:scale-105 transition-transform"
          >
            Add {count} Driver{count > 1 ? "s" : ""}
          </button>
        ))}
      </div>

      {/* Drivers Table */}
      <div className="overflow-x-auto w-full max-w-6xl bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-lg border border-red-600">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-white/20 text-red-500 uppercase text-sm">
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">Driver Name</th>
              <th colSpan="3" className="p-3 text-center">Run 1 Scores</th>
              <th colSpan="3" className="p-3 text-center">Run 2 Scores</th>
              <th className="p-3 text-center">Best Score</th>
            </tr>
          </thead>
          <tbody>
            {drivers.map((driver, index) => (
              <tr key={index} className="border-b border-gray-700 hover:bg-white/10 transition">
                <td className="p-3 text-center">{index + 1}</td>
                <td className="p-3">
                  <input
                    type="text"
                    value={driver.name}
                    onChange={(e) => handleChange(index, "name", e.target.value)}
                    className="w-full bg-transparent border-b border-gray-500 focus:outline-none focus:border-red-500 p-1 text-white"
                  />
                </td>
                {/* Run 1 Scores */}
                {[0, 1, 2].map((judgeIndex) => (
                  <td key={judgeIndex} className="p-3">
                    <input
                      type="number"
                      value={driver.runs[0][judgeIndex]}
                      onChange={(e) => handleChange(index, "score", e.target.value, 0, judgeIndex)}
                      className="w-16 text-center bg-transparent border-b border-gray-500 focus:outline-none focus:border-red-500 p-1 text-white"
                    />
                  </td>
                ))}
                {/* Run 2 Scores */}
                {[0, 1, 2].map((judgeIndex) => (
                  <td key={judgeIndex} className="p-3">
                    <input
                      type="number"
                      value={driver.runs[1][judgeIndex]}
                      onChange={(e) => handleChange(index, "score", e.target.value, 1, judgeIndex)}
                      className="w-16 text-center bg-transparent border-b border-gray-500 focus:outline-none focus:border-red-500 p-1 text-white"
                    />
                  </td>
                ))}
                {/* Best Score */}
                <td className="p-3 text-center font-bold text-red-500">
                  {Math.max(
                    driver.runs[0].reduce((a, b) => a + b, 0),
                    driver.runs[1].reduce((a, b) => a + b, 0)
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Final Sorted Results */}
      <h3 className="text-2xl font-bold mt-8 text-red-500">Final Results (Sorted)</h3>
      <ul className="w-full max-w-lg border border-red-600 rounded-lg p-6 bg-white/10 backdrop-blur-md mt-4">
        {getSortedResults().map((driver, i) => (
          <li key={i} className="py-2 text-lg flex justify-between">
            <span>{i + 1}. {driver.name}</span>
            <strong className="text-red-500">{driver.highestScore}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QualifyingPage;

import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QualifyingPage from "./components/QualifyingPage";
import BracketPage from "./components/BracketPage";
import { useState, useEffect } from "react";

function App() {
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    const savedDrivers = JSON.parse(localStorage.getItem("qualifyingDrivers"));
    if (savedDrivers) {
      setDrivers(savedDrivers);
    }
  }, []); // ✅ Load from localStorage on first render

  console.log("App State - Drivers:", drivers);

  return (
    <Router>
      <div className="bg-black min-h-screen text-white p-6">
        <Routes>
          <Route path="/" element={<QualifyingPage setDrivers={setDrivers} />} />
          <Route path="/bracket" element={<BracketPage drivers={drivers} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

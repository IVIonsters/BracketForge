import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QualifyingPage from "./components/QualifyingPage";
import BracketPage from "./components/BracketPage";
import { useState } from "react";

function App() {
  const [qualifiedDrivers, setQualifiedDrivers] = useState([]);

  return (
    <Router>
      <div className="">
        <Routes>
          <Route path="/" element={<QualifyingPage setQualifiedDrivers={setQualifiedDrivers} />} />
          <Route path="/bracket" element={<BracketPage qualifiedDrivers={qualifiedDrivers} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


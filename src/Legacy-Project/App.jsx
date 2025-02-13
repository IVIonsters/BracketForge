import './App.css'

"use client"

import { useState, useEffect } from "react"

function QualifyingList({ drivers, updateDrivers }) {
  const [newDriver, setNewDriver] = useState({ name: "", run1: [0, 0, 0], run2: [0, 0, 0] })

  const addDriver = () => {
    if (newDriver.name) {
      const updatedDrivers = [
        ...drivers,
        {
          ...newDriver,
          highestScore: Math.max(
            newDriver.run1.reduce((a, b) => a + b, 0),
            newDriver.run2.reduce((a, b) => a + b, 0),
          ),
        },
      ]
      updateDrivers(updatedDrivers)
      setNewDriver({ name: "", run1: [0, 0, 0], run2: [0, 0, 0] })
    }
  }

  const updateScore = (index, run, judgeIndex, score) => {
    const updatedDrivers = [...drivers]
    updatedDrivers[index][run][judgeIndex] = Number(score)
    updatedDrivers[index].highestScore = Math.max(
      updatedDrivers[index].run1.reduce((a, b) => a + b, 0),
      updatedDrivers[index].run2.reduce((a, b) => a + b, 0),
    )
    updateDrivers(updatedDrivers)
  }

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-4">Qualifying List</h2>
      <div className="mb-4">
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Driver Name"
          value={newDriver.name}
          onChange={(e) => setNewDriver({ ...newDriver, name: e.target.value })}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
          onClick={addDriver}
        >
          Add Driver
        </button>
      </div>
      <ul>
        {drivers.map((driver, index) => (
          <li key={index} className="mb-4">
            <h3 className="font-bold">{driver.name}</h3>
            <div className="grid grid-cols-2 gap-4">
              {["run1", "run2"].map((run) => (
                <div key={run}>
                  <h4>{run === "run1" ? "Run 1" : "Run 2"}</h4>
                  {[0, 1, 2].map((judgeIndex) => (
                    <input
                      key={judgeIndex}
                      type="number"
                      className="w-16 mr-2 border rounded"
                      value={driver[run][judgeIndex]}
                      onChange={(e) => updateScore(index, run, judgeIndex, e.target.value)}
                    />
                  ))}
                </div>
              ))}
            </div>
            <p>Highest Score: {driver.highestScore}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Bracket({ topDrivers }) {
  const rounds = [32, 16, 8, 4, 2, 1]

  useEffect(() => {
    console.log("Bracket component received topDrivers:", topDrivers)
  }, [topDrivers])

  // Ensure topDrivers is an array, even if it's undefined or null
  const safeTopDrivers = Array.isArray(topDrivers) ? topDrivers : []

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-4">Top 32 Bracket</h2>
      <div className="flex flex-wrap justify-between">
        {rounds.map((round, roundIndex) => (
          <div key={roundIndex} className="flex flex-col mb-4">
            <h3 className="text-center mb-2">Round of {round}</h3>
            {Array.from({ length: round }, (_, i) => {
              const driverIndex = roundIndex * 32 + i
              const driver = safeTopDrivers[driverIndex]
              return (
                <div key={i} className="border p-2 m-1 w-32 text-center">
                  {driver ? driver.name : "TBD"}
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function App() {
  const [drivers, setDrivers] = useState([])
  const [topDrivers, setTopDrivers] = useState([])

  useEffect(() => {
    console.log("App component - current drivers:", drivers)
    console.log("App component - current topDrivers:", topDrivers)
  }, [drivers, topDrivers])

  const updateDrivers = (updatedDrivers) => {
    console.log("Updating drivers:", updatedDrivers)
    setDrivers(updatedDrivers)
    const sortedDrivers = [...updatedDrivers].sort((a, b) => b.highestScore - a.highestScore)
    console.log("Sorted drivers:", sortedDrivers)
    setTopDrivers(sortedDrivers.slice(0, 32))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Drifting Competition Bracket</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <QualifyingList drivers={drivers} updateDrivers={updateDrivers} />
        <Bracket topDrivers={topDrivers} />
      </div>
    </div>
  )
}
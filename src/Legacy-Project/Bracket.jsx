export default function Bracket({ topDrivers }) {
  const rounds = [32, 16, 8, 4, 2, 1]

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-4">Top 32 Bracket</h2>
      <div className="flex justify-between">
        {rounds.map((round, roundIndex) => (
          <div key={roundIndex} className="flex flex-col">
            <h3 className="text-center mb-2">Round of {round}</h3>
            {Array.from({ length: round }, (_, i) => (
              <div key={i} className="border p-2 m-1 w-32">
                {topDrivers[i] ? topDrivers[i].name : "TBD"}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
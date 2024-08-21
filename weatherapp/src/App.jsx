import { useState } from "react";
import axios from "axios";

function App() {
  const [coordinates, setCoordinate] = useState({
    latitude: 0,
    longitude: 0,
  });

  const [currentData, setCurrentData] = useState(null);  // Initialize to null for easier conditional rendering
  
  async function handleLocationSearch(e) {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}&hourly=temperature_2m`
      );
      setCurrentData(response.data);  // Make sure to access response.data
      console.log(response.data);     // Log the correct data
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Failed to fetch weather data. Please check your coordinates.");
    }
  }

  function handleChange(e) {
    setCoordinate({ ...coordinates, [e.target.name]: Number(e.target.value) });
  }

  return (
    <div className="w-screen h-screen flex flex-col bg-gradient-to-b from-blue-300 to-white">
      <div className="mx-auto bg-white p-6 shadow-md rounded-lg">
        <form onSubmit={handleLocationSearch} className="space-y-4">
          <input
            placeholder="Latitude"
            onChange={handleChange}
            name="latitude"  // Corrected the name from 'latitute' to 'latitude'
            type="number"
            step="0.01"
            min="-90"
            max="90"
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
          />
          <input
            placeholder="Longitude"
            onChange={handleChange}
            name="longitude"
            type="number"
            step="0.01"
            min="-180"
            max="180"
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 py-3"
          >
            Search
          </button>
        </form>
      </div>
      {currentData ? (
        <div className="mt-6 mx-auto bg-white p-4 shadow-md rounded-lg w-96">
        <h3 className="text-xl font-semibold">Weather Data:</h3>
        <pre className="text-sm font-semibold text-black w-full p-3 border border-spacing-2">{JSON.stringify(currentData, null, 2)}</pre>
      </div>
      ) : (
        <p className="mt-4 text-center text-gray-500">No data yet.</p>
      )}
    </div>
  );
}

export default App;

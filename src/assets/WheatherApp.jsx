// Import necessary modules
import React, { useState } from 'react';

// Weather component
function WheatherApp() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  // Fetch weather data from API
  const fetchWeather = async () => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8ac5c4d57ba6a4b3dfcf622700447b1e&units=metric`;
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }
      const data = await response.json();
      setWeatherData(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    }
  };

  // Handle form submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim() !== "") {
      fetchWeather();
    }
  };

  // Render the component
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', textAlign: 'center', padding: '20px' }}>
      <h1>Weather App</h1>
      <form onSubmit={handleSearch} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={{ padding: '10px', fontSize: '16px', width: '200px' }}
        />
        <button type="submit" style={{ padding: '10px 20px', marginLeft: '10px', fontSize: '16px' }}>
          Search
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!weatherData && !error && <p>Enter a city to see the weather</p>}
      {weatherData && (
        <div style={{ border: '1px solid #ddd', borderRadius: '10px', padding: '20px', display: 'inline-block' }}>
          <h2>{weatherData.name}</h2>
          <p><strong>Temperature:</strong> {weatherData.main.temp} °C</p>
          <p><strong>Weather:</strong> {weatherData.weather[0].description}</p>
          <p><strong>Humidity:</strong> {weatherData.main.humidity} %</p>
          <p><strong>Wind Speed:</strong> {weatherData.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

export default WheatherApp;

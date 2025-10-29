import { useState } from "react";
import "./index.css";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const apikey = "e0d0260bb627729478a0f516c9caeb55";

  async function getWeather() {
    if (!city) {
      setError("Please enter a city name");
      setWeather(null);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`
      );

      if (!res.ok) throw new Error("City not found...");

      const data = await res.json();
      setWeather(data);
      setError("");
    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app">
      <h1>Weather App</h1>

      <div className="input-box">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={getWeather}>Search</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-card">
          <h2>{weather.name}</h2>

          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
            className="weather-icon"
          />

          <h3>{Math.round(weather.main.temp)}°C</h3>
          <p>{weather.weather[0].description}</p>
          <p>💧 {weather.main.humidity}% humidity</p>
          <p>🌬️ {weather.wind.speed} m/s wind</p>
        </div>
      )}
    </div>
  );
}

export default App;

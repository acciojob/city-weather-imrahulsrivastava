import React, { useState } from "react";
import "./../styles/App.css";

const API_KEY = "2bf4af9501c7bdfb26cf7c139b7f3bf7";

const App = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    setLoading(true);
    setError(null);
    setData(null);

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${API_KEY}`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("City not found");
        }
        return res.json();
      })
      .then((data) => setData(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  const kelvinToFahrenheit = (k) => ((k - 273.15) * 9) / 5 + 32;

  const capitalizeWords = (str) =>
    str.replace(/\b\w/g, (char) => char.toUpperCase());

  return (
    <div className="weather-container">
      <form onSubmit={handleSubmit}>
        <input
          className="search"
          type="text"
          placeholder="Enter a city"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </form>

      <div className="weather">
        {loading && <p>Loading...</p>}

        {error && <p style={{ color: "red" }}>{error}</p>}

        {data && (
          <div>
            <h2>{data.name}</h2>
            <p>{kelvinToFahrenheit(data.main.temp).toFixed(2)}°F</p>
            <p>{capitalizeWords(data.weather[0].description)}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;

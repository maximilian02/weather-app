import { useEffect, useState } from "react";
import axios from "axios";
import WeatherReport, { WeatherReportProps } from "./WeatherReport";

// TODO: move this to a better place
const WEATHER_APP_KEY = `4832a60c6a745e236785c4dd576302a7`;

function App() {
  const [city, setCity] = useState<string>("Hong Kong");

  const [weatherData, setWeatherData] = useState<WeatherReportProps | null>({
    weatherData: {
      city: city,
      main: { temp: 0 },
      weather: [],
    },
  });

  useEffect(() => {
    // TODO: Fixed to Hong Kong if i connect with a vpn 😀
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${WEATHER_APP_KEY}`;

    axios
      .get(apiUrl)
      .then((response) => {
        setWeatherData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  }, [city]);

  const cities = ["Hong Kong", "Los Angeles", "London", "Paris", "Tokyo"]; // Add more cities as needed

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setCity(event.target.value);

  return (
    <>
      <div className="mb-4">
        <label
          htmlFor="city"
          className="block text-lg font-semibold text-gray-800 mb-1"
        >
          Select a City:
        </label>
        <select
          id="city"
          className="block w-full px-4 py-2 mt-1 border rounded-lg shadow-md focus:outline-none focus:ring focus:border-blue-300"
          onChange={handleCityChange}
          value={city}
        >
          {cities.map((cityOption) => (
            <option key={cityOption} value={cityOption}>
              {cityOption}
            </option>
          ))}
        </select>
      </div>
      <WeatherReport weatherData={{ city, ...weatherData }} />
    </>
  );
}

export default App;

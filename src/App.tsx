import { useEffect, useState } from "react";
import axios from "axios";
import WeatherReport, { WeatherReportProps } from "./WeatherReport";
import {
  WiThermometer,
  WiDaySunny,
  WiCloudy,
  WiRain,
  WiSnow,
  WiThunderstorm,
} from "react-icons/wi";
import Icon from "./Icon";

// TODO: move this to a better place
const WEATHER_APP_KEY = `4832a60c6a745e236785c4dd576302a7`;
interface ForecastData {
  list: {
    dt: number;
    main: {
      temp: number;
    };
    weather: {
      description: string;
      icon: string;
    }[];
  }[];
}

function App() {
  const [city, setCity] = useState<string>("Hong Kong");

  const [weatherData, setWeatherData] = useState<WeatherReportProps | null>({
    weatherData: {
      city: city,
      main: { temp: 0 },
      weather: [],
    },
  });
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);

  useEffect(() => {
    // TODO: Fixed to Hong Kong if i connect with a vpn 😀
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${WEATHER_APP_KEY}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${WEATHER_APP_KEY}`;

    axios
      .get(currentWeatherUrl)
      .then((response) => {
        setWeatherData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });

    axios
      .get(forecastUrl)
      .then((response) => {
        setForecastData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching forecast data:", error);
      });
  }, [city]);

  const cities = [
    "Hong Kong",
    "Los Angeles",
    "London",
    "Paris",
    "Tokyo",
    "Montevideo",
  ]; // Add more cities as needed

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setCity(event.target.value);

  return (
    <>
      <div className="p-4 border-8 rounded-lg border-blue">
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
        <h2 className="text-2xl font-bold mt-4">5-Day Weather Forecast</h2>
        <div className="grid grid-cols-5 gap-4 mt-2">
          {forecastData ? (
            forecastData.list.slice(0, 5).map((forecast) => (
              <div
                key={forecast.dt}
                className="p-2 bg-blue-200 rounded-lg shadow-md"
              >
                <Icon
                  iconCode={(forecast && forecast.weather[0].icon) || ""}
                  size={20}
                />
                <div className="text-lg">
                  {Math.round(forecast.main.temp)}°C
                </div>
                <div className="text-sm">{forecast.weather[0].description}</div>
              </div>
            ))
          ) : (
            <>Loading</>
          )}
        </div>
      </div>
    </>
  );
}

export default App;

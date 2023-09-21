import React, { useState } from "react";
import {
  WiThermometer,
  WiDaySunny,
  WiCloudy,
  WiRain,
  WiSnow,
  WiThunderstorm,
} from "react-icons/wi";

export interface WeatherReportProps {
  weatherData: {
    main?: {
      temp: number;
    };
    city?: string;
    weather?: {
      description: string;
      icon: string;
    }[];
  };
}

const WeatherReport: React.FC<WeatherReportProps> = ({ weatherData }) => {
  const { main, city, weather } = weatherData;
  const getWeatherIcon = (iconCode: string, size: string | number) => {
    switch (iconCode) {
      case "01d":
        return <WiDaySunny size={size} color="yellow" />;
      case "01n":
        return <WiDaySunny size={size} color="yellow" />;
      case "02d":
        return <WiCloudy size={size} color="gray" />;
      case "02n":
        return <WiCloudy size={size} color="gray" />;
      case "03d":
      case "03n":
        return <WiCloudy size={size} color="gray" />;
      case "04d":
      case "04n":
        return <WiCloudy size={size} color="gray" />;
      case "09d":
      case "09n":
        return <WiRain size={size} color="light-blue" />;
      case "10d":
      case "10n":
        return <WiRain size={size} color="light-blue" />;
      case "11d":
      case "11n":
        return <WiThunderstorm size={size} color="light-blue" />;
      case "13d":
      case "13n":
        return <WiSnow size={size} color="light-blue" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-blue-200 p-4 rounded-lg shadow-md">
      {weatherData ? (
        <>
          <h2 className="text-2xl font-bold mb-2">
            This is the friendly weather report defaulted to: {city}
          </h2>
          <div className="flex items-center">
            {getWeatherIcon((weather && weather[0].icon) ?? "x", 220)}
            <div className="text-4xl font-semibold mr-2">
              {Math.round((main && main.temp) ?? 0)}°C
            </div>
            <div className="text-lg">
              {(weather && weather[0].description) ?? "."}
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default WeatherReport;

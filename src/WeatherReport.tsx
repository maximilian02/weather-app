import React from "react";
import Icon from "./Icon";

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

  return (
    <div className="bg-blue-200 p-4 rounded-lg shadow-md">
      {weatherData ? (
        <>
          <h2 className="text-2xl font-bold mb-2">
            This is the friendly weather report defaulted to: {city}
          </h2>
          <div className="flex items-center">
            <Icon iconCode={(weather && weather[0].icon) || ""} size={220} />
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

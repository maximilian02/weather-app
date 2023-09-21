import { render } from "@testing-library/react";
import WeatherReport from "./WeatherReport";

const mockWeatherData = {
  city: "Hong Kong, HK",
  main: {
    temp: 25,
  },
  weather: [
    {
      description: "Sunny",
      icon: "01d",
    },
  ],
};

describe("WeatherReport", () => {
  it("fetches and displays weather data", async () => {
    const { getByText } = render(
      <WeatherReport weatherData={mockWeatherData} />
    );
    const cityWeatherText = getByText(
      "This is the friendly weather report defaulted to: Hong Kong, HK"
    );
    const temperatureText = getByText("25°C");
    const descriptionText = getByText("Sunny");
    expect(cityWeatherText).toBeInTheDocument();
    expect(temperatureText).toBeInTheDocument();
    expect(descriptionText).toBeInTheDocument();
  });
});

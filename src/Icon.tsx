import {
  WiThermometer,
  WiDaySunny,
  WiCloudy,
  WiRain,
  WiSnow,
  WiThunderstorm,
} from "react-icons/wi";

const Icon = ({ iconCode = "", size = 0 }) => {
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

export default Icon;

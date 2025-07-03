import "./WeatherCard.css";
import { weatherOptions, defaultWeatherOptions } from "../../utils/constants";

function WeatherCard({ weatherData }) {
  console.log(weatherData);
  console.log(weatherOptions);
  const filteredOptions = weatherOptions.filter((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });

  // ❗️ Eğer eşleşme yoksa, default + day + condition verilerini elle ekle
  const weatherOption =
    filteredOptions.length === 0
      ? {
          ...defaultWeatherOptions[weatherData.isDay ? "day" : "night"],
          day: weatherData.isDay,
          condition: weatherData.condition,
        }
      : filteredOptions[0];
  console.log(weatherOption);
  return (
    <section className="weather-card">
      <p className="weather-card__temp">{weatherData.temp.F} &deg; F</p>
      <img
        src={weatherOption.url}
        alt={`Card showing ${weatherOption.day ? "day" : "night"} time ${
          weatherOption.condition
        } weather`}
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;

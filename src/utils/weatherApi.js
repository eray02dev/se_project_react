// utils/weatherApi.js
import { check } from "./api"; // gerekirse yolunu ayarla: "../utils/api" vs.

export const getWeather = ({ latitude, longitude }, APIkey) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  ).then(check); // DRY: ok/json ayrımını tek yerden yap
};

export const filterWeatherData = (data) => {
  const tempF = data.main.temp;
  const tempC = ((tempF - 32) * 5) / 9;

  return {
    city: data.name,
    temp: {
      F: tempF.toFixed(2),
      C: tempC.toFixed(2),
    },
    type: getWeatherType(tempF),
    condition: data.weather[0].main.toLowerCase(),
    isDay: isDay(data.sys, Date.now()),
  };
};

const isDay = ({ sunrise, sunset }, now) => {
  const sunriseMs = sunrise * 1000;
  const sunsetMs = sunset * 1000;
  return sunriseMs < now && now < sunsetMs;
};

const getWeatherType = (temperature) => {
  if (temperature > 86) return "hot";
  if (temperature >= 66) return "warm";
  return "cold";
};

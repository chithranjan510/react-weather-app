import { DateTime } from "luxon";

export const API_KEY = process.env.REACT_APP_API_KEY;
const currentWeatherUrl = "https://api.openweathermap.org/data/2.5/weather";
const forecastWeatherUrl = "https://api.openweathermap.org/data/2.5/forecast";

const getFormattedDateAndTime = (time, offset, format) => {
  return DateTime.fromSeconds(time + offset, { zone: "utc" }).toFormat(format);
};

export const getWeatherDetails = async (searchParams) => {

  const url = new URL(currentWeatherUrl);
  url.search = new URLSearchParams({
    ...searchParams,
    appid: API_KEY,
    units: "metric",
  });

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.cod !== 200) {
      throw new Error(data.message);
    }

    const {
      coord: { lon, lat },
      weather: [{ main, icon }],
      main: { temp, feels_like, temp_min, temp_max, humidity },
      wind: { speed },
      dt,
      sys: { country, sunrise, sunset },
      name,
      timezone,
    } = data;

    const { hourlyForecast, dailyForecast, error } = await getForecastDetails(
      {
        lat: lat,
        lon: lon,
      },
      dt,
      timezone
    );

    if (error) {
      throw new Error(error);
    }

    const localDateAndTime = getFormattedDateAndTime(
      dt,
      timezone,
      "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
    );
    const localSunrise = getFormattedDateAndTime(sunrise, timezone, "hh:mm a");
    const localSunset = getFormattedDateAndTime(sunset, timezone, "hh:mm a");

    const formattedData = {
      main,
      icon,
      temp,
      feels_like,
      temp_min,
      temp_max,
      humidity,
      speed,
      country,
      localSunrise,
      localSunset,
      name,
      timezone,
      localDateAndTime,
      hourlyForecast,
      dailyForecast,
    };

    return formattedData;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getForecastDetails = async (
  searchParams,
  currentTimeInSec,
  offset
) => {
  const url = new URL(forecastWeatherUrl);
  url.search = new URLSearchParams({
    ...searchParams,
    appid: API_KEY,
    units: "metric",
  });

  const res = await fetch(url);
  const data = await res.json();

  if (data.cod !== "200") {
    return { hourlyForecast: {}, dailyForecast: {}, error: data.message };
  }

  // hourly data
  const hourlyForecast = data.list
    .filter((f) => f.dt > currentTimeInSec)
    .slice(0, 5)
    .map((f) => {
      return {
        temp: f.main.temp,
        icon: f.weather[0].icon,
        time: getFormattedDateAndTime(f.dt, offset, "hh:mm a"),
      };
    });

  // daily data
  const dailyForecast = data.list
    .filter((f) => f.dt_txt.slice(-8) === "00:00:00")
    .slice(0, 5)
    .map((f) => {
      return {
        temp: f.main.temp,
        icon: f.weather[0].icon,
        time: getFormattedDateAndTime(f.dt, offset, "ccc"),
      };
    });

  return { hourlyForecast, dailyForecast, error: null };
};

export const defaultPlaceOptions = Object.freeze({
  Mumbai: "Mumbai",
  Bangalore: "Bangalore",
  kolkata: "kolkata",
  Chennai: "Chennai",
});

export const rainyWeather = Object.freeze({
  drizzle: "Drizzle",
  rain: "Rain",
  thunderstorm: "Thunderstorm",
});

export const getButtonAndBgColor = (temp, weather) => {
  if (
    weather === rainyWeather.rain ||
    weather === rainyWeather.drizzle ||
    weather === rainyWeather.thunderstorm
  ) {
    return {
      btnColor: "gray.700",
      bgGradient: "linear(to-br, gray.600, gray.700)",
    };
  } else if (temp > 25) {
    return {
      btnColor: "orange.700",
      bgGradient: "linear(to-br, orange.600, orange.700)",
    };
  } else {
    return {
      btnColor: "blue.700",
      bgGradient: "linear(to-br, blue.600, blue.700)",
    };
  }
};

export const getWeatherIconSrc = (icon) => {
  return `https://openweathermap.org/img/wn/${icon}@2x.png`;
};

export const getTempBasedOnUnit = (temp, isMetricUnit) => {
  if (isMetricUnit) {
    return temp;
  }

  return (9 / 5) * temp + 32;
};      
    
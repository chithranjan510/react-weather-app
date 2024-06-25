export const defaultPlaceOptions = Object.freeze({
  Mumbai: "Mumbai",
  Bangalore: "Bangalore",
  kolkata: "kolkata",
  Chennai: "Chennai",
});

export const weatherOptions = Object.freeze({
  Drizzle: "Drizzle",
  Rain: "Rain",
  Thunderstorm: "Thunderstorm",
  Clouds: "Clouds",
  Snow: "Snow",
  Clear: "Clear",
});

export const getButtonAndBgColor = (temp, weather) => {
  if (
    weather === weatherOptions.Rain ||
    weather === weatherOptions.Drizzle ||
    weather === weatherOptions.Thunderstorm
  ) {
    return {
      btnColor: "gray.700",
      loaderColor: "#2D3748",
      bgGradient: "linear(to-br, gray.600, gray.700)",
    };
  } else if (weather === weatherOptions.Clouds && temp <= 25) {
    return {
      btnColor: "blue.700",
      loaderColor: "#1E4E8C",
      bgGradient: "linear(to-br, gray.700, blue.700)",
    };
  } else if (weather === weatherOptions.Clouds && temp > 25) {
    return {
      btnColor: "orange.700",
      loaderColor: "#9C4221",
      bgGradient: "linear(to-br, gray.700, orange.700)",
    };
  } else if (weather === weatherOptions.Snow && temp <= 25) {
    return {
      btnColor: "blue.600",
      loaderColor: "#2A69AC",
      bgGradient: "linear(to-br, blue.600, #999)",
    };
  } else if (weather === weatherOptions.Snow && temp > 25) {
    return {
      btnColor: "orange.600",
      loaderColor: "#C05621",
      bgGradient: "linear(to-br, orange.600, #888)",
    };
  } else if (weather === weatherOptions.Clear && temp <= 25) {
    return {
      btnColor: "blue.800",
      loaderColor: "#153E75",
      bgGradient: "linear(to-br, blue.600, blue.800)",
    };
  } else if (weather === weatherOptions.Clear && temp <= 25) {
    return {
      btnColor: "orange.800",
      loaderColor: "#7B341E",
      bgGradient: "linear(to-br, yellow.600, orange.800)",
    };
  } else if (temp <= 25) {
    return {
      btnColor: "blue.900",
      loaderColor: "#1A365D",
      bgGradient: "linear(to-br, blue.800, blue.900)",
    };
  } else {
    return {
      btnColor: "orange.900",
      loaderColor: "#652B19",
      bgGradient: "linear(to-br, yellow.700, orange.900)",
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

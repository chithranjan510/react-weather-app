import { Box, SimpleGrid, Spinner } from "@chakra-ui/react";
import TopSection from "./components/TopSection";
import { useEffect, useState } from "react";
import WeatherReport from "./components/WeatherReport";
import { defaultPlaceOptions, getButtonAndBgColor } from "./components/utility";
import Forecast from "./components/Forecast";
import { getWeatherDetails } from "./components/api";

function App() {
  const [placeQuery, setPlaceQuery] = useState({
    q: defaultPlaceOptions.Mumbai,
  });
  const [isMetricUnit, setIsMetricUnit] = useState(true);

  const [data, setData] = useState(null);

  useEffect(() => {
    getWeatherDetails(placeQuery)
      .then((res) => setData(res))
      .catch((err) => {
        alert(err.message);
      });
  }, [placeQuery]);

  if (!data) {
    return <Spinner />;
  }

  return (
    <Box
      bgGradient={getButtonAndBgColor(data.temp, data.main).bgGradient}
      minH="100vh"
      px={[5, 10, null, 20]}
      py={[5, 7, null, 10]}
    >
      <TopSection
        placeQuery={placeQuery}
        setPlaceQuery={setPlaceQuery}
        isMetricUnit={isMetricUnit}
        setIsMetricUnit={setIsMetricUnit}
        data={data}
      />
      <SimpleGrid
        templateColumns={[
          "minmax(0, 1fr)",
          null,
          null,
          "repeat(2, minmax(0, 1fr))",
        ]}
        gap={[16, null, null, 20]}
        pt={[7, 10, null, 20]}
      >
        <WeatherReport data={data} isMetricUnit={isMetricUnit} />
        <Box>
          <Forecast
            data={data.hourlyForecast}
            isMetricUnit={isMetricUnit}
            label="3 HOURS STEP FORECAST"
          />
          <Forecast
            data={data.dailyForecast}
            isMetricUnit={isMetricUnit}
            label="DAILY FORECAST"
            pt={10}
          />
        </Box>
      </SimpleGrid>
    </Box>
  );
}

export default App;

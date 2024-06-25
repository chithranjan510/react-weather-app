import { Box, SimpleGrid, useToast } from "@chakra-ui/react";
import TopSection from "./components/TopSection";
import { useEffect, useState } from "react";
import WeatherReport from "./components/WeatherReport";
import { defaultPlaceOptions, getButtonAndBgColor } from "./components/utility";
import Forecast from "./components/Forecast";
import { getWeatherDetails } from "./components/api";
import { LoadingSpinner } from "./components/CommonComponents";

const weatherDataToastId = "weatherDataToastId";

function App() {
  const [placeQuery, setPlaceQuery] = useState({
    q: defaultPlaceOptions.Mumbai,
  });
  const [isLoading, setIsloading] = useState(false);
  const [isMetricUnit, setIsMetricUnit] = useState(true);

  const [data, setData] = useState(null);
  const toast = useToast();

  useEffect(() => {
    getWeatherDetails(placeQuery)
      .then((res) => {
        setIsloading(false);
        setData(res);
      })
      .catch((err) => {
        setIsloading(false);
        if (!toast.isActive(weatherDataToastId)) {
          toast({
            id: weatherDataToastId,
            description:
              err.message.charAt(0).toUpperCase() + err.message.slice(1),
            duration: 4000,
            status: "error",
            isClosable: true,
          });
        }
      });
  }, [placeQuery]);

  if (!data) {
    return <LoadingSpinner height="100vh" color="#42b0e2" />;
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
        setIsloading={setIsloading}
      />
      {isLoading ? (
        <LoadingSpinner
          height="50vh"
          color={getButtonAndBgColor(data.temp, data.main).loaderColor}
        />
      ) : (
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
      )}
    </Box>
  );
}

export default App;

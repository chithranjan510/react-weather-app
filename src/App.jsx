import { Box, SimpleGrid } from "@chakra-ui/react";
import TopSection from "./components/TopSection";
import { useState } from "react";
import WeatherReport from "./components/WeatherReport";
import { defaultPlaceOptions } from "./components/utility";
import Forecast from "./components/Forecast";

function App() {
  const [placeQuery, setPlaceQuery] = useState({
    q: defaultPlaceOptions.Mumbai,
  });
  const [isMetricUnit, setIsMetricUnit] = useState(true);

  return (
    <Box
      bgGradient="linear(to-br, yellow.600, orange.700)"
      minH="100vh"
      px={[5, 10, null, 20]}
      py={[5, 7, null, 10]}
    >
      <TopSection
        placeQuery={placeQuery}
        setPlaceQuery={setPlaceQuery}
        isMetricUnit={isMetricUnit}
        setIsMetricUnit={setIsMetricUnit}
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
        <WeatherReport />
        <Forecast />
      </SimpleGrid>
    </Box>
  );
}

export default App;

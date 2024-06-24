import { Box, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { getTempBasedOnUnit, getWeatherIconSrc } from "./utility";

const Forecast = ({ data, isMetricUnit, label, ...props }) => {
  return (
    <Box {...props}>
      <Text>{label}</Text>
      <hr />
      <HStack w="100%" justifyContent="space-between" pt={2}>
        {data.map((d, index) => {
          return (
            <VStack py={3} key={index}>
              <Text fontSize="12px">{d.time}</Text>
              <Image src={getWeatherIconSrc(d.icon)} alt="icon" width="50px" />
              <Text fontSize="12px">
                {Math.round(getTempBasedOnUnit(d.temp, isMetricUnit))}°
              </Text>
            </VStack>
          );
        })}
      </HStack>
    </Box>
  );
};

export default Forecast;

import {
  Box,
  HStack,
  Image,
  SimpleGrid,
  Text,
  VStack,
  chakra,
} from "@chakra-ui/react";
import { FaThermometerHalf } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { FaWind } from "react-icons/fa";
import { GiSunrise } from "react-icons/gi";
import { GiSunset } from "react-icons/gi";
import { FaArrowUp } from "react-icons/fa6";
import { FaArrowDown } from "react-icons/fa6";
import { getTempBasedOnUnit, getWeatherIconSrc } from "./utility";

const WeatherReport = ({ data, isMetricUnit }) => {
  const {
    localDateAndTime,
    name: cityName,
    country,
    icon,
    main: weather,
    temp,
    localSunrise,
    localSunset,
    temp_min,
    temp_max,
    humidity,
    feels_like,
    speed: windSpeed,
  } = data;

  return (
    <VStack w="100%" borderRadius="10px" boxShadow="0 0 10px #000" p={[5, 10]}>
      <Text fontWeight={200} textAlign="center">
        {localDateAndTime}
      </Text>
      <Text fontSize="20px">{`${cityName}, ${country}`}</Text>
      <HStack w="100%" justifyContent="space-between" pt={5}>
        <Image
          src={getWeatherIconSrc(icon)}
          alt="weather"
          w={["70px", "100px"]}
        />
        <Box textAlign="center">
          <Text fontSize={["18px", "22px"]} color="#87d6ac">
            {weather}
          </Text>
          <Text fontSize={["30px", "40px"]} pt={5}>
            {Math.round(getTempBasedOnUnit(temp, isMetricUnit))}°
          </Text>
        </Box>
        <Box>
          <HStack spacing={1} pb={2}>
            <FaThermometerHalf />
            <Text fontWeight={200} fontSize="13px">
              Feels Like:{" "}
              <chakra.span fontWeight={400} fontSize="14px">
                {Math.round(getTempBasedOnUnit(feels_like, isMetricUnit))}°
              </chakra.span>
            </Text>
          </HStack>
          <HStack spacing={1} mx="-2px" pb={2}>
            <WiHumidity size="20px" />
            <Text fontWeight={200} fontSize="13px">
              Humidity:{" "}
              <chakra.span fontWeight={400} fontSize="14px">
                {Math.round(humidity)}%
              </chakra.span>
            </Text>
          </HStack>
          <HStack spacing={2} mx="2px">
            <FaWind size="12px" />
            <Text fontWeight={200} fontSize="13px">
              Wind:{" "}
              <chakra.span fontWeight={400} fontSize="14px">
                {Math.round(windSpeed)} m/s
              </chakra.span>
            </Text>
          </HStack>
        </Box>
      </HStack>
      <SimpleGrid
        w="100%"
        templateColumns="repeat(2, minmax(0, 1fr))"
        justifyItems="center"
        pt={10}
        gap={10}
      >
        <HStack>
          <FaArrowUp size="20px" />
          <Text fontWeight={200} fontSize="14px">
            High:{" "}
            <chakra.span fontWeight={400} fontSize="15px">
              {Math.round(getTempBasedOnUnit(temp_max, isMetricUnit))}°
            </chakra.span>
          </Text>
        </HStack>
        <HStack>
          <FaArrowDown size="20px" />
          <Text fontWeight={200} fontSize="14px">
            Low:{" "}
            <chakra.span fontWeight={400} fontSize="15px">
              {Math.round(getTempBasedOnUnit(temp_min, isMetricUnit))}°
            </chakra.span>
          </Text>
        </HStack>
        <HStack>
          <GiSunrise size="25px" />
          <Text fontWeight={200} fontSize="14px">
            Rise:{" "}
            <chakra.span fontWeight={400} fontSize="15px">
              {localSunrise}
            </chakra.span>
          </Text>
        </HStack>
        <HStack>
          <GiSunset size="25px" />
          <Text fontWeight={200} fontSize="14px">
            Set:{" "}
            <chakra.span fontWeight={400} fontSize="15px">
              {localSunset}
            </chakra.span>
          </Text>
        </HStack>
      </SimpleGrid>
    </VStack>
  );
};

export default WeatherReport;

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

const WeatherReport = () => {
  return (
    <VStack w="100%" borderRadius="10px" boxShadow="0 0 10px #000" p={10}>
      <Text fontWeight={200}>
        Tuesday, 14 february 2023 | Local time: 11:32 PM
      </Text>
      <Text fontSize="20px">Mumbai, IN</Text>
      <HStack w="100%" justifyContent="space-between" pt={5}>
        <Image
          src="https://openweathermap.org/img/wn/10d@2x.png"
          alt="weather"
        />
        <Box textAlign="center">
          <Text fontSize="22px" color="#87d6ac">
            Rain
          </Text>
          <Text fontSize="40px" pt={5}>
            28&#176;
          </Text>
        </Box>
        <Box>
          <HStack spacing={1} pb={2}>
            <FaThermometerHalf />
            <Text fontWeight={200} fontSize="13px">
              Feels Like:{" "}
              <chakra.span fontWeight={400} fontSize="14px">
                28&#176;
              </chakra.span>
            </Text>
          </HStack>
          <HStack spacing={1} mx="-2px" pb={2}>
            <WiHumidity size="20px" />
            <Text fontWeight={200} fontSize="13px">
              Humidity:{" "}
              <chakra.span fontWeight={400} fontSize="14px">
                40%
              </chakra.span>
            </Text>
          </HStack>
          <HStack spacing={2} mx="2px">
            <FaWind size="12px" />
            <Text fontWeight={200} fontSize="13px">
              Wind:{" "}
              <chakra.span fontWeight={400} fontSize="14px">
                3 m/s
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
              30&#176;
            </chakra.span>
          </Text>
        </HStack>
        <HStack>
          <FaArrowDown size="20px" />
          <Text fontWeight={200} fontSize="14px">
            Low:{" "}
            <chakra.span fontWeight={400} fontSize="15px">
              26&#176;
            </chakra.span>
          </Text>
        </HStack>
        <HStack>
          <GiSunrise size="25px" />
          <Text fontWeight={200} fontSize="14px">
            Sunrise:{" "}
            <chakra.span fontWeight={400} fontSize="15px">
              08:00 AM
            </chakra.span>
          </Text>
        </HStack>
        <HStack>
          <GiSunset size="25px" />
          <Text fontWeight={200} fontSize="14px">
            Sunset:{" "}
            <chakra.span fontWeight={400} fontSize="15px">
              06:00 PM
            </chakra.span>
          </Text>
        </HStack>
      </SimpleGrid>
    </VStack>
  );
};

export default WeatherReport;

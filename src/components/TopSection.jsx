import {
  Box,
  Center,
  HStack,
  Image,
  Input,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useRef } from "react";
import { CiSearch } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import { defaultPlaceOptions } from "./utility";

const topButtons = [
  { q: defaultPlaceOptions.Mumbai },
  { q: defaultPlaceOptions.Bangalore },
  { q: defaultPlaceOptions.kolkatta },
  { q: defaultPlaceOptions.Chennai },
];

const TopSection = ({
  placeQuery,
  setPlaceQuery,
  isMetricUnit,
  setIsMetricUnit,
}) => {
  const inputRef = useRef();
  return (
    <VStack w="100%" gap={10}>
      <HStack w="100%" justifyContent="space-between">
        <HStack>
          <Image src="/favicon.ico" alt="weather-icon" w="40px" />
          <Text fontSize="24px" fontWeight={600}>
            Weather
          </Text>
        </HStack>
        <HStack
          borderRadius="6px"
          bgColor="#fff"
          spacing={0}
          cursor="pointer"
          h="35px"
          w="100px"
        >
          <Center
            h="100%"
            w="100%"
            borderRadius="5px"
            bgColor={isMetricUnit ? "blue.700" : "transparent"}
            color={isMetricUnit ? "#fff" : "#000"}
            onClick={() => setIsMetricUnit(true)}
            transition="all 0.3s"
            fontWeight={600}
          >
            &#176;C
          </Center>
          <Center
            h="100%"
            w="100%"
            borderRadius="5px"
            bgColor={isMetricUnit ? "transparent" : "blue.700"}
            color={isMetricUnit ? "#000" : "#fff"}
            onClick={() => setIsMetricUnit(false)}
            transition="all 0.3s"
            fontWeight={600}
          >
            &#176;F
          </Center>
        </HStack>
      </HStack>
      <Stack
        w="100%"
        justifyContent="space-between"
        direction={["column", null, null, "row"]}
        spacing={[7, 10]}
      >
        <HStack gap={5}>
          <Box _active={{ transform: "scale(1.1)" }}>
            <CiLocationOn size="30px" cursor="pointer" />
          </Box>
          <Input
            ref={inputRef}
            minW={["none", "300px"]}
            placeholder="Enter location"
            _placeholder={{ color: "#ffffff80" }}
          />
          <Box _active={{ transform: "scale(1.1)" }}>
            <CiSearch size="30px" cursor="pointer" />
          </Box>
        </HStack>
        <HStack
          spacing={[5, null, 10, 7]}
          w={["100%", null, null, "default"]}
          justifyContent={["center", null, null, "flex-end"]}
        >
          {topButtons.map((d, index) => {
            return (
              <Text
                w="fit-content"
                key={index}
                py={[1, 2]}
                px={[2, 4]}
                borderRadius="5px"
                _hover={{
                  bgColor: "blue.700",
                }}
                transition="all 0.3s"
                bgColor={placeQuery.q === d.q ? "blue.700" : "transparent"}
                cursor="pointer"
                fontSize={["12px", "16px"]}
              >
                {d.q}
              </Text>
            );
          })}
        </HStack>
      </Stack>
    </VStack>
  );
};

export default TopSection;

import {
  Box,
  Center,
  HStack,
  IconButton,
  Image,
  Input,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useRef } from "react";
import { CiSearch } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import { defaultPlaceOptions, getButtonAndBgColor } from "./utility";

const topButtons = [
  { q: defaultPlaceOptions.Mumbai },
  { q: defaultPlaceOptions.Bangalore },
  { q: defaultPlaceOptions.kolkata },
  { q: defaultPlaceOptions.Chennai },
];

const TopSection = ({
  placeQuery,
  setPlaceQuery,
  isMetricUnit,
  setIsMetricUnit,
  data,
}) => {
  const inputRef = useRef();
  const { main: weather, temp } = data;

  const searchHandler = (e) => {
    e.preventDefault();
    setPlaceQuery({ q: inputRef.current.value });
    inputRef.current.value = null;
  };
  const locationHandler = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setPlaceQuery({
          lon: position.coords.longitude,
          lat: position.coords.latitude,
        });
      },
      (error) => {}
    );
  };

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
            bgColor={
              isMetricUnit
                ? getButtonAndBgColor(temp, weather).btnColor
                : "transparent"
            }
            color={isMetricUnit ? "#fff" : "#000"}
            onClick={() => setIsMetricUnit(true)}
            transition="all 0.3s"
            fontWeight={600}
          >
            °C
          </Center>
          <Center
            h="100%"
            w="100%"
            borderRadius="5px"
            bgColor={
              isMetricUnit
                ? "transparent"
                : getButtonAndBgColor(temp, weather).btnColor
            }
            color={isMetricUnit ? "#000" : "#fff"}
            onClick={() => setIsMetricUnit(false)}
            transition="all 0.3s"
            fontWeight={600}
          >
            °F
          </Center>
        </HStack>
      </HStack>
      <Stack
        w="100%"
        justifyContent="space-between"
        direction={["column", null, null, "row"]}
        spacing={[7, 10]}
      >
        <form onSubmit={searchHandler}>
          <HStack gap={5}>
            <Box _active={{ transform: "scale(1.1)" }}>
              <CiLocationOn
                size="30px"
                cursor="pointer"
                onClick={locationHandler}
              />
            </Box>
            <Input
              type="text"
              name="search"
              ref={inputRef}
              minW={["none", "300px"]}
              placeholder="Enter location"
              _placeholder={{ color: "#ffffff80" }}
            />
            <IconButton
              aria-label="search"
              type="submit"
              icon={<CiSearch size="30px" cursor="pointer" />}
              _active={{ transform: "scale(1.1)" }}
              bgColor="transparent"
              _hover={{}}
            />
          </HStack>
        </form>
        <HStack
          spacing={[5, null, 10, 7]}
          w={["100%", null, null, "default"]}
          justifyContent={["center", null, null, "flex-end"]}
        >
          {topButtons.map((d, index) => {
            return (
              <Text
                key={index}
                py={[1, 2]}
                px={[2, 4]}
                borderRadius="5px"
                _hover={{
                  bgColor: getButtonAndBgColor(temp, weather).btnColor,
                }}
                transition="all 0.3s"
                bgColor={
                  placeQuery.q === d.q
                    ? getButtonAndBgColor(temp, weather).btnColor
                    : "transparent"
                }
                cursor="pointer"
                fontSize={["12px", "16px"]}
                onClick={() => setPlaceQuery(d)}
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

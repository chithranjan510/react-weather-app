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
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import { defaultPlaceOptions, getButtonAndBgColor } from "./utility";
import { API_KEY } from "./api";

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
  setIsloading,
}) => {
  const [inputValue, setInputValue] = useState("");
  const { main: weather, temp } = data;
  const [locationOptions, setLocationOptions] = useState([]);

  const searchHandler = (e) => {
    e.preventDefault();
    setPlaceQuery({ q: inputValue });
    setIsloading(true);
    setInputValue("");
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

  const optionSelectHandler = (data) => {
    setPlaceQuery({ lat: data.lat, lon: data.lon });
    setIsloading(true);
    setInputValue("");
  };

  useEffect(() => {
    if (inputValue === "") {
      return;
    }

    fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${inputValue}&limit=5&appid=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        const fetchedOptions = data.map((d) => ({
          place: d.name,
          lat: d.lat,
          lon: d.lon,
          country: d.country,
          state: d.state,
        }));
        setLocationOptions(fetchedOptions);
      });
  }, [inputValue]);

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
        spacing={7}
      >
        <form onSubmit={searchHandler}>
          <HStack gap={3} position="relative">
            <Box _active={{ transform: "scale(1.1)" }}>
              <CiLocationOn
                size="30px"
                cursor="pointer"
                onClick={locationHandler}
              />
            </Box>
            <Input
              required
              type="text"
              name="search"
              list="locations"
              value={inputValue}
              autoComplete="off"
              onChange={(e) => setInputValue(e.target.value)}
              minW={["default", "300px"]}
              placeholder="Enter location"
              _placeholder={{ color: "#ffffff80" }}
            />
            {inputValue !== "" && (
              <Box
                position="absolute"
                w="100%"
                h="200px"
                borderRadius="8px"
                border="2px solid #fff"
                top="50px"
                bgColor="#fff"
                overflow="auto"
              >
                {locationOptions.map((data, index) => {
                  return (
                    <Box
                      key={index}
                      w="100%"
                      py={2}
                      px={2}
                      color="#000"
                      _hover={{ bgColor: "blue.400" }}
                      fontSize="15px"
                      cursor="pointer"
                      onClick={() => optionSelectHandler(data)}
                    >
                      {data.state
                        ? `${data.place}, ${data.state}, ${data.country}`
                        : `${data.place}, ${data.country}`}
                    </Box>
                  );
                })}
              </Box>
            )}
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
                onClick={() => {
                  setInputValue("");
                  setPlaceQuery(d);
                  setIsloading(true);
                }}
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

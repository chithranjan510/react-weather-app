import { Box, Center, keyframes } from "@chakra-ui/react";

const loadingAnimation = keyframes`  
  0% {transform: rotate(0deg);}   
  100% {transform: rotate(360deg)} 
`;

export const LoadingSpinner = ({ height, color }) => {
  return (
    <Center h={height} w="100%">
      <Box
        w={["60px", "80px", "100px"]}
        h={["60px", "80px", "100px"]}
        borderRadius="50%"
        border={[
          "7px solid #dfdfdf80",
          "10px solid #dfdfdf80",
          "13px solid #dfdfdf80",
        ]}
        borderTop={[
          `7px solid ${color}`,
          `10px solid ${color}`,
          `13px solid ${color}`,
        ]}
        animation={`${loadingAnimation} 0.7s linear infinite`}
      />
    </Center>
  );
};

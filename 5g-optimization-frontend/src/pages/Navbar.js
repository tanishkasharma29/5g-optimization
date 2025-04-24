import { Box, Flex, Heading, Button, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <Box bg="teal.500" color="white" p={4}>
      <Flex justify="space-between" align="center">
        <Heading size="md">5G Optimization</Heading>
        <Button colorScheme="red" onClick={() => navigate("/login")}>
          Logout
        </Button>
      </Flex>
    </Box>
  );
}

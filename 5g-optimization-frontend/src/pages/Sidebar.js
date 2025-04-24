import { Box, VStack, Link, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <Box
      width="250px"
      bg="gray.800"
      color="white"
      p={4}
      position="fixed"
      height="100%"
    >
      <VStack spacing={4}>
        <Link as={RouterLink} to="/dashboard">
          <Text fontSize="lg">Dashboard</Text>
        </Link>
        <Link as={RouterLink} to="/profile">
          <Text fontSize="lg">Profile</Text>
        </Link>
        {/* Add other links here */}
      </VStack>
    </Box>
  );
}

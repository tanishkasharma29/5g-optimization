import { useState } from "react";
import {
  Box,
  Button,
  Input,
  Heading,
  VStack,
  Text,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toastNotify = useToast();

  const handleLogin = async () => {
    if (!email || !password) {
      toastNotify({
        title: "Please enter all fields.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });
      const token = response.data.token;
      localStorage.setItem("token", token);

      toastNotify({
        title: "Login successful!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      toastNotify({
        title: "Login failed.",
        description: "Invalid credentials or server error.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={8} maxW="md" mx="auto">
      <VStack spacing={5}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Heading>Login</Heading>
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button colorScheme="blue" onClick={handleLogin} isDisabled={loading}>
            {loading ? <Spinner size="sm" /> : "Log In"}
          </Button>
          <Text>
            Don’t have an account?{" "}
            <Button
              variant="link"
              color="blue.500"
              onClick={() => navigate("/signup")}
            >
              Sign up
            </Button>
          </Text>
        </motion.div>
      </VStack>
    </Box>
  );
}

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

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const toastNotify = useToast();
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!email || !password) {
      toastNotify({
        title: "All fields are required.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/signup", {
        email,
        password,
      });
      const token = response.data.token;
      localStorage.setItem("token", token);

      toastNotify({
        title: "Account created!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      navigate("/dashboard");
    } catch (error) {
      console.error("Signup error:", error);
      toastNotify({
        title: "Signup failed.",
        description: "Email may already be in use or server error.",
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
          <Heading>Sign Up</Heading>
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
          <Button
            colorScheme="green"
            onClick={handleSignup}
            isDisabled={loading}
          >
            {loading ? <Spinner size="sm" /> : "Sign Up"}
          </Button>
          <Text>
            Already have an account?{" "}
            <Button
              variant="link"
              color="blue.500"
              onClick={() => navigate("/login")}
            >
              Log in
            </Button>
          </Text>
        </motion.div>
      </VStack>
    </Box>
  );
}

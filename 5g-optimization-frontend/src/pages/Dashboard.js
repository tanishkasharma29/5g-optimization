import React, { useState } from "react";
import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  Flex,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

export default function Dashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Handle JWT Token Validation and Decoding
  let username = "";
  if (token) {
    try {
      const decoded = jwtDecode(token);
      username = decoded.username; // Assuming the JWT has a username field
    } catch (error) {
      console.error("Invalid token", error);
    }
  }

  // State for file upload
  const [file, setFile] = useState(null);

  // Handle File Upload
  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
    console.log(uploadedFile); // You can now send this file to the backend for processing
  };

  // Chart Data Example
  const chartData = [
    { name: "Jan", value: 400 },
    { name: "Feb", value: 300 },
    { name: "Mar", value: 200 },
    { name: "Apr", value: 278 },
    { name: "May", value: 189 },
  ];

  // Map Data (example coordinates)
  const position = [51.505, -0.09]; // London, can be dynamic or fetched from API

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Flex>
      <Sidebar />
      <Box ml="250px" p={8} maxW="full">
        <Navbar />
        <VStack spacing={6} mt={8}>
          <Heading>Welcome, {username || "Guest"}</Heading>
          <Text>
            You’re logged in and ready to explore the 5G Optimization tools!
          </Text>

          {/* File Upload Section */}
          <Box mt={6}>
            <Heading size="md">Upload Your Data</Heading>
            <Input type="file" onChange={handleFileUpload} mt={2} />
          </Box>

          {/* Graph Section */}
          <Box mt={6}>
            <Heading size="md">Performance Chart</Heading>
            <LineChart width={500} height={300} data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
          </Box>

          {/* AI Output Section (Optional) */}
          <Box mt={6}>
            <Heading size="md">AI Model Predictions</Heading>
            <Text>
              The AI model has predicted that the optimal resource allocation
              for this region is 75%.
            </Text>
          </Box>

          {/* Resource Allocation Map */}
          <Box mt={6}>
            <Heading size="md">Resource Allocation Map</Heading>
            <MapContainer
              center={position}
              zoom={13}
              style={{ height: "300px", width: "100%" }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={position}>
                <Popup>
                  A sample resource allocation point. You can use dynamic data
                  here.
                </Popup>
              </Marker>
            </MapContainer>
          </Box>

          {/* Logout Button */}
          <Button colorScheme="red" onClick={handleLogout} mt={6}>
            Logout
          </Button>
        </VStack>
      </Box>
    </Flex>
  );
}

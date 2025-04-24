import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    brand: {
      50: "#e3f2f9",
      100: "#b6e1f2",
      200: "#8ad1ec",
      300: "#5fbfe7",
      400: "#33a8e1",
      500: "#0099db", // Primary color
      600: "#007ab4",
      700: "#005f8d",
      800: "#004566",
      900: "#002e3f",
    },
  },
  fonts: {
    heading: "Roboto, sans-serif",
    body: "Arial, sans-serif",
  },
  config: {
    initialColorMode: "light",
  },
});

export default theme;

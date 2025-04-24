import { ChakraProvider } from "@chakra-ui/react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import theme from "./theme"; // Import custom theme
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles

function App() {
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <ChakraProvider theme={theme}>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { HomePage } from "../pages/Home";
import ErrorPage from "../pages/Error";
import { theme } from "./theme";
import { ChakraProvider } from "@chakra-ui/react";
import SignInPage from "../pages/SignIn";
import SignUpPage from "../pages/SignUp";
import SettingsPage from "../pages/Settings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "login",
    element: <SignInPage />,
  },
  {
    path: "register",
    element: <SignUpPage />,
  },
  {
    path: "settings",
    element: <SettingsPage />,
  },
]);
function App() {
  return (
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}

export default App;

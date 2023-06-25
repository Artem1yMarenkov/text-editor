import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { useStore } from "effector-react";
import { useEffect } from "react";
import { HomePage } from "../pages/Home";
import ErrorPage from "../pages/Error";
import { theme } from "./theme";
import SignInPage from "../pages/SignIn";
import SignUpPage from "../pages/SignUp";
import SettingsPage from "../pages/Settings";
import { $isLogin } from "./auth";
import { getUserInfoFx } from "../entities/User";

const protectedRouter = createBrowserRouter([
  {
    path: "/",
    element: <SignInPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "register",
    element: <SignUpPage />,
  },
]);

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
  const isLogin = useStore($isLogin);

  useEffect(() => {
    getUserInfoFx();
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <RouterProvider router={isLogin ? router : protectedRouter} />
    </ChakraProvider>
  );
}

export default App;

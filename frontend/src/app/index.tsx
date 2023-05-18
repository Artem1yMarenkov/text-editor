import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { HomePage } from "../pages/Home";
import ErrorPage from "../pages/Error";
import { theme } from "./theme";
import { ChakraProvider } from "@chakra-ui/react";
import SignInPage from "../pages/SignIn";
import SignUpPage from "../pages/SignUp";
import { useStore } from "effector-react";
import { $isLogin } from "../entities/Auth";

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
]);

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

function App() {
  const isLogin = useStore($isLogin);
  return (
    <ChakraProvider theme={theme}>
      <RouterProvider router={isLogin ? router : protectedRouter} />
    </ChakraProvider>
  );
}

export default App;

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { HomePage } from "../pages/Home";
import ErrorPage from "../pages/Error";
import SignInForm from "../widgets/SIgnInForm/SignInForm";
import SignUpForm from "../widgets/SignUpForm/SignUpForm";
import { theme } from "./theme";
import { ChakraProvider } from "@chakra-ui/react";

const router = createBrowserRouter([
	{
		path: "/",
		element: <HomePage />,
		errorElement: <ErrorPage />,
	},
	{
		path: 'login',
		element: <SignInForm />
	},
	{
		path: 'register',
		element: <SignUpForm />
	}
]);
function App() {
	return (
		<ChakraProvider theme={theme} >
			<RouterProvider router={router} />
		</ChakraProvider >

	);
}

export default App;

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { HomePage } from "../pages/Home";
import ErrorPage from "../pages/Error";
import SignInForm from "../widgets/SIgnInForm/SignInForm";
import SignUpForm from "../widgets/SignUpForm/SignUpForm";

function App() {

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

	return (
		<>
			<RouterProvider router={router} />
		</>
	);
}

export default App;

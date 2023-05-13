import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./app/theme";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "@/shared/assets/scss/index.scss";
import ErrorPage from "./pages/Error";



ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<ChakraProvider theme={theme}>
			<App />
		</ChakraProvider>
	</React.StrictMode>
);

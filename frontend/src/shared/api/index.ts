import axios from "axios";
import { setLoading } from "./loading";

export const api = axios.create({
	baseURL: "http://localhost/",
});

api.interceptors.request.use((config) => {
	const token = localStorage.getItem("token");

	if (token) {
		config["headers"]["Authorization"] = "Bearer " + token;
	}

	setLoading(true);

	return config;
}, (error) => {
	setLoading(false);
	return Promise.reject(error);
});

api.interceptors.response.use((response) => {
	setLoading(false);

	return response;
}, (error) => {
	setLoading(false);

	return Promise.reject(error);
});
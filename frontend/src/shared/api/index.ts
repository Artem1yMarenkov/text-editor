import axios from "axios";
import { setLoading } from "./loading";
import { setIsLogin } from "../../entities/Auth";
import { setUserLoginResponseStatus } from "../../widgets/SIgnInForm/store";

export const api = axios.create({
  baseURL: "http://localhost/",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config["headers"]["Authorization"] = "Bearer " + token;
    }

    setLoading(true);

    return config;
  },
  (error) => {
    setLoading(false);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    setLoading(false);

    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("token");
      setIsLogin(false);
      setUserLoginResponseStatus(401);
    }
    setLoading(false);

    return Promise.reject(error);
  }
);

import axios from "axios";
import { setLoading } from "./loading";
import { logoutUserFx } from "../../entities/User";

export const api = axios.create({
  baseURL: "http://localhost/",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (error.response.status === 401) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      logoutUserFx();
    }
    setLoading(false);

    return Promise.reject(error);
  }
);

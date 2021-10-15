import Axios from "axios";
import { store } from "@/store";

const Api = Axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {},
});

Api.interceptors.request.use((config) => {
  // Try to get the JWT token from the logged in state
  let accessToken = store.getters["user/accessToken"];

  // If access token is found, attach it to the request
  if (accessToken != null) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }

  // Set the Content-Type request header
  config.headers["Content-Type"] = "application/json";

  // Set the Accept request header
  config.headers["Accept"] = "application/json";

  return config;
});

Api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    var message;
    if (!error.response) {
      message = "Something went wrong. Try again later.";
    } else {
      message = error.response.data.message;
    }
    return Promise.reject({ message: message });
  }
);

export { Api };
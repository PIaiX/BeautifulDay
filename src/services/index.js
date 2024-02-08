import axios from "axios";
import { BASE_URL, API_TOKEN } from "../config/api";
import store from "../store";
import { refreshAuth } from "./auth";
import { ClientJS } from "clientjs";

const $api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

const client = new ClientJS();

const DEVICE = JSON.stringify({
  brand: client.getBrowser(),
  osName: client.getOS(),
  osVersion: client.getOSVersion(),
  language: client.getLanguage() ?? 'ru-RU',
})

$api.interceptors.request.use(
  async (config) => {
    const state = store.getState();
    config.headers.ip = state?.settings?.ip ?? "0.0.0.0";
    config.headers.token = `API ${API_TOKEN}`;
    config.headers.device = DEVICE;
    return config;
  },
  (error) => Promise.reject(error)
);

const $authApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

$authApi.interceptors.request.use(
  async (config) => {
    const state = store.getState();
    config.headers.ip = state?.settings?.ip ?? "0.0.0.0";
    config.headers.token = `API ${API_TOKEN}`;
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.authorization = `Access ${token}`;
    }
    config.headers.device = DEVICE;
    return config;
  },
  (error) => Promise.reject(error)
);

$authApi.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const {
      config,
      response: { status },
    } = error;
    const originalRequest = config;
    if (status === 401 && originalRequest && !originalRequest._isRetry) {
      originalRequest._isRetry = true;
      return store
        .dispatch(refreshAuth())
        .then(() => $authApi(originalRequest));
    }
    return Promise.reject(error);
  }
);

export { $api, $authApi };

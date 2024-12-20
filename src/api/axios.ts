import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`.trim();
    }
    return config;
  },
  error => Promise.reject(error),
);

api.interceptors.response.use(
  response => response,
  (error) => {
    if (error.response?.status === 401) {
      console.group("Authentication Error Details");
      console.error("Status:", error.response.status);
      console.error("Message:", error.response?.data?.message);
      console.error("URL:", error.config?.url);
      console.error("Method:", error.config?.method?.toUpperCase());
      console.error("Headers:", error.config?.headers);
      console.error("Request Data:", error.config?.data);
      console.error("Response Data:", error.response?.data);
      console.error("Stack:", error.stack);
      console.groupEnd();
    }
    return Promise.reject(error);
  },
);

export const updateToken = (newToken: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("token", newToken);
  }
};

export const clearToken = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
  }
};

export default api;

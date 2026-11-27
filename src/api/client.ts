import axios from "axios";
import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "marketlink_auth_token";

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;

if (!API_BASE_URL) {
  console.warn(
    "EXPO_PUBLIC_API_URL is not configured. API requests will not work until it is set.",
  );
}

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Attach the saved authentication token to requests.
apiClient.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync(TOKEN_KEY);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// Handle common API errors.
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      console.error("Network error: Unable to reach the server.");
    } else {
      console.error(`API error: ${error.response.status}`, error.response.data);
    }

    return Promise.reject(error);
  },
);

export default apiClient;


import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL || "https://api.example.com";

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for adding the auth token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling token refresh
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // If the error is 401 and we haven't attempted to retry yet
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshTokenValue = localStorage.getItem("refreshToken");
        
        if (!refreshTokenValue) {
          // No refresh token available, redirect to login
          return Promise.reject(error);
        }

        // Call the refresh token endpoint
        const response = await axios.post(`${baseURL}/api/accounts/token/refresh/`, {
          refresh: refreshTokenValue,
        });

        const { access: newAccessToken } = response.data;
        localStorage.setItem("accessToken", newAccessToken);

        // Update the authorization header
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        
        // Retry the original request
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // If refresh fails, clear tokens and reject
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

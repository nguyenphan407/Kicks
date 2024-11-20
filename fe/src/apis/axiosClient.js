import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8000/api/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Important for CORS with credentials
  timeout: 10000, // 10 second timeout
});

// Request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    // Add any auth tokens if needed
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    // Handle different types of errors
    if (error.response) {
      // Server responded with error status
      console.error("Response error:", error.response.data);
      if (error.response.status === 401) {
        // Handle unauthorized access
        localStorage.removeItem("token");
        // Optionally redirect to login
      }
    } else if (error.request) {
      // Request made but no response received
      console.error("Network error:", error.request);
    } else {
      // Something else happened
      console.error("Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosClient;

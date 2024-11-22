import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8000/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptors cho request
axiosClient.interceptors.request.use(
  function (config) {
    // Gắn token vào header nếu tồn tại
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Kiểm tra nếu data là FormData
    if (config.data instanceof FormData) {
      // Xóa Content-Type để browser tự động thêm boundary
      delete config.headers['Content-Type'];
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Interceptors cho response
axiosClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosClient;

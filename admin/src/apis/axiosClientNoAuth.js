// axiosClientNoAuth.js
import axios from "axios";

const axiosClientNoAuth = axios.create({
  baseURL: "http://localhost:8000/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Không thêm interceptor để gắn Authorization header

axiosClientNoAuth.interceptors.request.use(
  function (config) {
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

// Không thêm interceptor cho response

export default axiosClientNoAuth;

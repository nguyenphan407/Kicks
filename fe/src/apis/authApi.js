import axiosClient from "./axiosClient";

const authApi = {
  register(data) {
    const url = "auth/register/";
    return axiosClient.post(url, data);
  },
  login(data) {
    const url = "auth/login/";
    const token = localStorage.getItem("token"); // Lấy token từ localStorage
    return axiosClient.post(url, data, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "", // Thêm token vào header nếu có
      },
    });
  },
  sendConfirmationEmail() {
    const url = "send-mail/";
    return axios.post(url);
  },
};

export default authApi;

// Tạo một interceptor để tự động thêm token vào các request sau khi login
axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Lấy token từ localStorage
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`; // Thêm token vào header
        }
        console.log('Request Config:', config.headers);
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
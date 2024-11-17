import axiosClient from "./axiosClient";

const authApi = {
  login(data) {
    // Gửi request đăng nhập
    return axiosClient.post("auth/login", data);
  },

  logout() {
    // Gửi request đăng xuất
    return axiosClient.post("auth/logout");
  },

  getMe() {
    // Lấy thông tin user hiện tại
    return axiosClient.post("auth/me");
  },

  register(data) {
    // Gửi request đăng ký
    return axiosClient.post("auth/register", data);
  },
};

export default authApi;

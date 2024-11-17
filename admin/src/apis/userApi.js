import axiosClient from "./axiosClient";

const userApi = {
  getUserById(id) {
    // Lấy thông tin user theo ID
    return axiosClient.get(`user/${id}`);
  },

  updateUser(data) {
    // Cập nhật thông tin user
    return axiosClient.put("user/update", data);
  },
};

export default userApi;

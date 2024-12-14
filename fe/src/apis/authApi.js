// authApi.js

import axiosClient from "./axiosClient";

const authApi = {
  register(data) {
    const url = "auth/register/";
    return axiosClient.post(url, data);
  },
  login(data) {
    const url = "auth/login/";
    return axiosClient.post(url, data, {
      headers: {
        Authorization: localStorage.getItem("token") ? `Bearer ${localStorage.getItem("token")}` : "",
      },
    });
  },
  sendConfirmationEmail(data) {
    const url = "send-mail/";
    return axiosClient.post(url, data);
  },
  
  logout() {
    const url = "auth/logout/"; // Replace with your actual logout endpoint
    return axiosClient.post(url).then(() => {
      // Clear token and user data from localStorage after successful logout
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    });
  },
};

export default authApi;

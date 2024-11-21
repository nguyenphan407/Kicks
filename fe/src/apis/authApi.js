import axiosClient from "./axiosClient";

const authApi = {
  register(data) {
    const url = "auth/register/";
    return axiosClient.post(url, data);
  },
  login(data) {
    const url = "auth/login/";
    return axiosClient.post(url, data);
  },
  sendConfirmationEmail() {
    const url = "send-mail/";
    return axios.post(url);
  },
};

export default authApi;

import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:8000/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptors cho axiosClient (không phải axios gốc)
axiosClient.interceptors.request.use(
  function (config) {
    // Log params để chắc chắn không bị thay đổi
    console.log("Request params:", config.params);
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosClient;

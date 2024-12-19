// userApi.js
import axiosClient from "./axiosClient";

const userApi = {
    getAll(params) {
        const url = "admin/user";
        return axiosClient.get(url, { params });
    },

    getUserById(id) {
        const url = `admin/user/${id}`;
        return axiosClient.get(url);
    },

    update(data) {
        const url = "admin/user/update"; 
        return axiosClient.put(url, data); 
    },
};

export default userApi;

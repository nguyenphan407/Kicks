// productApi.js
import axiosClient from "./axiosClient";

const productApi = {
    getAll(params) {
        const url = 'admin/';
        return axiosClient.get(url, { params }); // Truyền params dưới dạng object
    },
    

    get(id) {
        const url = `admin/${id}`;
        return axiosClient.get(url);
    },

    add(data) {
        const url = "admin/";
        return axiosClient.post(url, data);
    },

    update(data) {
        const url = `admin/${data.id}`;
        return axiosClient.patch(url, data);
    },

    remove(id) {
        const url = `admin/${id}`;
        return axiosClient.delete(url);
    },
};

export default productApi;

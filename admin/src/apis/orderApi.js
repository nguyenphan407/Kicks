// orderApi.js
import axiosClient from "./axiosClient";

const orderApi = {
    getAll(params) {
        const url = 'admin/';
        return axiosClient.get(url, { params }); // Truyền params dưới dạng object
    },

    get(id) {
        const url = `admin/order/${id}`;
        return axiosClient.get(url);
    },

    update(id, data) {
        const url = `admin/update/${id}/?_method=PUT`;
        return axiosClient.post(url, data);
    },

    delete(id) {
        const url = `admin/delete/${id}`;
        return axiosClient.delete(url);
    },
};

export default orderApi;

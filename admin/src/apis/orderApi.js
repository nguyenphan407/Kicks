// orderApi.js
import axiosClient from "./axiosClient";

const orderApi = {
    getAll(params) {
        const url = 'admin/order';
        return axiosClient.get(url, { params }); // Truyền params dưới dạng object
    },

    get(id) {
        const url = `admin/order/${id}`;
        return axiosClient.get(url);
    },

    update(id, data) {
        const url = `admin/order/update/${id}`;
        return axiosClient.put(url, data);
    },

    delete(id) {
        const url = `admin/delete/${id}`;
        return axiosClient.delete(url);
    },
};

export default orderApi;

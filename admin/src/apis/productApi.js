// productApi.js
import axiosClient from "./axiosClient";

const productApi = {
    getAll(params) {
        const url = 'admin/';
        return axiosClient.get(url, { params }); // Truyền params dưới dạng object
    },

    get(id) {
        const url = `admin/show/${id}`;
        return axiosClient.get(url);
    },

    add(data) {
        const url = "admin/store";
        return axiosClient.post(url, data);
    },

    update(id, data) {
        const url = `admin/update/${id}/?_method=PUT`;
        return axiosClient.post(url, data);
    },

    delete(id) {
        const url = `admin/delete/${id}`;
        return axiosClient.delete(url);
    },

    deleteImage(publicId) {
        const url = `admin/image/delete/${publicId}`; // Thay đổi URL theo endpoint backend của bạn
        return axiosClient.delete(url);
    },
    
};

export default productApi;

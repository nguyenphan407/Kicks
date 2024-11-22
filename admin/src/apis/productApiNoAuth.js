// productApiNoAuth.js
import axiosClientNoAuth from "./axiosClientNoAuth";

const productApiNoAuth = {
    getAll(params) {
        const url = 'admin/';
        return axiosClientNoAuth.get(url, { params }); // Truyền params dưới dạng object
    },

    get(id) {
        const url = `admin/show/${id}`;
        return axiosClientNoAuth.get(url);
    },

    add(data) {
        const url = "admin/store";
        return axiosClientNoAuth.post(url, data);
    },

    update(data) {
        const url = `admin/${data.id}`;
        return axiosClientNoAuth.patch(url, data);
    },

    delete(id) {
        const url = `admin/${id}`;
        return axiosClientNoAuth.delete(url);
    },
};

export default productApiNoAuth;

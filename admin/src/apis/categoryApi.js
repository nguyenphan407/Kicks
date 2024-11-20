import axiosClient from "./axiosClient";

const categoryApi = {
    getAll(params) {
        const url = 'admin/category/';
        return axiosClient.get(url, { params }); 
    },

};

export default categoryApi;
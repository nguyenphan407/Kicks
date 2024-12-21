// src/apis/categoryApi.js
import axiosClient from './axiosClient';

const categoryApi = {
    getCategories: () => axiosClient.get('/category'),
};

export default categoryApi;

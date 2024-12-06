// reportApi.js
import axiosClient from "./axiosClient";

/**
 * Lấy dữ liệu thống kê dựa trên metric.
 * @param {string} metric - Có thể là 'day', 'month', 'year'.
 * @returns {Promise} - Trả về promise chứa dữ liệu từ API.
 */
export const getStatics = (metric) => {
    return axiosClient.get(`/admin/statics`, {
        params: { metric },
    });
};

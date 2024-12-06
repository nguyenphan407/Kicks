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

/**
 * Lấy danh sách sản phẩm hàng đầu trong khoảng thời gian cụ thể.
 * @param {Object} params - Các tham số bao gồm fromDate và toDate.
 * @param {string} params.fromDate - Ngày bắt đầu (dd-mm-yyyy).
 * @param {string} params.toDate - Ngày kết thúc (dd-mm-yyyy).
 * @returns {Promise}
 */
export const getTopProducts = ({ fromDate, toDate }) => {
    return axiosClient.get('/admin/topProducts', {
        params: { fromDate, toDate },
    });
};

/**
 * Lấy báo cáo dựa trên khoảng thời gian cụ thể.
 * @param {Object} params - Các tham số bao gồm fromDate và toDate.
 * @param {string} params.fromDate - Ngày bắt đầu (dd-mm-yyyy).
 * @param {string} params.toDate - Ngày kết thúc (dd-mm-yyyy).
 * @returns {Promise}
 */
export const getReport = ({ fromDate, toDate }) => {
    return axiosClient.get('/admin/report', {
        params: { fromDate, toDate },
    });
};
import axiosClient from './axiosClient';

const userApi = {
    getUserById(id) {
        const url = `/user/${id}`;
        return axiosClient.get(url);
    },

    updateUser(data) {
        const url = `/user/update`;
        return axiosClient.put(url, data);
    }
};

export default userApi;

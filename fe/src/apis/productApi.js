import axiosClient from "./axiosClient";

const productApi = {
  getAll(params) {
    const url = "product/";
    return axiosClient.get(url, { params }); // Truyền params dưới dạng object
  },

  get(id) {
    const url = `product/show/${id}`;
    return axiosClient.get(url).then(response => response.data); 
  },

  add(data) {
    const url = "product/";
    return axiosClient.post(url, data);
  },

  update(data) {
    const url = `product/${data.id}`;
    return axiosClient.patch(url, data);
  },

  remove(id) {
    const url = `product/${id}`;
    return axiosClient.delete(url);
  },

  getRecommendedProducts() {
    const url = "product/recommend";
    return axiosClient
      .get(url)
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetching recommendations:", error);
        throw error;
      });
  },

  getRecentProducts() {
    const url = "product/recent";
    return axiosClient
      .get(url)
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetching recent products:", error);
        throw error;
      });
  },

  search(query) {
    const url = "product/search";
    return axiosClient.get(url, { params: { query } });
  },
};

export default productApi;

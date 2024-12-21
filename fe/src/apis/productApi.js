import axiosClient from "./axiosClient";

const productApi = {
  // Hàm để lấy tất cả sản phẩm hoặc sản phẩm đã được lọc
  getAll(filters = {}) {
    const url = "product/";
    const params = new URLSearchParams();

    if (filters.page) params.append('page', filters.page);
    if (filters.search) params.append('name', filters.search);

    if (filters.categories && filters.categories.length > 0) {
      filters.categories.forEach(categoryId => params.append('category_id[]', categoryId));
    }

    if (filters.colors && filters.colors.length > 0) {
      filters.colors.forEach(color => params.append('color[]', color));
    }

    if (filters.gender && filters.gender.length > 0) {
      filters.gender.forEach(gender => params.append('gender[]', gender));
    }

    if (filters.min_price) {
      params.append('min_price', filters.min_price);
    }
    if (filters.max_price) {
      params.append('max_price', filters.max_price);
    }

    if (filters.sort && filters.sort !== 'Default') {
      params.append('sort', filters.sort);
    }

    return axiosClient.get(url, { params });
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

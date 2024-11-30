import axiosClient from "./axiosClient";

const cartApi = {
    // Lấy danh sách sản phẩm trong giỏ hàng
    getCartItems: () => {
        return axiosClient.get("/cart");
    },

    // Thêm sản phẩm vào giỏ hàng (cập nhật với size)
    addToCart: (productId, quantity, size) => {
        return axiosClient.post("/cart", {
            product_id: productId,
            quantity,
            size: size, 
        });
    },

    // Cập nhật số lượng sản phẩm trong giỏ hàng (cập nhật với size)
    updateCartItem: (cartItemId, quantity) => {
        return axiosClient.put(`/cart/${cartItemId}`, {
            quantity,
        });
    },

    // Xóa sản phẩm khỏi giỏ hàng
    removeFromCart: (cartItemId) => {
        return axiosClient.delete(`/cart/${cartItemId}`);
    },

    // Xóa toàn bộ giỏ hàng
    clearCart: () => {
        return axiosClient.delete("/cart/clear");
    },
};

export default cartApi;

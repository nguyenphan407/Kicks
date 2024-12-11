// src/context/ShopContext.js
import React, { createContext, useEffect, useState } from "react";
import productApi from "../apis/productApi";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import cartApi from "../apis/cartApi";

export const ShopConText = createContext();

const ShopContextProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const currency = "$";
    const delivery_fee = "6.99";
    const [cartData, setCartData] = useState([]);
    const navigate = useNavigate();

    // Thêm các state và methods cho người dùng
    const [user, setUser] = useState({});
    const [token, setToken] = useState("");
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        itemsPerPage: 9,
    });
    const [filters, setFilters] = useState({
        page: 1,
    });

    // Hàm để gọi API lấy giỏ hàng
    const fetchCartItems = async () => {
        try {
            const response = await cartApi.getCartItems();
            console.log("getCartItems API Response:", response.data); // Debug
            setCartData(response.data);
        } catch (error) {
            console.error("Error fetching cart items:", error);
            toast.error("Lấy dữ liệu giỏ hàng thất bại.", { autoClose: 1500 });
        }
    };

    // Thêm sản phẩm vào giỏ hàng
    const addToCart = async (itemId, size) => {
        if (!size) {
            toast.error("Vui lòng chọn kích cỡ", { autoClose: 1500 });
            return;
        }

        // Tìm sản phẩm trong danh sách sản phẩm hiện tại
        const product = products.find(
            (item) => item.product_id === parseInt(itemId, 10)
        );

        if (!product) {
            toast.error("Sản phẩm không tồn tại", { autoClose: 1500 });
            return;
        }

        // Kiểm tra xem sản phẩm với kích cỡ đã chọn có trong giỏ hàng chưa
        const existingCartItem = cartData.find(
            (item) => item.product_id === parseInt(itemId, 10) && item.size === size
        );

        if (existingCartItem) {
            updateQuantity(existingCartItem.cart_id, size, existingCartItem.quantity + 1);
            return;
        }

        try {
            const response = await cartApi.addToCart(itemId, 1, size);
            console.log("addToCart API Response:", response.data); // Debug

            if (response && response.data) {
                toast.success("Đã thêm vào giỏ hàng thành công!", { autoClose: 1500 });
                // Sau khi thêm thành công, lấy lại dữ liệu giỏ hàng từ API
                await fetchCartItems();
            } else {
                throw new Error("API không trả về dữ liệu");
            }
        } catch (error) {
            console.error("Error adding to cart:", error);
            toast.error("Thêm vào giỏ hàng thất bại.", { autoClose: 1500 });
        }
    };

    // Cập nhật số lượng sản phẩm trong giỏ hàng
    const updateQuantity = async (cart_id, size, quantity) => {
        if (!cart_id) {
            toast.error("Không xác định được sản phẩm để cập nhật.", { autoClose: 1500 });
            return;
        }

        // Lưu lại dữ liệu cũ để hoàn nguyên nếu có lỗi
        const oldCartData = [...cartData];

        // Cập nhật số lượng tạm thời trên giao diện
        const newCartData = cartData.map((item) => {
            if (item.cart_id === cart_id && item.size === size) {
                return { ...item, quantity };
            }
            return item;
        });
        setCartData(newCartData);

        try {
            const response = await cartApi.updateCartItem(cart_id, quantity, size);
            console.log("updateCartItem API Response:", response.data); // Debug

            if (response && response.data) {
                toast.success("Cập nhật số lượng thành công!", { autoClose: 1500 });
                // Không cần làm gì thêm nếu API đã cập nhật thành công
            } else {
                throw new Error("API không trả về dữ liệu");
            }
        } catch (error) {
            console.error("Error updating cart:", error);
            toast.error("Cập nhật số lượng thất bại.", { autoClose: 1500 });
            // Hoàn nguyên dữ liệu cũ nếu có lỗi
            setCartData(oldCartData);
        }
    };

    // Xóa sản phẩm khỏi giỏ hàng
    const removeCartItem = async (cart_id) => {
        if (!cart_id) {
            toast.error("Không xác định được sản phẩm để xóa.", { autoClose: 1500 });
            return;
        }

        // Lưu lại dữ liệu cũ để hoàn nguyên nếu có lỗi
        const oldCartData = [...cartData];
        // Cập nhật cartData tạm thời trên giao diện
        const newCartData = cartData.filter((item) => item.cart_id !== cart_id);
        setCartData(newCartData);

        try {
            const response = await cartApi.removeFromCart(cart_id);
            console.log("removeCartItem API Response:", response.data); // Debug

            if (response && response.data) {
                toast.success("Sản phẩm đã được xóa khỏi giỏ hàng!", { autoClose: 1500 });
                // Không cần làm gì thêm nếu API đã xóa thành công
            } else {
                throw new Error("API không trả về dữ liệu");
            }
        } catch (error) {
            console.error("Error removing from cart:", error);
            toast.error("Xóa sản phẩm thất bại.", { autoClose: 1500 });
            // Hoàn nguyên dữ liệu cũ nếu có lỗi
            setCartData(oldCartData);
        }
    };

    // Tính tổng số lượng sản phẩm trong giỏ hàng
    const getCartCount = () => {
        return cartData.reduce((total, item) => total + item.quantity, 0);
    };

    // Tính tổng giá trị của giỏ hàng
    const getCartAmount = () => {
        return cartData.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0);
    };

    // Gọi API để lấy danh sách sản phẩm khi component được mount hoặc khi filters thay đổi
    const fetchProducts = async () => {
        try {
            const response = await productApi.getAll(filters);
            const productsData = response.data.data.map((product) => {
                const imageUrls = product.images.map((imageObj) => imageObj.image);
                const sizes = product.sizes.map((sizeObj) => ({
                    size: sizeObj.size,
                    quantity: sizeObj.quantity,
                }));
                return {
                    ...product,
                    images: imageUrls,
                    sizes: sizes,
                };
            });

            setProducts(productsData);

            // Cập nhật pagination
            setPagination({
                currentPage: response.data.current_page,
                totalPages: response.data.last_page,
                totalItems: response.data.total,
                itemsPerPage: response.data.per_page,
            });
        } catch (error) {
            console.error("Failed to fetch products:", error);
            toast.error("Lấy danh sách sản phẩm thất bại.", { autoClose: 1500 });
        }
    };

    // Hàm chuyển trang cho Pagination
    const handlePageChange = (newPage) => {
        setFilters((prev) => ({
            ...prev,
            page: newPage,
        }));
    };

    useEffect(() => {
        fetchProducts();
    }, [filters]);

    // Lấy dữ liệu giỏ hàng khi token thay đổi
    useEffect(() => {
        if (token) {
            fetchCartItems();
        }
    }, [token]);

    // Lấy thông tin người dùng và token từ localStorage khi component mount
    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        const savedToken = localStorage.getItem("token");

        if (savedToken && savedUser) {
            setToken(savedToken);
            setUser(JSON.parse(savedUser)); // Chuyển chuỗi JSON thành object
        }
    }, []);

    const value = {
        products,
        currency,
        delivery_fee,
        addToCart,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate,
        pagination,
        fetchProducts,
        filters,
        setFilters,
        handlePageChange,
        user,
        token,
        setUser,
        setToken,
        cartData,
        setCartData,
        removeCartItem,
        fetchCartItems, // Thêm hàm này để có thể gọi lại từ các hàm khác
    };

    return <ShopConText.Provider value={value}>{children}</ShopConText.Provider>;
};

// Xác định propTypes cho ShopContextProvider
ShopContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ShopContextProvider;

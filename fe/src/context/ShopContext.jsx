// src/context/ShopContext.jsx
import React, { createContext, useEffect, useState, useCallback } from "react";
import productApi from "../apis/productApi";
import userApi from "../apis/userApi"; // Import userApi
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import cartApi from "../apis/cartApi";
import categoryApi from "../apis/categoryApi";
export const ShopConText = createContext();

const ShopContextProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const currency = "$";
    const delivery_fee = "3.99";
    const [cartData, setCartData] = useState([]);
    const navigate = useNavigate();

    const [recommendedProducts, setRecommendedProducts] = useState([]);
    const [recentProducts, setRecentProducts] = useState([]);

    const [user, setUser] = useState({});
    const [token, setToken] = useState("");
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        itemsPerPage: 12, // Phân trang theo backend
    });
    const [filters, setFilters] = useState({
        page: 1,
        search: '',
        categories: [],
        colors: [],
        gender: [],
        min_price: 0,
        max_price: 1000,
        sort: 'Default',
    });

    // Fetch danh mục từ API
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await categoryApi.getCategories();
                setCategories(response.data);
                console.log("Fetched categories:", response.data); // Debug
            } catch (error) {
                console.error('Failed to fetch categories:', error);
                toast.error('Failed to retrieve categories.', { autoClose: 1500 });
            }
        };
        fetchCategories();
    }, []);

    // Hàm fetch cả recent và recommended products
    const fetchRecentAndRecommendedProducts = useCallback(async () => {
        try {
            if (token) {
                const [dataRecent, dataRcm] = await Promise.all([
                    productApi.getRecentProducts(),
                    productApi.getRecommendedProducts(),
                ]);
                setRecentProducts(dataRecent);
                setRecommendedProducts(dataRcm);
                console.log("Updated Recent Products:", dataRecent);
                console.log("Updated Recommended Products:", dataRcm);
            }
        } catch (error) {
            console.error('Error fetching recent or recommended products:', error);
        }
    }, [token]);

    // Fetch recent và recommended products khi component mount và khi các dependencies thay đổi
    useEffect(() => {
        fetchRecentAndRecommendedProducts();
    }, [fetchRecentAndRecommendedProducts, filters, cartData]);

    // Hàm để gọi API lấy giỏ hàng
    const fetchCartItems = useCallback(async () => {
        try {
            const response = await cartApi.getCartItems();
            console.log("getCartItems API Response:", response.data); // Debug
            setCartData(response.data);
        } catch (error) {
            console.error("Error fetching cart items:", error);
            toast.error("Failed to retrieve cart data.", { autoClose: 1500 });
        }
    }, []);

    // Thêm sản phẩm vào giỏ hàng
    const addToCart = async (itemId, size) => {
        // Kiểm tra xem người dùng đã đăng nhập hay chưa
        const accessToken = localStorage.getItem("token");
        if (!accessToken) {
            toast.error("Please log in to add items to the cart", { autoClose: 1500 });
            return;
        }

        if (!size) {
            toast.error("Please select a size", { autoClose: 1500 });
            return;
        }

        // Tìm sản phẩm trong danh sách sản phẩm hiện tại
        const product = products.find(
            (item) => item.product_id === parseInt(itemId, 10)
        );

        if (!product) {
            toast.error("Product not found", { autoClose: 1500 });
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
                toast.success("Added to cart successfully!", { autoClose: 1500 });
                // Sau khi thêm thành công, lấy lại dữ liệu giỏ hàng từ API
                await fetchCartItems();
                // Fetch lại recent và recommended products nếu cần
                await fetchRecentAndRecommendedProducts();
            } else {
                throw new Error("API did not return data");
            }
        } catch (error) {
            console.error("Error adding to cart:", error);
            toast.error("Product exceeds stock quantity.", { autoClose: 1500 });
        }
    };

    // Cập nhật số lượng sản phẩm trong giỏ hàng
    const updateQuantity = async (cart_id, size, quantity) => {
        if (!cart_id) {
            toast.error("Could not identify the product to update.", { autoClose: 1500 });
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
                toast.success("Quantity updated successfully!", { autoClose: 1500 });
                // Fetch lại recent và recommended products nếu cần
                await fetchRecentAndRecommendedProducts();
            } else {
                throw new Error("API did not return data");
            }
        } catch (error) {
            console.error("Error updating cart:", error);
            toast.error("Product exceeds available inventory quantity.", { autoClose: 1500 });
            // Hoàn nguyên dữ liệu cũ nếu có lỗi
            setCartData(oldCartData);
        }
    };

    // Xóa sản phẩm khỏi giỏ hàng
    const removeCartItem = async (cart_id) => {
        if (!cart_id) {
            toast.error("Could not identify the product to remove.", { autoClose: 1500 });
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
                toast.success("Product removed from cart!", { autoClose: 1500 });
                // Fetch lại recent và recommended products nếu cần
                await fetchRecentAndRecommendedProducts();
            } else {
                throw new Error("API did not return data");
            }
        } catch (error) {
            console.error("Error removing from cart:", error);
            toast.error("Failed to remove product.", { autoClose: 1500 });
            // Hoàn nguyên dữ liệu cũ nếu có lỗi
            setCartData(oldCartData);
        }
    };

    // Tính tổng số lượng sản phẩm trong giỏ hàng
    const getCartCount = () => {
        return cartData.reduce((total, item) => total + item.quantity, 0);
    };

    // Tính tổng giá trị của giỏ hàng (chỉ tính giá sản phẩm)
    const getCartAmount = () => {
        return cartData.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0);
    };

    // Gọi API để lấy danh sách sản phẩm khi component được mount hoặc khi filters thay đổi
    const fetchProducts = useCallback(async () => {
        try {
            console.log("Fetching products with filters:", filters); // Debug
            const response = await productApi.getAll(filters);
            console.log("API Response:", response); // Debug

            const productsData = response.data.data.map((product) => {
                // Giả sử backend trả về các trường 'images' và 'sizes' đúng định dạng
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

            // Fetch lại recent và recommended products nếu cần
            await fetchRecentAndRecommendedProducts();
        } catch (error) {
            console.error("Failed to fetch products:", error);
            toast.error("Failed to retrieve product list.", { autoClose: 1500 });
        }
    }, [filters, fetchRecentAndRecommendedProducts]);

    // Hàm chuyển trang cho Pagination
    const handlePageChange = (newPage) => {
        setFilters((prev) => ({
            ...prev,
            page: newPage,
        }));
    };

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    // Lấy dữ liệu giỏ hàng khi token thay đổi
    useEffect(() => {
        if (token) {
            fetchCartItems();
        } else {
            setCartData([]); // Xóa giỏ hàng nếu không có token
        }
    }, [token, fetchCartItems]);

    // Lấy thông tin người dùng và token từ localStorage khi component mount
    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        const savedToken = localStorage.getItem("token");

        if (savedToken && savedUser) {
            setToken(savedToken);
            setUser(JSON.parse(savedUser)); // Chuyển chuỗi JSON thành object
            console.log(user);
        }
    }, []);

    const value = {
        products,
        categories, // Thêm danh mục vào context
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
        setUser,
        token,
        setToken,
        cartData,
        setCartData,
        removeCartItem,
        fetchCartItems, 
        recommendedProducts,
        recentProducts,
        getProductById: (id) => products.find((product) => product.product_id === id),
    };

    return <ShopConText.Provider value={value}>{children}</ShopConText.Provider>;
};

// Xác định propTypes cho ShopContextProvider
ShopContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ShopContextProvider;

import React, { createContext, useEffect, useState } from "react";
import productApi from "../apis/productApi";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import queryString from "querystring";

export const ShopConText = createContext();

const ShopContextProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const currency = "$";
    const delivery_fee = "6.99";
    const [cartItems, setCartItems] = useState({});
    const navigate = useNavigate();
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        itemsPerPage: 9,
    });
    const [filters, setFilters] = useState({
        page: 1,
    });

    // Thêm sản phẩm vào giỏ hàng
    const addToCart = async (itemId, size) => {
        if (!size) {
            toast.error("Please select a size", {
                autoClose: 1500, // Thông báo sẽ tự đóng sau 3 giây
            });
            return;
        }

        let cartData = structuredClone(cartItems); // tạo ra 1 clone cartItems
        if (cartData[itemId]) {
            // nếu tồn tại item này rồi
            if (cartData[itemId][size]) {
                // nếu tồn tại kích thước đã có rồi
                cartData[itemId][size] += 1;
            } else {
                // nếu size của item này chưa có
                cartData[itemId][size] = 1;
            }
        } else {
            // nếu chưa có item đó trong giỏ hàng
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData);
        toast.success("Added to cart successfully!", {
            autoClose: 1500, // Thông báo sẽ tự đóng sau 3 giây
        });
    };

    useEffect(() => {
        console.log(cartItems);
    }, [cartItems]);

    // lấy số lượng hiển thị vào cart
    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item]) {
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }
        return totalCount;
    };

    // Gọi API để lấy danh sách sản phẩm khi component được mount
    const fetchProducts = async () => {
        try {
            console.log("Fetching products with page:", filters.page);
            const response = await productApi.getAll(filters);
            console.log(
                "Full request URL:",
                `http://localhost:8000/api/product?page=${filters.page}`
            );
            console.log(
                "API Response Current Page:",
                response.data.current_page
            ); // Log để kiểm tra response

            const productsData = response.data.data.map((product) => {
                const imageUrls = product.images.map(
                    (imageObj) => imageObj.image
                );
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
        }
    };

    // Hàm chuyển trang cho Pagination
    const handlePageChange = (newPage) => {
        console.log("new page:", newPage);
        setFilters((prev) => ({
            ...prev,
            page: newPage,
        }));
    };

    useEffect(() => {
        console.log("Filters changed:", filters);
        fetchProducts();
    }, [filters]);

    // Cập nhật số lượng sản phẩm
    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;
        setCartItems(cartData);
    };

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            // duyệt qua từng sản phẩm trong cartItem để lấy info về giá thông qua product
            const itemInfo = products.find(
                (product) => product.product_id === parseInt(items)
            );
            if (!itemInfo) continue;

            for (const item in cartItems[items]) {
                // duyệt qua từng kích thước bên trong từng sản phẩm
                const quantity = cartItems[items][item];
                if (quantity > 0) {
                    // nếu số lượng của size của sản phẩm cụ thể nào đó > 0
                    totalAmount += (itemInfo.price || 0) * quantity;
                }
            }
        }
        return totalAmount;
    };

    // Thêm các state và methods cho người dùng
    const [user, setUser] = useState({});
    const [token, setToken] = useState("");

    // Đăng nhập
    const login = (userData, userToken) => {
        setUser(userData);
        setToken(userToken);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", userToken);
    };

    // Đăng xuất
    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

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
        cartItems,
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
        login,
        logout,
    };

    return (
        <ShopConText.Provider value={value}>{children}</ShopConText.Provider>
    );
};

// Xác định propTypes cho ShopContextProvider
ShopContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ShopContextProvider;

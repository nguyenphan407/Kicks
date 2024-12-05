import React, { createContext, useEffect, useState } from "react";
import productApi from "../apis/productApi";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import queryString from "querystring";
import cartApi from "../apis/cartApi";

export const ShopConText = createContext();

const ShopContextProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const currency = "$";
    const delivery_fee = "6.99";
    const [cartItems, setCartItems] = useState({});
    const [cartData, setCartData] = useState([]);
    const navigate = useNavigate();
    const [cartChanged, setCartChanged] = useState(false); // thằng này để theo dõi trạng thái giỏ hàng để get cart update lại giỏ hàng mỗi khi giỏ hàng thay đổi
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

    // Thêm sản phẩm vào giỏ hàng
    const addToCart = async (itemId, size) => {
        if (!size) {
            toast.error("Please select a size", {
                autoClose: 1500, // Thông báo sẽ tự đóng sau 3 giây
            });
            return;
        }
        try {
            const response = await cartApi.addToCart(itemId, 1, size);
            if (response && response.data) {
                // setCartItems(response.data);
                toast.success("Added to cart successfully!", {
                    autoClose: 1500,
                });
                setCartChanged((prev) => !prev);
            } else {
                toast.error("Failed to add to cart. Please try again.", {
                    autoClose: 1500,
                });
            }
        } catch (error) {
            console.error("Error adding to cart:", error);
            toast.error("Error adding to cart.", {
                autoClose: 1500,
            });
        }
    };

    // useEffect(() => {
    //     console.log("cartData:", cartData);
    // }, [cartData]);

    // let convertCartData = cartData.map((item) => {
    //     return {
    //         ...item,
    //         price: parseFloat(item.price),
    //     };
    // });

    // lấy số lượng hiển thị vào cart
    const getCartCount = () => {
        // Trả về tổng số lượng sản phẩm trong giỏ
        return cartData.length > 0
            ? cartData.reduce((total, item) => total + item.quantity, 0)
            : 0;
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
    const updateQuantity = async (cart_id, size, quantity) => {
        try {
            const response = await cartApi.updateCartItem(
                cart_id,
                quantity,
                size
            );
            setCartChanged((prev) => !prev);
        } catch (error) {
            console.error("Error updating to cart:", error);
            toast.error("Error updating to cart.", {
                autoClose: 1500,
            });
        }
    };

    const removeCartItem = async (cart_id) => {
        try {
            const response = await cartApi.removeFromCart(cart_id);
            if (response && response.data) {
                toast.success("Product removed from cart successfully!", {
                    autoClose: 1500,
                });
                setCartChanged((prev) => !prev);
                setCartData(response.data);
            } else {
                toast.error("Failed to Removed from cart. Please try again.", {
                    autoClose: 1500,
                });
            }
        } catch (error) {
            console.error("Error removing to cart:", error);
            toast.error("Error removing to cart.", {
                autoClose: 1500,
            });
        }
    };

    const getCartAmount = () => {
        // Trả về tổng giá trị của giỏ hàng
        return cartData.length
            ? cartData.reduce(
                  (total, item) => total + item.price * item.quantity,
                  0
              )
            : 0;
    };

    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        const savedToken = localStorage.getItem("token");

        if (savedToken && savedUser) {
            setToken(savedToken);
            setUser(JSON.parse(savedUser)); // Chuyển chuỗi JSON thành object
        }
    }, []);
    useEffect(() => {
        if (token) {
            const fetchCartItems = async () => {
                try {
                    const response = await cartApi.getCartItems();
                    // console.log("response data:", response.data);
                    setCartData(response.data); // Lưu dữ liệu vào state
                } catch (error) {
                    console.error("Error fetching cart items:", error);
                }
            };
            fetchCartItems(); // Call API khi component mount
        }
    }, [token, cartChanged]);

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
        cartData,
        setCartData,
        removeCartItem,
        cartChanged,
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

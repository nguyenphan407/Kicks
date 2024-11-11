import React, { createContext, useEffect, useState } from "react";
import productApi from "../apis/productApi";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

export const ShopConText = createContext();

const ShopContextProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const currency = "$";
    const delivery_fee = "6.99";
    const [cartItems, setCartItems] = useState({});

    // Thêm sản phẩm vào giỏ hàng
    const addToCart = async (itemId, size) => {
        if(!size) {
            toast.error('Please select a size');
            return;
        }

        let cartData = structuredClone(cartItems); // tạo ra 1 clone cartItems
        if (cartData[itemId]) { // nếu tồn tại item này rồi
            if (cartData[itemId][size]) { // nếu tồn tại kích thước đã có rồi
                cartData[itemId][size] += 1;
            }else { // nếu size của item này chưa có
                cartData[itemId][size] = 1;
            }
        }else { // nếu chưa có item đó trong giỏ hàng
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData);
        toast.success('Added to cart successfully!')
    }

    useEffect(() => {
        console.log(cartItems)
    },[cartItems])

    // lấy số lượng hiển thị vào cart
    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item]) {
                        totalCount += cartItems[items][item];
                    }
                }catch (error) {
                    console.log(error)
                }
            }
        }
        return totalCount;
    }
 
    // Gọi API để lấy danh sách sản phẩm khi component được mount
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await productApi.getAll();
                const productsData = response.data.map((product) => {
                    // Chuyển đổi mảng đối tượng images thành mảng URL
                    const imageUrls = product.images.map(
                        (imageObj) => imageObj.image
                    );
                    return { ...product, images: imageUrls }; // Lưu imageUrls vào product.images
                });
                setProducts(productsData);
            } catch (error) {
                console.error("Failed to fetch products:", error);
            }
        };

        fetchProducts();
    }, []);

    const value = {
        products,
        currency,
        delivery_fee,
        addToCart,
        cartItems,
        getCartCount,
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

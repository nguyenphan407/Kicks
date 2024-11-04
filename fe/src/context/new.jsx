import React, { createContext, useEffect, useState } from "react";
import productApi from "../apis/productApi";
import PropTypes from "prop-types";

export const ShopConText = createContext();

const ShopContextProvider = ({ children }) => {
    const [products, setProducts] = useState([]); // Thay thế products tĩnh bằng state
    const currency = "$";
    const delivery_fee = "6.99";

    // Gọi API để lấy danh sách sản phẩm khi component được mount
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await productApi.getAll();
                const productsData = response.data.map(product => {
                    // Tách chuỗi image thành mảng URL
                    const imageUrls = product.image.split(',').map(url => `http://localhost:8000/${url.trim()}`);
                    return { ...product, image: imageUrls };
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
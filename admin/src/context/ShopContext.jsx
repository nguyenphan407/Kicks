import React, { createContext, useEffect, useState, useCallback } from "react";
import productApi from "../apis/productApi";
import categoryApi from "../apis/categoryApi";
import PropTypes from "prop-types";
import { useLoader } from "./LoaderContext";

export const ShopConText = createContext();

const ShopContextProvider = ({ children }) => {
    // const { showLoader, hideLoader } = useLoader(); // bug khi sử dụng loader 
    const [products, setProducts] = useState([]);
    const currency = "$";
    const delivery_fee = "6.99";
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        itemsPerPage: 9,
    });
    const [categories, setCategories] = useState([]);
    const [currentCategory, setCurrentCategory] = useState("Basketball");
    const [isOpenCategories, setIsOpenCategories] = useState(false); // khai báo thằng này ở đây để chỉ hiện khi nào mở trang

    // Toggle hiển thị dropdown
    const toggleDropdownCategories = () =>
        setIsOpenCategories(!isOpenCategories);

    const [filters, setFilters] = useState({
        page: 1,
        category: "",
    });

    const fetchCategories = useCallback(async () => {
        try {
            const response = await categoryApi.getAll();
            setCategories(response.data);
        } catch (error) {
            console.error("Failed to fetch categories:", error);
        }
    }, [filters]);

    const fetchProducts = useCallback(async () => {
        try {
            const response = await productApi.getAll(filters);
            const productsData = response.data.data.map((product) => {
                const imageUrls = product.images.map(
                    (imageObj) => imageObj.image
                );
                return {
                    ...product,
                    images: imageUrls,
                };
            });
            setProducts(productsData);
            setPagination({
                currentPage: response.data.current_page,
                totalPages: response.data.last_page,
                totalItems: response.data.total,
                itemsPerPage: response.data.per_page,
            });
        } catch (error) {
            console.error("Failed to fetch products:", error);
        }
    }, [filters]);

    const handleCategoryChange = useCallback((newCategory) => {
        setCurrentCategory(newCategory);
        setFilters((prev) => ({
            ...prev,
            category: newCategory,
        }));
    });

    const handlePageChange = useCallback((newPage) => {
        setFilters((prev) => ({
            ...prev,
            page: newPage,
        }));
    }, []);

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, [filters]);

    const value = {
        products,
        currency,
        delivery_fee,
        pagination,
        fetchProducts,
        fetchCategories,
        filters,
        setFilters,
        handlePageChange,
        currentCategory,
        setCurrentCategory,
        categories,
        handleCategoryChange,
        isOpenCategories,
        setIsOpenCategories,
        toggleDropdownCategories,
    };

    return (
        <ShopConText.Provider value={value}>{children}</ShopConText.Provider>
    );
};

ShopContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ShopContextProvider;

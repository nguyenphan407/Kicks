import React, { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";
import Loader from "./Loader"; // Import Loader

const LoaderContext = createContext();

// Provider để bọc toàn bộ app
export const LoaderProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);

    const showLoader = () => setLoading(true);
    const hideLoader = () => setLoading(false);

    return (
        <LoaderContext.Provider value={{ showLoader, hideLoader }}>
            {loading && <Loader />} {/* Hiển thị Loader khi loading = true */}
            {children}
        </LoaderContext.Provider>
    );
};

// Đặt prop-types sau khi định nghĩa LoaderProvider
LoaderProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

// Custom hook để sử dụng Loader Context
export const useLoader = () => useContext(LoaderContext);

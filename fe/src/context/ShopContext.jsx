import React, { createContext } from "react";
import { products } from "../assets/assets";
import PropTypes from "prop-types";

export const ShopConText = createContext();

const ShopConTextProvider = ({ children }) => {
    const currency = "$";
    const delivery_fee = "6.99";

    const value = {
        products,
        currency,
        delivery_fee,
    };

    return (
        <ShopConText.Provider value={value}>{children}</ShopConText.Provider>
    );
};

// Xác định propTypes cho ShopConTextProvider
ShopConTextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ShopConTextProvider;

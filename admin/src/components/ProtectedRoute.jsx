import React from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("access_token");

    // Nếu không có token, chuyển hướng về login
    if (!token) {
        return <Navigate to="/login" />;
    }

    // Nếu có token, render component con
    return children;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ProtectedRoute;

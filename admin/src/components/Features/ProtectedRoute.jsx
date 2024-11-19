import React from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { useLoader } from "../../context/LoaderContext"

const ProtectedRoute = ({ children }) => {
    const { showLoader, hideLoader } = useLoader(); 
    const token = localStorage.getItem("access_token");


    // Nếu không có token, chuyển hướng về login
    if (!token) {
        showLoader();
        return <Navigate to="/login" />;
    }

    // Nếu có token, render component con
    return children;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ProtectedRoute;

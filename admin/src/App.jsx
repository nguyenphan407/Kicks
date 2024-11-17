// Tắt cảnh báo của React Router về future flag
const originalWarn = console.warn;
console.warn = (...args) => {
    if (
        args[0] &&
        (args[0].includes("React Router Future Flag Warning") ||
            args[0].includes("Relative route resolution within Splat routes"))
    ) {
        return;
    }
    originalWarn(...args);
};

import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./components/user/Login";
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import DashBoard from "./pages/Dashboard";
import OrdersList from "./pages/OrdersList";
import OrdersDetail from "./pages/OrdersDetail";
import ProductDetail from "./pages/ProductDetail";
import AllProduct from "./pages/AllProducts";
import AddNewProduct from "./pages/AddNewProduct";
import ProtectedRoute from "./components/ProtectedRoute";
import authApi from "./apis/authApi";

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null); // null để phân biệt đang kiểm tra
    const navigate = useNavigate();

    // Kiểm tra trạng thái đăng nhập
    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem("access_token");
            console.log("Token from localStorage:", token);

            if (!token) {
                setIsAuthenticated(false);
                return;
            }

            try {
                const response = await authApi.getMe(); // Kiểm tra token
                console.log("API /auth/me response:", response.data);
                setIsAuthenticated(true);
            } catch (error) {
                console.error("Error in /auth/me:", error.response?.data || error.message);
                localStorage.removeItem("access_token");
                setIsAuthenticated(false);
                navigate("/login");
            }
        };

        checkAuth();
    }, [navigate]);

    // Hiển thị trạng thái loading khi đang kiểm tra
    if (isAuthenticated === null) {
        return <div className="flex items-center justify-center font-rubik text-5xl">Loading...</div>;
    }

    return (
        <div>
            {isAuthenticated ? (
                <>
                    {/* Header và Sidebar */}
                    <Header />
                    <Sidebar />
                    {/* Phần nội dung chính, tạo layout ảo bằng margin vì header và sidebar fixed */}
                    <div className="ml-[260px] mt-[96px] p-6 min-h-screen">
                        <Routes>
                            {/* Các route được bảo vệ */}
                            <Route
                                path="/dashboard"
                                element={
                                    <ProtectedRoute>
                                        <DashBoard />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/orderlist"
                                element={
                                    <ProtectedRoute>
                                        <OrdersList />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/allproduct"
                                element={
                                    <ProtectedRoute>
                                        <AllProduct />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/orderDetail"
                                element={
                                    <ProtectedRoute>
                                        <OrdersDetail />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/addnewproduct"
                                element={
                                    <ProtectedRoute>
                                        <AddNewProduct />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/productdetail"
                                element={
                                    <ProtectedRoute>
                                        <ProductDetail />
                                    </ProtectedRoute>
                                }
                            />
                            {/* Route mặc định */}
                            <Route path="/" element={<Navigate to="/dashboard" />} />
                        </Routes>
                    </div>
                </>
            ) : (
                // Nếu chưa đăng nhập, render trang login
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
            )}
        </div>
    );
};

export default App;

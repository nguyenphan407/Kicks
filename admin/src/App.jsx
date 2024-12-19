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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/user/Login";
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import DashBoard from "./pages/Dashboard";
import OrdersListPage from "./pages/OrdersListPage";
import OrdersDetail from "./pages/OrdersDetail";
import ProductDetail from "./pages/ProductDetail";
import AllProductPage from "./pages/AllProductsPage";
import AddNewProduct from "./pages/AddNewProduct";
import ProtectedRoute from "./components/Features/ProtectedRoute";
import authApi from "./apis/authApi";
import { useLoader } from "./context/LoaderContext";
import Footer from "./components/layout/Footer";
import Register from "./components/user/Register";
import UsersPage from "@/pages/UsersPage";

const App = () => {
   const [isAuthenticated, setIsAuthenticated] = useState(null); // null để phân biệt đang kiểm tra
   const navigate = useNavigate();
   const { showLoader, hideLoader } = useLoader(); // Sử dụng Loader Context

   // Kiểm tra trạng thái đăng nhập
   useEffect(() => {
      const checkAuth = async () => {
         const token = localStorage.getItem("access_token");
         // console.log("Token from localStorage:", token);

         if (!token) {
            setIsAuthenticated(false);
            return;
         }

         try {
            const response = await authApi.getMe(); // Kiểm tra token
            showLoader();
            // console.log("API /auth/me response:", response.data);
            setIsAuthenticated(true);
         } catch (error) {
            hideLoader();
            console.error(
               "Error in /auth/me:",
               error.response?.data || error.message
            );
            localStorage.removeItem("access_token");
            setIsAuthenticated(false);
            navigate("/login");
         }
         hideLoader();
      };

      checkAuth();
   }, [navigate]);

   return (
      <div>
         <ToastContainer />
         {isAuthenticated ? (
            <>
               {/* Header và Sidebar */}
               <Header />
               <Sidebar />
               {/* Phần nội dung chính, tạo layout ảo bằng margin vì header và sidebar fixed */}
               <div className="ml-[260px] py-6 pl-6 pr-12 min-h-screen bg-[#e7e7e3]">
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
                              <OrdersListPage />
                           </ProtectedRoute>
                        }
                     />
                     <Route
                        path="/allproduct"
                        element={
                           <ProtectedRoute>
                              <AllProductPage />
                           </ProtectedRoute>
                        }
                     />
                     <Route
                        path="/orderDetail/:orderId"
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
                        path="/productdetail/:productId"
                        element={
                           <ProtectedRoute>
                              <ProductDetail />
                           </ProtectedRoute>
                        }
                     />
                     <Route
                        path="/userslist"
                        element={
                           <ProtectedRoute>
                              <UsersPage />
                           </ProtectedRoute>
                        }
                     />
                     {/* Route mặc định */}
                     <Route path="/" element={<Navigate to="/dashboard" />} />
                  </Routes>
                  <Footer />
               </div>
            </>
         ) : (
            // Nếu chưa đăng nhập, render trang login
            <Routes>
               <Route path="/login" element={<Login />} />
               <Route path="*" element={<Navigate to="/login" />} />
               <Route path="/register" element={<Register />} />
            </Routes>
         )}
      </div>
   );
};

export default App;

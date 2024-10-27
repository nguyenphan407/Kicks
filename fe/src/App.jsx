import { Routes, Route } from "react-router-dom";
import React from "react";
import LandingPage from "./Pages/LandingPage";
import CartPage from "./Pages/CartPage";
import CheckOutPage from "./Pages/CheckOutPage";
import ListingPage from "./Pages/ListingPage";
import Login from "./Pages/Login";
import ProductDetailPage from "./Pages/ProductDetailPage";
import Register from "./Pages/Register";
import Header from "./Components/Header";

const App = () => {
    return (
        <div className="">
            <div className="container"><Header /></div>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkOut" element={<CheckOutPage />} />
                <Route path="/listing" element={<ListingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/productDetail/:productId" element={<ProductDetailPage />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </div>
    );
};

export default App;

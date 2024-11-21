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

import { Routes, Route } from "react-router-dom";
import React from "react";
import LandingPage from "./Pages/LandingPage";
import CartPage from "./Pages/CartPage";
import CheckOutPage from "./Pages/CheckOutPage";
import ListingPage from "./Pages/ListingPage";
import Login from "./Pages/Login";
import ProductDetailPage from "./Pages/ProductDetailPage";
import Register from "./Pages/Register";
import Header from "./Components/Layout/Header";
import Footer from "./Components/Layout/Footer";
import NewsletterSignup from "./Components/User/NewsletterSignup";
import EmailConfirmation from "./Pages/EmailConfirmation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div className="">
      <ToastContainer />
      <div className="container">
        <Header />
      </div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkOut" element={<CheckOutPage />} />
        <Route path="/listing" element={<ListingPage />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/productDetail/:productId"
          element={<ProductDetailPage />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/email-confirmation" element={<EmailConfirmation />} />
      </Routes>
      <div className="container">
        <NewsletterSignup />
        <Footer />
      </div>
    </div>
  );
};

export default App;

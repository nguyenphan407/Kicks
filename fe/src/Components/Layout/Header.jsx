// src/components/Header.jsx
import React, { useContext, useEffect, useRef, useState } from "react";
import { icons } from "../../assets/assets";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ShopConText } from "../../context/ShopContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import authApi from "../../apis/authApi";
import productApi from "../../apis/productApi";
import userApi from "../../apis/userApi"; // Import userApi
import UpdateUserModal from "../User/UpdateUserModal"; // Import UpdateUserModal

const Header = () => {
  const [visible, setVisible] = useState(false);
  const { getCartCount, token, setToken, user, setUser, cartData, cartChanged } =
    useContext(ShopConText);
  const sidebarRef = useRef(null);
  const headerRef = useRef(null);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const count = getCartCount();
    setCartCount(count);
  }, [cartData, cartChanged]);

  // Click outside handler for sidebar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarRef]);

  const logout = async () => {
    try {
      await authApi.logout();
      setToken("");
      setMenuOpenUser(false);
      toast.success("Logged out successfully!");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  const clickOrder = () => {
    setMenuOpenUser(false);
    navigate("/order");
  };

  const [menuOpenUser, setMenuOpenUser] = useState(false);

  const toggleMenuUser = () => {
    if (!token) {
      navigate("/login");
    } else {
      setMenuOpenUser((prev) => !prev);
    }
  };

  // State để quản lý modal cập nhật thông tin người dùng
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  return (
    <div
      ref={headerRef}
      className="flex items-center justify-between p-4 sm:p-6 xl:p-8 font-semibold font-rubik bg-[#FAFAFA] rounded-xl sm:rounded-3xl mt-8 relative"
    >
      {/* Overlay for user menu */}
      {menuOpenUser && (
        <div
          style={{ zIndex: 5 }}
          className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-20"
          onClick={() => setMenuOpenUser(false)}
        ></div>
      )}

      {/* Mobile Menu Icon */}
      <div className="w-[56px] xl:hidden">
        <img
          onClick={() => setVisible(true)}
          src={icons.MenuIcon}
          className="w-5 cursor-pointer"
          alt="Menu Icon"
        />
      </div>

      {/* Navigation Container */}
      <div className="flex items-center justify-between w-full">
        {/* Left Side: Navigation Links */}
        <div className="flex items-center">
          <ul className="hidden xl:flex text-base lg:gap-10 mr-4">
            <NavLink to="/listing" className="items-center">
              <p className="font-semibold">New Drops🔥</p>
            </NavLink>
            <NavLink to="/listing/men" className="flex items-center gap-0.5">
              <p>Men</p>
            </NavLink>
            <NavLink to="/listing/women" className="flex items-center">
              <p>Women</p>
            </NavLink>
          </ul>
        </div>

        {/* Center: Logo */}
        <NavLink
          to="/"
          className="absolute left-1/2 transform -translate-x-1/2"
        >
          <img
            src={icons.LogoIcon}
            className="sm:scale-[0.8] scale-[0.625] xl:scale-100 cursor-pointer"
            alt="Logo"
          />
        </NavLink>

        {/* Right Side: Icons */}
        <div className="flex items-center gap-2 lg:gap-4 ml-auto">
          {/* Cart Icon */}
          <Link to="/cart" className="relative">
            <img
              className="sm:scale-[0.9] scale-[0.8] xl:scale-100 w-6 cursor-pointer"
              src={icons.CartIcon}
              alt="Cart Icon"
            />
            {cartCount > 0 && (
              <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-[#232321] text-white aspect-square rounded-full text-[8px]">
                {cartCount}
              </p>
            )}
          </Link>

          {/* User Icon and Dropdown */}
          <div className="relative">
            <img
              onClick={toggleMenuUser}
              className="sm:scale-[0.9] scale-[0.8] xl:scale-100 w-6 cursor-pointer"
              src={icons.UserIcon}
              alt="User Icon"
            />

            {/* Dropdown Menu */}
            <div
              className={`z-10 flex flex-col items-between justify-between absolute right-[-17px] lg:right-[-33px] mt-6 lg:mt-12 w-[150px] lg:w-[233px] bg-white rounded-xl overflow-hidden border-2 border-[#E7E7E3] 
                transform transition-all duration-300 ease-in-out ${
                  menuOpenUser
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95 pointer-events-none"
                }`}
            >
              <div className="font-rubik text-[16px] lg:text-xl font-semibold text-secondary_black px-2 py-2 lg:px-4 lg:py-4 ">
                {user.first_name ? user.first_name : "Guest"}
              </div>
              <p
                className="cursor-pointer font-inter text-[10px] lg:text-[14px] uppercase font-medium flex items-center justify-between px-2 py-2 lg:px-4 lg:py-4 hover:bg-gray-100"
                onClick={clickOrder}
              >
                Order
                <img
                  src={icons.OrderIcon}
                  alt=""
                  className="w-4 h-4 lg:w-6 lg:h-6"
                />
              </p>
              <p
                className="cursor-pointer font-inter text-[10px] lg:text-[14px] uppercase font-medium flex items-center justify-between px-2 py-2 lg:px-4 lg:py-4 hover:bg-gray-100"
                onClick={() => setIsUpdateModalOpen(true)} // Mở modal khi click
              >
                Update information
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="w-4 h-4 lg:w-6 lg:h-6"
                >
                  <path
                    d="M6 3.5L10.5 8L6 12.5"
                    stroke="#232321"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </p>
              <p
                className="cursor-pointer font-inter text-[10px] lg:text-[14px] uppercase font-medium flex items-center justify-between px-2 py-2 lg:px-4 lg:py-4 hover:bg-gray-100"
                onClick={logout}
              >
                Logout
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M9.5 10.5V11.75C9.5 12.0815 9.3683 12.3995 9.13388 12.6339C8.89946 12.8683 8.58152 13 8.25 13H3.25C2.91848 13 2.60054 12.8683 2.36612 12.6339C2.1317 12.3995 2 12.0815 2 11.75V4.25C2 3.91848 2.1317 3.60054 2.36612 3.36612C2.60054 3.1317 2.91848 3 3.25 3H8C8.69031 3 9.5 3.55969 9.5 4.25V5.5M11.5 10.5L14 8L11.5 5.5M5.5 8H13.5"
                    stroke="#232321"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Update User Modal */}
      <UpdateUserModal 
        visible={isUpdateModalOpen} 
        onClose={() => setIsUpdateModalOpen(false)} 
      />

      {/* Sidebar Menu */}
      <div
        ref={sidebarRef}
        className={`z-10 absolute top-0 left-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? "w-[75%]" : "w-0"}`}
      >
        <div className="flex flex-col text-black">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3 pl-6"
          >
            <img
              className="h-4 rotate-180 pl-6"
              src={icons.MenuIcon}
              alt="Back"
            />
          </div>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/"
          >
            New Drops🔥
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/listing/men"
          >
            Men
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/listing/women"
          >
            Women
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Header;

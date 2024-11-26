import React, { useContext, useEffect, useRef, useState } from "react";
import { icons } from "../../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { ShopConText } from "../../context/ShopContext";

const Header = () => {
  const [visible, setVisible] = useState(false);
  const { getCartCount } = useContext(ShopConText);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
  const sidebarRef = useRef(null);

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

  // Check if user is logged in based on token in both storages
  const checkLoginStatus = () => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    setIsLoggedIn(!!token); // Set true if token exists
  };

  useEffect(() => {
    checkLoginStatus(); // Run the check when the component mounts

    // Add a custom event listener for login status changes
    const handleTokenChange = () => {
      checkLoginStatus();
    };

    window.addEventListener("tokenChange", handleTokenChange);

    return () => {
      window.removeEventListener("tokenChange", handleTokenChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    sessionStorage.removeItem("token"); // Remove token from sessionStorage
    setIsLoggedIn(false); // Update state
    window.dispatchEvent(new Event("tokenChange")); // Dispatch custom event
  };

  return (
    <div className="flex items-center justify-between p-4 sm:p-6 xl:p-8 font-semibold font-rubik bg-[#FAFAFA] rounded-xl sm:rounded-3xl mt-8">
      <div className="w-[56px] xl:hidden">
        <img
          onClick={() => setVisible(true)}
          src={icons.MenuIcon}
          className="w-5 cursor-pointer"
          alt="Menu Icon"
        />
      </div>
      <ul className="hidden xl:flex text-base lg:gap-10">
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
      <Link to="/">
        <img src={icons.LogoIcon} className="cursor-pointer" alt="Logo" />
      </Link>
      <div className="flex items-center xl:w-[275px] justify-end gap-2 lg:gap-10">
        <img
          src={icons.SearchIcon}
          className="w-7 hidden xl:block cursor-pointer"
          alt="Search Icon"
        />
        <Link to="/cart" className="relative">
          <img
            className="w-6 cursor-pointer"
            src={icons.CartIcon}
            alt="Cart Icon"
          />
          {getCartCount() > 0 && (
            <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-[#232321] text-white aspect-square rounded-full text-[8px]">
              {getCartCount()}
            </p>
          )}
        </Link>
        <div className="relative">
          {isLoggedIn ? (
            <p
              onClick={handleLogout}
              className="cursor-pointer font-medium text-[14px] uppercase flex items-center"
            >
              Logout
            </p>
          ) : (
            <NavLink to="/login" className="font-medium text-[14px] uppercase">
              Login
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;

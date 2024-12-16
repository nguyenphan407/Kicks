import React, { useContext, useEffect, useRef, useState } from "react";
import { icons } from "../../assets/assets";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ShopConText } from "../../context/ShopContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import authApi from "../../apis/authApi";
import productApi from "../../apis/productApi";

const Header = () => {
  const [visible, setVisible] = useState(false);
  const { getCartCount, token, setToken, user, cartData, cartChanged } =
    useContext(ShopConText);
  const sidebarRef = useRef(null);
  const headerRef = useRef(null);
  const debounceRef = useRef(null);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  // Search-related states
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const count = getCartCount();
    setCartCount(count);
  }, [cartData, cartChanged]);

  // Click outside handler for sidebar and search
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        (sidebarRef.current && !sidebarRef.current.contains(event.target)) ||
        (headerRef.current && !headerRef.current.contains(event.target))
      ) {
        setVisible(false);
        setIsSearchFocused(false);
        setSearchResults([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarRef, headerRef]);

  // Search functionality
  useEffect(() => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    // Debounce search
    debounceRef.current = setTimeout(async () => {
      try {
        // Search for products
        const productResponse = await productApi.search(query);

        // Process product data
        const products = productResponse.data.flat().map((item) => ({
          ...item,
          type: "product",
        }));

        // Set search results
        setSearchResults(products);
      } catch (error) {
        console.error("Error searching:", error);
        toast.error("Search failed!");
        setSearchResults([]);
      }
    }, 150);

    // Cleanup timeout
    return () => {
      clearTimeout(debounceRef.current);
    };
  }, [query]);

  // Filter search results
  const products = searchResults.filter((item) => item.type === "product");

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

  return (
    <div
      ref={headerRef}
      className="flex items-center justify-between p-4 sm:p-6 xl:p-8 font-semibold font-rubik bg-[#FAFAFA] rounded-xl sm:rounded-3xl mt-8 relative"
    >
      {/* Overlay */}
      {(menuOpenUser || isSearchFocused) && (
        <div
          style={{ zIndex: 5 }}
          className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-20"
          onClick={() => {
            setMenuOpenUser(false);
            setIsSearchFocused(false);
            setSearchResults([]);
          }}
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
          {/* Navigation Menu */}
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

        {/* Right Side: Search and Icons */}
        <div className="flex items-center gap-2 lg:gap-4 ml-auto">
          {/* Search Input for Desktop */}
          <div className="relative hidden xl:block mr-4">
            <form onSubmit={(e) => e.preventDefault()} className="relative">
              <input
                placeholder="Search..."
                className="font-semibold input focus:shadow-lg focus:border-2 border-[#4A69E2] px-5 py-3 rounded-xl w-56 transition-all focus:w-64 outline-none"
                name="search"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => {
                  setTimeout(() => {
                    setIsSearchFocused(false);
                  }, 200);
                }}
              />
              <button type="submit" className="absolute top-3 right-3">
                <img
                  src={icons.SearchIcon}
                  alt="search icon"
                  className="w-6 h-6 text-gray-500"
                />
              </button>
            </form>

            {/* Search Results */}
            {products.length > 0 && isSearchFocused && (
              <div className="absolute top-full left-0 w-full bg-white border border-[#E7E7E3] rounded-lg mt-2 max-h-60 overflow-y-auto z-10">
                <ul>
                  <li className="px-4 py-2 font-semibold border-b border-gray-200">
                    Products
                  </li>
                  {products.map((item) => (
                    <li
                      key={`product-${item.product_id}`}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                      onClick={() => {
                        console.log(
                          `Navigating to product detail: ${item.product_id}`
                        );
                        navigate(`/productdetail/${item.product_id}`);
                        setMenuOpenUser(false);
                        setIsSearchFocused(false);
                        setSearchResults([]);
                      }}
                    >
                      <img
                        src={item.image || icons.DefaultProductIcon}
                        alt={item.name}
                        className="w-10 h-10 object-cover rounded"
                      />
                      <div>
                        <p className="font-inter font-semibold">{item.name}</p>
                        <p className="font-inter font-normal text-xs text-gray-500">
                          {item.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Search Icon for Mobile */}
          <img
            src={icons.SearchIcon}
            className="w-7 xl:hidden cursor-pointer"
            alt="Search Icon"
          />

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
                onClick={() => navigate("/change-password")}
              >
                Change Password
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

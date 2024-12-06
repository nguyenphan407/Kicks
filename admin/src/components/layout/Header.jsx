// admin/Header.jsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; // Để điều hướng sau khi logout
import { icons } from "../../assets/assets";
import authApi from "../../apis/authApi";
import productApi from "@/apis/productApi"; // Import productApi
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header = () => {
    const [menuOpenUser, setMenuOpenUser] = useState(false);
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [query, setQuery] = useState(""); // State quản lý từ khóa tìm kiếm
    const [searchResults, setSearchResults] = useState([]); // State quản lý kết quả tìm kiếm
    const navigate = useNavigate(); // Sử dụng hook điều hướng
    const headerRef = useRef(null); // Ref cho Header để quản lý overlay
    const debounceRef = useRef(null); // Ref cho debounce

    // Hàm để toggle menu user
    const toggleMenuUser = () => {
        setMenuOpenUser((prev) => !prev);
    };

    // Hàm xử lý đăng xuất
    const handleLogout = async () => {
        try {
            await authApi.logout();

            localStorage.removeItem("access_token");

            // Điều hướng tới trang login
            navigate("/login");
            toast.success("Logged out successfully!");
        } catch (error) {
            console.error("Logout failed:", error.response?.data || error.message);
            toast.error("Logout failed!");
        }
    };

    // Hàm xử lý khi nhấp vào overlay
    const handleOverlayClick = () => {
        setMenuOpenUser(false);
        setIsSearchFocused(false);
        setSearchResults([]);
    };

    // Đóng menu user và bỏ focus khi nhấp vào bên ngoài Header
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                headerRef.current &&
                !headerRef.current.contains(event.target)
            ) {
                setMenuOpenUser(false);
                setIsSearchFocused(false);
                setSearchResults([]);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Hàm xử lý tìm kiếm với debounce
    useEffect(() => {
        if (!query.trim()) {
            setSearchResults([]);
            return;
        }

        // Đặt debounce để gọi API sau khi người dùng ngừng gõ trong 300ms
        debounceRef.current = setTimeout(async () => {
            try {
                const response = await productApi.search(query);
                setSearchResults(response.data);
                // console.log("Tìm kiếm thành công!");
            } catch (error) {
                console.error("Error searching products:", error);
                toast.error("Tìm kiếm thất bại!");
                setSearchResults([]);
            }
        }, 150); // 300ms debounce

        // Dọn dẹp timeout nếu query thay đổi trước khi timeout kết thúc
        return () => {
            clearTimeout(debounceRef.current);
        };
    }, [query]);

    return (
        <>
            {/* Overlay */}
            {(menuOpenUser || isSearchFocused) && (
                <div
                    style={{ zIndex: 5 }}
               className="fixed top-[96px] left-[260px] right-0 bottom-0 bg-black bg-opacity-20"
                    onClick={handleOverlayClick}
                ></div>
            )}

            <div
                ref={headerRef}
            className="z-10 top-0 w-full h-[96px] px-[60px] py-[30px] bg-white flex justify-end items-center gap-10"
            >
                {/* Search Input */}
                <div className="relative">
                    <form onSubmit={(e) => e.preventDefault()}>
                        <input
                            placeholder="Search..."
                            className="font-semibold input focus:shadow-lg focus:border-2 border-[#4A69E2] px-5 py-3 rounded-xl w-56 transition-all focus:w-64 outline-none"
                            name="search"
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onFocus={() => setIsSearchFocused(true)}
                            onBlur={() => {
                                // Để cho phép click vào kết quả trước khi mất focus
                                // Sử dụng setTimeout để trì hoãn việc bỏ focus
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

                    {/* Kết quả tìm kiếm */}
                    {searchResults.length > 0 && isSearchFocused && (
                        <div className="absolute top-full left-0 w-full bg-white border border-[#E7E7E3] rounded-lg mt-2 max-h-60 overflow-y-auto z-50">
                            <ul>
                                {searchResults.map((item) => (
                                    <li
                                        key={item.searchable.product_id}
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                                        onClick={() => {
                                            navigate(`/productdetail/${item.searchable.product_id}`);
                                            setMenuOpenUser(false);
                                            setIsSearchFocused(false);
                                            setSearchResults([]);
                                        }}
                                    >
                                        <img
                                 src={
                                    item.searchable.image_url ||
                                    icons.DefaultProductIcon
                                 } // Sử dụng URL hình ảnh từ sản phẩm hoặc một icon mặc định
                                            alt={item.title}
                                            className="w-10 h-10 object-cover rounded"
                                        />
                                        <span className="font-rubik font-medium">{item.title}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Notifications Icon */}
                <button>
                    <img src={icons.NotificationsIcon} alt="Notifications Icon" />
                </button>

                {/* User Dropdown */}
                <div className="relative">
                    <button
                        className={`flex justify-between uppercase gap-1 font-rubik px-4 py-2 rounded-lg border-2
                            ${
                                menuOpenUser
                                    ? "bg-[#4A69E2] text-white border-[#4A69E2]"
                                    : "bg-inherit text-black border-black"
                            }`}
                        onClick={toggleMenuUser}
                    >
                        <span>admin</span>
                        <img
                            src={icons.ChevronDownIcon}
                            alt="Chevron Down Icon"
                            className={` transition-transform duration-200 ${
                                menuOpenUser ? "transform rotate-180" : ""
                     } `}
                        />
                    </button>

                    {/* Dropdown Menu */}
                    <div
                        className={`flex z-50 flex-col items-between justify-between absolute right-[-2px] mt-10 w-[233px] bg-white rounded-lg border-2 border-[#E7E7E3]
                            transform transition-all duration-300 ease-in-out ${
                                menuOpenUser
                                    ? "opacity-100 scale-100"
                                    : "opacity-0 scale-95 pointer-events-none"
                            }`}
                    >
                        <div className="font-rubik text-xl font-semibold text-secondary_black leading-6 px-4 py-4">
                            UserName
                        </div>
                  <p className="cursor-pointer font-inter text-[14px] uppercase font-medium flex items-center justify-between py-4 px-4 hover:bg-gray-100">
                     Change password
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
                            className="cursor-pointer font-inter text-[14px] uppercase font-medium flex items-center justify-between py-4 px-4 hover:bg-gray-100"
                            onClick={handleLogout} // Thêm sự kiện logout
                        >
                            Logout
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                className="w-4 h-4 lg:w-6 lg:h-6"
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
        </>
    );
};

export default Header;

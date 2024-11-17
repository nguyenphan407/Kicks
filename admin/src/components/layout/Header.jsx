import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Để điều hướng sau khi logout
import { icons } from "../../assets/assets";
import axiosClient from "../../apis/axiosClient";
import authApi from "../../apis/authApi";

const Header = () => {
    const [menuOpenUser, setMenuOpenUser] = useState(false);
    const navigate = useNavigate(); // Sử dụng hook điều hướng

    const toggleMenuUser = () => {
        setMenuOpenUser((prev) => !prev);
    };

    const handleLogout = async () => {
        try {
            await authApi.logout();

            localStorage.removeItem("access_token");

            // Điều hướng tới trang login
            navigate("/login");
        } catch (error) {
            console.error("Logout failed:", error.response?.data || error.message);
        }
    };

    return (
        <div className="z-1 top-0 w-full h-[96px] px-[60px] py-[30px] bg-white flex justify-end items-center gap-10 fixed t-0">
            <button>
                <img src={icons.SearchIcon} alt="search icon" />
            </button>
            <button>
                <img src={icons.NotificationsIcon} alt="search icon" />
            </button>
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
                    admin
                    <img
                        src={icons.ChevronDownIcon}
                        alt=""
                        className={`transition-colors ${
                            menuOpenUser ? "filter invert" : ""
                        }`}
                    />
                </button>
                <div
                    className={`flex flex-col items-between justify-between gap-4 absolute right-[-2px] mt-10 w-[233px] h-[152px] bg-white rounded-lg border-2 border-[#E7E7E3] py-4 
                        transform transition-all duration-300 ease-in-out ${
                            menuOpenUser
                                ? "opacity-100 scale-100"
                                : "opacity-0 scale-95 pointer-events-none"
                        }`}
                >
                    <div className="font-rubik text-xl font-semibold text-secondary_black leading-6 px-4">
                        UserName
                    </div>
                    <p className="cursor-pointer font-inter text-[14px] uppercase font-medium flex items-center justify-between py-2 px-4 leading-3">
                        Change password
                        <img
                            src={icons.ChevronForwardIcon}
                            alt=""
                            className="w-4 h-4"
                        />
                    </p>
                    <p
                        className="cursor-pointer font-inter text-[14px] uppercase font-medium flex items-center justify-between py-2 px-4 leading-3"
                        onClick={handleLogout} // Thêm sự kiện logout
                    >
                        Logout
                        <img src={icons.LogoutIcon} alt="logout icon" />
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Header;

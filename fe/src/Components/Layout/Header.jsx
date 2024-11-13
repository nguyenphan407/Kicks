import React, { useContext, useEffect, useRef, useState } from "react";
import { icons } from "../../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { ShopConText } from "../../context/ShopContext";

const Header = () => {
    const [visible, setVisible] = useState(false);
    const { products, getCartCount } = useContext(ShopConText);
    const sidebarRef = useRef(null); // Tạo ref cho sidebar

    // useEffect để lắng nghe sự kiện click ngoài sidebar
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                sidebarRef.current &&
                !sidebarRef.current.contains(event.target)
            ) {
                setVisible(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [sidebarRef]);

    const [menuOpenUser, setMenuOpenUser] = useState(false);

    const toggleMenuUser = () => {
        setMenuOpenUser((prev) => !prev);
    };

    return (
        <div className="flex items-center justify-between p-4 sm:p-6 xl:p-8 font-semibold font-rubik bg-[#FAFAFA] rounded-xl sm:rounded-3xl mt-8 ">
            {/* Menu icon trên mobile */}
            <div className="w-[56px] xl:hidden">
                <img
                    onClick={() => setVisible(true)}
                    src={icons.MenuIcon} // Icon menu từ assets.js
                    className="w-5 cursor-pointer "
                    alt="Menu Icon"
                />
            </div>
            {/* Danh sách các mục */}
            <ul className="hidden xl:flex text-base lg:gap-10">
                <NavLink to="/listing" className="items-center">
                    <p className="font-semibold">New Drops🔥</p>
                </NavLink>
                <NavLink
                    to="/listing/men"
                    className="flex items-center gap-0.5"
                >
                    <p>Men</p>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                    >
                        <path
                            d="M4.61152 8.89369L4.6115 8.89367C3.99737 8.17903 4.50501 7.0752 5.44591 7.0752H18.5522C19.4931 7.0752 20.0007 8.17905 19.3884 8.89369L12.8362 16.5399C12.7328 16.6606 12.6045 16.7574 12.4602 16.8238C12.3158 16.8901 12.1589 16.9245 12 16.9245C11.8411 16.9245 11.6841 16.8901 11.5397 16.8238C11.3954 16.7574 11.2671 16.6606 11.1637 16.5399L4.61152 8.89369Z"
                            fill="#232321"
                            stroke="#232321"
                            strokeWidth="0.046875"
                        />
                    </svg>
                </NavLink>
                <NavLink to="/listing/women" className="flex items-center">
                    <p>Women</p>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                    >
                        <path
                            d="M4.61152 8.89369L4.6115 8.89367C3.99737 8.17903 4.50501 7.0752 5.44591 7.0752H18.5522C19.4931 7.0752 20.0007 8.17905 19.3884 8.89369L12.8362 16.5399C12.7328 16.6606 12.6045 16.7574 12.4602 16.8238C12.3158 16.8901 12.1589 16.9245 12 16.9245C11.8411 16.9245 11.6841 16.8901 11.5397 16.8238C11.3954 16.7574 11.2671 16.6606 11.1637 16.5399L4.61152 8.89369Z"
                            fill="#232321"
                            stroke="#232321"
                            strokeWidth="0.046875"
                        />
                    </svg>
                </NavLink>
            </ul>

            {/* Phần logo */}
            <Link to="/">
                <img
                    src={icons.LogoIcon} // Logo từ assets.js
                    className="sm:scale-[0.8] scale-[0.625] xl:scale-100 cursor-pointer"
                    alt="Logo"
                />
            </Link>

            {/* Phần order & user & search */}
            <div className="flex items-center xl:w-[275px] justify-end gap-2 lg:gap-10">
                <img
                    src={icons.SearchIcon} // Icon tìm kiếm từ assets.js
                    className="w-7 hidden xl:block cursor-pointer"
                    alt="Search Icon"
                />
                
                <Link to="/cart" className="relative">
                    <img
                        className="sm:scale-[0.9] scale-[0.8] xl:scale-100 w-6 cursor-pointer items-center"
                        src={icons.CartIcon} // Icon người dùng từ assets.js
                        alt="User Icon"
                    />
                    {getCartCount() > 0 && (
                        <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-[#232321] text-white aspect-square rounded-full text-[8px]">
                            {getCartCount()}
                        </p>
                    )}
                </Link>
                <div className="relative">
                    {/* Icon user */}
                    <img
                        onClick={toggleMenuUser}
                        className="sm:scale-[0.9] scale-[0.8] xl:scale-100 w-6 cursor-pointer items-center"
                        src={icons.UserIcon} // Icon người dùng từ assets.js
                        alt="User Icon"
                    />

                    {/* Menu dropdown với hiệu ứng */}
                    <div
                        className={`flex flex-col items-between justify-between gap-4 absolute right-[-2px] mt-12 w-[233px] h-[152px] bg-white rounded-lg border-2 border-[#E7E7E3] py-4 
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
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
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
                        <p className="cursor-pointer font-inter text-[14px] uppercase font-medium flex items-center justify-between py-2 px-4 leading-3">
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

            {/* Sidebar menu */}
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
                            src={icons.MenuIcon} // Icon back từ assets.js
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

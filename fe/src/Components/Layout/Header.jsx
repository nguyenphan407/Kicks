import React, { useEffect, useRef, useState } from "react";
import { icons } from "../../assets/assets";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
    const [visible, setVisible] = useState(false);
    const sidebarRef = useRef(null); // Tạo ref cho sidebar

    // useEffect để lắng nghe sự kiện click ngoài sidebar
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

    return (
        <div className="flex items-center justify-between p-4 sm:p-6 xl:p-8 font-semibold font-rubik bg-[#FAFAFA] rounded-xl sm:rounded-3xl mt-8 ">
            <img
                onClick={() => setVisible(true)}
                src={icons.MenuIcon} // Icon menu từ assets.js
                className="w-5 cursor-pointer xl:hidden"
                alt="Menu Icon"
            />
            <ul className="hidden xl:flex text-base lg:gap-10">
                <NavLink to="/listing" className="items-center">
                    <p className="font-semibold">New Drops🔥</p>
                </NavLink>
                <NavLink to="/listing/men" className="flex items-center gap-0.5">
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
            <Link to="/">
                <img
                    src={icons.LogoIcon} // Logo từ assets.js
                    className="sm:scale-[0.8] scale-[0.625] xl:scale-100 cursor-pointer"
                    alt="Logo"
                />
            </Link>
            <div className="flex items-center xl:w-[301px] justify-end gap-10">
                <img
                    src={icons.SearchIcon} // Icon tìm kiếm từ assets.js
                    className="w-7 hidden xl:block cursor-pointer"
                    alt="Search Icon"
                />
                <div className="group relative">
                    <img
                        className="sm:scale-[0.8] scale-[0.625] xl:scale-100 w-6 cursor-pointer items-center"
                        src={icons.UserIcon} // Icon người dùng từ assets.js
                        alt="User Icon"
                    />
                    <div className="z-10 group-hover:block hidden absolute dropdown-menu right-0 pt-4">
                        <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded-lg">
                            <p className="cursor-pointer hover:text-black">
                                My Profile
                            </p>
                            <p className="cursor-pointer hover:text-black">
                                Order
                            </p>
                            <p className="cursor-pointer hover:text-black">
                                Logout
                            </p>
                        </div>
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

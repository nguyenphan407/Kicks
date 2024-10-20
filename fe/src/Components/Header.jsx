import React from "react";
import LogoIcon from "../assets/icons/Logo.svg";
import { Link, NavLink } from "react-router-dom";
import SearchIcon from "../assets/icons/Search_icon.svg";
import UserIcon from "../assets/icons/User_icon.svg";
import MenuIcon from "../assets/icons/menu_icon.svg";

const Header = () => {
    return (
        <div className="flex items-center justify-between p-8 font-semibold font-rubik bg-[#FAFAFA] rounded-3xl mt-8">
            <img
                src={MenuIcon}
                className="w-5 cursor-pointer md:hidden"
                alt=""
            />
            <ul className="hidden md:flex text-base gap-10">
                <NavLink to="/" className="flex flex-col items-center">
                    <p className="font-semibold">🔥 New Drops</p>
                </NavLink>
                <NavLink to="/" className="flex items-center gap-0.5">
                    <p className="font-semibold">Men</p>
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
                <NavLink to="/" className="flex items-center">
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
            <img src={LogoIcon} className="" alt="Logo" />
            <div className="flex items-center lg:w-[301px] justify-end gap-10">
                <img
                    src={SearchIcon}
                    className="mr- w-7 cursor-pointer"
                    alt=""
                />
                <div className="group relative">
                    <img
                        className="w-6 cursor-pointer items-center"
                        src={UserIcon}
                        alt=""
                    />
                    <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
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
        </div>
    );
};

export default Header;

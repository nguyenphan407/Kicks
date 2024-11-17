import React, { useState } from "react";
import { FiChevronUp } from "react-icons/fi";
import { icons } from "../../assets/assets";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
    const [isOpenCategories, setIsOpenCategories] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState(null); // Theo dõi ô được chọn

    // Dữ liệu Categories
    const categories = [
        "Sneakers",
        "Runners",
        "Golf",
        "Hiking",
        "Football",
        "Baseball",
    ];

    // Toggle hiển thị dropdown
    const toggleDropdownCategories = () =>
        setIsOpenCategories(!isOpenCategories);

    // Chọn ô category
    const handleCategoryClick = (index) => {
        setSelectedCategory(index); // Lưu index của category được chọn
    };

    return (
        <div className="w-[260px] h-screen bg-white fixed top-0 left-0 z-10 border border-[#cfcfcf] py-8 px-6">
            {/* Logo */}
            <img src={icons.LogoBlackIcon} alt="Logo Icon" className="m-auto" />

            {/* Navigation */}
            <div className="flex flex-col mt-[62px] gap-4">
                {/* Dashboard */}
                <NavLink
                    to="/dashboard"
                    className={({ isActive }) => {
                        const activeClass = isActive
                            ? "bg-[#4A69E2] text-white border-[#4A69E2]"
                            : "bg-inherit text-black border-black hover:bg-gray-200";
                        return `flex items-center gap-2 px-4 py-[15.5px] rounded-lg transition-all font-rubik font-medium ${activeClass}`;
                    }}
                >
                    {({ isActive }) => (
                        <>
                            <img
                                src={
                                    isActive
                                        ? icons.DashBoardActiveIcon
                                        : icons.DashBoardIcon
                                }
                                alt="Dashboard Icon"
                                className="w-5 h-5"
                            />
                            DASHBOARD
                        </>
                    )}
                </NavLink>

                {/* All Products */}
                <NavLink
                    to="/allproduct"
                    className={({ isActive }) =>
                        `flex items-center gap-2 px-4 py-[15.5px] rounded-lg transition-all font-rubik font-medium ${
                            isActive
                                ? "bg-[#4A69E2] text-white border-[#4A69E2]"
                                : "bg-inherit text-black border-black hover:bg-gray-200"
                        }`
                    }
                >
                    {({ isActive }) => (
                        <>
                            <img
                                src={
                                    isActive
                                        ? icons.AllProductActiveIcon
                                        : icons.AllProductIcon
                                }
                                alt="All Products Icon"
                                className="w-5 h-5"
                            />
                            ALL PRODUCTS
                        </>
                    )}
                </NavLink>

                {/* Order List */}
                <NavLink
                    to="/orderlist"
                    className={({ isActive }) =>
                        `flex items-center gap-2 px-4 py-[15.5px] rounded-lg font-rubik transition-all font-medium ${
                            isActive
                                ? "bg-[#4A69E2] text-white border-[#4A69E2]"
                                : "bg-inherit text-black border-black hover:bg-gray-200"
                        }`
                    }
                >
                    {({ isActive }) => (
                        <>
                            <img
                                src={
                                    isActive
                                        ? icons.OrderListActiveIcon
                                        : icons.OrderListIcon
                                }
                                alt="All Products Icon"
                                className="w-5 h-5"
                            />
                            ORDER LIST
                        </>
                    )}
                </NavLink>
            </div>

            {/* Categories */}
            <div className="mt-12">
                {/* Header của Categories */}
                <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={toggleDropdownCategories}
                >
                    <h3 className="font-rubik text-xl text-[#232321] font-semibold">
                        Categories
                    </h3>
                    <FiChevronUp
                        className={`w-6 h-6 transform transition-transform duration-300 ${
                            isOpenCategories ? "rotate-180" : ""
                        }`}
                    />
                </div>

                {/* Dropdown Categories */}
                {isOpenCategories && (
                    <div className="flex flex-col gap-4 mt-4">
                        {categories.map((category, index) => (
                            <div
                                key={index}
                                className={`flex items-center justify-between cursor-pointer`}
                                onClick={() => handleCategoryClick(index)} // Click cả dòng
                            >
                                <span className={`font-semibold text-[16px]`}>
                                    {category}
                                </span>
                                {/* Ô vuông */}
                                <div
                                    className={`w-[41px] h-[35px] flex items-center justify-center rounded-[4px]  transition-all p-2 ${
                                        selectedCategory === index
                                            ? "bg-[#4A69E2] text-white"
                                            : "bg-[#E7E7E3] text-black hover:bg-gray-400"
                                    }`}
                                >
                                    <span className="font-semibold text-[14px]">
                                        -
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Sidebar;

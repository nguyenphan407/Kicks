import React, { useState, useContext } from "react";
import { FiChevronUp } from "react-icons/fi";
import { icons } from "../../assets/assets";
import { NavLink } from "react-router-dom";
import { ShopConText } from "@/context/ShopContext";

const Sidebar = () => {
   const {
      currentCategory,
      isOpenCategories,
      toggleDropdownCategories,
      categories,
      handleCategoryChange,
   } = useContext(ShopConText);

   return (
      <div className="w-[260px] h-screen bg-white fixed top-0 left-0 z-50 border border-[#cfcfcf] py-8 px-6">
         {/* Logo */}
         <img src={icons.LogoBlackIcon} alt="Logo Icon" className="m-auto" />

         {/* Navigation */}
         <div className="flex flex-col mt-[30px] gap-4">
            {/* Dashboard */}
            <NavLink
               to="/dashboard"
               className={({ isActive }) => {
                  const activeClass = isActive
                     ? "bg-[#4A69E2] text-white border-[#4A69E2]"
                     : "bg-inherit text-black border-black hover:bg-gray-300";
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
            {/* Order List */}
            <NavLink
               to="/userslist"
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
                              ? icons.UserActiveIcon
                              : icons.UserIcon
                        }
                        alt="All User Icon"
                        className="w-5 h-5"
                     />
                     USER LIST
                  </>
               )}
            </NavLink>
         </div>

         {/* Categories */}
         <div className="mt-8">
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
               <div className="flex flex-col gap-3 mt-4">
                  {categories.map((category, index) => (
                     <div
                        key={index}
                        className={`flex items-center justify-between cursor-pointer`}
                        onClick={() => handleCategoryChange(category)}
                     >
                        <span className={`font-semibold text-[16px]`}>
                           {category.category_name}
                        </span>
                        {/* Ô vuông */}
                        <div
                           className={`w-[41px] h-[35px] flex items-center justify-center rounded-[4px]  transition-all p-2 ${
                              currentCategory.category_id ===
                              category.category_id
                                 ? "bg-[#4A69E2] text-white"
                                 : "bg-[#E7E7E3] text-black hover:bg-gray-400"
                           }`}
                        >
                           <span className="font-semibold text-[14px]">
                              {category.quantity}
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

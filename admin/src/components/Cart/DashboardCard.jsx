import React from "react";
import { icons } from "../../assets/assets";
import PropTypes from "prop-types";

const DashboardCard = ({ title, amount, percentage = 0, description = ""}) => {
    return (
        <div
            className="w-full h-[140px] px-4 py-6 bg-[#FFFFFF] rounded-[16px]
        transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-md "
        >
            <div className="flex justify-between items-center mb-2">
                <h3 className="font-rubik text-[14px] font-semibold text-black">
                    {title}
                </h3>
                <button className="w-6 h-6 rounded-[4px] bg-transparent hover:bg-gray-300 transition-all">
                    <img src={icons.DotsThreeIcon} alt="dots three icon" />
                </button>
            </div>
            <div className="flex justify-between items-center">
                <div className="flex justify-between gap-4 items-center">
                    <div className="w-10 h-10 bg-[#4A69E2] flex justify-center items-center rounded-lg">
                        <img src={icons.BagHandleIcon} alt="" />
                    </div>
                    <h3 className="font-rubik text-[16px] font-semibold text-black">${amount}</h3>
                </div>
                <div className="flex justify-between items-center gap-1">
                    <img src={percentage > 0 ? icons.ArrowUpIcon : icons.ArrowDownIcon} alt="" />
                    <span className="text-[14px] font-semibold text-black">{percentage} {" "}%</span>
                </div>
            </div>
            <p className="text-right text-xs font-semibold text-[#4B4B4B]">{description}</p>
        </div>
    );
};

// Định nghĩa PropTypes
DashboardCard.propTypes = {
    title: PropTypes.string.isRequired,
    amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired, // có thể là string hoặc number
    percentage: PropTypes.number, // Phần trăm (không bắt buộc)
    description: PropTypes.string, // Mô tả (không bắt buộc)
};


export default DashboardCard;

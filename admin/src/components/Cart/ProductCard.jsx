import React from "react";
import { icons } from "@/assets/assets";

const ProductCard = ({
    name,
    stock_quantity,
    price,
    description,
    category_name,
    sale,
    images,
}) => {
    return (
        <div
            className="bg-white h-[300px] rounded-[16px] p-4 flex flex-col gap-4
            transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg"
        >
            {/* Phần thông tin sản phẩm */}
            <div className="flex justify-between items-start">
                <img
                    src={images[0]}
                    alt={name}
                    className="rounded-[8px] w-[84px] h-[84px] object-cover"
                />
                <div className="flex flex-col flex-1 ml-4">
                    <h3 className="text-[16px] font-semibold text-[#232321] limit-row">
                        {name}
                    </h3>
                    <p className=" text-[14px] font-semibold text-[#646464] mb-4">
                        {category_name}
                    </p>
                    <span className="font-rubik text-[14px] font-semibold text-[#232321]">
                        ${price}
                    </span>
                </div>
                <button className=" px-2 py-3 rounded-[4px] bg-[#F3F3F3] hover:bg-gray-400 transition-all">
                    <img src={icons.DotsThreeBgIcon} alt="" />
                </button>
            </div>

            {/* Phần Summary */}
            <div>
                <h4 className="text-[16px] font-semibold text-[#232321] mb-1">
                    Summary
                </h4>
                <p className="text-[14px] font-normal text-[#797978] limit-row">
                    {description}
                </p>
            </div>

            {/* Phần sale của sản phẩm */}
            <div className="flex flex-col p-4 border border-[#BABAB9] rounded-[8px]">
                <div className="flex justify-between items-center text-[14px] font-semibold text-[#232321] pb-2 border-b border-b-[#BABAB9]">
                    <span>Sales</span>
                    <span className="flex justify-between gap-2 text-[#646464]">
                        <img src={icons.ArrowUpYellow} alt="" />
                        {sale}
                    </span>
                </div>
                <div className="flex justify-between items-center mt-2">
                    <span className="text-[14px] font-semibold text-[#232321]">
                        Remaining Products
                    </span>
                    <div className="flex items-center gap-2 text-[14px] font-semibold text-[#646464]">
                        <img src={icons.RemainingIcon} alt="" />
                        <span>{stock_quantity}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;

import React, { useContext } from "react";
import PropTypes from "prop-types";
import { ShopConText } from "../context/ShopContext";

const Pagination = () => {
    const { pagination, handlePageChange } = useContext(ShopConText);

    return (
        <div className="flex items-center justify-start py-[20px] lg:py-[30px] xl:rounded-lg gap-4">
            {/* Nút Previous */}
            <button
                className={`flex items-center justify-between px-4 py-[5px] border border-black bg-transparent rounded-lg gap-1 cursor-pointer
                    hover:bg-[#D1D1D1] transition duration-300 ${
                        pagination.currentPage === 1
                            ? "cursor-not-allowed opacity-50"
                            : ""
                    }`}
                onClick={() => handlePageChange(pagination.currentPage - 1)}
                disabled={pagination.currentPage <= 1}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                >
                    <path
                        d="M10.5 12.5L6 8L10.5 3.5"
                        stroke="#232321"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
                <p className="font-inter font-medium text-[14px] hidden lg:block">PREVIOUS</p>
            </button>

            {/* Nút số trang */}
            {Array.from({ length: pagination.totalPages }, (_, i) => (
                <button
                    key={i + 1}
                    onClick={() => handlePageChange(i + 1)}
                    className={`font-inter font-medium px-4 py-[5px] border rounded-lg border-black hover:bg-[#D1D1D1] transition duration-300 text-[14px] ${
                        pagination.currentPage === i + 1
                            ? "bg-black text-white"
                            : "bg-transparent text-black"
                    }`}
                >
                    {i + 1}
                </button>
            ))}

            {/* Nút Next */}
            <button
                className={`flex items-center justify-between px-4 py-[5px] border border-black bg-transparent rounded-lg gap-1 cursor-pointer
                    hover:bg-[#D1D1D1] transition duration-300 ${
                        pagination.currentPage === pagination.totalPages
                            ? "cursor-not-allowed opacity-50"
                            : ""
                    }`}
                onClick={() => handlePageChange(pagination.currentPage + 1)}
                disabled={pagination.currentPage >= pagination.totalPages}
            >
                <p className="font-inter font-medium text-[14px] hidden lg:block">NEXT</p>
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
            </button>
        </div>
    );
};

Pagination.propTypes = {
    pagination: PropTypes.object,
    onPageChange: PropTypes.func,
};

export default Pagination;

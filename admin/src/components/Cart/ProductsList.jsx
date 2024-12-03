import React, { useState } from "react";
import { icons } from "../../assets/assets";

const ProductList = ({ products }) => {

    return (
        <div className="p-6 bg-white rounded-[16px]">
            {/* Tiêu đề */}
            <div className="flex justify-between items-center pb-4 mb-4 border-b">
                <h2 className="font-rubik text-xl font-semibold">Products</h2>
                <button className="w-6 h-6 rounded-[4px] bg-transparent hover:bg-gray-300 transition-all">
                    <img src={icons.DotsThreeIcon} alt="dots three icon" />
                </button>
            </div>

            {/* Bảng danh sách */}
            <table className="w-full text-left mt-4">
                <thead className="border-b">
                    <tr>
                        <th className="px-2 py-4 font-rubik text-[16px] font-semibold text-[#6F6F6E] text-start">
                            Product Name
                        </th>
                        <th className="px-2 py-4 font-rubik text-[16px] font-semibold text-[#6F6F6E] text-center">
                            Order ID
                        </th>
                        <th className="px-2 py-4 font-rubik text-[16px] font-semibold text-[#6F6F6E] text-center">
                            Quantity
                        </th>
                        <th className="px-2 py-4 font-rubik text-[16px] font-semibold text-[#6F6F6E] text-end">
                            Total
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={product.id} className="border-b hover:bg-gray-200">
                            <td className="px-2 py-4 text-[14px] font-semibold text-black text-start">
                                {product.product_name}
                            </td>
                            <td className="px-2 py-4 text-[14px] font-semibold text-black text-center">
                                {product.order_id}
                            </td>
                            <td className="px-2 py-4 text-[14px] font-semibold text-black text-center">
                                {product.quantity}
                            </td>
                            <td className="px-2 py-4 text-[14px] font-semibold text-black text-end">
                                ${product.total.toFixed(2)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <section className="mt-[32px] flex gap-[150px] justify-end">
                <div className="text-right">
                    <p className="text-[16px] font-semibold text-[#232321]">Subtotal</p>
                    <p className="text-[16px] font-semibold text-[#232321]">Tax (10%)</p>
                    <p className="text-[16px] font-semibold text-[#232321]">Discount</p>
                    <p className="font-rubik text-[24px] font-semibold text-[#232321]">Total</p>
                </div>
                <div className="text-right">
                    <p className="text-[16px] font-semibold text-[#232321]">$3,201.6</p>
                    <p className="text-[16px] font-semibold text-[#232321]">$640.32</p>
                    <p className="text-[16px] font-semibold text-[#232321]">$0</p>
                    <p className="font-rubik text-[24px] font-semibold text-[#232321]">$3841.92</p>
                </div>
            </section>
        </div>
    );
};

export default ProductList;

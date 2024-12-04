import React from "react";
import { icons } from "../../assets/assets";

const ProductList = ({ products }) => {
    // Tính Toán Subtotal, Tax, Discount và Total
    const subtotal = products.reduce((acc, product) => acc + product.total, 0);
    const tax = subtotal * 0.10; // Giả sử Tax là 10%
    const discount = 0; // Giả sử không có Discount, bạn có thể cập nhật nếu cần
    const total = subtotal + tax - discount;

    return (
        <div className="p-6 bg-white rounded-[16px]">
            {/* Tiêu đề */}
            <div className="flex justify-between items-center pb-4 mb-4 border-b">
                <h2 className="font-rubik text-xl font-semibold">Products</h2>
                <button className="w-6 h-6 rounded-[4px] bg-transparent hover:bg-gray-300 transition-all">
                    <img src={icons.DotsThreeIcon} alt="dots three icon" />
                </button>
            </div>

            {/* Bảng danh sách sản phẩm */}
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
                    {products.map((product) => (
                        <tr key={product.id} className="border-b hover:bg-gray-200">
                            <td className="px-2 py-4 text-[14px] font-semibold text-black text-start flex items-center gap-4">
                                <img src={product.image} alt="" className="w-10 h-10 rounded-[8px]"/>
                                <p>
                                {product.product_name}
                                </p>
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

            {/* Phần Tóm Tắt */}
            <section className="mt-8 flex justify-end">
                <div className="w-1/3">
                    <div className="flex justify-between">
                        <p className="text-[16px] font-semibold text-[#232321]">Subtotal</p>
                        <p className="text-[16px] font-semibold text-[#232321]">${subtotal.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="text-[16px] font-semibold text-[#232321]">Tax (10%)</p>
                        <p className="text-[16px] font-semibold text-[#232321]">${tax.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="text-[16px] font-semibold text-[#232321]">Discount</p>
                        <p className="text-[16px] font-semibold text-[#232321]">${discount.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between mt-4">
                        <p className="font-rubik text-[24px] font-semibold text-[#232321]">Total</p>
                        <p className="font-rubik text-[24px] font-semibold text-[#232321]">${total.toFixed(2)}</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProductList;

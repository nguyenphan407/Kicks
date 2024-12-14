// src/components/Layout/OrderCard.jsx

import React from "react";
import PropTypes from "prop-types";

const OrderCard = ({ order }) => {
    // Hàm để render nút trạng thái đơn hàng với màu sắc tương ứng
    const renderStatusButton = () => {
        const statusColors = {
            pending: "bg-yellow-500",
            shipped: "bg-blue-500",
            delivered: "bg-green-500",
            canceled: "bg-red-500",
        };
        const color = statusColors[order.order_status] || "bg-gray-500";
        return (
            <button
                className={`font-rubik font-medium px-4 py-2 ${color} text-white rounded-lg`}
            >
                {order.order_status.charAt(0).toUpperCase() + order.order_status.slice(1)}
            </button>
        );
    };

    return (
        <div className="bg-white p-6 rounded-xl lg:rounded-2xl transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg">
            {/* Header đơn hàng */}
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-rubik font-medium text-lg lg:text-xl text-[#232321]">
                    Order #{order.order_id}
                </h3>
                {renderStatusButton()}
            </div>

            {/* Danh sách sản phẩm trong đơn hàng */}
            <div className="space-y-4">
                {order.items.map((item) => (
                    <div key={item.order_item_id} className="flex items-center gap-4">
                        <img
                            src={item.product_image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-md"
                        />
                        <div className="flex-1">
                            <p className="font-semibold">{item.name}</p>
                            <p className="text-sm text-gray-500 font-semibold">Size: {item.size}</p>
                            <p className="text-sm text-gray-500 font-semibold">Quantity: {item.quantity}</p>
                        </div>
                        <div className="font-semibold text-primary_blue">${item.price}</div>
                    </div>
                ))}
            </div>

            {/* Thông tin chi tiết đơn hàng */}
            <div className="mt-4 flex justify-between items-center">
                <div>
                    <p className="text-sm text-gray-500 font-semibold">Payment Status: {order.payment_status}</p>
                </div>
                <div>
                    <p className="text-[16px] lg:text-[20px] text-black font-medium font-rubik">Total Amount: <span className="text-primary_blue font-rubik font-semibold">${order.amount}</span></p>
                </div>
            </div>
        </div>
    );
};

OrderCard.propTypes = {
    order: PropTypes.shape({
        order_id: PropTypes.number.isRequired,
        order_status: PropTypes.string.isRequired,
        payment_status: PropTypes.string.isRequired,
        amount: PropTypes.string.isRequired,
        items: PropTypes.arrayOf(
            PropTypes.shape({
                order_item_id: PropTypes.number.isRequired,
                name: PropTypes.string.isRequired,
                size: PropTypes.number.isRequired,
                quantity: PropTypes.number.isRequired,
                product_image: PropTypes.string.isRequired,
                price: PropTypes.string.isRequired,
            })
        ).isRequired,
    }).isRequired,
};

export default OrderCard;

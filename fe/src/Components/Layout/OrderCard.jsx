// src/components/OrderCard.jsx
import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { images } from "../../assets/assets";

const OrderCard = ({ order }) => {
    const navigate = useNavigate();

    // Xử lý nút dựa trên trạng thái đơn hàng
    const renderButton = () => {
        switch (order.order_status) {
            case "pending":
                return (
                    <button
                        className="font-rubik font-medium ml-auto px-16 lg:px-24 py-2 bg-yellow-500 text-white flex justify-center items-center rounded-lg transform transition duration-400 hover:bg-yellow-600 hover:scale-[1.003] hover:text-white active:scale-[99%]"
                        onClick={() => navigate(`/orderdetail/${order.order_id}`)}
                    >
                        Pending
                    </button>
                );
            case "shipped":
                return (
                    <button
                        className="font-rubik font-medium ml-auto px-16 lg:px-24 py-2 bg-blue-500 text-white flex justify-center items-center rounded-lg transform transition duration-400 hover:bg-blue-600 hover:scale-[1.003] hover:text-white active:scale-[99%]"
                        onClick={() => navigate(`/orderdetail/${order.order_id}`)}
                    >
                        Shipped
                    </button>
                );
            case "delivered":
                return (
                    <button
                        className="font-rubik font-medium ml-auto px-16 lg:px-24 py-2 bg-green-500 text-white flex justify-center items-center rounded-lg transform transition duration-400 hover:bg-green-600 hover:scale-[1.003] hover:text-white active:scale-[99%]"
                        onClick={() => navigate(`/orderdetail/${order.order_id}`)}
                    >
                        Delivered
                    </button>
                );
            case "canceled":
                return (
                    <button
                        className="font-rubik font-medium ml-auto px-16 lg:px-24 py-2 bg-red-500 text-white flex justify-center items-center rounded-lg transform transition duration-400 hover:bg-red-600 hover:scale-[1.003] hover:text-white active:scale-[99%]"
                        onClick={() => navigate(`/orderdetail/${order.order_id}`)}
                    >
                        Canceled
                    </button>
                );
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col gap-2 p-6 border border-gray-200 rounded-lg bg-gray-50 relative">
            <h3 className="font-rubik font-semibold text-[16px] lg:text-[20px] uppercase text-[#232321]">
                {order.product_name}
            </h3>
            <div className="flex flex-row gap-6">
                <img
                    src={order.image || images.DefaultProductImage}
                    alt={order.product_name}
                    className="rounded-xl lg:rounded-3xl object-cover w-[80px] h-[80px] lg:h-[130px] lg:w-[130px] border border-[#e6e6e6]"
                />
                <div className="flex flex-col w-full">
                    <p className="text-[16px] lg:text-[20px] opacity-80 text-[#4e4e4c] font-semibold mb-2 lg:mb-2">
                        {order.description}
                    </p>
                    <p className="opacity-80 text-[#4e4e4c] text-[14px] lg:text-[18px] font-semibold">
                        Size {order.size} | Quantity {order.quantity}
                    </p>
                    <h4 className="font-rubik text-[16px] my-2 lg:my-0 lg:text-[20px] font-semibold text-primary_blue">
                        {order.price}
                    </h4>
                </div>
            </div>
            <div>
                {renderButton()}
            </div>
        </div>
    );
};

OrderCard.propTypes = {
    order: PropTypes.shape({
        order_id: PropTypes.number.isRequired,
        product_name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        size: PropTypes.string.isRequired,
        quantity: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
        image: PropTypes.string,
        order_status: PropTypes.string.isRequired,
    }).isRequired,
};

export default OrderCard;

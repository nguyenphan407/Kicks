/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from "react";
import orderApi from "../apis/orderApi"; // Import orderApi
import PropTypes from "prop-types";
import OrderCard from "../Components/Layout/OrderCard";
import HeroMini from "../Components/Layout/HeroMini"; // Giả sử bạn đã tạo component Hero
import { toast } from "react-toastify";

const OrdersPage = () => {
    const [activeTab, setActiveTab] = useState("pending");
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const statusLabels = {
        pending: "Pending",
        shipped: "Shipped",
        delivered: "Delivered",
        canceled: "Canceled",
    };

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await orderApi.getOrdersByStatus(activeTab);
                setOrders(response.data);
                // console.log("Fetched Orders:", response.data);
            } catch (err) {
                console.error("Error fetching orders:", err);
                setError("Failed to fetch orders.");
                toast.error("Không thể tải đơn hàng.");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [activeTab]);

    const renderContent = () => {
        if (loading) {
            return <div className="text-center text-gray-500">Loading...</div>;
        }

        if (error) {
            return <div className="text-center text-red-500">{error}</div>;
        }

        if (orders.length === 0) {
            return <div className="text-center text-gray-500">No orders found.</div>;
        }

        return (
            <div className="flex flex-col space-y-4">
                {orders.map((order) => (
                    <OrderCard key={order.order_id} order={order} />
                ))}
            </div>
        );
    };

    return (
        <div className="container mx-auto mt-5 mb-10 px-4">
            <div className="flex space-x-4 border-b border-gray-300">
                {Object.keys(statusLabels).map((status) => (
                    <button
                        key={status}
                        className={`py-2 px-4 ${
                            activeTab === status
                                ? "text-primary_blue border-b-2 border-primary_blue font-bold"
                                : "text-gray-500 hover:text-primary_blue"
                        }`}
                        onClick={() => setActiveTab(status)}
                    >
                        {statusLabels[status]}
                    </button>
                ))}
            </div>

            <div className="mt-6 flex flex-col lg:flex-row gap-6">
                {/* Nội dung các tab */}
                <div className="flex-1">
                    {renderContent()}
                </div>

                {/* Hero Section */}
                <div className="w-full lg:w-1/3 bg-white p-6 rounded-lg text-center">
                    <HeroMini />
                </div>
            </div>
        </div>
    );
};

export default OrdersPage;

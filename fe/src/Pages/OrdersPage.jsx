// src/pages/OrdersPage.jsx

import React, { useState, useEffect } from "react";
import orderApi from "../apis/orderApi";
import OrderCard from "../Components/Layout/OrderCard";
import HeroMini from "../Components/Layout/HeroMini";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
// import socket from "../libs/socket";

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

    // useEffect(() => {
    //     function onConnect() {
    //         console.log(socket.id)
    //     }
    
    //     function onDisconnect() {
    //         console.log('disconnect')
    //     }
    
    //     function onFooEvent(value) {

    //     }
    
    //     socket.on('connect', onConnect);
    //     socket.on('disconnect', onDisconnect);
    //     socket.on('foo', onFooEvent);
    
    //     return () => {
    //       socket.off('connect', onConnect);
    //       socket.off('disconnect', onDisconnect);
    //       socket.off('foo', onFooEvent);
    //     };
    //   }, []);

    const renderContent = () => {
        if (loading) {
            return (
                <div className="text-center font-rubik text-xl lg:text-3xl text-gray-500">
                    Loading...
                </div>
            );
        }

        if (error) {
            return <div className="text-center text-red-500">{error}</div>;
        }

        if (orders.length === 0) {
            return (
                <div className="text-center text-3xl text-gray-500">
                    No orders found.
                </div>
            );
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
        <div className="container mt-5 mb-10">
            <div className="flex space-x-2 lg:space-x-4 border-b border-gray-300 ">
                {Object.keys(statusLabels).map((status) => (
                    <button
                        key={status}
                        className={`py-2 px-2 lg:px-4 ${
                            activeTab === status
                                ? "text-primary_blue border-b-2 border-primary_blue text-[16px] font-medium lg:text-xl font-rubik"
                                : "text-gray-500 hover:text-primary_blue text-[16px] font-medium lg:text-xl font-rubik"
                        }`}
                        onClick={() => setActiveTab(status)}
                    >
                        {statusLabels[status]}
                    </button>
                ))}
            </div>

            <div className="mt-6 flex flex-col lg:flex-row gap-6">
                {/* Tab content */}
                <div className="flex-1">
                    <AnimatePresence mode="wait"> 
                        <motion.div
                            key={activeTab} 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            {renderContent()}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Hero Section */}
                <div className="w-full lg:w-1/3 bg-white p-6 rounded-xl lg:rounded-2xl text-center">
                    <HeroMini />
                </div>
            </div>
        </div>
    );
};

export default OrdersPage;

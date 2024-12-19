import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import Breadcrumbs from "../components/Features/Breadcrumbs";
import DateRangePicker from "../components/Features/DateRangePicker";
import DashboardCard from "../components/Cart/DashboardCard";
import { MyLineChart } from "../components/ui/MyLineChart";
import { images, icons } from "@/assets/assets";
import OrdersList from "@/components/Cart/OrdersList";
import { ShopConText } from "@/context/ShopContext";
import orderApi from "@/apis/orderApi";
import { getTopProducts, getReport } from "@/apis/reportApi";
import { format, parseISO } from "date-fns";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
    const breadcrumbs = [{ label: "Home", link: "/" }, { label: "Dashboard" }];
    const [ordersData, setOrdersData] = useState([]);
    const [dateRange, setDateRange] = useState({
        startDate: new Date(),
        endDate: new Date(),
    });
    const [statisticsData, setStatisticsData] = useState([]);
    const [topProducts, setTopProducts] = useState([]);
    const [reportData, setReportData] = useState(null);
    const { handleCategoryChange } = useContext(ShopConText);
    const navigate = useNavigate();

    const handleDateChange = (range) => {
        setDateRange(range);
    };

    const formatDate = (date) => format(date, "dd-MM-yyyy");

    useEffect(() => {
        const fetchOrderData = async () => {
            try {
                const response = await orderApi.getAll();
                if (Array.isArray(response.data) && response.data.length > 0) {
                    const formattedOrders = response.data.map((order) => ({
                        ...order,
                        created_at: format(parseISO(order.created_at), "MMM dd'th', yyyy"),
                    }));
                    setOrdersData(formattedOrders);
                }
            } catch (error) {
                toast.error("Failed to fetch order data!");
            }
        };
        fetchOrderData();
    }, []);

    // Hàm để gọi API Top Products và Report
    useEffect(() => {
        const fetchDashboardData = async () => {
            if (dateRange.startDate && dateRange.endDate) {
                const fromDate = formatDate(dateRange.startDate);
                const toDate = formatDate(dateRange.endDate);
                try {
                    // Gọi API Top Products
                    const topProductsResponse = await getTopProducts({ fromDate, toDate });
                    setTopProducts(topProductsResponse.data);

                    // Gọi API Report
                    const reportResponse = await getReport({ fromDate, toDate });
                    setReportData(reportResponse.data);

                    // Cập nhật statisticsData dựa trên reportData
                    const { now, percent } = reportResponse.data;
                    setStatisticsData([
                        {
                            id: 1,
                            title: "Total Revenue",
                            amount: `${parseFloat(now[0] || 0).toFixed(2)}`,
                            percentage: percent[0] || 0,
                            description: "Compared to previous period",
                        },
                        {
                            id: 2,
                            title: "Total Orders",
                            amount: `${parseFloat(now[1] || 0).toFixed(2)}`,
                            percentage: percent[1] || 0,
                            description: "Compared to previous period",
                        },
                        {
                            id: 3,
                            title: "Total Products Sold",
                            amount: `${parseFloat(now[2] || 0).toFixed(2)}`,
                            percentage: percent[2] || 0,
                            description: "Compared to previous period",
                        },
                    ]);
                } catch (error) {
                    toast.error("Failed to fetch dashboard data!");
                }
            }
        };

        // Gọi hàm fetchDashboardData khi component render lần đầu
        fetchDashboardData();
    }, [dateRange]);

    // Framer Motion Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col gap-6 mb-8"
        >
            {/* Title */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex justify-between relative items-end"
            >
                <div>
                    <h1 className="font-rubik text-[24px] font-semibold text-black mb-1">
                        Dashboard
                    </h1>
                    <Breadcrumbs items={breadcrumbs} />
                </div>
                <div>
                    <DateRangePicker onDateChange={handleDateChange} />
                </div>
            </motion.div>

            {/* Statistics Component */}
            <motion.section
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="grid grid-cols-3 gap-[14px]"
            >
                {statisticsData.map((item) => (
                    <motion.div key={item.id} variants={itemVariants}>
                        <DashboardCard
                            title={item.title}
                            amount={item.amount}
                            percentage={item.percentage}
                            description={item.description}
                        />
                    </motion.div>
                ))}
            </motion.section>

            {/* Chart and Top Products */}
            <motion.section
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="grid grid-cols-3 gap-[14px]"
            >
                <motion.div className="col-span-2" variants={itemVariants}>
                    <MyLineChart data={reportData} />
                </motion.div>
                <motion.div
                    className="px-4 py-6 bg-white rounded-[16px] flex flex-col gap-4"
                    variants={itemVariants}
                >
                    <div className="flex justify-between items-center pb-5 border-b border-black">
                        <h3 className="font-rubik font-semibold text-xl">
                            Best Sellers
                        </h3>
                        <button className="w-6 h-6 rounded-[4px] bg-transparent hover:bg-gray-300 transition-all">
                            <img src={icons.DotsThreeIcon} alt="dots three icon" />
                        </button>
                    </div>
                    {topProducts.map((product, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between hover:bg-gray-200 rounded-[8px] cursor-pointer"
                        >
                            <div className="flex items-center space-x-4">
                                <img
                                    src={product.product_image || images.Thumbnails[0]}
                                    alt={product.name}
                                    className="w-16 h-16 rounded-[8px]"
                                />
                                <div className="flex flex-col gap-1">
                                    <p className="text-[16px] font-semibold text-black">
                                        {product.name}
                                    </p>
                                    <p className="text-[14px] text-[#646464] font-semibold">
                                        ${parseFloat(product.price).toFixed(2)}
                                    </p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-rubik text-[16px] font-semibold">
                                    ${parseFloat(product.revenue).toFixed(2)}
                                </p>
                                <p className="text-[14px] text-[#646464] font-semibold">
                                    {product.total_quantity} sold
                                </p>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </motion.section>

            {/* Orders List */}
            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <OrdersList orders={ordersData} />
            </motion.section>
        </motion.div>
    );
};

export default Dashboard;

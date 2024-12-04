import React, { useState, useEffect, useContext } from "react";
import Breadcrumbs from "../components/Features/Breadcrumbs";
import DateRangePicker from "../components/Features/DateRangePicker";
import DashboardCard from "../components/Cart/DashboardCard";
import { MyLineChart } from "../components/ui/MyLineChart";
import { images, icons } from "@/assets/assets";
import OrdersList from "@/components/Cart/OrdersList";
import { ShopConText } from "@/context/ShopContext";
import orderApi from "@/apis/orderApi";
import { format, parseISO } from "date-fns";

const Dashboard = () => {
    const breadcrumbs = [{ label: "Home", link: "/" }, { label: "Dashboard" }];
    const [ordersData, setOrdersData] = useState([])
    const [dateRange, setDateRange] = useState({
        startDate: null,
        endDate: null,
    });
    const statisticsData = [
        {
            id: 1, // Thêm id
            title: "Total Orders",
            amount: "126.500",
            percentage: -34.7,
            description: "Compared to Jan 2024",
        },
        {
            id: 2,
            title: "Active Orders",
            amount: "98.300",
            percentage: 22.4,
            description: "Compared to Jan 2024",
        },
        {
            id: 3,
            title: "Shipped Orders",
            amount: "65.200",
            percentage: 15.3,
            description: "Compared to Jan 2024",
        },
    ];

    const bestSellerData = [
        {
            id: 1,
            product_name: "Adidas Ultra boost",
            price: 126,
            total_sale: 4807,
            total_items: 38,
            image: images.Thumbnails[0],
        },
        {
            id: 2,
            product_name: "Adidas Ultra boost",
            price: 126,
            total_sale: 4807,
            total_items: 38,
            image: images.Thumbnails[1],
        },
        {
            id: 3,
            product_name: "Adidas Ultra boost",
            price: 126,
            total_sale: 4807,
            total_items: 38,
            image: images.Thumbnails[2],
        },
    ];


    const { handleCategoryChange } = useContext(ShopConText);

    const handleDateChange = (range) => {
        setDateRange(range);
        console.log("Selected Date Range:", range);
    };

    useEffect(() => {
        const fetchOrderData = async () => {
           try {
              const response = await orderApi.getAll();
              console.log("Fetched Order Data:", response.data);
              if (Array.isArray(response.data) && response.data.length > 0) {
                 const formattedOrders = response.data.map((order) => {
                    return {
                      ...order,
                      created_at: format(parseISO(order.created_at), "MMM dd'th', yyyy"),
                    };
                  });
                  setOrdersData(formattedOrders);
              } else {
                 console.error("No order data found for the given orderId.");
              }
           } catch (error) {
              console.error("Error fetching order data:", error);
           }
        };
        fetchOrderData();
     }, []);
    // Cuộn lên đầu trang khi trang thay đổi
    useEffect(() => {
        window.scrollTo(0, 0);
    });

    return (
        <div className="flex flex-col gap-6 mb-8">
            {/* Title */}
            <div className="flex justify-between relative items-end">
                <div>
                    <h1 className="font-rubik text-[24px] font-semibold text-black mb-1">
                        Dashboard
                    </h1>
                    <Breadcrumbs items={breadcrumbs} />
                </div>
                <div className="z-0">
                    <DateRangePicker onDateChange={handleDateChange} />
                </div>
            </div>
            {/* Statistics component  */}
            <section className="grid grid-cols-3 gap-[14px]">
                {statisticsData.map((item) => (
                    <DashboardCard
                        key={item.id}
                        title={item.title}
                        amount={item.amount}
                        percentage={item.percentage}
                        description={item.description}
                    />
                ))}
            </section>
            <section className="grid grid-cols-3 gap-[14px]">
                <div className="col-span-2 ">
                    <MyLineChart />
                </div>
                <div className="px-4 py-6 bg-white rounded-[16px] flex flex-col gap-4">
                    <div className="flex justify-between items-center pb-5 border-b border-black">
                        <h3 className="font-rubik font-semibold text-xl">
                            Best Sellers
                        </h3>
                        <button className="w-6 h-6 rounded-[4px] bg-transparent hover:bg-gray-300 transition-all">
                            <img
                                src={icons.DotsThreeIcon}
                                alt="dots three icon"
                            />
                        </button>
                    </div>
                    {bestSellerData.map((product) => (
                        <div
                            key={product.id}
                            className="flex items-center justify-between hover:bg-gray-200 rounded-[8px] cursor-pointer"
                        >
                            <div className="flex items-center space-x-4">
                                {/* Hình ảnh */}
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-16 h-16 rounded-[8px]"
                                />
                                {/* Tên và giá */}
                                <div className="flex flex-col gap-1">
                                    <p className="text-[16px] font-semibold text-black">
                                        {product.product_name}
                                    </p>
                                    <p className="text-[14px] text-[#646464] font-semibold">
                                        ${product.price.toFixed(2)}
                                    </p>
                                </div>
                            </div>
                            {/* Giá và số lượng bán */}
                            <div className="text-right">
                                <p className="font-rubik text-[16px] font-semibold">
                                    ${product.price.toFixed(2)}
                                </p>
                                <p className="text-[14px] text-[#646464] font-semibold">
                                    {product.total_items} sales
                                </p>
                            </div>
                        </div>
                    ))}
                    {/* Nút Report */}
                    <div className="text-left">
                        <button
                            className="font-rubik text-[14px] font-medium px-4 py-[11.5px] bg-black text-white rounded-[8px] text-center 
                        transform transition duration-400 hover:bg-[#4A69E2] uppercase hover:scale-[1.005] hover:text-white"
                        >
                            REPORT
                        </button>
                    </div>
                </div>
            </section>
            <section>
                <OrdersList orders={ordersData} />
            </section>
        </div>
    );
};

export default Dashboard;

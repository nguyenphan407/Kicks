import React, { useState } from "react";
import Breadcrumbs from "../components/Features/Breadcrumbs";
import DateRangePicker from "../components/Features/DateRangePicker";
import DashboardCard from "../components/Cart/DashboardCard";
import { MyLineChart } from "../components/ui/MyLineChart";
import { images, icons } from "@/assets/assets";
import OrdersList from "@/components/Cart/OrdersList";


const Dashboard = () => {
    const breadcrumbs = [{ label: "Home", link: "/" }, { label: "Dashboard" }];
    const [dateRange, setDateRange] = useState({
        startDate: null,
        endDate: null,
    });

    const handleDateChange = (range) => {
        setDateRange(range);
        console.log("Selected Date Range:", range);
    };

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

    const ordersData = [
        {
            id: 1,
            product: "Adidas Ultra boost",
            orderId: "#25426",
            date: "Jan 8th, 2022",
            paymentMethod: "Cash",
            customer: "Leo Gouse",
            customerAvatar: images.Thumbnails[0],
            status: "Delivered",
            amount: 200.0,
        },
        {
            id: 2,
            product: "Adidas Ultra boost",
            orderId: "#25425",
            date: "Jan 7th, 2022",
            paymentMethod: "Cash",
            customer: "Jaxson Korsgaard",
            customerAvatar: images.Thumbnails[0],
            status: "Canceled",
            amount: 200.0,
        },
        {
            id: 3,
            product: "Adidas Ultra boost",
            orderId: "#25424",
            date: "Jan 6th, 2022",
            paymentMethod: "Cash",
            customer: "Talan Botosh",
            customerAvatar: images.Thumbnails[0],
            status: "Delivered",
            amount: 200.0,
        },
        {
            id: 4,
            product: "Adidas Ultra boost",
            orderId: "#25423",
            date: "Jan 5th, 2022",
            paymentMethod: "Cash",
            customer: "Ryan Philips",
            customerAvatar: images.Thumbnails[0],
            status: "Canceled",
            amount: 200.0,
        },
        {
            id: 5,
            product: "Adidas Ultra boost",
            orderId: "#25422",
            date: "Jan 4th, 2022",
            paymentMethod: "Cash",
            customer: "Emerson Baptista",
            customerAvatar: images.Thumbnails[0],
            status: "Delivered",
            amount: 200.0,
        },
        {
            id: 6,
            product: "Adidas Ultra boost",
            orderId: "#25422",
            date: "Jan 4th, 2022",
            paymentMethod: "Cash",
            customer: "Emerson Baptista",
            customerAvatar: images.Thumbnails[0],
            status: "Delivered",
            amount: 200.0,
        },
    ];

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
                <div
                    className="px-4 py-6 bg-white rounded-[16px] flex flex-col gap-4
                transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-md "
                >
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

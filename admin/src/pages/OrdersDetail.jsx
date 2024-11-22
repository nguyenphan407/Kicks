import React, { useState } from "react";
import Breadcrumbs from "../components/Features/Breadcrumbs";
import DateRangePicker from "../components/Features/DateRangePicker";
import { icons } from "../assets/assets";

const OrdersDetail = () => {
    const breadcrumbs = [
        { label: "Home", link: "/" },
        { label: "Order List", link: "/orderlist" },
        { label: "Order Detail" },
    ];
    const [dateRange, setDateRange] = useState({
        startDate: null,
        endDate: null,
    });

    const handleDateChange = (range) => {
        setDateRange(range);
        console.log("Selected Date Range:", range);
    };
    // State cho Status
    const [selected, setSelected] = useState("pending");
    const [isOpen, setIsOpen] = useState(false);
    const options = ["Pending", "Shipped", "Delivered", "Canceled"];

    const Order = [
        {
            orderId: 6743,
            orderStatus: "pending",
            orderDate: "2022-02-16",
            shippingDate: "2022-02-20",
            customer: {
                customer_id: 1,
                name: "Jane Cooper",
                email: "janecooper@gmail.com",
                phone: "+900 231 1212",
            },
            shippingAddress: {
                address:
                    "Santa Ana, Illinois 85342 2345 Westheimer Rd. Block 9A",
            },
            payment: {
                method: "Paypal",
                card: {
                    type: "MasterCard",
                    last4: "6557",
                },
            },
            items: [
                {
                    productId: 123,
                    productName: "Adidas ultra boost",
                    quantity: 2,
                    price: 800.4,
                },
                // ...
            ],
            totalAmount: 3841.92,
        },
    ];

    return (
        <div>
            {/* Title */}
            <div className="flex justify-between relative items-end">
                <div>
                    <h1 className="font-rubik text-[24px] font-semibold text-black mb-1">
                        Order List
                    </h1>
                    <Breadcrumbs items={breadcrumbs} />
                </div>
            </div>
            <section className="px-4 py-6 rounded-[16px] bg-white my-6">
                <div>
                    <h3 className="text-start font-rubik text-[20px] font-semibold text-[#232321] mb-2">
                        Orders ID: #6743
                    </h3>
                    <div className="flex justify-between">
                        <DateRangePicker onDateChange={handleDateChange} />
                        <div className="flex justify-between gap-5">
                            {/* Change status */}
                            <section className="flex ml-auto justify-end">
                                <div className="relative items-center z-0">
                                    <button
                                        onClick={() => setIsOpen(!isOpen)}
                                        className="flex items-center justify-between bg-[#F4F2F2] p-4 font-semibold rounded-[8px] w-[220px] text-[#232321] text-[14px] 
                        hover:bg-[#cccccc] transition-all duration-150 ease-in-out active:scale-[97%]"
                                    >
                                        <span>Change Status</span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 25"
                                            fill="none"
                                            className="w-5 h-5 ml-2"
                                        >
                                            <path
                                                d="M5.25 9.5L12 16.25L18.75 9.5"
                                                stroke="#232321"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </button>
                                    {isOpen && (
                                        <ul className="absolute bg-[#F4F2F2] text-secondary_black w-[220px] mt-[10px] rounded-[8px] flex flex-col shadow-2xl">
                                            {options.map((option, index) => (
                                                <li
                                                    key={index}
                                                    onClick={() => {
                                                        setSelected(option);
                                                        setIsOpen(false);
                                                    }}
                                                    className="px-4 py-2  hover:bg-[#d0d0d0] cursor-pointer text-[14px] font-semibold flex items-center justify-between"
                                                >
                                                    {option}
                                                    {selected === option && (
                                                        <img
                                                            src={
                                                                icons.RoundCheckIcon
                                                            }
                                                            alt="Selected"
                                                            className="w-4 h-4 ml-2"
                                                        />
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </section>
                            <button className="bg-[#F4F2F2] p-4 rounded-[8px] hover:bg-[#cccccc] transition-all duration-150 ease-in-out active:scale-[95%]">
                                <img src={icons.PrintIcon} alt="" />
                            </button>
                            <button className="bg-[#F4F2F2] p-4 rounded-[8px] hover:bg-[#cccccc] transition-all duration-150 ease-in-out active:scale-[95%]">
                                <p className="font-semibold text-[14px] ">
                                    Save
                                </p>
                            </button>
                        </div>
                    </div>
                </div>
                <section></section>
            </section>
        </div>
    );
};

export default OrdersDetail;

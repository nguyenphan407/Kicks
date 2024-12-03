import React, { useState, useEffect } from "react";
import Breadcrumbs from "../components/Features/Breadcrumbs";
import DateRangePicker from "../components/Features/DateRangePicker";
import { icons, images } from "../assets/assets";
import OrdersList from "@/components/Cart/OrdersList";

const OrdersListPage = () => {
   const breadcrumbs = [{ label: "Home", link: "/" }, { label: "Order List" }];
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

   const ordersData = [
      {
         id: 21000,
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
         id: 67910,
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
         id: 581639,
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
         id: 909167,
         product: "Adidas Ultra boost",
         orderId: "#25423",
         date: "Jan 5th, 2022",
         paymentMethod: "Cash",
         customer: "Ryan Philips",
         customerAvatar: images.Thumbnails[0],
         status: "Canceled",
         amount: 200.0,
      },
   ];

   // Cuộn lên đầu trang khi trang thay đổi
   useEffect(() => {
      window.scrollTo(0, 0);
   });

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
            <div className="z-0">
               <DateRangePicker onDateChange={handleDateChange} />
            </div>
         </div>
         {/* Sidebar Sort */}
         <section className="flex ml-auto justify-end my-6">
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
                                 src={icons.RoundCheckIcon}
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
         <section>
            <OrdersList orders={ordersData} />
         </section>
      </div>
   );
};

export default OrdersListPage;

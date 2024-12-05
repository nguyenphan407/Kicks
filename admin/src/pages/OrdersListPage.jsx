import React, { useState, useEffect } from "react";
import Breadcrumbs from "../components/Features/Breadcrumbs";
import DateRangePicker from "../components/Features/DateRangePicker";
import { icons, images } from "../assets/assets";
import OrdersList from "@/components/Cart/OrdersList";
import orderApi from "@/apis/orderApi";
import { format, parseISO } from "date-fns";

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
   const [ordersData, setOrdersData] = useState([]);
   const [loading, setLoading] = useState(true);

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
            setLoading(false);
         } catch (error) {
            console.error("Error fetching order data:", error);
            setLoading(false);
         }
      };
      fetchOrderData();
   }, []);

   // Cuộn lên đầu trang khi trang thay đổi
   useEffect(() => {
      window.scrollTo(0, 0);
   });
   if (loading) {
      return (
         <div className="font-rubik text-4xl flex items-center justify-center">
            Loading...
         </div>
      );
   }

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

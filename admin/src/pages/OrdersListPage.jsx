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
         </section>
         <section>
            <OrdersList orders={ordersData} />
         </section>
      </div>
   );
};

export default OrdersListPage;

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
               const formattedOrders = response.data.map((order) => ({
                  ...order,
                  created_at: format(parseISO(order.created_at), "MMM dd'th', yyyy"),
               }));
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

   useEffect(() => {
      window.scrollTo(0, 0);
   });

   // Framer Motion Variants
   const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
         opacity: 1,
         transition: {
            staggerChildren: 0.1,
         },
      },
   };

   const itemVariants = {
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
   };

   if (loading) {
      return (
         <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-rubik text-4xl flex items-center justify-center"
         >
            Loading...
         </motion.div>
      );
   }

   return (
      <div>
         {/* Title */}
         <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-between relative items-end"
         >
            <div>
               <h1 className="font-rubik text-[24px] font-semibold text-black mb-1">
                  Order List
               </h1>
               <Breadcrumbs items={breadcrumbs} />
            </div>
            <div className="z-0">
               <DateRangePicker onDateChange={handleDateChange} />
            </div>
         </motion.div>

         {/* Sidebar Sort */}
         <motion.section
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex ml-auto justify-end my-6"
         ></motion.section>

         {/* Orders List */}
         <motion.section
            initial="hidden"
            animate="visible"
            variants={containerVariants}
         >
            <motion.div variants={itemVariants}>
               <OrdersList orders={ordersData} />
            </motion.div>
         </motion.section>
      </div>
   );
};

export default OrdersListPage;

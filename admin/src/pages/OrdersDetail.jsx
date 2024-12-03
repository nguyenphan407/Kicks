import React, { useState, useEffect } from "react";
import Breadcrumbs from "../components/Features/Breadcrumbs";
import DateRangePicker from "../components/Features/DateRangePicker";
import { icons } from "../assets/assets";
import ProductList from "@/components/Cart/ProductsList";
import { useParams, useNavigate } from "react-router-dom";
import orderApi from "../apis/orderApi";

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
   const { orderId } = useParams(); // lấy cái id
   const [loading, setLoading] = useState(true);

   const handleDateChange = (range) => {
      setDateRange(range);
      console.log("Selected Date Range:", range);
   };
   // State cho Status
   const [selected, setSelected] = useState("pending");
   const [isOpen, setIsOpen] = useState(false);
   const options = ["Pending", "Shipped", "Delivered", "Canceled"];
   const [orderData, setOrderData] = useState(null); // Khởi tạo với null để dễ kiểm tra

   useEffect(() => {
      if (orderId) {
         const fetchOrderData = async () => {
            try {
               console.log("Fetching order data for Order ID:", orderId);
               const response = await orderApi.get(orderId);
               console.log("Fetched Order Data:", response.data);
               if (Array.isArray(response.data) && response.data.length > 0) {
                  setOrderData(response.data[0]); // Thiết lập đối tượng đơn từ mảng
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
      }
   }, [orderId]); // useEffect sẽ chạy lại mỗi khi orderId thay đổi

   if (loading) {
      return (
         <div className="font-rubik text-4xl flex items-center justify-center">
            Loading...
         </div>
      );
   }

   if (!orderData) {
      return (
         <div className="font-rubik text-4xl flex items-center justify-center">
            No Order Data Available.
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
         </div>
         <section className="px-4 py-6 rounded-[16px] bg-white my-6">
            <div>
               <h3 className="text-start font-rubik text-[20px] font-semibold text-[#232321] mb-2">
                  Orders ID: #{orderData.order_id}
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
                     <button className="bg-[#F4F2F2] p-4 rounded-[8px] hover:bg-[#cccccc] transition-all duration-150 ease-in-out active:scale-[95%]">
                        <img src={icons.PrintIcon} alt="" />
                     </button>
                     <button className="bg-[#F4F2F2] p-4 rounded-[8px] hover:bg-[#cccccc] transition-all duration-150 ease-in-out active:scale-[95%]">
                        <p className="font-semibold text-[14px] ">Save</p>
                     </button>
                  </div>
               </div>
            </div>
            <section className="flex gap-4 my-6">
               <section className="flex-1 rounded-2xl bg-white p-4 border border-[#E7E7E3] flex flex-col justify-between gap-4">
                  <div className="flex gap-4">
                     <div className="p-4 rounded-[8px] bg-[#4A69E2] w-[56px] h-[56px]">
                        <img src={icons.CustomerIcon} alt="Customer Icon" />
                     </div>
                     <div className="flex flex-col gap-2">
                        <p className="font-rubik text-[20px] font-semibold">
                           Customer
                        </p>
                        <p className="text-[16px] font-semibold text-[#70706E]">
                           Full Name: {orderData.customer.first_name}{" "}
                           {orderData.customer.last_name}
                        </p>
                        <p className="text-[16px] font-semibold text-[#70706E]">
                           Email: {orderData.customer.email}
                        </p>
                        <p className="text-[16px] font-semibold text-[#70706E]">
                           Phone: {orderData.customer.phone_number || "N/A"}
                        </p>
                     </div>
                  </div>
                  <button
                     className="hover:opacity-90 bg-[#232321] rounded-[8px] w-full text-white font-inter text-[14px] font-medium px-4 py-2
                        transition-all duration-150 ease-in-out active:scale-[98%]"
                  >
                     View profile
                  </button>
               </section>
               <section className="flex-1 rounded-2xl bg-white p-4 border border-[#E7E7E3] flex flex-col justify-between gap-4">
                  <div className="flex gap-4">
                     <div className="p-4 rounded-[8px] bg-[#4A69E2] w-[56px] h-[56px]">
                        <img
                           src={icons.BagHandleIcon}
                           alt="Bag Handle Icon"
                           className=""
                        />
                     </div>
                     <div className="flex flex-col gap-2">
                        <p className="font-rubik text-[20px] font-semibold">
                           Order Info
                        </p>
                        <p className="text-[16px] font-semibold text-[#70706E]">
                           Shipping: {orderData["orders.shipping"] || "N/A"}
                        </p>
                        <p className="text-[16px] font-semibold text-[#70706E]">
                           Payment Method:{" "}
                           {orderData.payment.payment_method || "N/A"}
                        </p>
                        <p className="text-[16px] font-semibold text-[#70706E]">
                           Status: {orderData.order_status || "N/A"}
                        </p>
                     </div>
                  </div>
                  <button
                     className="hover:opacity-90 bg-[#232321] rounded-[8px] w-full text-white font-inter text-[14px] font-medium px-4 py-2
                        transition-all duration-150 ease-in-out active:scale-[98%]"
                  >
                     Download info
                  </button>
               </section>
               <section className="flex-1 rounded-2xl bg-white p-4 border border-[#E7E7E3] flex flex-col justify-between gap-4">
                  <div className="flex gap-4">
                     <div className="p-4 rounded-[8px] bg-[#4A69E2] w-[56px] h-[56px]">
                        <img src={icons.BagHandleIcon} alt="Bag Handle Icon" />
                     </div>
                     <div className="flex flex-col gap-2">
                        <p className="font-rubik text-[20px] font-semibold">
                           Deliver to
                        </p>
                        <p className="text-[16px] font-semibold text-[#70706E]">
                           Address: {orderData.shipping_address || "N/A"}
                        </p>
                        <p className="text-[16px] font-semibold text-[#70706E]">
                           85342 2345 Westheimer Rd.
                        </p>
                        <p className="text-[16px] font-semibold text-[#70706E]">
                           Block 9A
                        </p>
                     </div>
                  </div>
                  <button
                     className="hover:opacity-90 bg-[#232321] rounded-[8px] w-full text-white font-inter text-[14px] font-medium px-4 py-2
                        transition-all duration-150 ease-in-out active:scale-[98%]"
                  >
                     View profile
                  </button>
               </section>
            </section>
            <section className="grid grid-cols-[1fr_2fr] gap-4">
               <section className="flex-1 rounded-2xl bg-white p-4 border border-[#E7E7E3] flex flex-col gap-4">
                  <div className="flex flex-col gap-4">
                     <p className="font-rubik text-[20px] font-semibold">
                        Payment Info
                     </p>
                     <div className="flex flex-col gap-2">
                        <div className="flex gap-2">
                           <img src={icons.PayIcon} alt="Pay Icon" />
                           <p className="text-[16px] font-semibold text-[#70706E]">
                              Full Name: {orderData.customer.first_name}{" "}
                              {orderData.customer.last_name}
                           </p>
                        </div>

                        <p className="text-[16px] font-semibold text-[#70706E]">
                           Email: {orderData.customer.email}
                        </p>
                        <p className="text-[16px] font-semibold text-[#70706E]">
                           Phone: {orderData.customer.phone_number || "N/A"}
                        </p>
                     </div>
                  </div>
               </section>
               <section className="flex-1 rounded-2xl bg-white flex flex-col">
                  <p className="font-rubik text-[20px] font-semibold mb-[10px]">
                     Note
                  </p>
                  <textarea
                     name=""
                     id=""
                     className="p-4 border h-full rounded-[16px] outline-none border-[#E7E7E3] font-medium"
                     placeholder="Type some notes"
                  ></textarea>
               </section>
            </section>
         </section>
         <section>
            <ProductList
               products={
                  orderData.order_items?.map((item) => ({
                     id: item.order_item_id,
                     product_name: item.name,
                     order_id: `#${orderData.order_id}`,
                     quantity: item.quantity,
                     total: parseFloat(item.price) * item.quantity,
                  })) || []
               }
               taxRate={0.1} // 10%
               discount={0} // Hoặc lấy từ dữ liệu
            />
         </section>
      </div>
   );
};

export default OrdersDetail;

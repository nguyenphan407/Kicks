import React, { useState } from "react";
import Breadcrumbs from "../components/Features/Breadcrumbs";
import DateRangePicker from "../components/Features/DateRangePicker";
import { icons } from "../assets/assets";
import ProductList from "@/components/Cart/ProductsList";

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

   const products = [
      {
         id: 1,
         product_name: "Adidas Ultra boost",
         order_id: "#25425",
         quantity: 2,
         total: 220,
      },
      {
         id: 2,
         product_name: "Adidas Ultra boost",
         order_id: "#25425",
         quantity: 2,
         total: 220,
      },
      {
         id: 3,
         product_name: "Adidas Ultra boost",
         order_id: "#25425",
         quantity: 2,
         total: 220,
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
               <section className="flex-1 rounded-2xl bg-white p-4 border border-[#E7E7E3] flex flex-col gap-4">
                  <div className="flex gap-4">
                     <div className="p-4 rounded-[8px] bg-[#4A69E2] w-[56px] h-[56px]">
                        <img src={icons.CustomerIcon} alt="" />
                     </div>
                     <div className="flex flex-col gap-2">
                        <p className="font-rubik text-[20px] font-semibold">
                           Customer
                        </p>
                        <p className="text-[16px] font-semibold text-[#70706E]">
                           Full Name: Jane Cooper
                        </p>
                        <p className="text-[16px] font-semibold text-[#70706E]">
                           Email: janecooper@gmail.com
                        </p>
                        <p className="text-[16px] font-semibold text-[#70706E]">
                           Phone: +900 231 1212
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
               <section className="flex-1 rounded-2xl bg-white p-4 border border-[#E7E7E3] flex flex-col gap-4">
                  <div className="flex gap-4">
                     <div className="p-4 rounded-[8px] bg-[#4A69E2] w-[56px] h-[56px]">
                        <img src={icons.BagHandleIcon} alt="" className="" />
                     </div>
                     <div className="flex flex-col gap-2">
                        <p className="font-rubik text-[20px] font-semibold">
                           Order Info
                        </p>
                        <p className="text-[16px] font-semibold text-[#70706E]">
                           Shipping: Next express
                        </p>
                        <p className="text-[16px] font-semibold text-[#70706E]">
                           Payment Method: Paypal
                        </p>
                        <p className="text-[16px] font-semibold text-[#70706E]">
                           Status: Pending
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
               <section className="flex-1 rounded-2xl bg-white p-4 border border-[#E7E7E3] flex flex-col gap-4">
                  <div className="flex gap-4">
                     <div className="p-4 rounded-[8px] bg-[#4A69E2] w-[56px] h-[56px]">
                        <img src={icons.BagHandleIcon} alt="" />
                     </div>
                     <div className="flex flex-col gap-2">
                        <p className="font-rubik text-[20px] font-semibold">
                           Deliver to
                        </p>
                        <p className="text-[16px] font-semibold text-[#70706E]">
                           Address: Santa Ana, illinois
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
                           <img src={icons.PayIcon} alt="" />
                           <p className="text-[16px] font-semibold text-[#70706E]">
                              Full Name: Jane Cooper
                           </p>
                        </div>

                        <p className="text-[16px] font-semibold text-[#70706E]">
                           Email: janecooper@gmail.com
                        </p>
                        <p className="text-[16px] font-semibold text-[#70706E]">
                           Phone: +900 231 1212
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
         <section >
            <ProductList products={products} />
         </section>
      </div>
   );
};

export default OrdersDetail;

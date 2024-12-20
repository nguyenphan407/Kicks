// OrdersDetail.js
import React, { useState, useEffect } from "react";
import Breadcrumbs from "../components/Features/Breadcrumbs";
import DateRangePicker from "../components/Features/DateRangePicker";
import { icons } from "../assets/assets";
import ProductList from "@/components/Cart/ProductsList";
import { useParams, useNavigate } from "react-router-dom";
import orderApi from "../apis/orderApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OrdersDetail = () => {
   const breadcrumbs = [
      { label: "Home", link: "/" },
      { label: "Order List", link: "/orderlist" },
      { label: "Order Detail" },
   ];

   const handlePrintInvoice = () => {
      if (orderData.payment_status === "paid") {
         const doc = new jsPDF();

         // Thêm thông tin hóa đơn vào PDF
         doc.text(`Invoice for Order #${orderData.order_id}`, 20, 20);
         doc.text(
            `Customer: ${orderData.customer.first_name} ${orderData.customer.last_name}`,
            20,
            30
         );
         doc.text(`Email: ${orderData.customer.email}`, 20, 40);
         doc.text(`Phone: ${orderData.customer.phone_number || "N/A"}`, 20, 50);
         doc.text(`Shipping Address: ${orderData.shipping_address}`, 20, 60);
         doc.text(`Order Status: ${orderData.order_status}`, 20, 70);
         doc.text(`Payment Status: ${orderData.payment_status}`, 20, 80);

         let yPosition = 90;
         doc.text("Items:", 20, yPosition);
         orderData.products.forEach((product, index) => {
            yPosition += 10;
            doc.text(`${product.name} - $${product.price}`, 20, yPosition);
         });

         // Lưu hóa đơn dưới dạng PDF
         doc.save(`invoice_order_${orderData.order_id}.pdf`);
      } else {
         toast.error("Order is not paid yet!");
      }
   };

   const [dateRange, setDateRange] = useState({
      startDate: null,
      endDate: null,
   });

   const { orderId } = useParams(); // Lấy orderId từ URL
   const [loading, setLoading] = useState(true);

   const handleDateChange = (range) => {
      setDateRange(range);
      console.log("Selected Date Range:", range);
   };

   // State cho Order Status
   const [selected, setSelected] = useState("pending");
   const [isOpen, setIsOpen] = useState(false);
   const options = ["Pending", "Shipped", "Delivered", "Canceled"];

   // State cho Payment Status
   const [paymentSelected, setPaymentSelected] = useState("unpaid");
   const [paymentIsOpen, setPaymentIsOpen] = useState(false);
   const paymentOptions = ["Paid", "Failed", "Pending"];

   const [orderData, setOrderData] = useState(null); // Khởi tạo với null để dễ kiểm tra

   const navigate = useNavigate();

   useEffect(() => {
      if (orderId) {
         const fetchOrderData = async () => {
            try {
               console.log("Fetching order data for Order ID:", orderId);
               const response = await orderApi.get(orderId);
               console.log("Fetched Order Data:", response.data);
               if (Array.isArray(response.data) && response.data.length > 0) {
                  setOrderData(response.data[0]); // Thiết lập đối tượng đơn từ mảng
                  setSelected(response.data[0].order_status); // Đặt trạng thái đã chọn dựa trên dữ liệu
                  setPaymentSelected(response.data[0].payment_status); // Đặt trạng thái thanh toán
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

   // Hàm xử lý thay đổi trạng thái đơn hàng
   const handleChangeOrderStatus = async (newStatus) => {
      try {
         const data = { order_status: newStatus.toLowerCase() };
         await orderApi.update(orderId, data);
         // Cập nhật trạng thái trong orderData
         setOrderData((prevData) => ({
            ...prevData,
            order_status: newStatus.toLowerCase(),
         }));
         toast.success("Order status updated successfully!");
      } catch (error) {
         console.error("Failed to update order status:", error);
         toast.error("Failed to update order status!");
      }
   };

   // Hàm xử lý thay đổi trạng thái thanh toán
   const handleChangePaymentStatus = async (newStatus) => {
      try {
         const data = { payment_status: newStatus.toLowerCase() };
         await orderApi.update(orderId, data); // Sử dụng phương thức update chung
         // Nếu bạn có phương thức riêng, hãy sử dụng orderApi.updatePaymentStatus(orderId, data.payment_status);

         // Cập nhật trạng thái trong orderData
         setOrderData((prevData) => ({
            ...prevData,
            payment_status: newStatus.toLowerCase(),
         }));
         toast.success("Payment status updated successfully!");
      } catch (error) {
         console.error("Failed to update payment status:", error);
         toast.error("Failed to update payment status!");
      }
   };

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
                  Order Detail
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
                     {/* Change Order Status */}
                     <section className="flex ml-auto justify-end">
                        <div className="relative items-center z-0">
                           <button
                              onClick={() => setIsOpen(!isOpen)}
                              className="flex items-center justify-between bg-[#F4F2F2] p-4 font-semibold rounded-[8px] w-[220px] text-[#232321] text-[14px] 
                          hover:bg-[#cccccc] transition-all duration-150 ease-in-out active:scale-[97%]"
                           >
                              <span>Change Order Status</span>
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
                                          handleChangeOrderStatus(option);
                                          setSelected(option);
                                          setIsOpen(false);
                                       }}
                                       className="px-4 py-2 hover:bg-[#d0d0d0] cursor-pointer text-[14px] font-semibold flex items-center justify-between"
                                    >
                                       {option}
                                       {orderData.order_status ===
                                          option.toLowerCase() && (
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

                     {/* Change Payment Status */}
                     <section className="flex ml-4 justify-end">
                        <div className="relative items-center z-0">
                           <button
                              onClick={() => setPaymentIsOpen(!paymentIsOpen)}
                              className="flex items-center justify-between  bg-[#F4F2F2] p-4 font-semibold rounded-[8px] w-[240px] text-[#232321] text-[14px] 
                          hover:bg-[#cccccc] transition-all duration-150 ease-in-out active:scale-[97%]"
                           >
                              <span>Change Payment Status</span>
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
                           {paymentIsOpen && (
                              <ul className="absolute bg-[#F4F2F2] text-secondary_black w-[240px] mt-[10px] rounded-[8px] flex flex-col shadow-2xl">
                                 {paymentOptions.map((option, index) => (
                                    <li
                                       key={index}
                                       onClick={() => {
                                          handleChangePaymentStatus(option);
                                          setPaymentSelected(option);
                                          setPaymentIsOpen(false);
                                       }}
                                       className="px-4 py-2 overflow-hidden hover:bg-[#d0d0d0] cursor-pointer text-[14px] font-semibold flex items-center justify-between"
                                    >
                                       {option}
                                       {orderData.payment_status ===
                                          option.toLowerCase() && (
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

                     {/* Các nút khác */}
                     <button
                        className="bg-[#F4F2F2] p-4 rounded-[8px] hover:bg-[#cccccc] transition-all duration-150 ease-in-out active:scale-[95%]"
                        onClick={() => {
                           toast.error("Tao chưa làm chức năng này.");
                        }}
                     >
                        <img src={icons.PrintIcon} alt="Print" />
                     </button>
                     <button
                        className="bg-[#F4F2F2] p-4 rounded-[8px] hover:bg-[#cccccc] transition-all duration-150 ease-in-out active:scale-[95%]"
                        onClick={() => {
                           toast.error("Tao chưa làm chức năng này.");
                        }}
                     >
                        <p className="font-semibold text-[14px]">Save</p>
                     </button>
                  </div>
               </div>
            </div>

            <section className="flex gap-4 my-6">
               <section className="flex-1 rounded-2xl bg-white p-4 border border-[#E7E7E3] flex flex-col justify-between gap-4">
                  <div className="flex gap-4">
                     <div className="p-4 justify-center items-center rounded-[8px] bg-[#4A69E2] w-[56px] h-[56px]">
                        <img
                           src={icons.CustomerIcon}
                           alt="Customer Icon"
                           className=""
                        />
                     </div>

                     <div className="flex flex-col gap-2">
                        <p className="font-rubik text-[20px] font-semibold">
                           Customer
                        </p>
                        <p className="text-[16px] font-semibold text-[#70706E]">
                           <span className="text-black">Full Name:</span>{" "}
                           {orderData.customer.first_name}{" "}
                           {orderData.customer.last_name}
                        </p>
                        <p className="text-[16px] font-semibold text-[#70706E]">
                           <span className="text-black">Email:</span>{" "}
                           {orderData.customer.email}
                        </p>
                        <p className="text-[16px] font-semibold text-[#70706E]">
                           <span className="text-black">Phone:</span>{" "}
                           {orderData.customer.phone_number || "N/A"}
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
                     <div className="p-4 justify-center items-center rounded-[8px] bg-[#4A69E2] w-[56px] h-[56px]">
                        <img
                           src={icons.BagHandleIcon}
                           alt="Bag Handle Icon"
                           className="w-full"
                        />
                     </div>
                     <div className="flex flex-col gap-2">
                        <p className="font-rubik text-[20px] font-semibold">
                           Order Info
                        </p>
                        <p className="text-[16px] font-semibold text-[#70706E]">
                           <span className="text-black">Shipping:</span>{" "}
                           {orderData.shipping || "N/A"}
                        </p>
                        <p className="text-[16px] font-semibold text-[#70706E]">
                           <span className="text-black">Payment Method:</span>{" "}
                           {orderData.payment.payment_method || "N/A"}
                        </p>
                        <p className="text-[16px] font-semibold text-[#70706E]">
                           <span className="text-black">Status:</span>{" "}
                           {orderData.order_status || "N/A"}
                        </p>
                        <p className="text-[16px] font-semibold text-[#70706E]">
                           <span className="text-black">Payment status:</span>{" "}
                           {orderData.payment_status || "N/A"}
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
                     <div className="p-4 justify-center items-center rounded-[8px] bg-[#4A69E2] min-w-[56px] h-[56px]">
                        <img src={icons.BagHandleIcon} alt="Bag Handle Icon" className="w-full"/>
                     </div>
                     <div className="flex flex-col gap-2">
                        <p className="font-rubik text-[20px] font-semibold">
                           Deliver to
                        </p>
                        <p className="text-[16px] font-semibold text-[#70706E]">
                           <span className="text-black">Address:</span>{" "}
                           {orderData.shipping_address || "N/A"}
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
                              <span className="text-black">Reference:</span>{" "}
                              {orderData.payment.reference || "N/A"}
                           </p>
                        </div>

                        <p className="text-[16px] font-semibold text-[#70706E]">
                           <span className="text-black">Name:</span>{" "}
                           {orderData.payment.account_name || "N/A"}
                        </p>
                        <p className="text-[16px] font-semibold text-[#70706E]">
                           <span className="text-black">Account Number:</span>{" "}
                           {orderData.payment.account_number || "N/A"}
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
                     image: item.product_image,
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

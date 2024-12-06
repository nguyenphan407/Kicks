import React, { useState, useEffect } from "react";
import { icons } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import orderApi from "@/apis/orderApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OrdersList = ({ orders }) => {
   const [selectAll, setSelectAll] = useState(false); 
   const [selectedOrders, setSelectedOrders] = useState( // state kiểm tra checkbox, để mặc định là không check
      Array.isArray(orders) ? orders.map(() => false) : []
   );
   const [localOrders, setLocalOrders] = useState(
      Array.isArray(orders) ? orders : []
   ); // check xem order có data không
   const navigate = useNavigate();

   useEffect(() => {
      if (Array.isArray(orders)) {
         setLocalOrders(orders);
         setSelectedOrders(orders.map(() => false));
         setSelectAll(false); // Đặt lại trạng thái selectAll khi orders thay đổi
      }
   }, [orders]);

   // Xử lý khi checkbox chính được click
   const handleSelectAll = () => {
      const newState = !selectAll; // Đảo ngược trạng thái hiện tại
      setSelectAll(newState);
      setSelectedOrders(localOrders.map(() => newState)); // Cập nhật tất cả checkbox
   };

   // Xử lý khi checkbox từng hàng được click
   const handleSelectOrder = (index) => {
      const updatedSelectedOrders = [...selectedOrders];
      updatedSelectedOrders[index] = !updatedSelectedOrders[index];
      setSelectedOrders(updatedSelectedOrders);

      // Cập nhật trạng thái checkbox chính (selectAll)
      const allSelected =
         updatedSelectedOrders.length > 0 &&
         updatedSelectedOrders.every((isSelected) => isSelected);
      setSelectAll(allSelected);
   };

   // Hàm xử lý thay đổi trạng thái đơn hàng
   const handleChangeStatus = async (orderId, newStatus) => {
      try {
         const data = { order_status: newStatus };
         await orderApi.update(orderId, data);
         // Cập nhật trạng thái trong localOrders
         setLocalOrders((prevOrders) =>
            prevOrders.map((order) =>
               order.order_id === orderId
                  ? { ...order, order_status: newStatus }
                  : order
            )
         );
         toast.success("Order status update successful!");
      } catch (error) {
         console.error("Failed to update order status:", error);
         alert("Failed to update order status!");
      }
   };

   return (
      <div className="p-6 bg-white rounded-[16px]">
         {/* Tiêu đề */}
         <div className="flex justify-between items-center pb-4 mb-4 border-b">
            <h2 className="font-rubik text-xl font-semibold">Recent Orders</h2>
            <button className="w-6 h-6 rounded-[4px] bg-transparent hover:bg-gray-300 transition-all">
               <img src={icons.DotsThreeIcon} alt="dots three icon" />
            </button>
         </div>

         {/* Bảng danh sách */}
         <table className="w-full text-left mt-4">
            <thead className="border-b">
               <tr>
                  <th className="px-2 py-4">
                     {/* Checkbox chính */}
                     <input
                        type="checkbox"
                        className="w-4 h-4 outline-none border-2 border-gray-400 rounded-sm accent-[#4A69E2]"
                        checked={selectAll} // Trạng thái checkbox chính
                        onChange={handleSelectAll} // Khi checkbox chính được click
                     />
                  </th>
                  <th className="px-2 py-4 font-rubik text-[16px] font-semibold text-[#6F6F6E] text-start">
                     Customer Name
                  </th>

                  <th className="px-2 py-4 font-rubik text-[16px] font-semibold text-[#6F6F6E] text-center">
                     Order ID
                  </th>
                  <th className="px-2 py-4 font-rubik text-[16px] font-semibold text-[#6F6F6E] text-center">
                     Date
                  </th>
                  <th className="px-2 py-4 font-rubik text-[16px] font-semibold text-[#6F6F6E] text-center">
                     Payment Method
                  </th>
                  <th className="px-2 py-4 font-rubik text-[16px] font-semibold text-[#6F6F6E] text-center">
                     Payment Status
                  </th>
                  <th className="px-2 py-4 font-rubik text-[16px] font-semibold text-[#6F6F6E] text-center">
                     Status
                  </th>
                  <th className="px-2 py-4 font-rubik text-[16px] font-semibold text-[#6F6F6E] text-center">
                     Amount
                  </th>
               </tr>
            </thead>
            <tbody>
               {localOrders.length > 0 ? (
                  localOrders.map((order, index) => (
                     <tr
                        key={order.order_id}
                        className="border-b hover:bg-gray-200 cursor-pointer"
                        onClick={(e) => {
                           // Kiểm tra xem có phải click vào checkbox hoặc select không, nếu có thì không gọi navigate
                           if (
                              e.target.type !== "checkbox" &&
                              e.target.tagName !== "SELECT"
                           ) {
                              navigate(`/orderDetail/${order.order_id}`);
                           }
                        }}
                     >
                        <td className="px-2 py-4">
                           {/* Checkbox từng hàng */}
                           <input
                              type="checkbox"
                              className="w-4 h-4 outline-none border-2 border-gray-400 rounded-sm accent-[#4A69E2]"
                              checked={selectedOrders[index] || false} // Trạng thái của hàng hiện tại
                              onChange={() => handleSelectOrder(index)} // Khi checkbox của hàng hiện tại được click
                              onClick={(e) => e.stopPropagation()} // Ngăn chặn sự kiện click trùng với row
                           />
                        </td>
                        <td className="px-2 py-4 text-[14px] font-semibold text-black flex items-center text-start gap-2">
                           <div className="w-8 h-8 rounded-full bg-[#4A69E2] flex justify-center items-center">
                              <img
                                 src={icons.CustomerIcon}
                                 alt={order.name}
                                 className="w-4 h-4"
                              />
                           </div>

                           <span>{order.name}</span>
                        </td>

                        <td className="px-2 py-4 text-[14px] font-semibold text-black text-center">
                           #{order.order_id}
                        </td>
                        <td className="px-2 py-4 text-[14px] font-semibold text-black text-center">
                           {new Date(order.created_at).toLocaleDateString()}{" "}
                           {/* Định dạng ngày */}
                        </td>
                        <td className="px-2 py-4 text-[14px] font-semibold text-black text-center">
                           {order.payment_method}
                        </td>
                        <td className="px-2 py-4 text-[14px] font-semibold text-black text-center">
                           <div className="flex items-center justify-center gap-2">
                              <span
                                 className={`w-2 h-2 rounded-full ${
                                    order.payment_status === "pending"
                                       ? "bg-[#FFA52F]" // Màu cho Pending
                                       : order.payment_status === "paid"
                                       ? "bg-[#4A69E2]" // Màu cho Paid
                                       : order.payment_status === "failed"
                                       ? "bg-[#FF4F4F]" // Màu cho Failed
                                       : "bg-[#d1d1d1]" // Màu mặc định nếu không có trạng thái hợp lệ
                                 }`}
                              ></span>
                              <p className="text-[14px] font-semibold text-black capitalize">
                                 {order.payment_status}
                              </p>
                           </div>
                        </td>
                        <td className="px-2 py-4 text-center">
                           <div className="flex items-center justify-center gap-2">
                              <span
                                 className={`w-2 h-2 rounded-full ${
                                    order.order_status === "delivered"
                                       ? "bg-[#4A69E2]" // Màu cho Pending
                                       : order.order_status === "pending"
                                       ? "bg-[#FFA52F]" // Màu cho pending
                                       : order.order_status === "shipped"
                                       ? "bg-[#2ada73]" // Màu cho delivered
                                       : order.order_status === "canceled"
                                       ? "bg-[#ff1919]"
                                       : "bg-[#d1d1d1]" // Màu mặc định nếu không có trạng thái hợp lệ
                                 }`}
                              ></span>
                              <select
                                 value={order.order_status}
                                 onChange={(e) =>
                                    handleChangeStatus(
                                       order.order_id,
                                       e.target.value
                                    )
                                 }
                                 className="bg-transparent text-[14px] font-semibold text-black focus:outline-none cursor-pointer"
                                 onClick={(e) => e.stopPropagation()} // Ngăn chặn sự kiện click trùng với row
                              >
                                 <option value="pending" className="text-[14px] font-semibold h-[40px] w-[50px]">Pending</option>
                                 <option value="shipped" className="text-[14px] font-semibold">Shipped</option>
                                 <option value="delivered" className="text-[14px] font-semibold">Delivered</option>
                                 <option value="canceled" className="text-[14px] font-semibold">Cancelled</option>
                              </select>
                           </div>
                        </td>
                        <td className="px-2 py-4 text-[14px] font-semibold text-black text-center">
                           ${order.amount}
                        </td>
                     </tr>
                  ))
               ) : (
                  <tr>
                     <td className="px-2 py-4 text-center" colSpan="8">
                        Không có đơn hàng nào.
                     </td>
                  </tr>
               )}
            </tbody>
         </table>
      </div>
   );
};

export default OrdersList;

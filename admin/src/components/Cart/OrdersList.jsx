import React, { useState } from "react";
import { icons } from "../../assets/assets";
import { useNavigate } from "react-router-dom";

const OrdersList = ({ orders }) => {
   const [selectAll, setSelectAll] = useState(false);
   const [selectedOrders, setSelectedOrders] = useState(
      orders.map(() => false)
   );
   const navigate = useNavigate();

   // Xử lý khi checkbox chính được click
   const handleSelectAll = () => {
      const newState = !selectAll; // Đảo ngược trạng thái hiện tại
      setSelectAll(newState);
      setSelectedOrders(orders.map(() => newState)); // Cập nhật tất cả checkbox
   };

   // Xử lý khi checkbox từng hàng được click
   const handleSelectOrder = (index) => {
      const updatedSelectedOrders = [...selectedOrders];
      updatedSelectedOrders[index] = !updatedSelectedOrders[index];
      setSelectedOrders(updatedSelectedOrders);

      // Cập nhật trạng thái checkbox chính (selectAll)
      const allSelected = updatedSelectedOrders.every(
         (isSelected) => isSelected
      );
      setSelectAll(allSelected);
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
                     Payment status
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
               {orders.map((order, index) => (
                  <tr
                     key={order.order_id}
                     className="border-b hover:bg-gray-200 cursor-pointer"
                     onClick={(e) => {
                        // Kiểm tra xem có phải click vào checkbox không, nếu có thì không gọi navigate
                        if (e.target.type !== "checkbox") {
                           navigate(`/orderDetail/${order.order_id}`);
                        }
                     }}
                  >
                     <td className="px-2 py-4">
                        {/* Checkbox từng hàng */}
                        <input
                           type="checkbox"
                           className="w-4 h-4 outline-none border-2 border-gray-400 rounded-sm accent-[#4A69E2]"
                           checked={selectedOrders[index]} // Trạng thái của hàng hiện tại
                           onChange={() => handleSelectOrder(index)} // Khi checkbox của hàng hiện tại được click
                        />
                     </td>
                     <td className="px-2 py-4 text-[14px] font-semibold text-black flex items-center text-start  gap-2">
                        <div className="w-8 h-8 rounded-full bg-[#4A69E2] flex justify-center items-center">
                           <img
                              src={icons.CustomerIcon}
                              alt={order.customer}
                              className="w-4 h-4 "
                           />
                        </div>

                        <span>{order.customer_name}</span>
                     </td>

                     <td className="px-2 py-4 text-[14px] font-semibold text-black text-center">
                        {order.order_id}
                     </td>
                     <td className="px-2 py-4 text-[14px] font-semibold text-black text-center">
                        {order.created_at}
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
                           <p className="text-[14px] font-semibold text-black">
                              {order.payment_status}
                           </p>
                        </div>
                     </td>
                     <td className="px-2 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                           <span
                              className={`w-2 h-2 rounded-full ${
                                 order.status === "Delivered"
                                    ? "bg-[#4A69E2]"
                                    : "bg-[#FFA52F]"
                              }`}
                           ></span>
                           <p className="text-[14px] font-semibold text-black">
                              {order.order_status}
                           </p>
                        </div>
                     </td>
                     <td className="px-2 py-4 text-[14px] font-semibold text-black text-center">
                        ${order.amount}
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );
};

export default OrdersList;

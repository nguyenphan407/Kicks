// admin/Header.jsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; // Để điều hướng sau khi logout
import { icons, images } from "../../assets/assets";
import authApi from "../../apis/authApi";
import productApi from "@/apis/productApi"; // Import productApi
import orderApi from "@/apis/orderApi"; // Import orderApi
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Notifications from "@/components/Cart/Notifications";
import { motion, AnimatePresence } from "framer-motion";

const dropdownVariants = {
   hidden: { opacity: 0, scale: 0.95 },
   visible: { opacity: 1, scale: 1 },
   exit: { opacity: 0, scale: 0.95 },
};

const Header = () => {
   // Các state hiện tại
   const [menuOpenUser, setMenuOpenUser] = useState(false);
   const [isSearchFocused, setIsSearchFocused] = useState(false);
   const [query, setQuery] = useState(""); // State quản lý từ khóa tìm kiếm
   const [searchResults, setSearchResults] = useState([]); // State quản lý kết quả tìm kiếm
   const navigate = useNavigate(); // Hook để điều hướng
   const headerRef = useRef(null); // Ref cho Header để quản lý overlay
   const debounceRef = useRef(null); // Ref cho debounce

   // Các state mới cho thông báo
   const [notificationsOpen, setNotificationsOpen] = useState(false); // Quản lý hiển thị dropdown thông báo
   const [notifications, setNotifications] = useState([]); // Lưu trữ dữ liệu thông báo
   const [isLoadingNotifications, setIsLoadingNotifications] = useState(false); // Quản lý trạng thái tải dữ liệu thông báo
   const notificationsRef = useRef(null); // Ref cho dropdown thông báo

   // Hàm để toggle menu user
   const toggleMenuUser = () => {
      setMenuOpenUser((prev) => !prev);
   };

   // Hàm xử lý đăng xuất
   const handleLogout = async () => {
      try {
         await authApi.logout();

         localStorage.removeItem("access_token");

         // Điều hướng tới trang login
         navigate("/login");
         toast.success("Đăng xuất thành công!");
      } catch (error) {
         console.error("Logout failed:", error.response?.data || error.message);
         toast.error("Đăng xuất thất bại!");
      }
   };

   // Hàm xử lý khi nhấp vào overlay
   const handleOverlayClick = () => {
      setMenuOpenUser(false);
      setIsSearchFocused(false);
      setSearchResults([]);
      setNotificationsOpen(false); // Đóng dropdown thông báo nếu đang mở
   };

   // Đóng menu user, search và thông báo khi nhấp ra ngoài Header
   useEffect(() => {
      const handleClickOutside = (event) => {
         if (
            headerRef.current &&
            !headerRef.current.contains(event.target) &&
            notificationsRef.current &&
            !notificationsRef.current.contains(event.target)
         ) {
            setMenuOpenUser(false);
            setIsSearchFocused(false);
            setSearchResults([]);
            setNotificationsOpen(false); // Đóng dropdown thông báo nếu đang mở
         }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
         document.removeEventListener("mousedown", handleClickOutside);
      };
   }, []);

   // Hàm kiểm tra xem chuỗi có phải là số không
   const isNumeric = (str) => /^\d+$/.test(str);

   // Hàm xử lý tìm kiếm với debounce
   useEffect(() => {
      if (!query.trim()) {
         setSearchResults([]);
         return;
      }

      // Đặt debounce để gọi API sau khi người dùng ngừng gõ trong 150ms
      debounceRef.current = setTimeout(async () => {
         try {
            // Luôn luôn gọi API tìm kiếm sản phẩm
            const productPromise = productApi.search(query);

            // Nếu query là số, gọi thêm API tìm kiếm đơn hàng với tiền tố "ord"
            const orderPromise = isNumeric(query)
               ? orderApi.search(query)
               : Promise.resolve({ data: [] });

            // Chờ tất cả các promise hoàn thành
            const [productResponse, orderResponse] = await Promise.all([
               productPromise,
               orderPromise,
            ]);

            // Xử lý dữ liệu sản phẩm
            const products = productResponse.data.flat().map((item) => ({
               ...item,
               type: "product", // Thêm loại để phân biệt
            }));

            // Xử lý dữ liệu đơn hàng
            const orders = orderResponse.data.map((order) => ({
               ...order,
               type: "order", // Thêm loại để phân biệt
            }));

            // Kết hợp cả sản phẩm và đơn hàng
            const combinedResults = [...products, ...orders];

            setSearchResults(combinedResults);
            // console.log("Tìm kiếm thành công!");
         } catch (error) {
            console.error("Error searching:", error);
            toast.error("Error searching!");
            setSearchResults([]);
         }
      }, 150); // 150ms debounce

      // Dọn dẹp timeout nếu query thay đổi trước khi timeout kết thúc
      return () => {
         clearTimeout(debounceRef.current);
      };
   }, [query]);

   // Lọc kết quả tìm kiếm thành các mảng riêng biệt
   const products = searchResults.filter((item) => item.type === "product");
   const orders = searchResults.filter((item) => item.type === "order");

   // Hàm xử lý khi nhấn vào nút thông báo
   const handleNotificationsClick = async () => {
      // Nếu dropdown đang mở, chỉ cần đóng nó
      if (notificationsOpen) {
         setNotificationsOpen(false);
         return;
      }

      // Mở dropdown và bắt đầu tải dữ liệu
      setNotificationsOpen(true);
      setIsLoadingNotifications(true);

      try {
         const response = await orderApi.getLatest();
         setNotifications(response.data);
      } catch (error) {
         console.error("Failed to fetch notifications:", error);
         toast.error("Failed to fetch notifications!");
      } finally {
         setIsLoadingNotifications(false);
      }
   };

   return (
      <>
         {/* Overlay */}
         {(menuOpenUser || isSearchFocused || notificationsOpen) && (
            <div
               style={{ zIndex: 5 }}
               className="fixed top-[96px] left-[260px] z-10 right-0 bottom-0 bg-black bg-opacity-20"
               onClick={handleOverlayClick}
            ></div>
         )}

         <div
            ref={headerRef}
            className="z-50 top-0 w-full h-[96px] px-[60px] py-[30px] bg-white flex justify-end items-center gap-10"
         >
            {/* Search Input */}
            <div className="relative">
               <form onSubmit={(e) => e.preventDefault()}>
                  <input
                     placeholder="Tìm kiếm..."
                     className="font-semibold input focus:shadow-lg focus:border-2 border-[#4A69E2] px-5 py-3 rounded-xl w-56 transition-all focus:w-64 outline-none"
                     name="search"
                     type="text"
                     value={query}
                     onChange={(e) => setQuery(e.target.value)}
                     onFocus={() => setIsSearchFocused(true)}
                     onBlur={() => {
                        // Để cho phép click vào kết quả trước khi mất focus
                        // Sử dụng setTimeout để trì hoãn việc bỏ focus
                        setTimeout(() => {
                           setIsSearchFocused(false);
                        }, 200);
                     }}
                  />
                  <button type="submit" className="absolute top-3 right-3">
                     <img
                        src={icons.SearchIcon}
                        alt="icon tìm kiếm"
                        className="w-6 h-6 text-gray-500"
                     />
                  </button>
               </form>

               {/* Kết quả tìm kiếm */}
               {searchResults.length > 0 && isSearchFocused && (
                  <div className="absolute top-full left-0 w-full bg-white border border-[#E7E7E3] rounded-lg mt-2 max-h-60 overflow-y-auto z-50">
                     <ul>
                        {/* Hiển thị kết quả sản phẩm nếu có */}
                        {products.length > 0 && (
                           <>
                              <li className="px-4 py-2 font-semibold border-b border-gray-200">
                                 Products
                              </li>
                              {products.map((item) => (
                                 <li
                                    key={`product-${item.product_id}`}
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                                    onClick={() => {
                                       navigate(
                                          `/productdetail/${item.product_id}`
                                       );
                                       setMenuOpenUser(false);
                                       setIsSearchFocused(false);
                                       setSearchResults([]);
                                    }}
                                 >
                                    <img
                                       src={
                                          item.image || icons.DefaultProductIcon
                                       }
                                       alt={item.name}
                                       className="w-10 h-10 object-cover rounded"
                                    />
                                    <div>
                                       <p className="font-inter font-semibold">
                                          {item.name}
                                       </p>
                                       <p className="font-inter font-normal text-xs text-gray-500">
                                          {item.description}
                                       </p>
                                    </div>
                                 </li>
                              ))}
                           </>
                        )}

                        {/* Hiển thị kết quả đơn hàng nếu có */}
                        {orders.length > 0 && (
                           <>
                              <li className="px-4 py-2 font-semibold border-b border-gray-200 mt-2">
                                 Orders
                              </li>
                              {orders.map((order) => (
                                 <li
                                    key={`order-${order.order_id}`}
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex flex-col gap-1"
                                    onClick={() => {
                                       navigate(
                                          `/orderdetail/${order.order_id}`
                                       );
                                       setMenuOpenUser(false);
                                       setIsSearchFocused(false);
                                       setSearchResults([]);
                                    }}
                                 >
                                    <section className="flex gap-4 justify-start items-center">
                                       <div className="p-2 rounded-[8px] bg-[#4A69E2] w-[40px] h-[40px] flex items-start justify-center">
                                          <img
                                             src={icons.BagHandleIcon}
                                             alt="BagHandleIcon"
                                             className=""
                                          />
                                       </div>
                                       <div>
                                          <div className="font-inter font-semibold">
                                             Order ID:{" "}
                                             <span className="text-gray-600 font-normal font-inter">
                                                {order.order_id}
                                             </span>
                                          </div>
                                          <div className="font-inter font-semibold">
                                             Status:{" "}
                                             <span className="text-gray-600 font-normal font-inter">
                                                {order.payment_status}
                                             </span>
                                          </div>
                                       </div>
                                    </section>
                                 </li>
                              ))}
                           </>
                        )}

                        {/* Hiển thị thông báo khi không có kết quả tìm kiếm */}
                        {products.length === 0 && orders.length === 0 && (
                           <li className="px-4 py-2 text-center text-gray-500">
                              Not found .
                           </li>
                        )}
                     </ul>
                  </div>
               )}
            </div>

            <div className="relative" ref={notificationsRef}>
               <button className="relative" onClick={handleNotificationsClick}>
                  <Notifications />
               </button>

               <AnimatePresence>
                  {notificationsOpen && (
                     <motion.div
                        className="absolute right-0 mt-[45px] w-[460px] bg-white border border-gray-200 rounded-[16px] shadow-lg z-50"
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ duration: 0.2 }}
                     >
                        <div className="flex justify-between items-center p-4">
                           <div className="border-gray-200 font-semibold font-rubik text-xl">
                              Latest Notifications
                           </div>
                           <img
                              src={icons.ErrorCircle}
                              alt=""
                              onClick={handleOverlayClick}
                              className="active:scale-90"
                           />
                        </div>
                        <ul>
                           {isLoadingNotifications ? (
                              <li className="px-4 py-2 text-center text-gray-500">
                                 Loading data...
                              </li>
                           ) : notifications.length > 0 ? (
                              notifications.map((notification) => (
                                 <li
                                    key={notification.order_id}
                                    className="flex gap-4 px-4 py-2 hover:bg-gray-100 border-b border-gray-200 cursor-pointer"
                                    onClick={() => {
                                       navigate(
                                          `/orderdetail/${notification.order_id}`
                                       );
                                       setMenuOpenUser(false);
                                       setIsSearchFocused(false);
                                       setSearchResults([]);
                                    }}
                                 >
                                    <img
                                       src={images.Thumbnails[0]}
                                       alt=""
                                       className="w-[64px] h-[64px] rounded-md"
                                    />
                                    <div>
                                       <div className="font-semibold">
                                          Order #{notification.order_id} from{" "}
                                          {notification.name}
                                       </div>
                                       <div className="text-sm text-gray-600 font-semibold">
                                          Payment Status:{" "}
                                          {notification.payment_status}
                                       </div>
                                       <div className="text-xs text-gray-500 font-semibold">
                                          Date: {notification.date} | Price: $
                                          {notification.price}
                                       </div>
                                    </div>
                                 </li>
                              ))
                           ) : (
                              <li className="px-4 py-2 text-center text-gray-500">
                                 No new notifications.
                              </li>
                           )}
                        </ul>
                     </motion.div>
                  )}
               </AnimatePresence>
            </div>

            {/* User Dropdown */}
            <div className="relative">
               <button
                  className={`flex justify-between uppercase gap-1 font-rubik px-4 py-2 rounded-lg border-2
                      ${
                         menuOpenUser
                            ? "bg-[#4A69E2] text-white border-[#4A69E2]"
                            : "bg-inherit text-black border-black"
                      }`}
                  onClick={toggleMenuUser}
               >
                  <span>admin</span>
                  <img
                     src={icons.ChevronDownIcon}
                     alt="icon mũi tên xuống"
                     className={`transition-transform duration-200 ${
                        menuOpenUser ? "transform rotate-180" : ""
                     }`}
                  />
               </button>

               {/* Dropdown Menu */}
               <div
                  className={`flex z-50 flex-col items-between justify-between absolute right-[-2px] mt-10 w-[233px] bg-white rounded-lg border-2 border-[#E7E7E3]
                      transform transition-all duration-150 ease-in-out ${
                         menuOpenUser
                            ? "opacity-100 scale-100"
                            : "opacity-0 scale-95 pointer-events-none"
                      }`}
               >
                  <div className="font-rubik text-xl font-semibold text-secondary_black leading-6 px-4 py-4">
                     UserName
                  </div>
                  <p className="cursor-pointer font-inter text-[14px] uppercase font-medium flex items-center justify-between py-4 px-4 hover:bg-gray-100">
                     Đổi mật khẩu
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        className="w-4 h-4 lg:w-6 lg:h-6"
                     >
                        <path
                           d="M6 3.5L10.5 8L6 12.5"
                           stroke="#232321"
                           strokeWidth="1.5"
                           strokeLinecap="round"
                           strokeLinejoin="round"
                        />
                     </svg>
                  </p>
                  <p
                     className="cursor-pointer font-inter text-[14px] uppercase font-medium flex items-center justify-between py-4 px-4 hover:bg-gray-100"
                     onClick={handleLogout} // Thêm sự kiện logout
                  >
                     Đăng xuất
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        className="w-4 h-4 lg:w-6 lg:h-6"
                     >
                        <path
                           d="M9.5 10.5V11.75C9.5 12.0815 9.3683 12.3995 9.13388 12.6339C8.89946 12.8683 8.58152 13 8.25 13H3.25C2.91848 13 2.60054 12.8683 2.36612 12.6339C2.1317 12.3995 2 12.0815 2 11.75V4.25C2 3.91848 2.1317 3.60054 2.36612 3.36612C2.60054 3.1317 2.91848 3 3.25 3H8C8.69031 3 9.5 3.55969 9.5 4.25V5.5M11.5 10.5L14 8L11.5 5.5M5.5 8H13.5"
                           stroke="#232321"
                           strokeWidth="1.5"
                           strokeLinecap="round"
                           strokeLinejoin="round"
                        />
                     </svg>
                  </p>
               </div>
            </div>
         </div>
      </>
   );
};

export default Header;

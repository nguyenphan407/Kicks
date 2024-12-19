/* eslint-disable react/no-unescaped-entities */
// src/pages/CheckOutPage.jsx
import React, { useContext, useState, useEffect, useRef } from "react";
import { ShopConText } from "../context/ShopContext";
import { Link, NavLink } from "react-router-dom";
import { icons } from "../assets/assets";
import Modal from "../Components/Modal";
import debounce from "lodash.debounce"; // Import debounce

const CheckOutPage = () => {
   const [selectedOption, setSelectedOption] = useState("Standard Delivery");
   const [deliveryFee, setDeliveryFee] = useState(3.99); // Khởi tạo phí vận chuyển cho "Standard Delivery"

   const handleOptionSelect = (option) => {
      setSelectedOption(option);
   };

   const [selectedOptionPayment, setSelectedOptionPayment] = useState(
      "Payment via Momo e-wallet"
   );

   const handleOptionSelectPayment = (option) => {
      setSelectedOptionPayment(option);
   };

   const [userData, setUserData] = useState({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      deliveryAddress: "",
   });

   const handleChange = (e) => {
      const { name, value } = e.target;
      setUserData((prevData) => ({
         ...prevData,
         [name]: value,
      }));

      if (name === "deliveryAddress") {
         debouncedFetchAddressSuggestions(value);
      }
   };

   const { currency, getCartAmount, getCartCount, navigate, cartData } =
      useContext(ShopConText);

   const [isModalOpen, setIsModalOpen] = useState(false);

   const handleOpenModal = () => setIsModalOpen(true);
   const handleCloseModal = () => setIsModalOpen(false);

   // Định nghĩa các tùy chọn vận chuyển và phí tương ứng
   const deliveryOptions = {
      "Standard Delivery": 3.99,
      "Collect in Store": 0.0,
   };

   // Cập nhật phí vận chuyển khi chọn tùy chọn vận chuyển
   useEffect(() => {
      setDeliveryFee(deliveryOptions[selectedOption] || 0.0);
   }, [selectedOption]);

   // Tính tổng tiền bao gồm phí vận chuyển
   const totalAmount = getCartAmount() + deliveryFee;

   const handleConfirm = async () => {
      setIsModalOpen(false);

      localStorage.setItem("user-info", JSON.stringify(userData));

      try {
         let convertCartData = cartData.map((item) => {
            return {
               ...item,
               price: parseFloat(item.price),
            };
         });

         localStorage.setItem("products", JSON.stringify(convertCartData));

         const productData = {
            description: "Thanh toán đơn hàng",
            buyerName: userData.firstName + " " + userData.lastName,
            buyerEmail: userData.email,
            buyerPhone: userData.phoneNumber,
            buyerAddress: userData.deliveryAddress,
            items: convertCartData,
            returnUrl: "http://localhost:5173/order/success",
            cancelUrl: "http://localhost:5173/order/cancel",
            price: totalAmount, // Sửa lại để sử dụng tổng tiền thực tế
         };

         console.log(JSON.stringify(productData));

         localStorage.setItem("products", JSON.stringify(productData));

         const response = await fetch(
            "http://localhost:8000/api/payment/create-payment-link",
            {
               method: "POST",
               headers: {
                  "Content-Type": "application/json",
               },
               body: JSON.stringify(productData),
            }
         );

         const textResponse = await response.text();

         if (textResponse) {
            window.location.href = textResponse; // Chuyển hướng tới đường dẫn
         } else {
            console.error("Link không tồn tại trong dữ liệu trả về");
         }
      } catch (error) {
         console.error("Có lỗi xảy ra:", error);
      }
   };

   // State và hàm cho gợi ý địa chỉ
   const [addressSuggestions, setAddressSuggestions] = useState([]);
   const [showSuggestions, setShowSuggestions] = useState(false);

   const fetchAddressSuggestions = async (query) => {
      if (!query) {
         setAddressSuggestions([]);
         return;
      }

      const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
         query
      )}&format=json&addressdetails=1&limit=5`;

      try {
         const response = await fetch(url, {
            headers: {
               "Accept-Language": "vi", // Ngôn ngữ trả về
               "User-Agent": "VoDinhMinhQuan/1.0 (vodinhquan2707.it@gmail.com)",
            },
         });

         if (response.ok) {
            const data = await response.json();
            setAddressSuggestions(data);
            setShowSuggestions(true);
         } else {
            console.error("Nominatim API trả về lỗi:", response.status);
         }
      } catch (error) {
         console.error("Error fetching address suggestions:", error);
      }
   };

   // Sử dụng debounce để hạn chế số lượng yêu cầu API
   const debouncedFetchAddressSuggestions = useRef(
      debounce((query) => {
         fetchAddressSuggestions(query);
      }, 500) // 500ms debounce
   ).current;

   const handleSelectSuggestion = (suggestion) => {
      setUserData((prevData) => ({
         ...prevData,
         deliveryAddress: suggestion.display_name,
      }));
      setAddressSuggestions([]);
      setShowSuggestions(false);
   };

   return (
      <div className="h-auto container flex flex-col-reverse lg:flex-row justify-between mt-8">
         {/* Contact & Order */}
         <section className="flex flex-col lg:flex-row gap-5 lg:gap-8 mb-6 lg:mb-12">
            <section className="flex flex-col gap-5 lg:gap-8 w-full rounded-lg">
               <NavLink to="/login">
                  <h2 className="text-[16px] lg:text-xl font-semibold underline decoration-1 max-w-[253px] pb-[1px] ">
                     Login and Checkout faster
                  </h2>
               </NavLink>

               {/* Contact Details */}
               <div>
                  <h3 className="font-rubik text-2xl lg:text-[32px] font-semibold mb-2">
                     Contact Details
                  </h3>
                  <p className="opacity-80 text-sm lg:text-base font-semibold mb-5 lg:mb-8">
                     We will use these details to keep you informed about your
                     delivery.
                  </p>
                  <input
                     type="email"
                     name="email"
                     value={userData.email}
                     placeholder="Email"
                     className="font-rubik font-normal w-full lg:w-[342px] h-12 px-4 py-[12px] text-[18px] border border-gray-800 rounded-lg text-gray-700 bg-transparent focus:border-[#008B28] focus:outline-none"
                     onChange={handleChange}
                  />
               </div>

               {/* Shipping Address */}
               <section className="flex-col justify-start items-start lg:gap-8 inline-flex">
                  <h3 className="font-rubik text-2xl lg:text-[32px] font-semibold text-secondary_black">
                     Shipping Address
                  </h3>

                  <section className="flex flex-col gap-4 lg:gap-5 w-full lg:w-[704px] ">
                     <div className="flex w-full flex-col md:flex-row gap-4 mt-2">
                        <input
                           type="text"
                           placeholder="First Name*"
                           name="firstName"
                           value={userData.firstName}
                           onChange={handleChange}
                           className="font-rubik font-normal w-full flex-1 lg:w-[342px] h-12 px-4 py-[12px] text-[18px] border border-gray-800 rounded-lg text-gray-700 bg-transparent focus:border-[#008B28] focus:outline-none"
                        />
                        <input
                           type="text"
                           name="lastName"
                           value={userData.lastName}
                           onChange={handleChange}
                           placeholder="Last Name*"
                           className="font-rubik font-normal w-full flex-1 lg:w-[342px] h-12 px-4 py-[12px] text-[18px] border border-gray-800 rounded-lg text-gray-700 bg-transparent focus:border-[#008B28] focus:outline-none"
                        />
                     </div>
                     <div className="relative">
                        <input
                           type="text"
                           name="deliveryAddress"
                           value={userData.deliveryAddress}
                           onChange={handleChange}
                           placeholder="Find Delivery Address*"
                           className="font-rubik font-normal w-full flex-1 lg:w-[342px] h-12 px-4 py-[12px] text-[18px] border border-gray-800 rounded-lg text-gray-700 bg-transparent focus:border-[#008B28] focus:outline-none"
                           onFocus={() => {
                              if (addressSuggestions.length > 0)
                                 setShowSuggestions(true);
                           }}
                           onBlur={() => {
                              // Delay để cho phép click vào suggestion trước khi ẩn
                              setTimeout(() => setShowSuggestions(false), 100);
                           }}
                        />
                        {showSuggestions && addressSuggestions.length > 0 && (
                           <ul className="absolute z-10 bg-white border border-gray-300 w-full max-h-60 overflow-y-auto mt-1 rounded-md shadow-lg">
                              {addressSuggestions.map((suggestion) => (
                                 <li
                                    key={suggestion.place_id}
                                    onClick={() =>
                                       handleSelectSuggestion(suggestion)
                                    }
                                    className="px-4 py-2 hover:bg-gray-200 cursor-pointer font-rubik text-[18px]"
                                 >
                                    {suggestion.display_name}
                                 </li>
                              ))}
                           </ul>
                        )}
                        <p className="text-neutral-700 text-xs mt-1">
                           Start typing your street address or zip code for
                           suggestions
                        </p>
                     </div>
                     <div className="relative">
                        <input
                           type="tel"
                           name="phoneNumber"
                           value={userData.phoneNumber}
                           onChange={handleChange}
                           placeholder="Phone Number*"
                           className="font-rubik font-normal w-full flex-1 lg:w-[342px] h-12 px-4 py-[12px] text-[18px] border border-gray-800 rounded-lg text-gray-700 bg-transparent focus:border-[#008B28] focus:outline-none"
                        />
                        <p className="text-xs text-gray-700 mt-1">
                           E.g. (123) 456-7890
                        </p>
                     </div>
                  </section>
               </section>

               {/* Delivery Options */}
               <section className="flex flex-col">
                  <h3 className="font-rubik text-2xl lg:text-[32px] font-semibold text-secondary_black mb-4 lg:mb-8">
                     Delivery Options
                  </h3>
                  <section className="flex-col justify-start items-start gap-6 inline-flex w-full lg:w-[782px]">
                     <div
                        className={`w-full p-4 rounded-xl lg:rounded-2xl flex justify-between items-start cursor-pointer transform transition-all duration-300 ${
                           selectedOption === "Standard Delivery"
                              ? "bg-[#FAFAFA]  shadow-lg border border-[#FAFAFA]"
                              : "border border-[#232321] hover:shadow-md"
                        }`}
                        onClick={() => handleOptionSelect("Standard Delivery")}
                     >
                        <div className="flex justify-between gap-2">
                           <div className="lg:w-[684px]">
                              <h3 className="font-rubik text-[#232321] text-xl lg:text-2xl font-semibold">
                                 Standard Delivery
                              </h3>
                              <p className="opacity-80 text-[#232321] text-sm lg:text-base font-semibold">
                                 Enter your address to see when you'll get your
                                 order
                              </p>
                           </div>
                           <span className="font-rubik text-[#4A69E2] text-[16px] lg:text-xl font-semibold">
                              {currency}
                              {deliveryOptions["Standard Delivery"]}
                           </span>
                        </div>
                     </div>
                     <div
                        className={`w-full p-4 rounded-xl flex justify-between items-start cursor-pointer transform transition-all duration-300 ${
                           selectedOption === "Collect in Store"
                              ? "bg-[#FAFAFA] shadow-lg border border-[#FAFAFA]"
                              : "border border-[#232321]  hover:shadow-md"
                        }`}
                        onClick={() => handleOptionSelect("Collect in Store")}
                     >
                        <div>
                           <h3 className="font-rubik text-[#232321] text-xl lg:text-2xl font-semibold">
                              Collect in store
                           </h3>
                           <p className="opacity-80 text-[#232321] text-sm lg:text-base font-semibold">
                              Pay now, collect in store
                           </p>
                        </div>
                        <span className="font-rubik text-[#232321] text-[16px] lg:text-xl font-semibold">
                           Free
                        </span>
                     </div>
                  </section>
               </section>

               {/* Payment Method */}
               <section className="flex flex-col">
                  <h3 className="font-rubik text-2xl lg:text-[32px] font-semibold text-secondary_black mb-4 lg:mb-8">
                     Payment Method
                  </h3>
                  <section className="flex-col justify-start items-start gap-6 inline-flex w-full lg:w-[782px]">
                     {/* <div
                        className={`w-full p-4 rounded-xl lg:rounded-2xl flex justify-between items-start cursor-pointer transform transition-all duration-300 ${
                           selectedOptionPayment === "Momo e-wallet"
                              ? "bg-[#FAFAFA] shadow-lg border border-[#FAFAFA]"
                              : "border border-[#232321] hover:shadow-md"
                        }`}
                        onClick={() =>
                           handleOptionSelectPayment("Momo e-wallet")
                        }
                     >
                        <div className="flex justify-between gap-2">
                           <div className="lg:w-[684px]">
                              <h3 className="font-rubik text-[#232321] text-xl lg:text-2xl font-semibold">
                                 Momo e-wallet
                              </h3>
                              <p className="opacity-80 text-[#232321] text-sm lg:text-base font-semibold">
                                 Secure payment via Momo. Enter address for
                                 delivery time.
                              </p>
                           </div>
                           <img
                              src={icons.MomoIcon}
                              alt="Momo"
                              className="max-w-[58px]"
                           />
                        </div>
                     </div> */}
                     <div
                        className={`w-full p-4 rounded-xl flex justify-between items-start cursor-pointer transform transition-all duration-300 ${
                           selectedOptionPayment === "Bank QR Code"
                              ? "bg-[#FAFAFA] shadow-lg border border-[#FAFAFA]"
                              : "border border-[#232321] hover:shadow-md"
                        }`}
                        onClick={() =>
                           handleOptionSelectPayment("Bank QR Code")
                        }
                     >
                        <div>
                           <h3 className="font-rubik text-[#232321] text-xl lg:text-2xl font-semibold">
                              Bank QR Code
                           </h3>
                           <p className="opacity-80 text-[#232321] text-sm lg:text-base font-semibold">
                              Pay easily using your banking app's QR scan
                              feature. Fast and secure.
                           </p>
                        </div>
                        <img
                           src={icons.VisaIcon}
                           alt="Visa"
                           className="max-w-[58px] fill-black"
                        />
                     </div>
                     <div
                        className={`w-full p-4 rounded-xl flex justify-between items-start cursor-pointer transform transition-all duration-300 ${
                           selectedOptionPayment === "Cash on Delivery"
                              ? "bg-[#FAFAFA] shadow-lg border border-[#FAFAFA]"
                              : "border border-[#232321] hover:shadow-md"
                        }`}
                        onClick={() =>
                           handleOptionSelectPayment("Cash on Delivery")
                        }
                     >
                        <div>
                           <h3 className="font-rubik text-[#232321] text-xl lg:text-2xl font-semibold">
                              Cash on Delivery
                           </h3>
                           <p className="opacity-80 text-[#232321] text-sm lg:text-base font-semibold">
                              Pay cash upon pickup. Ideal for in-store orders.
                           </p>
                        </div>
                        <img
                           src={icons.CashIcon}
                           alt="Cash"
                           className="max-w-[58px]"
                        />
                     </div>
                  </section>
               </section>

               {/* Checkbox Section */}
               <section className="flex flex-col gap-4 lg:gap-6">
                  <label className="flex items-center">
                     <input
                        type="checkbox"
                        className="mr-2 w-4 h-4 outline-none border-2 border-gray-400 rounded-sm accent-[#1F1A24]"
                     />
                     <span className="text-secondary_black text-[16px] font-semibold">
                        My billing and delivery information are the same
                     </span>
                  </label>

                  <label className="flex items-center">
                     <input
                        type="checkbox"
                        className="mr-2 w-4 h-4 outline-none border-2 border-gray-400 rounded-sm accent-[#1F1A24]"
                     />
                     <span className="text-secondary_black text-[16px] font-semibold">
                        I'm 13+ year old
                     </span>
                  </label>

                  <div>
                     <p className="font-rubik text-secondary_black text-[16px] font-semibold">
                        Also want product updates with our newsletter?
                     </p>
                     <label className="flex items-center">
                        <input
                           type="checkbox"
                           className="mr-2 w-4 h-4 outline-none border-2 border-gray-400 rounded-sm accent-[#1F1A24]"
                        />
                        <span className="text-secondary_black text-[16px] font-semibold">
                           Yes, I'd like to receive emails about exclusive sales
                           and more.
                        </span>
                     </label>
                  </div>
               </section>

               {/* Review and Pay Button */}
               <button
                  className="w-full lg:w-[362px] bg-secondary_black flex justify-between lg:justify-center rounded-lg text-white px-4 py-[15.5px]
                    
                    transform transition duration-400 hover:bg-primary_blue uppercase hover:scale-[1.003] hover:text-white active:scale-[99%]"
                  onClick={handleOpenModal}
               >
                  <p className="font-rubik text-[14px] font-medium">
                     REVIEW AND PAY
                  </p>
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     width="16"
                     height="16"
                     viewBox="0 0 16 16"
                     fill="none"
                     className="block lg:hidden"
                  >
                     <path
                        d="M8.375 3.5L12.875 8L8.375 12.5M12.25 8H3.125"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                     />
                  </svg>
               </button>
            </section>
         </section>

         {/* Order Summary & Details */}
         <aside className="flex flex-col-reverse lg:flex-col gap-6 lg:gap-[47px] ml-2">
            {/* Order Summary */}
            <div className="bg-white rounded-3xl p-4 lg:p-6 w-full lg:w-[418px]">
               <h2 className="font-rubik text-[20px] lg:text-[32px] font-semibold text-[#232321] mb-2">
                  Order Summary
               </h2>
               <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                     <p className="text-[#232321] text-[16px] lg:text-xl font-semibold ">
                        {getCartCount()} ITEM{getCartCount() > 1 ? "S" : ""}
                     </p>
                     <p className="text-[16px] lg:text-xl font-semibold text-[#4a4a47]">
                        {currency}
                        {getCartAmount().toFixed(2)}
                     </p>
                  </div>
                  <div className="flex justify-between items-center">
                     <p className="text-[#232321] text-[16px] lg:text-xl font-semibold">
                        Delivery
                     </p>
                     <p className="text-[16px] lg:text-xl font-semibold text-[#4a4a47]">
                        {currency}
                        {deliveryFee.toFixed(2)}
                     </p>
                  </div>
                  <div className="flex justify-between items-center">
                     <p className="text-[#232321] text-[16px] lg:text-xl font-semibold">
                        Sales Tax
                     </p>
                     <p className="text-[16px] lg:text-xl font-semibold text-[#4a4a47]">
                        -
                     </p>
                  </div>
                  <div className="flex justify-between items-center">
                     <p className="font-rubik text-xl lg:text-[24px] font-semibold">
                        Total
                     </p>
                     <p className="font-rubik text-xl lg:text-[24px] font-semibold text-[#4a4a47]">
                        {currency}
                        {totalAmount.toFixed(2)}
                     </p>
                  </div>
               </div>
            </div>

            {/* Order Details */}
            <div className="bg-white p-6 rounded-2xl w-full lg:w-[418px]">
               <h2 className="font-rubik text-2xl font-semibold mb-6 leading-5">
                  Order Details
               </h2>
               <div className="flex flex-col gap-6">
                  {cartData.length > 0 ? (
                     cartData.map((item, index) => {
                        return (
                           <div key={index} className="flex gap-6 h-full">
                              <img
                                 className="rounded-xl lg:rounded-3xl object-cover max-w-[157px] h-[138px] w-[138px] border border-[#e6e6e6]"
                                 src={item.image}
                                 alt="Product Image"
                              />
                              <div className="flex flex-col justify-between flex-1">
                                 <div className="flex flex-col justify-between items-start">
                                    <div className="max-w-[350px]">
                                       <h3 className="font-rubik font-semibold text-[16px] lg:text-[20px] uppercase text-[#232321]">
                                          {item.name}
                                       </h3>
                                       <p className="opacity-80 text-[#4e4e4c] text-[14px] lg:text-[16px] font-semibold mb-2 lg:mb-2">
                                          {item.description}
                                       </p>
                                       <div className="flex justify-between lg:justify-start gap-2 lg:gap-10">
                                          <div className="flex gap-2 justify-center items-center">
                                             <p className="opacity-80 text-[#4e4e4c] text-[14px] lg:text-[16px] font-semibold ">
                                                Size {item.size}
                                             </p>
                                          </div>
                                          <div className="flex gap-2 justify-center items-center">
                                             <p className="opacity-80 text-[#4e4e4c] text-[14px] lg:text-[16px] font-semibold">
                                                Quantity {item.quantity}
                                             </p>
                                          </div>
                                       </div>
                                    </div>
                                    <p className="font-rubik text-[16px] my-2 lg:my-0 lg:text-[20px] font-semibold text-primary_blue">
                                       {currency}
                                       {item.price}
                                    </p>
                                 </div>
                              </div>
                           </div>
                        );
                     })
                  ) : (
                     <p className="text-center text-2xl font-medium font-rubik uppercase">
                        Cart is empty!
                     </p>
                  )}
               </div>
            </div>
         </aside>

         <Modal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onConfirm={handleConfirm}
            userData={userData}
         />
      </div>
   );
};

export default CheckOutPage;

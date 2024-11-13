import React, { useContext, useState } from "react";
import OrderDetails from "../Components/OrderDetails";
import { ShopConText } from "../context/ShopContext";

const CheckOutPage = () => {
  const [selectedOption, setSelectedOption] = useState("Standard Delivery");

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };
  const { cartItems, currency, getCartAmount, getCartCount, delivery_fee } = useContext(ShopConText);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];
    for (const productId in cartItems) {
      for (const size in cartItems[productId]) {
        if (cartItems[productId][size] > 0) {
          tempData.push({
            product_id: productId,
            size: size,
            quantity: cartItems[productId][size],
          });
        }
      }
    }
      setCartData(tempData);
    }, [cartItems]);
  return (
    <div className="Frame1511 h-auto justify-start items-center gap-12 p-6 lg:p-8 pl-6 lg:pl-20">
        {/* Contact & Order */}
        <section className="flex flex-col lg:flex-row gap-8">
          <section className="flex flex-col gap-8 w-full p-6 lg:p-8 rounded-lg">
            <section>
              <h2 className="text-neutral-800 text-xl font-semibold underline">Login and Checkout faster</h2>
            </section>

            {/* Contact Details */}
            <div>
              <h3 className="text-neutral-800 text-2xl lg:text-3xl font-semibold">Contact Details</h3>
              <p className="opacity-80 text-neutral-800 text-sm lg:text-base font-semibold">
                We will use these details to keep you informed about your delivery.
              </p>
              <input
                type="email"
                placeholder="Email"
                className="w-full lg:w-80 h-12 px-4 py-3 border border-gray-800 rounded-lg text-sm text-gray-700 bg-transparent"
              />
            </div>

            {/* Shipping Address */}
            <section className="Address h-72 flex-col justify-start items-start gap-8 inline-flex">
              <h3 className="text-neutral-800 text-2xl lg:text-3xl font-semibold">Shipping Address</h3>
              <section>
                <div className="flex flex-col md:flex-row gap-4 mt-2">
                  <input
                    type="text"
                    placeholder="First Name*"
                    className="w-full lg:w-80 h-12 px-4 py-3 border border-gray-800 rounded-lg text-sm text-gray-700 bg-transparent"
                  />
                  <input
                    type="text"
                    placeholder="Last Name*"
                    className="w-full lg:w-80 h-12 px-4 py-3 border border-gray-800 rounded-lg text-sm text-gray-700 bg-transparent"
                  />
                </div>
                <div className="relative mt-4">
                  <input
                    type="text"
                    placeholder="Find Delivery Address*"
                    className="w-full h-12 px-4 py-3 border border-gray-800 rounded-lg text-sm text-gray-700 bg-transparent"
                  />
                  <p className="text-neutral-700 text-xs mt-1">
                    Start typing your street address or zip code for suggestions
                  </p>
                </div>
                <div className="relative mt-4">
                  <input
                    type="tel"
                    placeholder="Phone Number*"
                    className="w-full lg:w-80 h-12 px-4 py-3 border border-gray-800 rounded-lg text-sm text-gray-700 bg-transparent"
                  />
                  <p className="text-xs text-gray-700 mt-1">E.g. (123) 456-7890</p>
                </div>
              </section>
            </section>
          </section>

          {/* Order Summary & Details */}
          <aside className="flex flex-col gap-8 w-full p-6 lg:p-8 rounded-2xl ml-2">
            {/* Order Summary*/}
            <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-lg">
              <h2 className="text-2xl font-semibold text-neutral-800 mb-4">Order Summary</h2>
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <p className="text-[#232321] text-[16px] lg:text-xl font-semibold ">
                        {getCartCount() + " "} ITEM
                    </p>
                    <p className="text-[16px] lg:text-xl font-semibold text-[#4a4a47]">
                        {currency}
                        {getCartAmount()}
                    </p>
                </div>
                <div className="flex justify-between items-center">
                    <p className="text-[#232321] text-[16px] lg:text-xl font-semibold">
                        Delivery
                    </p>
                    <p className="text-[16px] lg:text-xl font-semibold text-[#4a4a47]">
                        {currency}
                        {delivery_fee}
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
                        {getCartAmount() === 0
                            ? 0
                            : Number(getCartAmount()) +
                              Number(delivery_fee)}
                    </p>
                </div>
              </div>
            </div>

            {/* Order Details*/}
            <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-lg">
              <h2 className="text-neutral-800 text-2xl font-semibold font-['Rubik']">Order Details</h2>
              {cartData.map((item, index) => (
                <div key={index} className="flex flex-col lg:flex-row gap-6">
                  <img
                    className="w-40 rounded-3xl mx-auto lg:mx-0"
                    src="https://via.placeholder.com/139x158"
                    alt="Product"
                  />
                  <div className="flex-col justify-start items-start gap-4 flex">
                    <h3 className="text-neutral-800 text-xl font-semibold font-['Rubik']">
                      {item.product_id}
                    </h3>
                    <div className="w-full lg:w-96 h-12 flex-col justify-start items-start gap-1 flex">
                      <p className="opacity-80 text-neutral-800 text-base font-semibold font-['Open Sans']">
                        Size {item.size}
                      </p>
                      <p className="opacity-80 text-neutral-800 text-base font-semibold font-['Open Sans']">
                        Quantity {item.quantity}
                      </p>
                    </div>
                    <p className="text-indigo-500 text-xl font-semibold font-['Rubik']">
                      {currency} {/* Cập nhật giá thực tế ở đây */}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </aside>

        </section>

        {/* Delivery Options */}
        <section className="Delivery h-72 flex-col lg:w-3/5 gap-8 inline-flex pl-6 lg:pl-8">
          <h3 className="text-neutral-800 text-2xl lg:text-3xl font-semibold">Delivery Options</h3>
          <section className="Frame1519 h-52 flex-col justify-start items-start gap-6 inline-flex">
            <div
              className={`w-full p-4 rounded-xl flex justify-between items-start cursor-pointer ${
                selectedOption === "Standard Delivery" ? "bg-[#FAFAFA]" : "border border-[#232321]"
              }`}
              onClick={() => handleOptionSelect("Standard Delivery")}
            >
              <div>
                <h3 className="text-[#232321] text-xl lg:text-2xl font-semibold">Standard Delivery</h3>
                <p className="opacity-80 text-[#232321] text-sm lg:text-base font-semibold">
                  Enter your address to see when you'll get your order
                </p>
              </div>
              <span className="text-[#4A69E2] text-lg lg:text-xl font-semibold">$6.00</span>
            </div>
            <div
              className={`w-full p-4 rounded-xl flex justify-between items-start cursor-pointer ${
                selectedOption === "Collect in Store" ? "bg-[#FAFAFA]" : "border border-[#232321]"
              }`}
              onClick={() => handleOptionSelect("Collect in Store")}
            >
              <div>
                <h3 className="text-[#232321] text-xl lg:text-2xl font-semibold">Collect in store</h3>
                <p className="opacity-80 text-[#232321] text-sm lg:text-base font-semibold">
                  Pay now, collect in store
                </p>
              </div>
              <span className="text-[#232321] text-lg lg:text-xl font-semibold">Free</span>
            </div>
          </section>
        </section>

        {/* Checkbox Section */}
        <section className="mt-4 space-y-2 pl-6 lg:pl-8">
          <label className="flex items-center gap-2 text-neutral-800 text-sm lg:text-base font-semibold">
            <input type="checkbox" className="h-4 w-4" />
            My billing and delivery information are the same
          </label>
          <label className="flex items-center gap-2 text-gray-700">
            <input type="checkbox" className="h-4 w-4" />
            I’m 13+ years old
          </label>
          <label className="flex items-center gap-2 text-gray-700">
            <input type="checkbox" className="h-4 w-4" />
            Yes, I’d like to receive emails about exclusive sales and more.
          </label>
        </section>

        {/* Review and Pay Button */}
        <section className="Button w-96 h-12 flex-col justify-center items-center gap-2.5 inline-flex mt-6 pl-6 lg:pl-8 mb-6">
          <div className="StyleLayer self-stretch h-12 px-4 py-2 bg-neutral-800 rounded-lg justify-center items-center gap-1 inline-flex">
            <button className="Button text-white text-sm font-medium font-['Rubik'] uppercase tracking-tight">
              REVIEW AND PAY
            </button>
          </div>
        </section>
    </div>
  );
};

export default CheckOutPage;

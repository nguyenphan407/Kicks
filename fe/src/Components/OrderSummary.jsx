import React, { useState } from "react";
import { products } from "../assets/assets";
import { FiTrash, FiHeart, FiChevronDown } from "react-icons/fi";

const OrderSummary = () => {
  const product = products[0];
  const availableSizes = product.size;
  const availableQuantities = [1, 2, 3, 4, 5];

  const [selectedSize, setSelectedSize] = useState("38");
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [showSizeOptions, setShowSizeOptions] = useState(false);
  const [showQuantityOptions, setShowQuantityOptions] = useState(false);

  const toggleSizeOptions = () => setShowSizeOptions(!showSizeOptions);
  const toggleQuantityOptions = () =>
    setShowQuantityOptions(!showQuantityOptions);

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    setShowSizeOptions(false);
  };

  const handleQuantitySelect = (quantity) => {
    setSelectedQuantity(quantity);
    setShowQuantityOptions(false);
  };

  return (
    <div className="w-full h-full flex justify-start items-center gap-12">
      <div className="p-6 bg-gray-100 rounded-lg flex flex-col justify-start items-start gap-12">
        <div className="w-full flex flex-col justify-start items-start gap-2">
          <div className="text-2xl font-semibold text-gray-900">Your Bag</div>
          <div className="w-full text-base text-gray-900 opacity-80">
            Items in your bag are not reserved—check out now to make them yours.
          </div>
        </div>

        <div className="flex justify-start items-start gap-6">
          <img
            className="w-52 h-56 rounded-lg"
            src={product.image[0]}
            alt="Product"
          />

          <div className="flex flex-col justify-start items-start gap-12">
            <div className="flex justify-start items-start gap-20">
              <div className="w-80 flex flex-col justify-start items-start gap-5">
                <div className="flex flex-col justify-start items-start gap-2">
                  <div className="text-xl font-semibold text-gray-900">
                    DROPSET TRAINER SHOES
                  </div>
                  <div className="flex flex-col justify-start items-start gap-2">
                    <div className="w-80 text-lg font-semibold text-gray-900 opacity-80">
                      Men's Road Running Shoes
                    </div>
                    <div className="w-80 text-lg font-semibold text-gray-900 opacity-80">
                      Enamel Blue/ University White
                    </div>
                  </div>
                </div>

                {/* Size Selection */}
                <div className="flex justify-start items-center gap-10">
                  <div
                    className="flex justify-start items-center gap-2 cursor-pointer"
                    onClick={toggleSizeOptions}
                  >
                    <div className="text-lg font-semibold text-gray-900 opacity-80">
                      Size {selectedSize}
                    </div>
                    <FiChevronDown />
                    {showSizeOptions && (
                      <div className="absolute bg-white shadow-md rounded-lg mt-2">
                        {availableSizes.map((size) => (
                          <div
                            key={size}
                            className="p-2 cursor-pointer hover:bg-gray-100"
                            onClick={() => handleSizeSelect(size)}
                          >
                            {size}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Quantity Selection */}
                  <div
                    className="flex justify-start items-center gap-2 cursor-pointer"
                    onClick={toggleQuantityOptions}
                  >
                    <div className="text-lg font-semibold text-gray-900 opacity-80">
                      Quantity {selectedQuantity}
                    </div>
                    <FiChevronDown />
                    {showQuantityOptions && (
                      <div className="absolute bg-white shadow-md rounded-lg mt-2">
                        {availableQuantities.map((qty) => (
                          <div
                            key={qty}
                            className="p-2 cursor-pointer hover:bg-gray-100"
                            onClick={() => handleQuantitySelect(qty)}
                          >
                            {qty}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="text-2xl font-semibold text-blue-600">
                ${product.price.toFixed(2)}
              </div>
            </div>
            <div className="flex justify-start items-center gap-6">
              <div className="w-8 h-8 relative">
                <FiHeart />
              </div>
              <div className="w-8 h-8 relative">
                <FiTrash />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-start items-start gap-6">
        <div className="h-56 flex flex-col justify-start items-start gap-6">
          <div className="text-2xl font-semibold text-gray-900">
            Order Summary
          </div>
          <div className="flex flex-col justify-start items-start gap-4">
            <div className="w-96 flex justify-between items-start">
              <div className="text-lg font-semibold text-gray-900">
                {selectedQuantity} ITEM
              </div>
              <div className="text-lg font-semibold text-gray-900 opacity-80">
                ${selectedQuantity * product.price.toFixed(2)}
              </div>
            </div>
            <div className="w-96 flex justify-between items-start">
              <div className="text-lg font-semibold text-gray-900">
                Delivery
              </div>
              <div className="text-lg font-semibold text-gray-900 opacity-80">
                $6.99
              </div>
            </div>
            <div className="w-96 flex justify-between items-start">
              <div className="text-lg font-semibold text-gray-900">
                Sales Tax
              </div>
              <div className="text-lg font-semibold text-gray-900 opacity-80">
                -
              </div>
            </div>
            <div className="w-96 flex justify-between items-start">
              <div className="text-xl font-semibold text-gray-900">Total</div>
              <div className="text-xl font-semibold text-gray-900 opacity-80">
                ${(selectedQuantity * product.price + 6.99).toFixed(2)}
              </div>
            </div>
          </div>
        </div>
        <div className="h-12 flex flex-col justify-start items-start gap-2">
          <button className="w-full h-12 px-4 py-2 text-center text-white bg-blue-600 rounded-lg">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;

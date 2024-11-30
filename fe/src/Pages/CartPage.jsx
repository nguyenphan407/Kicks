import React, { useContext, useEffect, useState } from "react";
import MayLike from "../Components/Product/MayLike";
import { images } from "../assets/assets";
import { ShopConText } from "../context/ShopContext";
import { Link, NavLink } from "react-router-dom";
import cartApi from "../apis/cartApi";
import axiosClient from "../apis/axiosClient";

const CartPage = () => {
    const {
        currency,
        updateQuantity,
        getCartAmount,
        getCartCount,
        delivery_fee,
        navigate,
        token,
        cartData,
        setCartData,
        removeCartItem,
        cartChanged,
    } = useContext(ShopConText);

    useEffect(() => {
        getCartAmount();
        getCartCount();
    }, [cartChanged]);


    return (
        <div>
            {/* Phần introduce */}
            <div className="container my-6">
                <div className="min-w[782px] flex flex-col gap-2 mb-6 lg:mb-8">
                    <h2 className="font-rubik text-[24px] lg:text-[32px] font-semibold text-[#232321]">
                        Saving to celebrate
                    </h2>
                    <p className="text-xs lg:text-[14px] font-semibold opacity-80 text-[#232321]">
                        Enjoy up to 60% off thousands of styles during the End
                        of Year sale - while suppiles last. No code needed.
                    </p>
                    <div className="flex space-x-2">
                        <NavLink to="/login">
                            <p className="underline text-[14px] lg:text-[16px] font-semibold opacity-80 text-[#232321]">
                                Join us
                            </p>
                        </NavLink>
                        <p className=" text-[14px] lg:text-[16px] font-semibold opacity-80 text-[#232321]">
                            or
                        </p>
                        <NavLink to="/register">
                            <p className="underline text-[14px] lg:text-[16px] font-semibold opacity-80 text-[#232321]">
                                Sign-in
                            </p>
                        </NavLink>
                    </div>
                </div>

                {/* Phần Your Bag & Order Summary */}
                <div className="flex flex-col lg:flex-row justify-between gap-6 lg:gap-[47px] mb-6 lg:mb-10">
                    {/* Your Bag */}
                    <div className="rounded-2xl p-6 bg-[#FAFAFA] lg:min-w-[781px]">
                        {/* Heading */}
                        <div className="mb-2 lg:mb-12">
                            <h2 className="font-rubik text-[20px] lg:text-[32px] font-semibold text-[#232321] mb-2">
                                Your Bag
                            </h2>
                            <p className="opacity-80 text-[14px] text-[16] font-normal text-[#232321]">
                                Items in your bag not reserved- check out now to
                                make them yours.
                            </p>
                            {/* {console.log(cartData)} */}
                        </div>
                        <div>
                            {/* Phần Product Order */}
                            <div className="flex flex-col gap-6">
                                {cartData.length > 0 ? (
                                    cartData.map((item, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className="flex gap-6"
                                            >
                                                <img
                                                    className="rounded-xl lg:rounded-3xl object-cover w-[157px] h-[150px] lg:w-[207px] lg:h-[207px] border border-[#e6e6e6]"
                                                    src={item.image}
                                                    alt="Product Image"
                                                />
                                                <div className="flex flex-col justify-between flex-1">
                                                    <div className="flex flex-col lg:flex-row justify-between items-start">
                                                        <div className="max-w-[350px]">
                                                            <h3 className="font-rubik font-semibold text-[16px] lg:text-[24px] uppercase text-[#232321] ]">
                                                                {item.name}
                                                            </h3>
                                                            <p className="opacity-80 text-[#4e4e4c] text-[14px] lg:text-[20px] font-semibold mb-2 lg:mb-5">
                                                                {
                                                                    item.description
                                                                }
                                                            </p>
                                                            <div className="flex justify-between ">
                                                                <div className="flex gap-2 justify-center items-center">
                                                                    <p className="opacity-80 text-[#4e4e4c] text-[14px] lg:text-[20px] font-semibold ">
                                                                        Size
                                                                    </p>
                                                                    <input
                                                                        className=" max-w-[50px] bg-transparent opacity-80 text-[#4e4e4c] text-[14px] lg:text-[20px] font-semibold"
                                                                        type="number"
                                                                        min={38}
                                                                        max={47}
                                                                        defaultValue={
                                                                            item.size
                                                                        }
                                                                        disabled
                                                                    />
                                                                </div>
                                                                <div className="flex gap-2 justify-center items-center">
                                                                    <p className="opacity-80 text-[#4e4e4c] text-[14px] lg:text-[20px] font-semibold">
                                                                        Quantity
                                                                    </p>
                                                                    <input
                                                                        className=" max-w-[50px] bg-transparent opacity-80 text-[#4e4e4c] text-[14px] lg:text-[20px] font-semibold"
                                                                        type="number"
                                                                        min={1}
                                                                        max={99}
                                                                        defaultValue={
                                                                            item.quantity
                                                                        }
                                                                        // Nếu value khác rỗng hoặc khác 0 thì mới cập nhật quantity trong ShopConText
                                                                        onChange={(e) =>e.target.value ==="" ||e.target.value === "0"? null : updateQuantity(item.cart_id,item.size,Number(e.target.value))}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <p className="font-rubik text-xl my-2 lg:my-0 lg:text-[24px] font-semibold text-primary_blue">
                                                            {currency}
                                                            {item.price}
                                                        </p>
                                                    </div>
                                                    <div className="flex gap-4 lg:gap-6">
                                                        <button className="">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="33"
                                                                height="32"
                                                                viewBox="0 0 33 32"
                                                                fill="none"
                                                                className="w-6 h-6 lg:w-8 lg:h-8 hover:scale-105 transition-all active:scale-95"
                                                            >
                                                                <path
                                                                    d="M22.8765 5C18.819 5 16.819 9 16.819 9C16.819 9 14.819 5 10.7615 5C7.464 5 4.85275 7.75875 4.819 11.0506C4.75025 17.8837 10.2396 22.7431 16.2565 26.8269C16.4224 26.9397 16.6184 27.0001 16.819 27.0001C17.0196 27.0001 17.2156 26.9397 17.3815 26.8269C23.3977 22.7431 28.8871 17.8837 28.819 11.0506C28.7852 7.75875 26.174 5 22.8765 5V5Z"
                                                                    stroke="#232321"
                                                                    strokeWidth="1.5"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                />
                                                            </svg>
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                removeCartItem(
                                                                    item.cart_id
                                                                )
                                                            }
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="33"
                                                                height="32"
                                                                viewBox="0 0 33 32"
                                                                fill="transparent"
                                                                className="w-6 h-6 lg:w-8 lg:h-8 hover:scale-105 transition-all active:scale-95"
                                                            >
                                                                <path
                                                                    d="M27.8184 9L26.0265 26.2337C25.9692 26.7203 25.7353 27.169 25.3692 27.4946C25.0031 27.8201 24.5302 28 24.0402 28H9.59711C9.10716 28 8.63426 27.8201 8.26813 27.4946C7.90201 27.169 7.66812 26.7203 7.61086 26.2337L5.81836 9"
                                                                    stroke="#232321"
                                                                    strokeWidth="1.5"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                />
                                                                <path
                                                                    d="M29.8184 4H3.81836C3.26607 4 2.81836 4.44772 2.81836 5V8C2.81836 8.55228 3.26607 9 3.81836 9H29.8184C30.3706 9 30.8184 8.55228 30.8184 8V5C30.8184 4.44772 30.3706 4 29.8184 4Z"
                                                                    stroke="#232321"
                                                                    strokeWidth="1.5"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                />
                                                                <path
                                                                    d="M20.3184 15L13.3184 22M20.3184 22L13.3184 15"
                                                                    stroke="#232321"
                                                                    strokeWidth="1.5"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                />
                                                            </svg>
                                                        </button>
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
                    </div>
                    {/* Order Summary */}
                    <div className="bg-white rounded-2xl lg:bg-transparent p-4 lg:p-0 lg:w-[418px]">
                        <h2 className="font-rubik text-[20px] lg:text-[32px] font-semibold text-[#232321] mb-2">
                            Order Summary
                        </h2>
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
                        <button
                            className="font-rubik text-[14px] font-medium w-full bg-secondary_black my-4 lg:my-6 py-4 px-4 text-white rounded-lg
                            transform transition duration-400 hover:bg-primary_blue uppercase hover:scale-[1.003] hover:text-white active:scale-[99%]"
                            onClick={() => navigate("/checkout")}
                        >
                            Checkout
                        </button>
                    </div>
                </div>
                {/* You may also like */}
                <MayLike />
            </div>
        </div>
    );
};

export default CartPage;

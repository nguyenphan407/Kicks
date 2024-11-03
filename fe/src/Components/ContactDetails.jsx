import React, { useState } from "react";
import { products } from "../assets/assets";

const ContactDetails = () => {
  return (
    <div className="w-full h-full flex justify-start items-center gap-12">
      <div className="inline-flex flex-col justify-start items-start gap-8">
        <div className="text-[#232321] text-xl font-semibold font-['Open_Sans'] underline">
          Login and Checkout faster
        </div>

        <div className="flex flex-col justify-start items-start gap-8">
          <div className="flex flex-col justify-start items-start gap-2">
            <div className="text-[#232321] text-3xl font-semibold font-['Rubik']">
              Contact Details
            </div>
            <div className="w-full opacity-80 text-[#232321] text-base font-semibold font-['Open_Sans']">
              We will use these details to keep you inform about your delivery.
            </div>
          </div>

          <div className="flex flex-col justify-start items-start gap-2">
            <div className="w-full">
              <input
                placeholder="Email"
                className="w-full h-12 px-4 py-2.5 rounded-lg border border-[#232321] text-base font-normal font-['Inter'] text-[#79767C] tracking-wide"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-start items-start gap-8">
          <div className="text-[#232321] text-3xl font-semibold font-['Rubik']">
            Shipping Address
          </div>

          <div className="flex flex-col justify-start items-start gap-5">
            <div className="flex justify-start items-start gap-5">
              <div className="w-[342px] flex flex-col gap-2">
                <input
                  placeholder="First Name"
                  className="w-full h-12 px-4 py-2.5 rounded-lg border border-[#232321] text-base font-normal font-['Inter'] text-[#79767C] tracking-wide"
                />
              </div>

              <div className="w-[342px] flex flex-col gap-2">
                <input
                  placeholder="Last Name"
                  className="w-full h-12 px-4 py-2.5 rounded-lg border border-[#232321] text-base font-normal font-['Inter'] text-[#79767C] tracking-wide"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <input
                placeholder="Delivery address"
                className="w-full h-12 px-4 py-2.5 rounded-lg border border-[#232321] text-base font-normal font-['Inter'] text-[#79767C] tracking-wide"
              />
              <div className="text-[#36323B] text-xs font-normal font-['Inter'] tracking-wide">
                Start typing your street address or zip code for suggestion
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <input
                placeholder="Phone number"
                className="w-full h-12 px-4 py-2.5 rounded-lg border border-[#232321] text-base font-normal font-['Inter'] text-[#79767C] tracking-wide"
              />
              <div className="text-[#36323B] text-xs font-normal font-['Inter'] tracking-wide">
                E.g. (123) 456-7890
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="inline-flex flex-col justify-center items-start gap-12">
        <div className="p-6 bg-[#FAFAFA] rounded-3xl flex flex-col gap-6">
          <div className="flex flex-col gap-6">
            <div className="text-[#232321] text-3xl font-semibold font-['Rubik']">
              Order Summary
            </div>

            <div className="flex flex-col gap-4">
              <div className="w-[418px] flex justify-between items-start">
                <div className="text-[#232321] text-xl font-semibold font-['Open_Sans']">
                  1 ITEM
                </div>
                <div className="opacity-80 text-[#232321] text-xl font-semibold font-['Open_Sans']">
                  $130.00
                </div>
              </div>

              <div className="w-[418px] flex justify-between items-start">
                <div className="text-[#232321] text-xl font-semibold font-['Open_Sans']">
                  Delivery
                </div>
                <div className="opacity-80 text-[#232321] text-xl font-semibold font-['Open_Sans']">
                  $6.99
                </div>
              </div>

              <div className="w-[418px] flex justify-between items-start">
                <div className="text-[#232321] text-xl font-semibold font-['Open_Sans']">
                  Sales Tax
                </div>
                <div className="opacity-80 text-[#232321] text-xl font-semibold font-['Open_Sans']">
                  -
                </div>
              </div>

              <div className="w-[418px] flex justify-between items-start">
                <div className="text-[#232321] text-2xl font-semibold font-['Rubik']">
                  Total
                </div>
                <div className="opacity-80 text-[#232321] text-2xl font-semibold font-['Rubik']">
                  $130.00
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 bg-[#FAFAFA] rounded-xl flex flex-col gap-6">
          <div className="w-full">
            <div className="text-[#232321] text-2xl font-semibold font-['Rubik']">
              Order Details
            </div>
          </div>

          <div className="w-full flex gap-6">
            <img
              className="w-[138px] rounded-3xl"
              src={products[0].image[0]}
              alt="Product"
            />

            <div className="flex-1 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <div className="text-[#232321] text-xl font-semibold font-['Rubik']">
                  DROPSET TRAINER SHOES
                </div>
                <div className="opacity-80 text-[#232321] text-base font-semibold font-['Open_Sans']">
                  Men's Road Running Shoes
                </div>
                <div className="opacity-80 text-[#232321] text-base font-semibold font-['Open_Sans']">
                  Enamel Blue/ University White
                </div>
              </div>

              <div className="flex items-center gap-10">
                <div className="opacity-80 text-[#232321] text-base font-semibold font-['Open_Sans']">
                  Size 10
                </div>
                <div className="opacity-80 text-[#232321] text-base font-semibold font-['Open_Sans']">
                  Quantity 1
                </div>
              </div>

              <div className="text-[#4A69E2] text-xl font-semibold font-['Rubik']">
                $130.00
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;

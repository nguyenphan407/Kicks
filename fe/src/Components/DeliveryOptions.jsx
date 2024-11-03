import React from "react";

const DeliveryOptions = () => {
  return (
    <div className="w-full h-full inline-flex flex-col justify-start items-start gap-8">
      <div className="text-[#232321] text-3xl font-semibold font-['Rubik']">
        Delivery Options
      </div>

      <div className="flex flex-col justify-start items-start gap-6">
        <div className="w-[782px] p-4 bg-[#FAFAFA] rounded-xl inline-flex justify-start items-start gap-2">
          <div className="flex-1 inline-flex flex-col justify-start items-start gap-2">
            <div className="text-[#232321] text-2xl font-semibold font-['Rubik']">
              Standard Delivery
            </div>
            <div className="w-[782px] opacity-80 text-[#232321] text-base font-semibold font-['Open_Sans']">
              Enter your address to see when you'll get your order
            </div>
          </div>
          <div className="text-[#4A69E2] text-xl font-semibold font-['Rubik']">
            $6.00
          </div>
        </div>

        <div className="w-[782px] p-4 rounded-xl border border-[#232321] inline-flex justify-start items-start gap-2">
          <div className="flex-1 inline-flex flex-col justify-start items-start gap-2">
            <div className="text-[#232321] text-2xl font-semibold font-['Rubik']">
              Collect in store
            </div>
            <div className="w-full opacity-80 text-[#232321] text-base font-semibold font-['Open_Sans']">
              Pay now, collect in store
            </div>
          </div>
          <div className="text-[#232321] text-xl font-semibold font-['Rubik']">
            Free
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryOptions;

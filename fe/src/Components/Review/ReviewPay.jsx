import React, { useState } from "react";

const CheckboxItem = ({ children }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div
      className="flex items-start justify-start gap-2 cursor-pointer"
      onClick={handleCheckboxChange}
    >
      <div className="relative h-6 w-6">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          className="absolute left-0 top-0 h-6 w-6 opacity-0 cursor-pointer"
        />
        <div className="absolute left-[4.8px] top-[4.8px] h-[14.4px] w-[14.4px] bg-white" />
        <div className="absolute left-0 top-0 h-6 w-6">
          <img
            className={`absolute left-[3px] top-[3px] h-[18px] w-[18px] ${
              isChecked ? "opacity-100" : "opacity-0"
            }`}
            src="/api/placeholder/18/18"
            alt="checkbox"
          />
        </div>
      </div>
      <div className="w-[698px] break-words text-base font-semibold text-[#232321] font-['Open_Sans']">
        {children}
      </div>
    </div>
  );
};

const ReviewPay = () => {
  return (
    <div>
      <div className="w-[480px] flex gap-2 mt-2">
        <input type="checkbox" className="w-6 h-6" />
        <p className="flex-1 text-base font-semibold font-['Open_Sans'] text-[#232321]">
          My billing and delivery information are the sames
        </p>
      </div>
      <div className="w-[480px] flex gap-2 mt-2">
        <input type="checkbox" className="w-6 h-6" />
        <p className="flex-1 text-base font-semibold font-['Open_Sans'] text-[#232321]">
          I'm 13+ year old
        </p>
      </div>
      <p className="font-bold mt-4">
        Also want product updates with our newsletter?
      </p>
      <div className="w-[480px] flex gap-2 ">
        <input type="checkbox" className="w-6 h-6" />
        <p className="flex-1 text-base font-semibold font-['Open_Sans'] text-[#232321]">
          Yes, I'd like to receive emails about exclusive sales and more.
        </p>
      </div>
    </div>
  );
};

export default ReviewPay;

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
    <div className="flex w-full flex-col items-start justify-start gap-6">
      <CheckboxItem>
        My billing and delivery information are the same
      </CheckboxItem>

      <CheckboxItem>I'm 13+ years old</CheckboxItem>

      <div className="flex flex-col items-start justify-start gap-2">
        <div className="break-words text-base font-semibold text-[#232321] font-['Rubik']">
          Also want product updates with our newsletter?
        </div>

        <CheckboxItem>
          Yes, I'd like to receive emails about exclusive sales and more.
        </CheckboxItem>
      </div>
    </div>
  );
};

export default ReviewPay;

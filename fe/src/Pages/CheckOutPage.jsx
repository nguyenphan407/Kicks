import React from "react";
import ContactDetails from "../Components/ContactDetails";
import DeliveryOptions from "../Components/DeliveryOptions";
import ReviewPay from "../Components/Review/ReviewPay";
import RPButton from "../Components/RPButton";

const CheckOutPage = () => {
  return (
    <div className="m-4">
      <div className="container mx-auto">
        <ContactDetails />
      </div>
      <div className="container mx-auto">
        <DeliveryOptions />
      </div>
      <div className="container mx-auto">
        <ReviewPay />
      </div>
      <div className="container mx-auto">
        <RPButton />
      </div>
    </div>
  );
};

export default CheckOutPage;

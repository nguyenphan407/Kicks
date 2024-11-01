import React from "react";
import MayLike from "../Components/MayLike";
import { images } from "../assets/assets";
import OrderSummary from "../Components/OrderSummary";
const CartPage = () => {
  return (
    <div>
      <div className="container mx-auto">
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 16,
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            gap: 8,
            display: "inline-flex",
            margin: "10px",
          }}
        >
          <div
            style={{
              color: "#232321",
              fontSize: 32,
              fontFamily: "Rubik",
              fontWeight: "600",
              wordWrap: "break-word",
            }}
          >
            Saving to celebrate{" "}
          </div>
          <div
            style={{
              alignSelf: "stretch",
              opacity: 0.8,
              color: "#232321",
              fontSize: 14,
              fontFamily: "Open Sans",
              fontWeight: "600",
              wordWrap: "break-word",
            }}
          >
            Enjoy up to 60% off thousands of styles during the End of Year sale
            - while suppiles last. No code needed.
          </div>
          <div style={{ alignSelf: "stretch", opacity: 0.8 }}>
            <span
              style={{
                color: "#232321",
                fontSize: 16,
                fontFamily: "Open Sans",
                fontWeight: "600",
                textDecoration: "underline",
                wordWrap: "break-word",
              }}
            >
              Join us{" "}
            </span>
            <span
              style={{
                color: "#232321",
                fontSize: 16,
                fontFamily: "Open Sans",
                fontWeight: "600",
                wordWrap: "break-word",
              }}
            >
              {" "}
              or{" "}
            </span>
            <span
              style={{
                color: "#232321",
                fontSize: 16,
                fontFamily: "Open Sans",
                fontWeight: "600",
                textDecoration: "underline",
                wordWrap: "break-word",
              }}
            >
              Sign-in
            </span>
          </div>
        </div>
      </div>
      <div className="container mx-auto">
        <OrderSummary />
      </div>
      <div className="container mx-auto">
        <MayLike />
      </div>
    </div>
  );
};

export default CartPage;

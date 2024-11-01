import React, { useContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { FiTrash, FiHeart, FiChevronDown } from "react-icons/fi";
const OrderSummary = () => {
  const product = products[0];
  const availableSizes = product.size; // Define available sizes
  const availableQuantities = [1, 2, 3, 4, 5]; // Define available quantities

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
    <div
      style={{
        width: "100%",
        height: "100%",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 47,
        display: "inline-flex",
      }}
    >
      <div
        style={{
          padding: 24,
          background: "#FAFAFA",
          borderRadius: 16,
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          gap: 48,
          display: "inline-flex",
        }}
      >
        <div
          style={{
            alignSelf: "stretch",
            height: 68,
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            gap: 8,
            display: "flex",
          }}
        >
          <div
            style={{
              color: "#232321",
              fontSize: 32,
              fontFamily: "Rubik",
              fontWeight: "600",
            }}
          >
            Your Bag
          </div>
          <div
            style={{
              alignSelf: "stretch",
              opacity: 0.8,
              color: "#232321",
              fontSize: 16,
              fontFamily: "Open Sans",
              fontWeight: "400",
            }}
          >
            Items in your bag not reserved- check out now to make them yours.
          </div>
        </div>

        <div
          style={{
            justifyContent: "flex-start",
            alignItems: "flex-start",
            gap: 24,
            display: "inline-flex",
          }}
        >
          <img
            style={{ width: 207.82, height: 225, borderRadius: 24 }}
            src={product.image[0]}
            alt="Product"
          />

          <div
            style={{
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              gap: 48,
              display: "inline-flex",
            }}
          >
            <div
              style={{
                justifyContent: "flex-start",
                alignItems: "flex-start",
                gap: 80,
                display: "inline-flex",
              }}
            >
              <div
                style={{
                  width: 325,
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  gap: 20,
                  display: "inline-flex",
                }}
              >
                <div
                  style={{
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    gap: 8,
                    display: "flex",
                  }}
                >
                  <div
                    style={{
                      color: "#232321",
                      fontSize: 24,
                      fontFamily: "Rubik",
                      fontWeight: "600",
                    }}
                  >
                    DROPSET TRAINER SHOES
                  </div>
                  <div
                    style={{
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      alignItems: "flex-start",
                      gap: 8,
                      display: "flex",
                    }}
                  >
                    <div
                      style={{
                        width: 325,
                        opacity: 0.8,
                        color: "#232321",
                        fontSize: 20,
                        fontFamily: "Open Sans",
                        fontWeight: "600",
                      }}
                    >
                      Men’s Road Running Shoes
                    </div>
                    <div
                      style={{
                        width: 325,
                        opacity: 0.8,
                        color: "#232321",
                        fontSize: 20,
                        fontFamily: "Open Sans",
                        fontWeight: "600",
                      }}
                    >
                      Enamel Blue/ University White
                    </div>
                  </div>
                </div>

                {/* Size Selection */}
                <div
                  style={{
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: 40,
                    display: "inline-flex",
                  }}
                >
                  <div
                    style={{
                      justifyContent: "flex-start",
                      alignItems: "center",
                      gap: 10,
                      display: "flex",
                    }}
                    onClick={toggleSizeOptions}
                  >
                    <div
                      style={{
                        opacity: 0.8,
                        color: "#232321",
                        fontSize: 20,
                        fontFamily: "Open Sans",
                        fontWeight: "600",
                      }}
                    >
                      Size {selectedSize}
                    </div>
                    <FiChevronDown />
                    {showSizeOptions && (
                      <div
                        style={{
                          position: "absolute",
                          background: "#fff",
                          boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
                          borderRadius: 8,
                          marginTop: 10,
                        }}
                      >
                        {availableSizes.map((size) => (
                          <div
                            key={size}
                            style={{ padding: 8, cursor: "pointer" }}
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
                    style={{
                      justifyContent: "flex-start",
                      alignItems: "center",
                      gap: 10,
                      display: "flex",
                    }}
                    onClick={toggleQuantityOptions}
                  >
                    <div
                      style={{
                        opacity: 0.8,
                        color: "#232321",
                        fontSize: 20,
                        fontFamily: "Open Sans",
                        fontWeight: "600",
                      }}
                    >
                      Quantity {selectedQuantity}
                    </div>
                    <FiChevronDown />
                    {showQuantityOptions && (
                      <div
                        style={{
                          position: "absolute",
                          background: "#fff",
                          boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
                          borderRadius: 8,
                          marginTop: 10,
                        }}
                      >
                        {availableQuantities.map((qty) => (
                          <div
                            key={qty}
                            style={{ padding: 8, cursor: "pointer" }}
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

              <div
                style={{
                  color: "#4A69E2",
                  fontSize: 24,
                  fontFamily: "Rubik",
                  fontWeight: "600",
                }}
              >
                ${product.price.toFixed(2)}
              </div>
            </div>
            <div
              style={{
                justifyContent: "flex-start",
                alignItems: "center",
                gap: 24,
                display: "inline-flex",
              }}
            >
              <div style={{ width: 32, height: 32, position: "relative" }}>
                <FiHeart />
              </div>
              <div style={{ width: 32, height: 32, position: "relative" }}>
                <FiTrash />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          gap: 24,
          display: "inline-flex",
        }}
      >
        <div
          style={{
            height: 219,
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            gap: 24,
            display: "flex",
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
            Order Summary
          </div>
          <div
            style={{
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              gap: 16,
              display: "flex",
            }}
          >
            <div
              style={{
                width: 418,
                justifyContent: "space-between",
                alignItems: "flex-start",
                display: "inline-flex",
              }}
            >
              <div
                style={{
                  color: "#232321",
                  fontSize: 20,
                  fontFamily: "Open Sans",
                  fontWeight: "600",
                  wordWrap: "break-word",
                }}
              >
                1 ITEM
              </div>
              <div
                style={{
                  opacity: 0.8,
                  color: "#232321",
                  fontSize: 20,
                  fontFamily: "Open Sans",
                  fontWeight: "600",
                  wordWrap: "break-word",
                }}
              >
                $130.00
              </div>
            </div>
            <div
              style={{
                width: 418,
                justifyContent: "space-between",
                alignItems: "flex-start",
                display: "inline-flex",
              }}
            >
              <div
                style={{
                  color: "#232321",
                  fontSize: 20,
                  fontFamily: "Open Sans",
                  fontWeight: "600",
                  wordWrap: "break-word",
                }}
              >
                Delivery{" "}
              </div>
              <div
                style={{
                  opacity: 0.8,
                  color: "#232321",
                  fontSize: 20,
                  fontFamily: "Open Sans",
                  fontWeight: "600",
                  wordWrap: "break-word",
                }}
              >
                $6.99
              </div>
            </div>
            <div
              style={{
                width: 418,
                justifyContent: "space-between",
                alignItems: "flex-start",
                display: "inline-flex",
              }}
            >
              <div
                style={{
                  color: "#232321",
                  fontSize: 20,
                  fontFamily: "Open Sans",
                  fontWeight: "600",
                  wordWrap: "break-word",
                }}
              >
                Sales Tax
              </div>
              <div
                style={{
                  opacity: 0.8,
                  color: "#232321",
                  fontSize: 20,
                  fontFamily: "Open Sans",
                  fontWeight: "600",
                  wordWrap: "break-word",
                }}
              >
                -
              </div>
            </div>
            <div
              style={{
                width: 418,
                justifyContent: "space-between",
                alignItems: "flex-start",
                display: "inline-flex",
              }}
            >
              <div
                style={{
                  color: "#232321",
                  fontSize: 24,
                  fontFamily: "Rubik",
                  fontWeight: "600",
                  wordWrap: "break-word",
                }}
              >
                Total
              </div>
              <div
                style={{
                  opacity: 0.8,
                  color: "#232321",
                  fontSize: 24,
                  fontFamily: "Rubik",
                  fontWeight: "600",
                  wordWrap: "break-word",
                }}
              >
                $136.99
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            height: 48,
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            gap: 10,
            display: "flex",
          }}
        >
          <div
            style={{
              alignSelf: "stretch",
              height: 48,
              paddingLeft: 16,
              paddingRight: 16,
              paddingTop: 8,
              paddingBottom: 8,
              background: "#232321",
              borderRadius: 8,
              justifyContent: "space-between",
              alignItems: "center",
              display: "inline-flex",
            }}
          >
            <div
              style={{
                color: "white",
                fontSize: 14,
                fontFamily: "Rubik",
                fontWeight: "500",
                textTransform: "uppercase",
                letterSpacing: 0.25,
                wordWrap: "break-word",
              }}
            >
              Checkout
            </div>
          </div>
        </div>
        <div
          style={{
            color: "#232321",
            fontSize: 20,
            fontFamily: "Open Sans",
            fontWeight: "600",
            textDecoration: "underline",
            wordWrap: "break-word",
          }}
        >
          User a promo code
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;

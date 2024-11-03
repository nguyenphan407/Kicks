import React from "react";
import { products } from "../assets/assets";
const ContactDetails = () => {
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
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          gap: 32,
          display: "inline-flex",
        }}
      >
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
          Login and Checkout faster
        </div>
        <div
          style={{
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            gap: 32,
            display: "flex",
          }}
        >
          <div
            style={{
              height: 68,
              borderRadius: 16,
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
                wordWrap: "break-word",
              }}
            >
              Contact Details
            </div>
            <div
              style={{
                alignSelf: "stretch",
                opacity: 0.8,
                color: "#232321",
                fontSize: 16,
                fontFamily: "Open Sans",
                fontWeight: "600",
                wordWrap: "break-word",
              }}
            >
              We will use these details to keep you inform about your delivery.
            </div>
          </div>
          <div
            style={{
              height: 48,
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              gap: 8,
              display: "flex",
            }}
          >
            <div
              style={{
                alignSelf: "stretch",
                height: 48,
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                gap: 4,
                display: "flex",
              }}
            >
              <div
                style={{
                  alignSelf: "stretch",
                  height: 48,
                  paddingLeft: 16,
                  paddingRight: 16,
                  paddingTop: 10,
                  paddingBottom: 10,
                  borderRadius: 8,
                  border: "1px #232321 solid",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  gap: 8,
                  display: "inline-flex",
                }}
              >
                <div
                  style={{
                    flex: "1 1 0",
                    color: "#79767C",
                    fontSize: 16,
                    fontFamily: "Inter",
                    fontWeight: "400",
                    letterSpacing: 0.5,
                    wordWrap: "break-word",
                  }}
                >
                  Email
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
            gap: 32,
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
            Shipping Address
          </div>
          <div
            style={{
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              gap: 20,
              display: "flex",
            }}
          >
            <div
              style={{
                justifyContent: "flex-start",
                alignItems: "flex-start",
                gap: 20,
                display: "inline-flex",
              }}
            >
              <div
                style={{
                  width: 342,
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  gap: 8,
                  display: "inline-flex",
                }}
              >
                <div
                  style={{
                    alignSelf: "stretch",
                    height: 48,
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    gap: 4,
                    display: "flex",
                  }}
                >
                  <div
                    style={{
                      alignSelf: "stretch",
                      height: 48,
                      paddingLeft: 16,
                      paddingRight: 16,
                      paddingTop: 10,
                      paddingBottom: 10,
                      borderRadius: 8,
                      border: "1px #232321 solid",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      gap: 8,
                      display: "inline-flex",
                    }}
                  >
                    <div
                      style={{
                        flex: "1 1 0",
                        color: "#79767C",
                        fontSize: 16,
                        fontFamily: "Inter",
                        fontWeight: "400",
                        letterSpacing: 0.5,
                        wordWrap: "break-word",
                      }}
                    >
                      First Name*
                    </div>
                  </div>
                </div>
              </div>
              <div
                style={{
                  width: 342,
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  gap: 8,
                  display: "inline-flex",
                }}
              >
                <div
                  style={{
                    alignSelf: "stretch",
                    height: 48,
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    gap: 4,
                    display: "flex",
                  }}
                >
                  <div
                    style={{
                      alignSelf: "stretch",
                      height: 48,
                      paddingLeft: 16,
                      paddingRight: 16,
                      paddingTop: 10,
                      paddingBottom: 10,
                      borderRadius: 8,
                      border: "1px #232321 solid",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      gap: 8,
                      display: "inline-flex",
                    }}
                  >
                    <div
                      style={{
                        flex: "1 1 0",
                        color: "#79767C",
                        fontSize: 16,
                        fontFamily: "Inter",
                        fontWeight: "400",
                        letterSpacing: 0.5,
                        wordWrap: "break-word",
                      }}
                    >
                      Last Name*
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{
                height: 67,
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                gap: 8,
                display: "flex",
              }}
            >
              <div
                style={{
                  alignSelf: "stretch",
                  height: 67,
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  gap: 4,
                  display: "flex",
                }}
              >
                <div
                  style={{
                    alignSelf: "stretch",
                    height: 48,
                    paddingLeft: 16,
                    paddingRight: 16,
                    paddingTop: 10,
                    paddingBottom: 10,
                    borderRadius: 8,
                    border: "1px #232321 solid",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: 8,
                    display: "inline-flex",
                  }}
                >
                  <div
                    style={{
                      flex: "1 1 0",
                      color: "#79767C",
                      fontSize: 16,
                      fontFamily: "Inter",
                      fontWeight: "400",
                      letterSpacing: 0.5,
                      wordWrap: "break-word",
                    }}
                  >
                    Find Delivery Address*
                  </div>
                </div>
                <div
                  style={{
                    alignSelf: "stretch",
                    color: "#36323B",
                    fontSize: 12,
                    fontFamily: "Inter",
                    fontWeight: "400",
                    letterSpacing: 0.4,
                    wordWrap: "break-word",
                  }}
                >
                  Start typing your street address or zip code for suggestion
                </div>
              </div>
            </div>
            <div
              style={{
                height: 67,
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                gap: 8,
                display: "flex",
              }}
            >
              <div
                style={{
                  alignSelf: "stretch",
                  height: 67,
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  gap: 4,
                  display: "flex",
                }}
              >
                <div
                  style={{
                    alignSelf: "stretch",
                    height: 48,
                    paddingLeft: 16,
                    paddingRight: 16,
                    paddingTop: 10,
                    paddingBottom: 10,
                    borderRadius: 8,
                    border: "1px #232321 solid",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: 8,
                    display: "inline-flex",
                  }}
                >
                  <div
                    style={{
                      flex: "1 1 0",
                      color: "#79767C",
                      fontSize: 16,
                      fontFamily: "Inter",
                      fontWeight: "400",
                      letterSpacing: 0.5,
                      wordWrap: "break-word",
                    }}
                  >
                    Phone Number*
                  </div>
                </div>
                <div
                  style={{
                    alignSelf: "stretch",
                    color: "#36323B",
                    fontSize: 12,
                    fontFamily: "Inter",
                    fontWeight: "400",
                    letterSpacing: 0.4,
                    wordWrap: "break-word",
                  }}
                >
                  E.g. (123) 456-7890
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: 47,
          display: "inline-flex",
        }}
      >
        <div
          style={{
            padding: 24,
            background: "#FAFAFA",
            borderRadius: 24,
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            gap: 24,
            display: "flex",
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
                  $130.00
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            height: 258,
            padding: 24,
            background: "#FAFAFA",
            borderRadius: 16,
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            gap: 24,
            display: "flex",
          }}
        >
          <div
            style={{
              alignSelf: "stretch",
              height: 28,
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
                wordWrap: "break-word",
              }}
            >
              Order Details
            </div>
          </div>
          <div
            style={{
              alignSelf: "stretch",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              gap: 24,
              display: "inline-flex",
            }}
          >
            <img
              style={{ width: 138.55, alignSelf: "stretch", borderRadius: 24 }}
              src="https://via.placeholder.com/139x158"
            />
            <div
              style={{
                flex: "1 1 0",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                gap: 16,
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
                    height: 24,
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    gap: 20,
                    display: "flex",
                  }}
                >
                  <div
                    style={{
                      alignSelf: "stretch",
                      height: 24,
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      alignItems: "flex-start",
                      gap: 8,
                      display: "flex",
                    }}
                  >
                    <div
                      style={{
                        alignSelf: "stretch",
                        color: "#232321",
                        fontSize: 20,
                        fontFamily: "Rubik",
                        fontWeight: "600",
                        wordWrap: "break-word",
                      }}
                    >
                      DROPSET TRAINER SHOES
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    height: 48,
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    gap: 4,
                    display: "flex",
                  }}
                >
                  <div
                    style={{
                      alignSelf: "stretch",
                      opacity: 0.8,
                      color: "#232321",
                      fontSize: 16,
                      fontFamily: "Open Sans",
                      fontWeight: "600",
                      wordWrap: "break-word",
                    }}
                  >
                    Men’s Road Running Shoes{" "}
                  </div>
                  <div
                    style={{
                      alignSelf: "stretch",
                      opacity: 0.8,
                      color: "#232321",
                      fontSize: 16,
                      fontFamily: "Open Sans",
                      fontWeight: "600",
                      wordWrap: "break-word",
                    }}
                  >
                    Enamel Blue/ University White
                  </div>
                </div>
              </div>
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
                    opacity: 0.8,
                    color: "#232321",
                    fontSize: 16,
                    fontFamily: "Open Sans",
                    fontWeight: "600",
                    wordWrap: "break-word",
                  }}
                >
                  Size 10
                </div>
                <div
                  style={{
                    opacity: 0.8,
                    color: "#232321",
                    fontSize: 16,
                    fontFamily: "Open Sans",
                    fontWeight: "600",
                    wordWrap: "break-word",
                  }}
                >
                  Quantity 1
                </div>
              </div>
              <div
                style={{
                  color: "#4A69E2",
                  fontSize: 20,
                  fontFamily: "Rubik",
                  fontWeight: "600",
                  wordWrap: "break-word",
                }}
              >
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

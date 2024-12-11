/* eslint-disable react/no-unescaped-entities */
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import authApi from "../apis/authApi";
import { FaGoogle, FaFacebook, FaApple } from "react-icons/fa";
import { ShopConText } from "../context/ShopContext";

const Register = () => {
    const navigate = useNavigate();

    // State variables
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [keepLoggedIn, setKeepLoggedIn] = useState(false);
    const [error, setError] = useState("");
    const [isRegistering, setIsRegistering] = useState(false); // New state variable
    const { user, setUser, token, setToken } = useContext(ShopConText);

    // Handle register
    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");

        // Validate required fields
        if (!firstName || !lastName || !email || !password) {
            setError("Please fill in all required fields.");
            return;
        }

        if (!termsAccepted) {
            setError("You must accept the Terms & Conditions.");
            return;
        }

        setIsRegistering(true); // Set registering state
        try {
            const response = await authApi.register({
                first_name: firstName,
                last_name: lastName,
                email,
                password,
                gender,
            });
            const { token, user } = response.data;
            // Lưu thông tin người dùng và token vào localStorage hoặc sessionStorage
            localStorage.setItem("user", JSON.stringify(user)); // Lưu thông tin người dùng
            localStorage.setItem("token", token); // Lưu token
            setUser(user);
            setToken(token);

            console.log("Registration successful:", response.data);

            navigate("/email-confirmation", { state: {email} });
        } catch (err) {
            if (err.response && err.response.data) {
                setError(
                    err.response.data.message ||
                        "An error occurred. Please try again."
                );
            } else {
                setError("An error occurred. Please try again.");
            }
        } finally {
            setIsRegistering(false);
        }
    };

    return (
        <div className="h-auto container flex flex-col items-start lg:flex-row gap-6 justify-between mt-6 mb-10">
            <div className="flex flex-col lg:px-[40px] w-full lg:w-[564px] gap-6">
                {/* Form Header */}
                <div>
                    <h1 className="text-[#232321] text-[36px] font-semibold font-rubik leading-none">
                        Register
                    </h1>
                </div>

                {/* Social Buttons (Optional) */}
                <div className="Social w-full h-16 flex flex-row gap-6">
                    <div className="BtnGoogle w-full rounded-xl border border-neutral-800 flex justify-center items-center transform transition duration-400 hover:bg-[#B0B0B0] uppercase active:scale-[99%]">
                        <button
                            type="button"
                            aria-label="Register with Google"
                            className="w-8 h-8 flex items-center justify-center"
                        >
                            <FaGoogle size={32} className="text-gray-800" />
                        </button>
                    </div>
                    <div className="BtnApple w-full rounded-xl border border-neutral-800 flex justify-center items-center transform transition duration-400 hover:bg-[#B0B0B0] uppercase active:scale-[99%]">
                        <button
                            type="button"
                            aria-label="Register with Apple"
                            className="w-8 h-8 flex items-center justify-center"
                        >
                            <FaApple size={32} className="text-gray-800" />
                        </button>
                    </div>
                    <div className="BtnFacebook w-full rounded-xl border border-neutral-800 flex justify-center items-center transform transition duration-400 hover:bg-[#B0B0B0] uppercase active:scale-[99%]">
                        <button
                            type="button"
                            aria-label="Register with Facebook"
                            className="w-8 h-8 flex items-center justify-center"
                        >
                            <FaFacebook size={32} className="text-[#1877F2]" />
                        </button>
                    </div>
                </div>

                <form onSubmit={handleRegister} className="flex flex-col gap-6">
                    {/* Name Fields */}
                    <div className="flex flex-col gap-5">
                        <h3 className="text-[20px] lg:text-[24px] font-semibold font-rubik text-[#232321]">
                            Your Name
                        </h3>
                        <div className="flex flex-col gap-5 w-full">
                            <div>
                                <input
                                    type="text"
                                    placeholder="First Name"
                                    className="font-semibold w-full p-[10px] border border-gray-800 rounded-lg text-[16px] text-gray-700 bg-transparent focus:border-[#008B28] focus:outline-none"
                                    value={firstName}
                                    onChange={(e) =>
                                        setFirstName(e.target.value)
                                    }
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Last Name"
                                    className="font-semibold w-full p-[10px] border border-gray-800 rounded-lg text-[16px] text-gray-700 bg-transparent focus:border-[#008B28] focus:outline-none"
                                    value={lastName}
                                    onChange={(e) =>
                                        setLastName(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                    </div>

                    {/* Gender Selection */}
                    <div className="flex flex-col gap-5">
                        <h3 className="text-[20px] lg:text-[24px] font-semibold font-rubik text-[#232321]">
                            Gender
                        </h3>
                        <div className="flex gap-8 justify-start items-start">
                            {["Male", "Female", "Other"].map((g) => (
                                <label
                                    key={g}
                                    className="flex items-center gap-2"
                                >
                                    <input
                                        type="radio"
                                        name="gender"
                                        value={g}
                                        checked={gender === g}
                                        onChange={(e) =>
                                            setGender(e.target.value)
                                        }
                                        className="mr-2 w-4 h-4 outline-none border-2 border-gray-400 rounded-sm accent-[#1F1A24]"
                                    />
                                    <span className="text-base font-semibold font-opensans text-[#232321]">
                                        {g}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Login Details */}
                    <div className="flex flex-col gap-5">
                        <h3 className="text-[20px] lg:text-[24px] font-semibold font-rubik text-[#232321]">
                            Login Details
                        </h3>
                        <div>
                            <input
                                type="email"
                                placeholder="Email"
                                className="font-semibold w-full p-[10px] border border-gray-800 rounded-lg text-[16px] text-gray-700 bg-transparent focus:border-[#008B28] focus:outline-none"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                placeholder="Password"
                                className="font-semibold w-full p-[10px] border border-gray-800 rounded-lg text-[16px] text-gray-700 bg-transparent focus:border-[#008B28] focus:outline-none"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <p className="text-[12px] font-normal font-inter text-[#36323B] tracking-wide mt-1">
                                Minimum 8 characters with at least one
                                uppercase, one lowercase, one special character,
                                and a number
                            </p>
                        </div>
                    </div>

                    {/* Terms and Conditions */}
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-neutral-800 font-semibold">
                            <input
                                type="checkbox"
                                checked={termsAccepted}
                                onChange={(e) =>
                                    setTermsAccepted(e.target.checked)
                                }
                                className="mr-2 w-4 h-4 outline-none border-2 border-gray-400 rounded-sm accent-[#1F1A24]"
                            />
                            <p className="flex-1 text-[14px] lg:text[16px] font-semibold font-['Open_Sans'] text-[#232321]">
                                By clicking 'Register' you agree to our
                                website's
                                <Link
                                    to="/terms"
                                    className="underline cursor-pointer ml-1"
                                >
                                    Club Terms & Conditions
                                </Link>
                                ,
                                <Link
                                    to="/privacy"
                                    className="underline cursor-pointer ml-1"
                                >
                                    Privacy Notice
                                </Link>
                                , and
                                <Link
                                    to="/terms-conditions"
                                    className="underline cursor-pointer ml-1"
                                >
                                    Terms & Conditions
                                </Link>
                                .
                            </p>
                        </label>
                        <label className="flex items-center gap-2 text-gray-700 bg-transparent">
                            <input
                                type="checkbox"
                                checked={keepLoggedIn}
                                onChange={(e) =>
                                    setKeepLoggedIn(e.target.checked)
                                }
                                className="mr-2 w-4 h-4 outline-none border-2 border-gray-400 rounded-sm accent-[#1F1A24]"
                            />
                            <span className="text-[14px] lg:text[16px] font-semibold font-opensans text-[#232321]">
                                Keep me logged in - applies to all log in
                                options below. More info
                            </span>
                        </label>
                    </div>

                    {/* Display error message if any */}
                    {error && (
                        <p className="font-rubik text-red-600 text-[16px]">
                            {error}
                        </p>
                    )}

                    {/* Register Button */}
                    <button
                        type="submit"
                        disabled={isRegistering}
                        className="w-full bg-[#232321] flex justify-center items-center rounded-lg text-white px-4 py-[15.5px] transform transition duration-400 hover:bg-primary_blue uppercase hover:scale-[1.003] hover:text-white active:scale-[99%] disabled:opacity-50"
                    >
                        <p className="font-rubik text-[14px] font-medium">
                            {isRegistering ? "Registering..." : "Register"}
                        </p>
                        {!isRegistering && (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                className="ml-auto"
                            >
                                <path
                                    d="M8.375 3.5L12.875 8L8.375 12.5M12.25 8H3.125"
                                    stroke="white"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        )}
                    </button>
                </form>
            </div>

            {/* Join Kicks Club */}
            <div className="flex-1 p-6 bg-[#FAFAFA] rounded-2xl flex flex-col gap-16">
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <h2 className="w-full lg:w-[600px] text-[36px] font-semibold font-rubik text-[#232321]">
                            Join Kicks Club Get Rewarded Today.
                        </h2>
                    </div>
                    <p className="text-[#232321] text-[14px] lg:text-[16px] opacity-80 font-semibold font-opensans">
                        As a Kicks Club member, you get rewarded for doing what
                        you love. Sign up today and receive immediate access to
                        these Level 1 benefits:
                    </p>
                    <ul className="list-disc list-inside opacity-80 text-[#232321] text-[14px] lg:text-[16px] font-semibold font-opensans">
                        <li>Free shipping</li>
                        <li>15% off your next purchase</li>
                        <li>Exclusive member products and sales</li>
                        <li>Access to special apps</li>
                        <li>Special offers and promotions</li>
                    </ul>
                    <p className="text-[#232321] opacity-80 text-[14px] lg:text-[16px] font-semibold font-opensans">
                        Join now to start earning points, reach new levels, and
                        unlock more rewards and benefits from Kicks Club.
                    </p>
                </div>

                {/* Join Button */}
                <button className="w-full bg-[#232321] flex justify-center items-center rounded-lg text-white px-4 py-[15.5px] transform transition duration-400 hover:bg-primary_blue uppercase hover:scale-[1.003] hover:text-white active:scale-[99%]">
                    <p className="font-rubik text-[14px] font-medium">
                        Join the Club
                    </p>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        className="ml-auto"
                    >
                        <path
                            d="M8.375 3.5L12.875 8L8.375 12.5M12.25 8H3.125"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Register;

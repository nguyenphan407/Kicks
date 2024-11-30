/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect, useContext } from "react";
import { FaFacebook, FaApple, FaGoogle } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import authApi from "../apis/authApi";
import { icons } from "../assets/assets";
import { ShopConText } from "../context/ShopContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [keepLoggedIn, setKeepLoggedIn] = useState(false);
    const [error, setError] = useState("");
    const [isLoggingIn, setIsLoggingIn] = useState(false); // New state variable
    const navigate = useNavigate();
    const { user, setUser, token, setToken } = useContext(ShopConText);

    // Handle login
    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoggingIn(true); // Set logging in state

        try {
            const response = await authApi.login({ email, password });
            console.log(response.data); // Kiểm tra cấu trúc dữ liệu trả về
            const { access_token, user } = response.data; // Lấy token và user
            localStorage.setItem("user", JSON.stringify(user)); // Lưu thông tin người dùng
            localStorage.setItem("token", access_token); // Lưu token

            setUser(user);
            setToken(access_token);

            // Navigate về lại home
            toast.success("Login successful!", {
                autoClose: 1500,
            });
            navigate("/");
        } catch (err) {
            if (err.response && err.response.status === 401) {
                setError("Incorrect email or password. Please try again.");
            } else {
                setError("An error occurred. Please try again.");
            }
        } finally {
            setIsLoggingIn(false); // Reset logging in state
        }
    };

    // If already logged in, redirect to home page
    useEffect(() => {
        const token =
            localStorage.getItem("token") || sessionStorage.getItem("token");
        localStorage.getItem("user");

        const verifyToken = async () => {
            try {
                await authApi.getMe(); // API call to verify token
                navigate("/"); // Navigate to home page if token is valid
            } catch {
                localStorage.removeItem("token");
                sessionStorage.removeItem("token");
                localStorage.removeItem("user");
            }
        };

        if (token) {
            verifyToken();
        }
    }, [navigate, token]);

    return (
        <div className="h-auto container flex flex-col lg:flex-row gap-6 lg:gap-[47px] justify-between mx-auto mt-6 mb-10">
            {/* Login Section */}
            <form
                onSubmit={handleLogin}
                className="Login flex flex-col lg:pr-[40px] w-full lg:w-[564px] mb-2 gap-6"
            >
                <div className="w-full flex flex-col">
                    <h1 className="text-[#232321] text-[32px] font-semibold font-rubik">
                        Login
                    </h1>
                    <NavLink to="/forgot-password">
                        <h2 className="text-[#232321] text-[16px] font-semibold underline">
                            Forgot your password?
                        </h2>
                    </NavLink>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="text-red-500 text-sm mb-4">{error}</div>
                )}

                {/* Email Input */}
                <input
                    type="email"
                    placeholder="Email"
                    className="font-semibold w-full p-[10px] border border-gray-800 rounded-lg text-[16px] text-gray-700 bg-transparent focus:border-[#008B28] focus:outline-none"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                />

                {/* Password Input */}
                <input
                    type="password"
                    placeholder="Password"
                    className="font-semibold w-full p-[10px] border border-gray-800 rounded-lg text-[16px] text-gray-700 bg-transparent focus:border-[#008B28] focus:outline-none"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                />

                {/* Keep me logged in */}
                <div className="w-full h-12 flex items-center gap-2">
                    <input
                        type="checkbox"
                        className="mr-2 w-4 h-4 outline-none border-2 border-gray-400 rounded-sm accent-[#1F1A24]"
                        id="keepLoggedIn"
                        checked={keepLoggedIn}
                        onChange={(e) => setKeepLoggedIn(e.target.checked)}
                    />
                    <label
                        htmlFor="keepLoggedIn"
                        className="flex-1 text-[#232321] text-[14px] lg:text-[16px] font-semibold"
                    >
                        Keep me logged in - applies to all log in options below.{" "}
                        <Link to="/more-info" className="underline">
                            More info
                        </Link>
                    </label>
                </div>

                {/* Email Login Button */}
                <button
                    type="submit"
                    disabled={isLoggingIn}
                    className="w-full bg-[#232321] flex justify-center items-center rounded-lg text-white px-4 py-[15.5px] transform transition duration-400 hover:bg-primary_blue uppercase hover:scale-[1.003] hover:text-white active:scale-[99%] disabled:opacity-50"
                >
                    <p className="font-rubik text-[14px] font-medium">
                        {isLoggingIn ? "Logging in..." : "Email Login"}
                    </p>
                    {!isLoggingIn && (
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

                {/* Social Login Options */}
                <div className="Social w-full h-16 flex flex-row gap-6">
                    <div className="BtnGoogle w-full rounded-xl border border-neutral-800 flex justify-center items-center transform transition duration-400 hover:bg-[#B0B0B0] uppercase active:scale-[99%]">
                        <button
                            type="button"
                            aria-label="Login with Google"
                            className="w-8 h-8 flex items-center justify-center"
                        >
                            <FaGoogle size={32} className="text-gray-800" />
                        </button>
                    </div>
                    <div className="BtnApple w-full rounded-xl border border-neutral-800 flex justify-center items-center transform transition duration-400 hover:bg-[#B0B0B0] uppercase active:scale-[99%]">
                        <button
                            type="button"
                            aria-label="Login with Apple"
                            className="w-8 h-8 flex items-center justify-center"
                        >
                            <FaApple size={32} className="text-gray-800" />
                        </button>
                    </div>
                    <div className="BtnFacebook w-full rounded-xl border border-neutral-800 flex justify-center items-center transform transition duration-400 hover:bg-[#B0B0B0] uppercase active:scale-[99%]">
                        <button
                            type="button"
                            aria-label="Login with Facebook"
                            className="w-8 h-8 flex items-center justify-center"
                        >
                            <FaFacebook size={32} className="text-[#1877F2]" />
                        </button>
                    </div>
                </div>

                {/* Terms */}
                <p className="flex-1 text-[14px] lg:text-[16px] font-semibold font-['Open_Sans'] text-[#232321]">
                    You don't have an account?
                    <Link
                        to="/register"
                        className="underline cursor-pointer ml-1"
                    >
                        Sign up here.
                    </Link>
                </p>
            </form>

            {/* Join Section */}
            <div className="Join flex-1 p-6 bg-[#FAFAFA] rounded-2xl flex flex-col gap-[64px]">
                <div className="w-full h-auto flex flex-col gap-6">
                    <h2 className="w-full lg:w-[600px] text-[#232321] text-[24px] lg:text-[36px] font-semibold font-rubik">
                        Join Kicks Club Get Rewarded Today.
                    </h2>
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
                    <p className="text-[#232321] opacity-80 text-[14px] lg:text-[16px] font-semibold">
                        Join now to start earning points, reach new levels, and
                        unlock more rewards and benefits from Kicks Club.
                    </p>
                </div>

                {/* Join Button */}
                <button className="w-full bg-[#232321] flex justify-center items-center rounded-lg text-white px-4 py-[15.5px] transform transition duration-400 hover:bg-primary_blue uppercase hover:scale-[1.003] hover:text-white active:scale-[99%]">
                    <p className="font-rubik text-[14px] font-medium">
                        Join the club
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

export default Login;

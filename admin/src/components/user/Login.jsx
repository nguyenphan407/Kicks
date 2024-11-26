/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from "react";
import { FaFacebook, FaApple } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { images } from "../../assets/assets";
import { icons } from "../../assets/assets";
import authApi from "../../apis/authApi";
import { useNavigate } from "react-router-dom";
import { useLoader } from "../../context/LoaderContext";

const Login = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const { showLoader, hideLoader } = useLoader(); // Sử dụng Loader Context
    const [keepLoggedIn, setKeepLoggedIn] = useState(false);

    // Xử lý login
    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        showLoader(); // Hiển thị Loader
        try {
            const response = await authApi.login({ email, password });

            // Lưu token vào localStorage
            localStorage.setItem("access_token", response.data.access_token);
            console.log(response.data.access_token);

            // Điều hướng tới dashboard
            navigate("/dashboard");
        } catch (err) {
            // Hiển thị thông báo lỗi nếu đăng nhập sai
            if (err.response && err.response.status === 401) {
                setError("Sai email hoặc mật khẩu. Vui lòng thử lại."); // Lỗi từ server
            } else {
                setError("Đã có lỗi xảy ra. Vui lòng thử lại."); // Lỗi khác
            }
        } finally {
            hideLoader(); // Ẩn Loader
        }
    };

    // Nếu đã đăng nhập, điều hướng tới dashboard
    useEffect(() => {
        const token = localStorage.getItem("access_token");
    
        const verifyToken = async () => {
            try {
                await authApi.getMe(); // Gọi API kiểm tra token
                navigate("/dashboard"); // Điều hướng tới dashboard nếu hợp lệ
            } catch {
                localStorage.removeItem("access_token");
            } finally {
                hideLoader(); // Ẩn Loader sau khi kiểm tra
            }
        };
    
        if (token) {
            verifyToken();
            showLoader();
        }
    }, [navigate, hideLoader]);
    

    // Hiệu ứng chuyển cảnh
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === images.Thumbnails.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000); // Đổi ảnh mỗi 5 giây

        return () => clearInterval(interval); // Clear interval khi component unmount
    }, []);
    return (
        <div className="h-screen flex">
            <div className="relative left w-1/2">
                <img
                    src={icons.LogoIcon}
                    alt="Logo"
                    className="z-10 absolute top-[80px] left-1/2 transform -translate-x-1/2 h-[62px] w-[248px] cursor-pointer"
                />

                {images.Thumbnails.map((src, index) => (
                    <img
                        key={index}
                        src={src}
                        alt="Thumbnails"
                        className={`w-full h-screen object-cover absolute inset-0  transition-opacity duration-1000 ease-in-out ${
                            index === currentImageIndex
                                ? "opacity-100"
                                : "opacity-0"
                        }`}
                    />
                ))}
            </div>

            {/* Login */}
            <form
                onSubmit={handleLogin}
                className="Login flex flex-col justify-center items-center mx-auto gap-6 w-[560px] h-[857px] px-[40px]"
            >
                <div className="w-full flex flex-col">
                    <h1 className="text-[#232321] text-[32px] font-semibold font-rubik">
                        Login
                    </h1>
                    <NavLink to="/login">
                        <h2 className="text-[#232321] text-[16px] font-semibold underline">
                            Forgot your password?
                        </h2>
                    </NavLink>
                </div>

                {/* Email Input */}
                <input
                    type="email"
                    placeholder="Email"
                    className="font-semibold text-[16px] w-full h-[48px] p-[10px] border border-gray-800 rounded-lg  text-gray-700 bg-transparent focus:border-[#008B28] focus:outline-none"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />

                {/* Password Input */}
                <input
                    type="password"
                    placeholder="Password"
                    className="font-semibold text-[16px] w-full h-[48px] p-[10px] border border-gray-800 rounded-lg text-sm text-gray-700 bg-transparent focus:border-[#008B28] focus:outline-none"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
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
                        className="flex-1 text-[#232321] text-[16px] font-semibold"
                    >
                        Keep me logged in - applies to all log in options below.{" "}
                        <a href="#" className="underline">
                            More info
                        </a>
                    </label>
                </div>

                {/* Email Login Button */}
                <button
                    className="w-full h-[48px] bg-[#232321] flex justify-center items-center rounded-lg text-white px-4 py-[15.5px] transform transition duration-400 hover:bg-primary_blue uppercase hover:scale-[1.003] hover:text-white active:scale-[99%]"
                    type="submit"
                >
                    <p className="font-rubik text-[14px] font-medium">
                        Email Login
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

                {/* Social Login Options */}
                <div className="Social w-full h-16 flex flex-row gap-6">
                    <div className="BtnGoogle w-full rounded-xl border border-neutral-800 flex justify-center items-center  transform transition duration-400 hover:bg-[#B0B0B0] uppercase active:scale-[99%]">
                        <button
                            aria-label="Login with Google"
                            className="w-8 h-8 flex items-center justify-center"
                        >
                            <img src={icons.GoogleIcon} alt="" />
                        </button>
                    </div>
                    <div className="BtnApple w-full rounded-xl border border-neutral-800 flex justify-center items-center  transform transition duration-400 hover:bg-[#B0B0B0] uppercase active:scale-[99%]">
                        <button
                            aria-label="Login with Apple"
                            className="w-8 h-8 flex items-center justify-center"
                        >
                            <FaApple size={32} className="text-gray-800" />
                        </button>
                    </div>
                    <div className="BtnFacebook w-full rounded-xl border border-neutral-800 flex justify-center items-center  transform transition duration-400 hover:bg-[#B0B0B0] uppercase active:scale-[99%]">
                        <button
                            aria-label="Login with Facebook"
                            className="w-8 h-8 flex items-center justify-center"
                        >
                            <FaFacebook size={32} className="text-[#1877F2]" />
                        </button>
                    </div>
                </div>

                {/* Terms */}
                <p className="text-[#232321] text-[14px] font-semibold">
                    By clicking 'Log In' you agree to our website's{" "}
                    <a href="#" className="underline">
                        Club Terms & Conditions
                    </a>
                    ,{" "}
                    <a href="#" className="underline">
                        Privacy Notice
                    </a>
                    , and{" "}
                    <a href="#" className="underline">
                        Terms & Conditions
                    </a>
                    .
                </p>
                {/* Hiển thị lỗi nếu có */}
                {error && (
                    <p className="font-rubik text-red-600 text-[16px]">
                        {error}
                    </p>
                )}
            </form>
        </div>
    );
};

export default Login;

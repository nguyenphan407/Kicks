/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from "react";
import { FaGoogle, FaFacebook, FaApple } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { images, icons } from "../../assets/assets";
import authApi from "../../apis/authApi";
import { useLoader } from "../../context/LoaderContext";

const Register = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const navigate = useNavigate();
    const { showLoader, hideLoader } = useLoader(); // Sử dụng Loader Context

    // Trạng thái cho các trường dữ liệu
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [keepLoggedIn, setKeepLoggedIn] = useState(false);
    const [error, setError] = useState("");

    // Xử lý đăng ký
    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");

        // Kiểm tra các trường bắt buộc
        if (!firstName || !lastName || !email || !password) {
            setError("Vui lòng điền đầy đủ thông tin.");
            return;
        }

        if (!termsAccepted) {
            setError("Bạn cần chấp nhận các điều khoản và điều kiện.");
            return;
        }
        showLoader(); // Hiển thị Loader
        try {
            const response = await authApi.register({
                first_name: firstName, // Sửa tên trường
                last_name: lastName,   // Sửa tên trường
                email,
                password,
            });

            // Giả sử API trả về thông tin người dùng sau khi đăng ký thành công
            console.log("Đăng ký thành công:", response.data);

            hideLoader();

            // Điều hướng đến trang đăng nhập hoặc trang dashboard
            navigate("/login"); // Hoặc navigate("/dashboard") nếu muốn đăng nhập tự động
        } catch (err) {
            hideLoader();
            if (
                err.response &&
                err.response.data &&
                err.response.data.message
            ) {
                setError(err.response.data.message);
            } else {
                setError("Đã có lỗi xảy ra. Vui lòng thử lại.");
            }
        }
    };
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

            {/* Register */}
            <div className="flex-1 flex justify-center items-center ">
                <form
                    onSubmit={handleRegister}
                    className="Register flex flex-col w-[480px] h-auto gap-6"
                >
                    {/* Header */}
                    <div className="w-full flex flex-col gap-2">
                        <h1 className="text-[#232321] text-[36px] font-semibold font-rubik leading-none">
                            Register
                        </h1>
                    </div>

                    {/* Name Fields */}
                    <div className="flex flex-col gap-5 leading-none">
                        <h3 className="text-[24px] font-semibold font-rubik text-[#232321]">
                            Your Name
                        </h3>
                        <div className="flex flex-col gap-5 w-full">
                            <input
                                type="text"
                                placeholder="First Name"
                                className="font-semibold text-[16px] w-full h-[48px] p-[10px] border border-gray-800 rounded-lg  text-gray-700 bg-transparent focus:border-[#008B28] focus:outline-none"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Last Name"
                                className="font-semibold text-[16px] w-full h-[48px] p-[10px] border border-gray-800 rounded-lg  text-gray-700 bg-transparent focus:border-[#008B28] focus:outline-none"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {/* Login Details */}
                    <div className="flex flex-col gap-5">
                        <h3 className="text-[24px] font-semibold font-rubik text-[#232321] leading-none">
                            Login Details
                        </h3>
                        <input
                            type="email"
                            placeholder="Email"
                            className="font-semibold text-[16px] w-full h-[48px] p-[10px] border border-gray-800 rounded-lg  text-gray-700 bg-transparent focus:border-[#008B28] focus:outline-none"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <div className="flex flex-col gap-1">
                            <input
                                type="password"
                                placeholder="Password"
                                className="font-semibold text-[16px] w-full h-[48px] p-[10px] border border-gray-800 rounded-lg  text-gray-700 bg-transparent focus:border-[#008B28] focus:outline-none"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <p className="text-[12px] font-normal font-inter text-[#36323B] tracking-wide">
                                Minimum 8 characters with at least one
                                uppercase, one lowercase, one special character,
                                and a number
                            </p>
                        </div>
                    </div>

                    {/* Terms and Conditions */}
                    <div className="space-y-6">
                        <label className="flex items-center gap-2 text-neutral-800 font-semibold">
                            <input
                                type="checkbox"
                                className="mr-2 w-4 h-4 outline-none border-2 border-gray-400 rounded-sm accent-[#1F1A24]"
                                checked={termsAccepted}
                                onChange={(e) =>
                                    setTermsAccepted(e.target.checked)
                                }
                                required
                            />
                            <span className="flex-1 text-[#232321] text-[16px] font-semibold">
                                By clicking 'Register' you agree to our
                                website's{" "}
                                <Link to="/terms" className="underline">
                                    Club Terms & Conditions
                                </Link>
                                ,{" "}
                                <Link to="/privacy" className="underline">
                                    Kicks Privacy Notice
                                </Link>{" "}
                                and{" "}
                                <Link
                                    to="/terms-conditions"
                                    className="underline"
                                >
                                    Terms & Conditions
                                </Link>
                                .
                            </span>
                        </label>
                        <label className="flex items-center gap-2 text-gray-700 bg-transparent">
                            <input
                                type="checkbox"
                                className="mr-2 w-4 h-4 outline-none border-2 border-gray-400 rounded-sm accent-[#1F1A24]"
                                checked={keepLoggedIn}
                                onChange={(e) =>
                                    setKeepLoggedIn(e.target.checked)
                                }
                            />
                            <span className="flex-1 text-[#232321] text-[16px] font-semibold">
                                Keep me logged in - applies to all log in
                                options below.{" "}
                                <Link to="/more-info" className="underline">
                                    More info
                                </Link>
                            </span>
                        </label>
                    </div>

                    {/* Hiển thị lỗi nếu có */}
                    {error && (
                        <p className="font-rubik text-red-600 text-[16px]">
                            {error}
                        </p>
                    )}

                    {/* Register Button */}
                    <button
                        type="submit"
                        className="w-full bg-[#232321] flex justify-center items-center rounded-lg text-white px-4 py-[13px] transform transition duration-400 hover:bg-primary_blue uppercase hover:scale-[1.003] hover:text-white active:scale-[99%]"
                    >
                        <p className="font-rubik text-[14px] font-medium">
                            Register
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
                </form>
            </div>
        </div>
    );
};

export default Register;

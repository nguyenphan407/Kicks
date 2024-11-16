/* eslint-disable react/no-unescaped-entities */
import { FaGoogle, FaFacebook, FaApple } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { Link, NavLink } from "react-router-dom";

const Login = () => {
    const onSubmitHandler = async (event) => {
        event.preventDefault();
    }

    return (
        <form
        onSubmit={onSubmitHandler}
        className="h-auto container flex flex-col lg:flex-row gap-6 lg:gap-[47px] justify-between mx-auto mt-6 mb-10">
            {/* Login Section */}
            <div className="Login flex flex-col lg:pr-[40px] w-full lg:w-[564px] mb-2 gap-6">
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
                    className="w-full p-[10px] border border-gray-800 rounded-lg text-[16px] text-gray-700 bg-transparent focus:border-[#008B28] focus:outline-none"
                />

                {/* Password Input */}
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-[10px] border border-gray-800 rounded-lg text-[16px] text-gray-700 bg-transparent focus:border-[#008B28] focus:outline-none"
                />

                {/* Keep me logged in */}
                <div className="w-full h-12 flex items-center gap-2">
                    <input
                        type="checkbox"
                        className="w-6 h-6"
                        id="keepLoggedIn"
                    />
                    <label
                        htmlFor="keepLoggedIn"
                        className="flex-1 text-[#232321] text-[14px] lg:text-[16px] font-semibold font-opensans"
                    >
                        Keep me logged in - applies to all log in options below.{" "}
                        <a href="#" className="underline">
                            More info
                        </a>
                    </label>
                </div>

                {/* Email Login Button */}
                <button className="w-full bg-[#232321] flex justify-center items-center rounded-lg text-white px-4 py-[15.5px] transform transition duration-400 hover:bg-primary_blue uppercase hover:scale-[1.003] hover:text-white active:scale-[99%]">
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
                    <div className="BtnGoogle w-full rounded-xl border border-neutral-800 flex justify-center items-center transform transition duration-400 hover:bg-[#B0B0B0] uppercase active:scale-[99%]">
                        <button
                            aria-label="Login with Google"
                            className="w-8 h-8 flex items-center justify-center"
                        >
                            <FaGoogle size={32} className="text-gray-800" />
                        </button>
                    </div>
                    <div className="BtnApple w-full rounded-xl border border-neutral-800 flex justify-center items-center transform transition duration-400 hover:bg-[#B0B0B0] uppercase active:scale-[99%]">
                        <button
                            aria-label="Login with Apple"
                            className="w-8 h-8 flex items-center justify-center"
                        >
                            <FaApple size={32} className="text-gray-800" />
                        </button>
                    </div>
                    <div className="BtnFacebook w-full rounded-xl border border-neutral-800 flex justify-center items-center transform transition duration-400 hover:bg-[#B0B0B0] uppercase active:scale-[99%]">
                        <button
                            aria-label="Login with Facebook"
                            className="w-8 h-8 flex items-center justify-center"
                        >
                            <FaFacebook size={32} className="text-[#1877F2]" />
                        </button>
                    </div>
                </div>

                {/* Terms */}
                <p className="text-[#232321] text-[14px] lg:text-[16px] font-semibold font-opensans">
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
            </div>

            {/* Join Section */}
            <div className="Join flex-1 p-6 bg-[#FAFAFA] rounded-2xl flex flex-col gap-[64px]">
                <div className="w-full h-auto flex flex-col gap-6">
                    <h2 className="w-full lg:w-[600px] text-[#232321] text-[24px] lg:text-[36px] font-semibold font-rubik">
                        Join Kicks Club Get Rewarded Today.
                    </h2>
                    <p className="text-[#232321] text-[14px] lg:text-[16px] opacity-80 font-semibold font-opensans">
                        As kicks club member you get rewarded with what you love
                        for doing what you love. Sign up today and receive
                        immediate access to these Level 1 benefits:
                    </p>
                    <ul className="list-disc list-inside opacity-80 text-[#232321] text-[14px] lg:text-[16px] font-semibold font-opensans">
                        <li>Free shipping</li>
                        <li>15% off your next purchase</li>
                        <li>Exclusive member products and sales</li>
                        <li>Access to adidas Running and Training apps</li>
                        <li>Special offers and promotions</li>
                    </ul>
                    <p className="text-[#232321] opacity-80 text-[14px] lg:text-[16px] font-semibold">
                        Join now to start earning points, reach new levels and
                        unlock more rewards and benefits from adiClub.
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
        </form>
    );
};

export default Login;

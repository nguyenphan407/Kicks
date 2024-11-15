import React from "react";
import { FaGoogle, FaFacebook, FaApple } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { images } from "../assets/assets";
import { icons } from "../assets/assets";

const LoginAdmin = () => {
  return (
    <div className="h-auto flex flex-row">
      <div className="relative">
        <img
          src={icons.LogoIcon}
          alt="Logo"
          className="absolute top-[80px] left-1/2 transform -translate-x-1/2 h-[62px] w-[248px] cursor-pointer"
        />
        
        <img
          src={images.LoginAdmin}
          alt="Login image"
          className="w-[717px] h-[1024px]"
        />
      </div>

      {/* Login */}
      <div className="Login flex flex-col justify-center items-center mx-auto gap-6 w-[480px] h-[857px] px-[40px]">
        <div className="w-full flex flex-col">
          <h1 className="text-[#232321] text-[32px] font-semibold font-rubik">Login</h1>
          <NavLink to="/login">
            <h2 className="text-[#232321] text-[16px] font-semibold font-opensans underline">
              Forgot your password?
            </h2>
          </NavLink>
        </div>

        {/* Email Input */}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-[10px] border border-gray-800 rounded-lg text-sm text-gray-700 bg-transparent focus:border-[#008B28] focus:outline-none"
        />

        {/* Password Input */}
        <input
          type="password"
          placeholder="Password"
          className="w-full p-[10px] border border-gray-800 rounded-lg text-sm text-gray-700 bg-transparent focus:border-[#008B28] focus:outline-none"
        />

        {/* Keep me logged in */}
        <div className="w-full h-12 flex items-center gap-2">
          <input type="checkbox" className="w-6 h-6" id="keepLoggedIn" />
          <label htmlFor="keepLoggedIn" className="flex-1 text-[#232321] text-[14px] font-semibold font-opensans">
            Keep me logged in - applies to all log in options below.{" "}
            <a href="#" className="underline">More info</a>
          </label>
        </div>

        {/* Email Login Button */}
        <button className="w-full bg-[#232321] flex justify-center items-center rounded-lg text-white px-4 py-[15.5px] transform transition duration-400 hover:bg-primary_blue uppercase hover:scale-[1.003] hover:text-white active:scale-[99%]">
          <p className="font-rubik text-[14px] font-medium">Email Login</p>
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
          <div className="BtnGoogle w-full rounded-xl border border-neutral-800 flex justify-center items-center rounded-lg transform transition duration-400 hover:bg-[#B0B0B0] uppercase active:scale-[99%]">
            <button
              aria-label="Login with Google"
              className="w-8 h-8 flex items-center justify-center"
            >
              <FaGoogle size={32} className="text-gray-800" />
            </button>
          </div>
          <div className="BtnApple w-full rounded-xl border border-neutral-800 flex justify-center items-center rounded-lg transform transition duration-400 hover:bg-[#B0B0B0] uppercase active:scale-[99%]">
            <button
              aria-label="Login with Apple"
              className="w-8 h-8 flex items-center justify-center"
            >
              <FaApple size={32} className="text-gray-800" />
            </button>
          </div>
          <div className="BtnFacebook w-full rounded-xl border border-neutral-800 flex justify-center items-center rounded-lg transform transition duration-400 hover:bg-[#B0B0B0] uppercase active:scale-[99%]">
            <button
              aria-label="Login with Facebook"
              className="w-8 h-8 flex items-center justify-center"
            >
              <FaFacebook size={32} className="text-[#1877F2]" />
            </button>
          </div>
        </div>

        {/* Terms */}
        <p className="text-[#232321] text-[14px] font-semibold font-opensans">
          By clicking 'Log In' you agree to our website's{" "}
          <a href="#" className="underline">Club Terms & Conditions</a>,{" "}
          <a href="#" className="underline">Privacy Notice</a>, and{" "}
          <a href="#" className="underline">Terms & Conditions</a>.
        </p>
      </div>
    </div>
  );
};

export default LoginAdmin;

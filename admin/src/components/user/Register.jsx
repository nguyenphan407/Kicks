/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { FaGoogle, FaFacebook, FaApple } from "react-icons/fa";
import { images } from "../../assets/assets";
import { icons } from "../../assets/assets";

const Register = () => {
  return (
    <div className="h-auto flex flex-row items-center justify-center">
      <div className="relative">
        <img
          src={icons.LogoIcon}
          alt="Logo"
          className="absolute top-[80px] left-1/2 transform -translate-x-1/2 h-[62px] w-[248px] cursor-pointer"
        />
        
        <img
          src={images.LoginAdmin}
          alt="Nike Air Max"
          className="w-[717px] h-[1024px]"
        />
      </div>

      {/* Register */}
      <div className="flex-1 flex justify-center items-center px-[83px]">
        <div className="Register flex flex-col w-[480px] h-[857px] px-[40px] gap-6">
          {/* Header */}
          <div className="w-full flex flex-col gap-2">
            <h1 className="text-[#232321] text-[36px] font-semibold font-rubik">
              Register
            </h1>
            <h2 className="text-[#232321] text-[20px] font-semibold font-opensans">
              Sign up with
            </h2>
          </div>

          {/* Social Login Buttons */}
          <div className="w-full flex gap-6">
            {/* Google Button */}
            <div className="w-full rounded-xl border border-neutral-800 flex justify-center items-center h-16 transform transition duration-400 hover:bg-[#B0B0B0] uppercase active:scale-[99%]">
              <button
                aria-label="Sign up with Google"
                className="w-8 h-8 flex items-center justify-center"
              >
                <FaGoogle size={32} className="text-gray-800" />
              </button>
            </div>

            {/* Apple Button */}
            <div className="w-full rounded-xl border border-neutral-800 flex justify-center items-center h-16 transform transition duration-400 hover:bg-[#B0B0B0] uppercase active:scale-[99%]">
              <button
                aria-label="Sign up with Apple"
                className="w-8 h-8 flex items-center justify-center"
              >
                <FaApple size={32} className="text-gray-800" />
              </button>
            </div>

            {/* Facebook Button */}
            <div className="w-full rounded-xl border border-neutral-800 flex justify-center items-center h-16 transform transition duration-400 hover:bg-[#B0B0B0] uppercase active:scale-[99%]">
              <button
                aria-label="Sign up with Facebook"
                className="w-8 h-8 flex items-center justify-center"
              >
                <FaFacebook size={32} className="text-[#1877F2]" />
              </button>
            </div>
          </div>

          <div className="text-[20px] font-semibold font-opensans text-[#232321]">
            OR
          </div>

          {/* Name Fields */}
          <div className="flex flex-col gap-5 leading-none">
            <h3 className="text-[24px] font-semibold font-rubik text-[#232321]">
              Your Name
            </h3>
            <div className="flex flex-col gap-5 w-full">
              <input
                placeholder="First Name"
                className="w-full p-[10px] border border-gray-800 rounded-lg text-[16px] text-gray-700 bg-transparent focus:border-[#008B28] focus:outline-none"
              />
              <input
                placeholder="Last Name"
                className="w-full p-[10px] border border-gray-800 rounded-lg text-[16px] text-gray-700 bg-transparent focus:border-[#008B28] focus:outline-none"
              />
            </div>
          </div>

          {/* Login Details */}
          <div className="flex flex-col gap-5">
            <h3 className="text-[24px] font-semibold font-rubik text-[#232321]">
              Login Details
            </h3>
            <input
              placeholder="Email"
              className="w-full p-[10px] border border-gray-800 rounded-lg text-[16px] text-gray-700 bg-transparent focus:border-[#008B28] focus:outline-none"
            />
            <div className="flex flex-col gap-1">
              <input
                type="password"
                placeholder="Password"
                className="w-full p-[10px] border border-gray-800 rounded-lg text-[16px] text-gray-700 bg-transparent focus:border-[#008B28] focus:outline-none"
              />
              <p className="text-[12px] font-normal font-inter text-[#36323B] tracking-wide">
                Minimum 8 characters with at least one uppercase, one lowercase,
                one special character, and a number
              </p>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="space-y-6">
            <label className="flex items-center gap-2 text-neutral-800 font-semibold">
              <div className="w-full flex-1 inline-flex bg-transparent gap-2">
                <input type="checkbox" className="w-6 h-6 accent-auto" />
                <p className="flex-1 text-[14px] font-semibold font-opensans text-[#232321]">
                  By clicking 'Log In' you agree to our website Kicks{" "}
                  <span className="underline cursor-pointer">
                    Club Terms & Conditions
                  </span>
                  , <span className="underline cursor-pointer">
                    Kicks Privacy Notice
                  </span>{" "}
                  and{" "}
                  <span className="underline cursor-pointer">
                    Terms & Conditions
                  </span>
                  .
                </p>
              </div>
            </label>
            <label className="flex items-center gap-2 text-gray-700 bg-transparent">
              <div className="w-full inline-flex gap-2">
                <input type="checkbox" className="w-6 h-6 accent-auto" />
                <span className="flex-1 text-[14px] font-semibold font-opensans text-[#232321]">
                  Keep me logged in - applies to all log in options below. More
                  info
                </span>
              </div>
            </label>
          </div>

          {/* Register Button */}
          <div>
            <button className="w-full bg-[#232321] flex justify-center items-center rounded-lg text-white px-4 py-[15.5px] transform transition duration-400 hover:bg-primary_blue uppercase hover:scale-[1.003] hover:text-white active:scale-[99%]">
              <p className="font-rubik text-[14px] font-medium">Register</p>
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
      </div>
    </div>
  );
};

export default Register;

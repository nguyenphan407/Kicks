import React from "react";
import { FaGoogle, FaFacebook, FaApple } from "react-icons/fa";

const Register = () => {
  return (
    <div className="h-auto container flex flex-col items-start lg:flex-row gap-6 justify-between mt-6 mb-10">
      {/* Registration Form Section */}
      <div className="flex flex-col lg:px-[40px] w-full lg:w-[564px] gap-6">
        {/* Header */}
        <div className="w-full flex flex-col gap-2">
          <h1 className="text-[#232321] text-[24px] lg:text-[36px] font-semibold font-rubik">Register</h1>
          <h2 className="text-[#232321] text-[20px] lg:text[16px] font-semibold font-opensans">Sign up with</h2>
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
          <h3 className="text-[20px] lg:text-[24px] font-semibold font-rubik text-[#232321]">Your Name</h3>
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

        {/* Gender Selection */}
        <div className="flex flex-col gap-5">
          <h3 className="text-[20px] lg:text-[24px] font-semibold font-rubik text-[#232321]">Gender</h3>
          <div className="flex gap-8 justify-start items-start">
            {["Male", "Female", "Other"].map((gender) => (
              <label key={gender} className="flex items-center gap-2">
                <div className="w-6 h-6 flex justify-center items-center">
                  <input
                    type="radio"
                    name="gender"
                    className="w-6 h-6 appearance-none border border-gray-700 checked:bg-blue-500"
                    style={{ borderRadius: '0px' }}
                  />
                </div>
                <span className="text-base font-semibold font-opensans text-[#232321]">
                  {gender}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Login Details */}
        <div className="flex flex-col gap-5">
          <h3 className="text-20px lg:text-[24px] font-semibold font-rubik text-[#232321]">Login Details</h3>
          <input
            placeholder="Email"
            className="w-full p-[10px] border border-gray-800 rounded-lg text-[20px] text-gray-700 bg-transparent focus:border-[#008B28] focus:outline-none"
          />
          <div className="flex flex-col gap-1">
            <input
              type="password"
              placeholder="Password"
              className="w-full p-[10px] border border-gray-800 rounded-lg text-[20px] text-gray-700 bg-transparent focus:border-[#008B28] focus:outline-none"
            />
            <p className="text-[12px] font-normal font-inter text-[#36323B] tracking-wide">
              Minimum 8 characters with at least one uppercase, one lowercase,
              one special character and a number
            </p>
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-neutral-800 font-semibold">
            <div className="w-full flex-1 inline-flex bg-transparent gap-2">
              <input type="checkbox" className="w-6 h-6 accent-auto" />
              <p className="flex-1 text-[14px] lg:text[16px] font-semibold font-['Open_Sans'] text-[#232321]">
                By clicking 'Log In' you agree to our website Kicks
                <span className="underline cursor-pointer">
                  Club Terms & Conditions
                </span>
                ,
                <span className="underline cursor-pointer">
                  Kicks Privacy Notice
                </span>{" "}
                and
                <span className="underline cursor-pointer">Terms & Conditions</span>
                .
              </p>
            </div>
          </label>
          <label className="flex items-center gap-2 text-gray-700 bg-transparent">
            <div className="w-full inline-flex gap-2">
            <input type="checkbox" className="w-6 h-6 accent-auto" />
            <span className="text-[14px] lg:text[16px] font-semibold font-opensans text-[#232321]">
              Keep me logged in - applies to all log in options below. More info
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

      {/* Join Kick Club */}
      <div className="flex-1 p-6 bg-[#FAFAFA] rounded-2xl flex flex-col gap-16">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h2 className="w-full lg:w-[600px] text-[36px] font-semibold font-rubik text-[#232321]">
              Join Kicks Club Get Rewarded Today.
            </h2>
          </div>
          <p className="text-[#232321] text-[14px] lg:text-[16px] opacity-80 font-semibold font-opensans">
            As kicks club member you get rewarded with what you love for doing
            what you love. Sign up today and receive immediate access to these
            Level 1 benefits:
          </p>
          <ul className="list-disc list-inside opacity-80 text-[#232321] text-[14px] lg:text-[16px] font-semibold font-opensans">
            <li>Free shipping</li>
            <li>15% off your next purchase</li>
            <li>Exclusive member products and sales</li>
            <li>Access to adidas Running and Training apps</li>
            <li>Special offers and promotions</li>
          </ul>
          <p className="text-[#232321] opacity-80 text-[14px] lg:text-[16px] font-semibold font-opensans">
            Join now to start earning points, reach new levels and unlock more
            rewards and benefits from adiClub.
          </p>
        </div>

        {/* Join Button */}
        <button className="w-full bg-[#232321] flex justify-center items-center rounded-lg text-white px-4 py-[15.5px] transform transition duration-400 hover:bg-primary_blue uppercase hover:scale-[1.003] hover:text-white active:scale-[99%]">
          <p className="font-rubik text-[14px] font-medium">Join the Club</p>
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

import React from "react";
import { FaGoogle, FaFacebook, FaApple } from "react-icons/fa";
const RegisterComponent = () => {
  return (
    <div className="flex justify-end items-start gap-5">
      {/* Left Section - Registration Form */}
      <div className="w-[544px] px-10 flex flex-col justify-start items-start gap-6">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-semibold font-['Rubik'] text-[#232321]">
            Register
          </h1>
          <h2 className="text-xl font-semibold font-['Open_Sans'] text-[#232321]">
            Sign up with
          </h2>
        </div>

        {/* Social Login Buttons */}
        <div className="w-[480px] flex justify-start items-start gap-6">
          {/* Google Button */}
          <div className="flex-1 h-16 px-12 py-4 border border-[#232321] rounded-xl flex justify-center items-center">
            <FaGoogle size={24} className="text-gray-800" />
          </div>

          {/* Apple Button */}
          <div className="flex-1 h-16 px-12 py-4 border border-[#232321] rounded-xl flex justify-center items-center">
            <FaApple size={24} className="text-gray-800" />
          </div>

          {/* Facebook Button */}
          <div className="flex-1 h-16 px-12 py-4 border border-[#232321] rounded-xl flex justify-center items-center">
            <FaFacebook size={24} className="text-[#1877F2]" />
          </div>
        </div>

        {/* OR Divider */}
        <div className="text-xl font-semibold font-['Open_Sans'] text-[#232321]">
          OR
        </div>

        {/* Name Fields */}
        <div className="flex flex-col gap-5">
          <h3 className="text-2xl font-semibold font-['Rubik'] text-[#232321]">
            Your Name
          </h3>
          <div className="flex flex-col gap-5 w-full">
            <input
              placeholder="First Name"
              className="w-full h-12 px-4 py-2.5 rounded-lg border border-[#232321] text-base font-normal font-['Inter'] text-[#79767C] tracking-wide"
            />
            <input
              placeholder="Last Name"
              className="w-full h-12 px-4 py-2.5 rounded-lg border border-[#232321] text-base font-normal font-['Inter'] text-[#79767C] tracking-wide"
            />
          </div>
        </div>

        {/* Gender Selection */}
        <div className="flex flex-col gap-5">
          <h3 className="text-2xl font-semibold font-['Rubik'] text-[#232321]">
            Gender
          </h3>
          <div className="flex gap-8">
            {["Male", "Female", "Other"].map((gender) => (
              <label key={gender} className="flex items-center gap-2">
                <div className="w-6 h-6 flex justify-center items-center">
                  <input type="radio" name="gender" className="w-4 h-4" />
                </div>
                <span className="text-base font-semibold font-['Open_Sans'] text-[#232321]">
                  {gender}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Login Details */}
        <div className="flex flex-col gap-5">
          <h3 className="text-2xl font-semibold font-['Rubik'] text-[#232321]">
            Login Details
          </h3>
          <input
            placeholder="Email"
            className="w-full h-12 px-4 py-2.5 rounded-lg border border-[#232321] text-base font-normal font-['Inter'] text-[#79767C] tracking-wide"
          />
          <div className="flex flex-col gap-1">
            <input
              type="password"
              placeholder="Password"
              className="w-full h-12 px-4 py-2.5 rounded-lg border border-[#232321] text-base font-normal font-['Inter'] text-[#79767C] tracking-wide"
            />
            <p className="text-xs font-normal font-['Inter'] text-[#36323B] tracking-wide">
              Minimum 8 characters with at least one uppercase, one lowercase,
              one special character and a number
            </p>
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="w-[480px] flex gap-2">
          <input type="checkbox" className="w-6 h-6" />
          <p className="flex-1 text-base font-semibold font-['Open_Sans'] text-[#232321]">
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

        {/* Keep me logged in */}
        <div className="w-[480px] flex items-center gap-2">
          <input type="checkbox" className="w-6 h-6" />
          <span className="flex-1 text-base font-semibold font-['Open_Sans'] text-[#232321]">
            Keep me logged in - applies to all log in options below. More info
          </span>
        </div>

        {/* Register Button */}
        <button className="w-full h-12 px-4 py-2 bg-[#232321] rounded-lg flex justify-between items-center">
          <span className="text-white text-sm font-medium font-['Rubik'] uppercase tracking-wide">
            Register
          </span>
          <div className="w-4 h-4 relative">
            <div className="absolute w-2.5 h-2 left-1 top-1 border-[1.5px] border-white"></div>
          </div>
        </button>
      </div>

      {/* Right Section - Benefits */}
      <div className="flex-1 p-6 bg-[#FAFAFA] rounded-2xl flex flex-col gap-16">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-4xl font-semibold font-['Rubik'] text-[#232321]">
              Join Kicks Club Get Rewarded Today.
            </h2>
          </div>
          <p className="opacity-80 text-base font-semibold font-['Open_Sans'] text-[#232321]">
            As kicks club member you get rewarded with what you love for doing
            what you love. Sign up today and receive immediate access to these
            Level 1 benefits:
          </p>
          <div className="flex flex-col gap-1">
            <p className="opacity-80 text-base font-semibold font-['Open_Sans'] text-[#232321]">
              Free shipping
              <br />
              A 15% off voucher for your next purchase
              <br />
              Access to Members Only products and sales
              <br />
              Access to adidas Running and Training apps
              <br />
              Special offers and promotions
            </p>
          </div>
          <p className="opacity-80 text-base font-semibold font-['Open_Sans'] text-[#232321]">
            Join now to start earning points, reach new levels and unlock more
            rewards and benefits from adiClub.
          </p>
        </div>

        {/* Join the Club Button */}
        <button className="w-full h-12 px-4 py-2 bg-[#232321] rounded-lg flex justify-between items-center">
          <span className="text-white text-sm font-medium font-['Rubik'] uppercase tracking-wide">
            Join the club
          </span>
          <div className="w-4 h-4 relative">
            <div className="absolute w-2.5 h-2 left-1 top-1 border-[1.5px] border-white"></div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default RegisterComponent;

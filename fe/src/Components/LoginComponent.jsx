import { useState, React } from "react";
import { FaGoogle, FaFacebook, FaApple } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
const LoginComponent = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  return (
    <div className="w-full h-full flex justify-start items-start gap-12">
      <div className="w-[544px] h-full px-10 flex flex-col justify-start items-start gap-6">
        <div className="w-full h-[68px] rounded-2xl flex flex-col justify-start items-start gap-2">
          <div className="text-[#232321] text-3xl font-semibold font-rubik">
            Login
          </div>
          <div className="text-[#232321] text-base font-semibold font-opensans underline">
            Forgot your password?
          </div>
        </div>

        {/* Email Input */}
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <div className="h-12 px-4 py-2.5 rounded-lg border border-[#232321] flex items-center gap-2">
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="flex-1 text-gray-500 text-base font-normal font-['Inter'] tracking-wide outline-none"
              />
            </div>
          </div>
        </div>

        {/* Password Input */}
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <div className="h-12 px-4 py-2.5 rounded-lg border border-[#232321] flex items-center gap-2">
              <input
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="flex-1 text-gray-500 text-base font-normal font-['Inter'] tracking-wide outline-none"
              />
            </div>
          </div>
        </div>

        {/* Keep me logged in */}
        <div className="w-[480px] flex items-center gap-2">
          <div className="relative w-6 h-6">
            <div className="w-[14.4px] h-[14.4px] absolute left-[4.8px] top-[4.8px] bg-white" />
            <div className="absolute inset-0">
              <img
                className="w-[18px] h-[18px] absolute left-[3px] top-[3px]"
                src="https://via.placeholder.com/18x18"
                alt="checkbox"
              />
            </div>
          </div>
          <div className="flex-1">
            <span className="text-[#232321] text-base font-semibold font-opensans">
              Keep me logged in - applies to all log in options below.{" "}
            </span>
            <span className="text-[#232321] text-base font-semibold font-opensans underline">
              More info
            </span>
          </div>
        </div>

        {/* Email Login Button */}
        <div className="flex flex-col gap-2.5">
          <div className="h-12 px-4 py-2 bg-[#232321] rounded-lg flex justify-between items-center">
            <div className="text-white text-sm font-medium font-rubik uppercase tracking-wider">
              Email Login
            </div>
            <div className="relative w-4 h-4">
              <IoIosArrowForward className="text-white" />
            </div>
          </div>
        </div>

        <div className="w-[480px] flex justify-start items-start gap-6">
          {/* Google */}
          <div className="flex-1 h-16 px-12 py-4 rounded-xl border border-[#232321] flex justify-center items-center">
            <FaGoogle size={24} className="text-gray-800" />
          </div>
          {/* Apple */}
          <div className="flex-1 h-16 px-12 py-4 rounded-xl border border-[#232321] flex justify-center items-center">
            <FaApple size={24} className="text-gray-800" />
          </div>
          {/* Facebook */}
          <div className="flex-1 h-16 px-12 py-4 rounded-xl border border-[#232321] flex justify-center items-center">
            <FaFacebook size={24} className="text-[#1877F2]" />
          </div>
        </div>

        {/* Terms */}
        <div className="w-[480px] flex justify-center items-center gap-2">
          <div className="flex-1 text-[#232321] text-base font-semibold font-opensans">
            <span>By clicking 'Log In' you agree to our website Kicks </span>
            <span className="underline">Club Terms & Conditions</span>
            <span>, </span>
            <span className="underline">Kicks Privacy Notice</span>
            <span> and </span>
            <span className="underline">Terms & Conditions</span>
            <span>.</span>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1 p-6 bg-[#FAFAFA] rounded-2xl flex flex-col justify-start items-start gap-16">
        <div className="w-full flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <div className="text-[#232321] text-4xl font-semibold font-rubik">
              Join Kicks Club Get Rewarded Today.
            </div>
          </div>

          <div className="w-full opacity-80 text-[#232321] text-base font-semibold font-opensans">
            As kicks club member you get rewarded with what you love for doing
            what you love. Sign up today and receive immediate access to these
            Level 1 benefits:
          </div>

          <div className="flex flex-col gap-1">
            <div className="w-full opacity-80 text-[#232321] text-base font-semibold font-opensans">
              Free shipping
              <br />
              A 15% off voucher for your next purchase
              <br />
              Access to Members Only products and sales
              <br />
              Access to adidas Running and Training apps
              <br />
              Special offers and promotions
            </div>
          </div>

          <div className="w-full opacity-80 text-[#232321] text-base font-semibold font-opensans">
            Join now to start earning points, reach new levels and unlock more
            rewards and benefits from adiClub.
          </div>
        </div>

        {/* Join Button */}
        <div className="w-full flex flex-col gap-2.5">
          <div className="h-12 px-4 py-2 bg-[#232321] rounded-lg flex justify-between items-center">
            <div className="text-white text-sm font-medium font-rubik uppercase tracking-wider">
              Join the club
            </div>
            <div className="relative w-4 h-4">
              <IoIosArrowForward className="text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;

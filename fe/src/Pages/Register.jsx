import React from "react";
import { FaGoogle, FaFacebook, FaApple } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authApi from "../apis/authApi";
const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    gender: "",
    email: "",
    password: "",
    terms_accepted: false,
    keep_logged_in: false,
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const onChangeHandler = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear specific field error when user starts typing
    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: undefined,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // First Name validation
    if (!formData.first_name.trim()) {
      newErrors.first_name = "First Name is required";
    }

    // Last Name validation
    if (!formData.last_name.trim()) {
      newErrors.last_name = "Last Name is required";
    }

    // Gender validation
    if (!formData.gender) {
      newErrors.gender = "Please select a gender";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    // Password validation
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "Password must be at least 8 characters with 1 uppercase, 1 lowercase, 1 number, and 1 special character";
    }

    // Terms acceptance validation
    if (!formData.terms_accepted) {
      newErrors.terms_accepted = "You must accept the Terms & Conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        setIsLoading(true);

        const response = await authApi.register({
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          password: formData.password,
          gender: formData.gender,
          terms_accepted: formData.terms_accepted,
          keep_logged_in: formData.keep_logged_in,
        });

        // Store token in localStorage or context/state management
        localStorage.setItem("token", response.data.token);

        // Optional: Redirect to profile or dashboard
        navigate("/");
      } catch (error) {
        setErrors({
          submit:
            error.response?.data?.message ||
            "Registration failed. Please try again.",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };
  return (
    <div className="h-auto container flex flex-col items-start lg:flex-row gap-6 justify-between mt-6 mb-10">
      <div className="flex flex-col lg:px-[40px] w-full lg:w-[564px] gap-6">
        {/* ... (previous header and social buttons code remains the same) ... */}

        <form onSubmit={onSubmitHandler} className="flex flex-col gap-6">
          {/* Name Fields */}
          <div className="flex flex-col gap-5">
            <h3 className="text-[20px] lg:text-[24px] font-semibold font-rubik text-[#232321]">
              Your Name
            </h3>
            <div className="flex flex-col gap-5 w-full">
              <div>
                <input
                  name="first_name"
                  placeholder="First Name"
                  value={formData.first_name}
                  onChange={onChangeHandler}
                  className={`w-full p-[10px] border ${
                    errors.first_name ? "border-red-500" : "border-gray-800"
                  } rounded-lg text-[16px] text-gray-700 bg-transparent focus:border-[#008B28] focus:outline-none`}
                />
                {errors.first_name && (
                  <span className="text-red-500 text-sm">
                    {errors.first_name}
                  </span>
                )}
              </div>
              <div>
                <input
                  name="last_name"
                  placeholder="Last Name"
                  value={formData.last_name}
                  onChange={onChangeHandler}
                  className={`w-full p-[10px] border ${
                    errors.last_name ? "border-red-500" : "border-gray-800"
                  } rounded-lg text-[16px] text-gray-700 bg-transparent focus:border-[#008B28] focus:outline-none`}
                />
                {errors.last_name && (
                  <span className="text-red-500 text-sm">
                    {errors.last_name}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Gender Selection */}
          <div className="flex flex-col gap-5">
            <h3 className="text-[20px] lg:text-[24px] font-semibold font-rubik text-[#232321]">
              Gender
            </h3>
            <div className="flex gap-8 justify-start items-start">
              {["Male", "Female", "Other"].map((gender) => (
                <label key={gender} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="gender"
                    value={gender}
                    checked={formData.gender === gender}
                    onChange={onChangeHandler}
                    className="w-6 h-6"
                  />
                  <span className="text-base font-semibold font-opensans text-[#232321]">
                    {gender}
                  </span>
                </label>
              ))}
            </div>
            {errors.gender && (
              <span className="text-red-500 text-sm">{errors.gender}</span>
            )}
          </div>

          {/* Login Details */}
          <div className="flex flex-col gap-5">
            <h3 className="text-20px lg:text-[24px] font-semibold font-rubik text-[#232321]">
              Login Details
            </h3>
            <div>
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={onChangeHandler}
                className={`w-full p-[10px] border ${
                  errors.email ? "border-red-500" : "border-gray-800"
                } rounded-lg text-[16px] text-gray-700 bg-transparent focus:border-[#008B28] focus:outline-none`}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">{errors.email}</span>
              )}
            </div>
            <div>
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={onChangeHandler}
                className={`w-full p-[10px] border ${
                  errors.password ? "border-red-500" : "border-gray-800"
                } rounded-lg text-[16px] text-gray-700 bg-transparent focus:border-[#008B28] focus:outline-none`}
              />
              {errors.password && (
                <span className="text-red-500 text-sm">{errors.password}</span>
              )}
              <p className="text-[12px] font-normal font-inter text-[#36323B] tracking-wide mt-1">
                Minimum 8 characters with at least one uppercase, one lowercase,
                one special character and a number
              </p>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-neutral-800 font-semibold">
              <input
                type="checkbox"
                name="terms_accepted"
                checked={formData.terms_accepted}
                onChange={onChangeHandler}
                className="w-6 h-6 accent-auto"
              />
              <p className="flex-1 text-[14px] lg:text[16px] font-semibold font-['Open_Sans'] text-[#232321]">
                By clicking 'Register' you agree to our website Kicks
                <span className="underline cursor-pointer ml-1">
                  Club Terms & Conditions
                </span>
                ,
                <span className="underline cursor-pointer ml-1">
                  Kicks Privacy Notice
                </span>{" "}
                and
                <span className="underline cursor-pointer ml-1">
                  Terms & Conditions
                </span>
                .
              </p>
            </label>
            {errors.terms_accepted && (
              <span className="text-red-500 text-sm">
                {errors.terms_accepted}
              </span>
            )}
            <label className="flex items-center gap-2 text-gray-700 bg-transparent">
              <input
                type="checkbox"
                name="keep_logged_in"
                checked={formData.keep_logged_in}
                onChange={onChangeHandler}
                className="w-6 h-6 accent-auto"
              />
              <span className="text-[14px] lg:text[16px] font-semibold font-opensans text-[#232321]">
                Keep me logged in - applies to all log in options below. More
                info
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#232321] flex justify-center items-center rounded-lg text-white px-4 py-[15.5px] transform transition duration-400 hover:bg-primary_blue uppercase hover:scale-[1.003] hover:text-white active:scale-[99%] disabled:opacity-50"
          >
            <p className="font-rubik text-[14px] font-medium">
              {isLoading ? "Registering..." : "Register"}
            </p>
            {!isLoading && (
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

          {errors.submit && (
            <div className="text-red-500 text-sm text-center mt-2">
              {errors.submit}
            </div>
          )}
        </form>
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

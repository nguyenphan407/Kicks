import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import authApi from "../apis/authApi"; // API dùng để gọi backend

const EmailConfirmation = () => {
  const navigate = useNavigate();
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const location = useLocation();
  const data = location.state;
  console.log(data)

  const handleSendEmail = async () => {
    try {

      // Gọi API gửi email xác nhận
      const response = await fetch(
        "http://localhost:8000/api/send-mail",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      //setIsSending(false);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to send confirmation email."
      )
    };
  };


  useEffect(() => {
    handleSendEmail();
  }, []);

  return (
    <div className="h-screen flex flex-col justify-center items-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800">
          Verify Your Email
        </h2>
        <p className="text-gray-600 text-center mb-6">
          A confirmation email has been sent to your email address. Click the
          button below if you haven't received it.
        </p>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        {success && (
          <div className="text-green-500 text-center mb-4">
            Confirmation email sent successfully!
          </div>
        )}

        <button
          //onClick={{}}
          className="w-full bg-[#008B28] text-white font-medium py-2 rounded-lg transition duration-300 hover:bg-[#006B1C] disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isSending ? "Sending..." : "Resend Confirmation Email"}
        </button>

        <button
          onClick={() => navigate("/")}
          className="w-full mt-4 text-center text-[#008B28] font-medium"
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
};

export default EmailConfirmation;

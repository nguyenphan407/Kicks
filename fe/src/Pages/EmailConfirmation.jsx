import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authApi from "../apis/authApi"; // API dùng để gọi backend

const EmailConfirmation = () => {
  const navigate = useNavigate();
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSendEmail = async () => {
    setIsSending(true);
    setError("");
    try {
      // Gọi API gửi email xác nhận
      await authApi.sendConfirmationEmail();
      setSuccess(true);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to send confirmation email."
      );
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-50 px-4">
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
          onClick={handleSendEmail}
          disabled={isSending}
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

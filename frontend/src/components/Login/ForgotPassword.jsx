import React, { useState, useRef, useContext } from "react";
import Loader from "../Loader";
import axios from "axios";
import { URL } from "../../url";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const otpFields = useRef([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  // console.log(user.data.email);

  const handleVerify = async () => {
    const combinedOtp = otp.join("");
    try {
      setLoading(true);
      await axios.post(
        URL + "/api/v1/users/change-password",
        { email: user.data.email, otp: combinedOtp },
        { withCredentials: true }
      );

      navigate("/settings/password");
      setSuccess(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      setError(true);
    }
  };

  // Function to handle OTP input change
  const handleChange = (index, event) => {
    const value = event.target.value;
    // Ensure input is a single digit and update OTP array
    if (/^\d*$/.test(value) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Focus on next input field, if available
      if (index < 3 && value !== "") {
        otpFields.current[index + 1].focus();
      }
    }
  };

  // Function to handle paste event (prevent pasting multiple digits)
  const handlePaste = (event) => {
    event.preventDefault();
    const pasteData = event.clipboardData
      .getData("text/plain")
      .trim()
      .slice(0, 4);
    const pasteArray = pasteData.split("").filter((char) => /^\d$/.test(char));
    const newOtp = [...otp];
    for (let i = 0; i < pasteArray.length && i < 4; i++) {
      newOtp[i] = pasteArray[i];
    }
    setOtp(newOtp);
  };

  // Function to handle input onKeyUp (backspace navigation)
  const handleKeyUp = (index, event) => {
    if (event.key === "Backspace" && index > 0 && otp[index] === "") {
      otpFields.current[index - 1].focus();
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white border rounded-lg shadow-lg p-6 flex flex-col items-center justify-center mt-24">
      <h2 className="text-lg font-medium mb-4">Enter OTP</h2>
      <div className="flex items-center justify-center space-x-4">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (otpFields.current[index] = el)}
            type="text"
            maxLength="1"
            value={digit}
            onChange={(e) => handleChange(index, e)}
            onPaste={handlePaste}
            onKeyUp={(e) => handleKeyUp(index, e)}
            className="w-12 h-12 border border-gray-300 rounded-lg text-center text-xl font-semibold focus:outline-none focus:border-blue-500"
          />
        ))}
      </div>
      <p className="text-sm text-gray-500 mt-2">
        Enter the 4-digit OTP sent to your email.
      </p>

      {success && (
        <p className="text-sm text-green-600">Password changed successfully!</p>
      )}
      {error && (
        <p className="text-sm text-red-600">
          Failed to verify OTP. Please try again.
        </p>
      )}

      <button
        onClick={handleVerify}
        className="flex gap-x-1 p-2 px-4 bg-teal-500 rounded-md mt-4 text-white hover:bg-teal-400"
      >
        {loading ? (
          <div className="flex">
            <Loader size="w-6 h-6" />
            <span>Verifying...</span>
          </div>
        ) : (
          <span>Verify</span>
        )}
      </button>
    </div>
  );
};

export default ForgotPassword;

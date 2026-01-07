import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import forgotPasswordImg from "../images/forgot-password-illustration-svg (1).png";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (!email) {
      Swal.fire({
        icon: "error",
        title: "Email Required",
        text: "Please enter your registered email address.",
      });
      return;
    }

    setLoading(true);
    try {
      const actionCodeSettings = {
        url: "http://localhost:3000/login", 
        handleCodeInApp: true,
      };

      await sendPasswordResetEmail(auth, email, actionCodeSettings);

      // Store email in localStorage for auto-fill on login
      localStorage.setItem("resetEmail", email);

      Swal.fire({
        icon: "success",
        title: "Password Reset Email Sent",
        text: "Check your inbox and follow the instructions to reset your password.",
      });

      setEmail(""); 
      navigate("/login"); // Redirect to login
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#fff8e7] flex items-center justify-center px-4 py-6">
    <div className="bg-white rounded-2xl shadow-xl flex flex-col md:flex-row overflow-hidden max-w-4xl w-full min-h-[700px] md:min-h-[600px]">
  
      {/* Left Side Image */}
      <div className="md:w-1/2 w-full flex-shrink-0">
        <img
          src={forgotPasswordImg}
          alt="Forgot Password"
          className="w-full h-full object-cover"
        />
      </div>
  
      {/* Right Side Form */}
      <div className="w-full md:w-1/2 p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#E2852E] mb-6 text-center">
          Forgot Password
        </h2>
        <p className="text-gray-600 text-center mb-6 text-sm sm:text-base">
          Enter your registered email address to reset your password.
        </p>
  
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
          />
  
          <button
            onClick={handleReset}
            disabled={loading}
            className="w-full bg-[#E2852E] text-white font-semibold py-3 rounded-lg transition duration-200 mt-2 hover:opacity-90"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </div>
  
        <p className="text-center text-sm sm:text-base text-gray-600 mt-6">
          Remember your password?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-indigo-600 hover:underline cursor-pointer"
          >
            Login here
          </span>
        </p>
      </div>
  
    </div>
  </div>
  
  );
};

export default ForgotPassword;

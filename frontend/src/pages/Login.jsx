import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import loginImg from "../images/registration.png";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get redirect path from query param, default to /dashboard
  const redirectPath = new URLSearchParams(location.search).get("redirect") || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if coming from password reset
    const resetEmail = localStorage.getItem("resetEmail");
    if (resetEmail) {
      setEmail(resetEmail);
      Swal.fire({
        icon: "success",
        title: "Password Reset Successful",
        text: "Enter your new password to login.",
      });
      localStorage.removeItem("resetEmail");
    }
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      Swal.fire({
        icon: "error",
        title: "Missing Fields",
        text: "Please enter both email and password.",
      });
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "Redirecting...",
        timer: 1500,
        showConfirmButton: false,
      });

      // Redirect to the page the user wanted to go
      navigate(redirectPath, { replace: true });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.message,
      });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#fff8e7] flex py-4 justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl flex flex-col md:flex-row overflow-hidden max-w-4xl w-full min-h-[700px] md:min-h-[600px]">
        {/* Left Side Image */}
        <div className="md:w-1/2 w-full flex-shrink-0">
          <img
            src={loginImg}
            alt="Login"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side Form */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#E2852E] mb-6 text-center">
            Login
          </h2>

          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
              </button>
            </div>

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-[#E2852E] text-white font-semibold py-3 rounded-lg transition duration-200 mt-2 hover:opacity-90"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>

          {/* Links */}
          <div className="text-center text-sm sm:text-base text-gray-600 mt-4 space-y-2 flex flex-col items-center">
          <span>
              Don't have an account?{" "}
              <span
                onClick={() => navigate("/register")}
                className="text-indigo-600 hover:underline cursor-pointer"
              >
                Register here
              </span>
            </span>
            <span>
              Have you forgotten your password?{" "}
              <span
                onClick={() => navigate("/forgot-password")}
                className="text-indigo-600 hover:underline cursor-pointer"
              >
                Reset here
              </span>
            </span>
         
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
